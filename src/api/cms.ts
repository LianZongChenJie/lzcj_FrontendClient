import request from '@/utils/request'
import type {
  BannerItem,
  CompanyIntro,
  Milestone,
  Culture,
  TeamGallery,
  Honor,
  Product,
  Solution,
  TechService,
  NewsItem,
  Announcement,
  Job,
  BranchContact
} from '@/types'

/** 分页参数（对齐芋道 PageParam） */
export interface PageParams {
  pageNo?: number
  pageSize?: number
}

/** 分页结果（对齐芋道 PageResult） */
export interface PageResult<T> {
  list: T[]
  total: number
}

/**
 * 芋道后端统一响应结构
 * request 拦截器与后台管理端一致：成功时返回完整响应体，调用处通过 res.data 取业务数据
 */
export interface CommonResult<T> {
  code: number
  msg: string
  data: T
}

/**
 * CMS 只读 API（展示端调用）
 * 展示内容全部来自后端数据库，返回均为芋道统一的 CommonResult 包装，业务数据在 res.data 中
 * 说明：站点配置与导航为前端静态配置（见 @/config/navigation 与 @/data/site.config），无后端接口
 */
export const cmsApi = {
  // 首页数据
  getBanners: () => request.get<any, CommonResult<BannerItem[]>>('/cms/api/banners'),
  getCompanyIntro: () =>
    request.get<any, CommonResult<CompanyIntro>>('/cms/api/company-intro'),
  getMilestones: () => request.get<any, CommonResult<Milestone[]>>('/cms/api/milestones'),
  getCompanyCulture: () => request.get<any, CommonResult<Culture>>('/cms/api/company-culture'),
  getTeamGallery: () => request.get<any, CommonResult<TeamGallery>>('/cms/api/team-gallery'),
  getHonors: () => request.get<any, CommonResult<Honor[]>>('/cms/api/honors'),
  // 业务数据
  getSelfProducts: () => request.get<any, CommonResult<Product[]>>('/cms/api/self-products'),
  getAgentProducts: () => request.get<any, CommonResult<Product[]>>('/cms/api/agent-products'),
  getSolutions: () => request.get<any, CommonResult<Solution[]>>('/cms/api/solutions'),
  getTechServices: () => request.get<any, CommonResult<TechService[]>>('/cms/api/tech-services'),
  // 新闻公告
  getNewsList: (params?: PageParams) =>
    request.get<any, CommonResult<PageResult<NewsItem>>>('/cms/api/news', { params }),
  getNewsDetail: (id: number) => request.get<any, CommonResult<NewsItem>>(`/cms/api/news/${id}`),
  getAnnouncements: () =>
    request.get<any, CommonResult<Announcement[]>>('/cms/api/announcements'),
  getAnnouncementDetail: (id: number) =>
    request.get<any, CommonResult<Announcement>>(`/cms/api/announcements/${id}`),
  // 招聘与联系
  getJobs: () => request.get<any, CommonResult<Job[]>>('/cms/api/jobs'),
  getContacts: () => request.get<any, CommonResult<BranchContact[]>>('/cms/api/contacts')
}
