const config: {
  /**
   * api请求基础路径
   */
  base_url: string
  /**
   * 接口成功返回状态码
   */
  result_code: number | string
  /**
   * 接口请求超时时间
   */
  request_timeout: number
  /**
   * 登录页路径（401 时可选跳转）
   */
  login_path: string
} = {
  /**
   * API 基础地址（host 部分，不含路径）
   * - 留空：请求同源相对路径 /cms/api/**，开发环境走 vite 代理，生产环境走 nginx 反代
   * - 填写后台域名（如 https://admin.example.com）：直连该域名，需后端配置 CORS
   * 注意：url 中已包含完整路径（如 /cms/api/xxx），故 base_url 不要重复添加 /cms
   */
  base_url: import.meta.env.VITE_API_BASE_URL || '',
  /**
   * 接口成功返回状态码（芋道约定 0，HTTP 兜底 200）
   */
  result_code: 200,
  /**
   * 接口请求超时时间
   */
  request_timeout: 30000,
  /**
   * 登录页路径，展示端无登录页时可留空
   */
  login_path: '/login'
}

export { config }
