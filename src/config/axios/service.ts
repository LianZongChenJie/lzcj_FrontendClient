import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import qs from 'qs'
import { config } from '@/config/axios/config'
import errorCode from './errorCode'
import { getAccessToken, removeToken } from '@/utils/auth'
import { message } from '@/utils/message'

const { result_code, base_url, request_timeout } = config

// 是否显示重新登录（或 Token 失效提示）
export const isRelogin = { show: false }
// 请求白名单，无须 token 的接口
const whiteList: string[] = ['/login', '/refresh-token', '/cms/api']

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: base_url, // api 的 base_url
  timeout: request_timeout, // 请求超时时间
  withCredentials: false, // 禁用 Cookie 等信息
  // 自定义参数序列化函数
  paramsSerializer: (params) => {
    return qs.stringify(params, { allowDots: true })
  }
})

// request拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const headers = config.headers || ({} as Record<string, any>)
    // 是否需要设置 token；命中白名单的接口（如 /login）不带 token
    let isToken = headers.isToken !== false
    if (isToken && whiteList.some((v) => config.url?.includes(v))) {
      isToken = false
    }
    const accessToken = getAccessToken()
    if (accessToken && isToken) {
      config.headers.Authorization = 'Bearer ' + accessToken // 让每个请求携带自定义 token
    }
    // 设置租户：默认传递 tenant-id: 1（后端固定单租户）
    if (!config.headers?.['tenant-id']) {
      config.headers['tenant-id'] = '1'
    }
    const method = config.method?.toUpperCase()
    // 防止 GET 请求缓存
    if (method === 'GET') {
      config.headers['Cache-Control'] = 'no-cache'
      config.headers['Pragma'] = 'no-cache'
    }
    // 自定义参数序列化函数
    else if (method === 'POST') {
      const contentType = config.headers['Content-Type'] || config.headers['content-type']
      if (contentType === 'application/x-www-form-urlencoded') {
        if (config.data && typeof config.data !== 'string') {
          config.data = qs.stringify(config.data)
        }
      }
    }
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    let { data } = response
    if (!data) {
      // 返回“[HTTP]请求没有返回值”;
      throw new Error()
    }
    // 二进制数据则直接返回，例如说 Excel 导出
    // 注意：如果导出的响应为 json，说明可能失败了，不直接返回进行下载
    if (
      response.request.responseType === 'blob' ||
      response.request.responseType === 'arraybuffer'
    ) {
      if (response.data.type !== 'application/json') {
        return response.data
      }
      data = await new Response(response.data).json()
    }
    const code = data.code ?? result_code
    // 获取错误信息
    const msg = data.msg || errorCode[String(code)] || errorCode['default']
    if (code === 401) {
      // 展示端公开接口（/cms/api/**）为匿名访问，出现 401 时静默失败，
      // 由各页面的加载逻辑处理（展示为空数据），不弹「登录已过期」提示
      if (response.config.url?.includes('/cms/api')) {
        return Promise.reject(new Error(msg))
      }
      // 认证失败：清除本地 Token 并提示（展示端无刷新令牌流程）
      return handleAuthorized()
    } else if (code === 500) {
      message.error(msg)
      return Promise.reject(new Error(msg))
    } else if (code !== 0 && code !== 200) {
      message.error(msg)
      return Promise.reject(new Error(msg))
    } else {
      return data
    }
  },
  (error: AxiosError) => {
    console.log('err' + error) // for debug
    let msg = error.message || '请求异常'
    if (msg === 'Network Error') {
      msg = '网络连接异常，请检查网络'
    } else if (msg.includes('timeout')) {
      msg = '系统接口请求超时'
    } else if (msg.includes('Request failed with status code')) {
      msg = '系统接口' + msg.substr(msg.length - 3) + '异常'
    }
    message.error(msg)
    return Promise.reject(error)
  }
)

const handleAuthorized = () => {
  removeToken()
  if (!isRelogin.show) {
    // 如果已经到登录页面则不进行弹窗提示
    if (window.location.href.includes('login')) {
      return
    }
    isRelogin.show = true
    message.warning('登录状态已过期，请重新登录')
    // 展示端暂无登录页；如后续新增，可在此处跳转
    // window.location.href = config.login_path
  }
  return Promise.reject('登录状态已过期，请重新登录')
}

export { service }
