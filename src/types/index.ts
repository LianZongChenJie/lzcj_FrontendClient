// ===== 站点基础类型 =====

export interface SiteConfig {
  companyName: string
  companyShortName: string
  icp?: string
  copyright: string
  branches: string[]
}

// ===== 导航类型 =====

export interface AnchorItem {
  id: string
  label: string
}

export interface NavRoute {
  path: string
  name: string
  label: string
  anchors: AnchorItem[]
}

// ===== 首页数据类型 =====

export interface BannerItem {
  id: number
  image: string
  title: string
  subtitle: string
}

export interface CompanyIntro {
  description: string
  images: string[]
}

export interface Milestone {
  year: number
  title: string
  description: string
}

export interface Culture {
  mission: string
  vision: string
  values: string
}

export interface TeamGalleryItem {
  image: string
  description: string
}

export interface TeamGallery {
  items: TeamGalleryItem[]
}

export interface HomeData {
  banners: BannerItem[]
  companyIntro: CompanyIntro
  milestones: Milestone[]
  culture: Culture
  teamGallery: TeamGallery
  honors: Honor[]
}

// ===== 公司业务类型 =====

export interface Product {
  id: number
  name: string
  image: string
  summary: string
  description: string
  features: string[]
  scenarios?: string[]
}

export interface Solution {
  id: number
  name: string
  image: string
  industry: string
  summary: string
  description: string
  demandAnalysis: string
}

export interface TechService {
  id: number
  industry: string
  icon: string
  description: string
}

export interface Honor {
  id: number
  name: string
  image: string
  type: 'qualification' | 'award'
  date: string
}

export interface BusinessData {
  selfProducts: Product[]
  agentProducts: Product[]
  solutions: Solution[]
  techServices: TechService[]
  honors: Honor[]
}

// ===== 公司动态类型 =====

export interface NewsItem {
  id: number
  title: string
  cover: string
  date: string
  summary: string
  content: string
  author?: string
}

export interface Announcement {
  id: number
  title: string
  date: string
  summary: string
  content: string
  important: boolean
}

export interface NewsData {
  news: NewsItem[]
  announcements: Announcement[]
}

// ===== 加入我们类型 =====

export interface Job {
  id: number
  title: string
  location: string
  department: string
  type: '全职' | '兼职' | '实习'
  urgent: boolean
  responsibilities: string[]
  requirements: string[]
  headcount: number
}

export interface BranchContact {
  id?: number
  city: string
  address: string
  phone: string
  postalCode: string
  email?: string
  /** 主题色（hex，为空时展示端使用预设配色） */
  themeColor?: string
  sort?: number
}

export interface JoinData {
  jobs: Job[]
  contacts: BranchContact[]
}
