/**
 * Token 存储工具
 * 与后台管理端保持一致：使用 ACCESS_TOKEN 作为本地缓存 Key
 * 说明：展示端 CMS 只读接口通常为匿名访问，此工具为后续登录/只读 Token 能力预留
 */

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN'

// 获取token
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

// 设置token（传字符串，或后台登录返回的完整 VO 对象均可）
export const setToken = (token: string) => {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  }
}

// 删除token
export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return 'Bearer ' + token
}
