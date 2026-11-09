# 北京联纵宸捷科技有限公司 - 企业官网

> 基于 Vue 3 + TypeScript + Vite + TailwindCSS 构建的企业官网前端项目

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue 3 | ^3.4.21 | 组合式 API，`<script setup>` |
| TypeScript | ^5.4.3 | 严格模式 |
| Vite | ^5.2.6 | 极速构建工具 |
| Pinia | ^2.1.7 | 状态管理 |
| Vue Router | ^4.3.0 | 路由管理（仅4个主路由） |
| TailwindCSS | ^3.4.3 | 原子化 CSS |

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装与运行

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 浏览器访问 http://localhost:3000
```

### 构建部署

```bash
# 生产构建
npm run build

# 预览构建结果
npm run preview
```

构建产物在 `dist/` 目录，将 `dist/` 目录内容上传至服务器即可。

## 项目结构

```
├── public/                  # 静态资源
│   └── favicon.svg          # 网站图标
├── src/
│   ├── components/
│   │   ├── common/          # 公共组件
│   │   │   ├── AppHeader.vue    # 顶部导航
│   │   │   ├── AppFooter.vue    # 底部信息
│   │   │   ├── SectionTitle.vue # 板块标题
│   │   │   ├── ImageViewer.vue  # 图片预览
│   │   │   ├── DetailModal.vue  # 通用弹窗
│   │   │   ├── BackToTop.vue    # 返回顶部
│   │   │   └── TabFilter.vue    # 筛选 Tab
│   │   ├── home/            # 首页组件
│   │   ├── business/        # 业务页组件
│   │   ├── news/            # 动态页组件
│   │   └── join/            # 加入我们页组件
│   ├── api/                 # CMS 接口（展示内容全部来自后端）
│   │   └── cms.ts           # /cms/api 展示端接口封装
│   ├── config/              # 前端配置
│   │   ├── navigation.ts    # 导航与锚点（前端常量）
│   │   └── axios/           # axios 实例与拦截器
│   ├── data/                # 站点元信息
│   │   └── site.config.ts   # 公司名称/版权等（后端暂无配置表）
│   ├── pages/               # 页面组件
│   │   ├── HomePage.vue     # 首页
│   │   ├── BusinessPage.vue # 公司业务
│   │   ├── NewsPage.vue     # 公司动态
│   │   └── JoinPage.vue     # 加入我们
│   ├── router/              # 路由配置
│   ├── stores/              # Pinia 状态管理
│   ├── styles/              # 全局样式
│   ├── types/               # TypeScript 类型定义
│   ├── App.vue              # 根组件
│   └── main.ts              # 入口文件
├── nginx.conf               # Nginx 部署配置
├── index.html               # HTML 入口
├── vite.config.ts           # Vite 配置
├── tailwind.config.js       # TailwindCSS 配置
├── tsconfig.json            # TypeScript 配置
└── package.json             # 项目配置
```

## 页面路由

| 路由 | 页面 | 锚点区域 |
|------|------|----------|
| `/` | 首页 | Banner → 公司介绍 → 发展历程 → 企业文化 → 员工风采 |
| `/business` | 公司业务 | 自研产品 → 代理产品 → 解决方案 → 技术服务 → 资质荣誉 |
| `/news` | 公司动态 | 新闻中心 → 公司公告 |
| `/join` | 加入我们 | 人才招聘 → 联系方式 |

## 内容更新

展示内容（Banner、公司介绍、发展历程、企业文化、员工风采、资质荣誉、产品、方案、技术服务、新闻、公告、招聘、联系方式）**全部来自后端数据库**，通过管理端「运维与网站内容维护」页面维护，展示端通过 `/cms/api` 只读接口获取真实数据，不再使用本地 JSON 文件。

仅需修改代码即可调整的静态配置：

| 文件 | 用途 |
|------|------|
| `src/data/site.config.ts` | 公司名称、版权信息等站点元信息 |
| `src/config/navigation.ts` | 导航结构与锚点定义 |

修改后重新 `npm run build`，上传 `dist/` 目录即可生效。

## 部署指南

### Nginx 部署（推荐）

1. 将构建产物 `dist/` 目录内容上传到服务器的 `/var/www/lianzong/dist`
2. 将项目根目录的 `nginx.conf` 配置复制到 Nginx 配置目录
3. 修改 `server_name` 为你的域名
4. 重启 Nginx: `sudo systemctl restart nginx`

### 阿里云 OSS + CDN

1. 构建项目: `npm run build`
2. 将 `dist/` 目录上传到 OSS Bucket
3. 配置 Bucket 为静态网站托管模式
4. 绑定 CDN 加速域名
5. 配置 CDN 缓存策略

### Vercel / Netlify

1. 将代码推送到 GitHub
2. 在 Vercel/Netlify 中导入项目
3. 构建命令: `npm run build`
4. 输出目录: `dist`
5. 自动部署

## 浏览器支持

- Chrome 90+
- Edge 90+
- Safari 14+
- Firefox 90+

## License

© 2020-2026 北京联纵宸捷科技有限公司 版权所有
