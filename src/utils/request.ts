/**
 * 统一请求实例导出
 * 使用方式（与后台管理端保持一致）：
 *   import request from '@/utils/request'
 *   const data = await request.get<any, MyType>('/cms/api/xxx')
 */
import { service } from '@/config/axios/service'

const request = service

export { request }
export default request
