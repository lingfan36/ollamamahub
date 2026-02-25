Ollama Global Community Site - PRD                                                                                                 
                                                                                                                                    
 一、项目概述                                                                                                                       
                                                                                                                                    
 ### 1.1 产品定位                                                                                                                   
                                                                                                                                    
 ┌──────────┬──────────────────────────────────────┐                                                                                
 │ 项目     │ 内容                                 │                                                                                
 ├──────────┼──────────────────────────────────────┤                                                                                
 │ 产品名称 │ OllamaHub (全球站)                   │                                                                                
 │ 定位     │ 官方文档之外最好的Ollama资源站       │                                                                                
 │ 目标用户 │ 全球Ollama用户、开发者、AI研究者     │                                                                                
 │ 语言     │ 英文 (为主)                          │                                                                                
 │ 差异化   │ AI驱动内容更新 + 问题解决 + 社区聚合 │                                                                                
 └──────────┴──────────────────────────────────────┘                                                                                
                                                                                                                                    
 ### 1.2 核心价值                                                                                                                   
                                                                                                                                    
 - 用户角度：快速找到Ollama问题的解决方案                                                                                           
 - 运营角度：AI自动从GitHub Issues抓取内容，持续增长                                                                                
 - SEO角度：长尾关键词覆盖，获取免费流量                                                                                            
                                                                                                                                    
 ────────────────────────────────────────────────────────────────────────────────                                                   
                                                                                                                                    
 二、本地开发范围                                                                                                                   
                                                                                                                                    
 ### 2.1 本地只做：网站模板 + 基础框架                                                                                              
                                                                                                                                    
 不包括：                                                                                                                           
 - ❌ AI运营功能（那是部署后的任务）                                                                                                
 - ❌ GitHub Issues数据抓取                                                                                                         
 - ❌ 自动回复系统                                                                                                                  
 - ❌ 动态内容生成                                                                                                                  
                                                                                                                                    
 只包括：                                                                                                                           
 - ✅ 网站UI/UX（静态模板）                                                                                                         
 - ✅ 文档浏览页面                                                                                                                  
 - ✅ 搜索功能                                                                                                                      
 - ✅ 问题库展示                                                                                                                    
 - ✅ 响应式设计                                                                                                                    
 - ✅ 基础SEO优化                                                                                                                   
 - ✅ Docker部署配置                                                                                                                
                                                                                                                                    
 ────────────────────────────────────────────────────────────────────────────────                                                   
                                                                                                                                    
 三、网站功能模块                                                                                                                   
                                                                                                                                    
 ### 3.1 页面结构                                                                                                                   
                                                                                                                                    
 ```                                                                                                                                
   ollama-site/                                                                                                                     
   ├── pages/                                                                                                                       
   │   ├── index.html          # 首页 (Hero + 热门内容)                                                                             
   │   ├── docs/               # 文档页                                                                                             
   │   │   ├── index.html      # 文档列表                                                                                           
   │   │   ├── installation/                                                                                                        
   │   │   ├── models/                                                                                                              
   │   │   └── api/                                                                                                                 
   │   ├── solutions/          # 问题解决方案页                                                                                     
   │   │   ├── index.html      # 解决方案列表                                                                                       
   │   │   ├── installation/                                                                                                        
   │   │   ├── models/                                                                                                              
   │   │   └── ...                                                                                                                  
   │   ├── search.html         # 搜索页                                                                                             
   │   └── about.html          # 关于页                                                                                             
   ├── components/                                                                                                                  
   │   ├── header.html                                                                                                              
   │   ├── footer.html                                                                                                              
   │   ├── sidebar.html                                                                                                             
   │   ├── search-box.html                                                                                                          
   │   └── doc-card.html                                                                                                            
   ├── css/                                                                                                                         
   │   └── styles.css                                                                                                               
   ├── js/                                                                                                                          
   │   └── main.js                                                                                                                  
   ├── knowledge-base/         # Markdown内容 (CI/CD时从Git同步)                                                                    
   ├── _data/                   # JSON数据 (侧边栏、导航等)                                                                         
   ├── Dockerfile                                                                                                                   
   └── docker-compose.yml                                                                                                           
 ```                                                                                                                                
                                                                                                                                    
 ### 3.2 页面详情                                                                                                                   
                                                                                                                                    
 ┌────────────┬────────────────────────────────────────────────┬────────┐                                                           
 │ 页面       │ 功能                                           │ 优先级 │                                                           
 ├────────────┼────────────────────────────────────────────────┼────────┤                                                           
 │ 首页       │ Hero Banner + 热门文档 + 最新解决方案 + 搜索框 │ P0     │                                                           
 │ 文档页     │ 侧边栏导航 + 面包屑 + 代码高亮 + 目录          │ P0     │                                                           
 │ 解决方案页 │ 问题分类浏览 + 标签筛选 + 相关推荐             │ P0     │                                                           
 │ 搜索页     │ 全文搜索 + 结果高亮 + 筛选                     │ P0     │                                                           
 │ 关于页     │ 项目介绍 + 贡献指南 + 联系方式                 │ P1     │                                                           
 └────────────┴────────────────────────────────────────────────┴────────┘                                                           
                                                                                                                                    
 ### 3.3 组件                                                                                                                       
                                                                                                                                    
 ┌────────────┬───────────────────────────────────────┐                                                                             
 │ 组件       │ 功能                                  │                                                                             
 ├────────────┼───────────────────────────────────────┤                                                                             
 │ Header     │ Logo + 导航菜单 + 搜索框 + GitHub链接 │                                                                             
 │ Footer     │ 版权 + 友情链接 + 社交媒体            │                                                                             
 │ Sidebar    │ 分类导航 + 标签云 + 最近更新          │                                                                             
 │ SearchBox  │ 实时搜索建议 + 快捷键支持             │                                                                             
 │ DocCard    │ 文档卡片 (标题 + 描述 + 标签)         │                                                                             
 │ IssueCard  │ 问题卡片 (标题 + 标签 + 热度)         │                                                                             
 │ CodeBlock  │ 代码高亮 + 复制按钮                   │                                                                             
 │ Breadcrumb │ 路径导航                              │                                                                             
 └────────────┴───────────────────────────────────────┘                                                                             
                                                                                                                                    
 ────────────────────────────────────────────────────────────────────────────────                                                   
                                                                                                                                    
 四、设计规范                                                                                                                       
                                                                                                                                    
 ### 4.1 视觉风格                                                                                                                   
                                                                                                                                    
 - 风格：简洁、现代、技术感                                                                                                         
 - 配色：                                                                                                                           
     - 主色：#6366f1 (Indigo)                                                                                                       
     - 背景：#ffffff / #f8fafc                                                                                                      
     - 文字：#1e293b                                                                                                                
     - 代码块：#1e1e1e (暗色)                                                                                                       
 - 字体：                                                                                                                           
     - 正文：Inter / system-ui                                                                                                      
     - 代码：JetBrains Mono / Fira Code                                                                                             
                                                                                                                                    
 ### 4.2 响应式设计                                                                                                                 
                                                                                                                                    
 ┌─────────┬────────────────┐                                                                                                       
 │ 断点    │ 屏幕宽度       │                                                                                                       
 ├─────────┼────────────────┤                                                                                                       
 │ Mobile  │ < 640px        │                                                                                                       
 │ Tablet  │ 640px - 1024px │                                                                                                       
 │ Desktop │ > 1024px       │                                                                                                       
 └─────────┴────────────────┘                                                                                                       
                                                                                                                                    
 ### 4.3 SEO基础                                                                                                                    
                                                                                                                                    
 - ✅ Semantic HTML                                                                                                                 
 - ✅ Meta标签 (title, description, Open Graph)                                                                                     
 - ✅ itemap.xml                                                                                                                    
 - ✅ robots.txt                                                                                                                    
 - ✅ 静态页面 (利于爬虫)                                                                                                           
                                                                                                                                    
 ────────────────────────────────────────────────────────────────────────────────                                                   
                                                                                                                                    
 五、技术选型                                                                                                                       
                                                                                                                                    
 ### 5.1 本地开发技术                                                                                                               
                                                                                                                                    
 ┌──────────┬────────────────────────────┬────────────────────┐                                                                     
 │ 类别     │ 选择                       │ 理由               │                                                                     
 ├──────────┼────────────────────────────┼────────────────────┤                                                                     
 │ 模板引擎 │ 原生HTML + PHP片段         │ 简单、够用、无依赖 │                                                                     
 │ CSS框架  │ Tailwind CSS               │ 快速开发、压缩小   │                                                                     
 │ JS库     │ 原生JS + Fuse.js(搜索)     │ 轻量、无需构建     │                                                                     
 │ 代码高亮 │ Prism.js                   │ 轻量、主题丰富     │                                                                     
 │ 图标     │ Phosphor Icons / Heroicons │ 简洁、现代         │                                                                     
 └──────────┴────────────────────────────┴────────────────────┘                                                                     
                                                                                                                                    
 ### 5.2 不需要的技术                                                                                                               
                                                                                                                                    
 ┌─────────────────┬────────────────────┐                                                                                           
 │ 技术            │ 原因               │                                                                                           
 ├─────────────────┼────────────────────┤                                                                                           
 │ ❌ React/Vue    │ 静态站不需要SPA    │                                                                                           
 │ ❌ Next.js/Nuxt │ 过度设计           │                                                                                           
 │ ❌ 数据库       │ 内容用Markdown文件 │                                                                                           
 │ ❌ 后端服务     │ 纯静态生成         │                                                                                           
 └─────────────────┴────────────────────┘                                                                                           
                                                                                                                                    
 ────────────────────────────────────────────────────────────────────────────────                                                   
                                                                                                                                    
 六、内容结构                                                                                                                       
                                                                                                                                    
 ### 6.1 知识库内容 (Markdown)                                                                                                      
                                                                                                                                    
 ```                                                                                                                                
   knowledge-base/                                                                                                                  
   ├── docs/                    # 官方文档覆盖                                                                                      
   │   ├── getting-started/                                                                                                         
   │   │   ├── installation.md                                                                                                      
   │   │   └── quickstart.md                                                                                                        
   │   ├── models/                                                                                                                  
   │   │   ├── model-library.md                                                                                                     
   │   │   └── custom-models.md                                                                                                     
   │   ├── api/                                                                                                                     
   │   │   ├── rest-api.md                                                                                                          
   │   │   └── python-api.md                                                                                                        
   │   └── advanced/                                                                                                                
   │       ├── gpu-acceleration.md                                                                                                  
   │       └── quantization.md                                                                                                      
   └── solutions/               # 问题解决方案 (AI自动生成)                                                                         
       ├── installation/                                                                                                            
       ├── models/                                                                                                                  
       ├── performance/                                                                                                             
       ├── api/                                                                                                                     
       ├── bug/                                                                                                                     
       └── usage/                                                                                                                   
 ```                                                                                                                                
                                                                                                                                    
 ### 6.2 Front Matter 规范                                                                                                          
                                                                                                                                    
 ```yaml                                                                                                                            
   ---                                                                                                                              
   title: "Ollama GPU Not Detected"                                                                                                 
   description: "How to fix NVIDIA GPU detection issues"                                                                            
   category: installation                                                                                                           
   tags: [ollama, gpu, nvidia, troubleshooting]                                                                                     
   difficulty: 5                                                                                                                    
   last_updated: 2026-02-24                                                                                                         
   github_issue: 12345                                                                                                              
   ---                                                                                                                              
                                                                                                                                    
   # title                                                                                                                          
 ```                                                                                                                                
                                                                                                                                    
 ────────────────────────────────────────────────────────────────────────────────                                                   
                                                                                                                                    
 七、Docker 部署                                                                                                                    
                                                                                                                                    
 ### 7.1 Dockerfile                                                                                                                 
                                                                                                                                    
 ```dockerfile                                                                                                                      
   FROM nginx:alpine                                                                                                                
                                                                                                                                    
   # 复制静态文件                                                                                                                   
   COPY . /usr/share/nginx/html/                                                                                                    
                                                                                                                                    
   # 复制Nginx配置                                                                                                                  
   COPY nginx.conf /etc/nginx/nginx.conf                                                                                            
                                                                                                                                    
   EXPOSE 80 443                                                                                                                    
                                                                                                                                    
   CMD ["nginx", "-g", "daemon off;"]                                                                                               
 ```                                                                                                                                
                                                                                                                                    
 ### 7.2 docker-compose.yml                                                                                                         
                                                                                                                                    
 ```yaml                                                                                                                            
   version: '3.8'                                                                                                                   
                                                                                                                                    
   services:                                                                                                                        
     ollama-hub:                                                                                                                    
       build: .                                                                                                                     
       ports:                                                                                                                       
         - "80:80"                                                                                                                  
         - "443:443"                                                                                                                
       volumes:                                                                                                                     
         - ./knowledge-base:/usr/share/ngin x/html/knowledge-base:ro                                                                
       restart: unless-stopped                                                                                                      
 ```                                                                                                                                
                                                                                                                                    
 ### 7.3 部署命令                                                                                                                   
                                                                                                                                    
 ```bash                                                                                                                            
   # 本地构建测试                                                                                                                   
   docker compose up -d                                                                                                             
                                                                                                                                    
   # 构建生产镜像                                                                                                                   
   docker build -t ollama-hub .                                                                                                     
   docker push ollama-hub:latest                                                                                                    
                                                                                                                                    
   # 服务器运行                                                                                                                     
   docker run -d -p 80:80 -p 443:443 ollama-hub                                                                                     
 ```                                                                                                                                
                                                                                                                                    
 ────────────────────────────────────────────────────────────────────────────────                                                   
                                                                                                                                    
 八、开发里程碑                                                                                                                     
                                                                                                                                    
 ┌─────────┬───────────────────────┬─────────────────────────────┐                                                                  
 │ 阶段    │ 任务                  │ 交付物                      │                                                                  
 ├─────────┼───────────────────────┼─────────────────────────────┤                                                                  
 │ Phase 1 │ 项目初始化 + 设计系统 │ 目录结构 + CSS变量          │                                                                  
 │ Phase 2 │ 基础组件开发          │ Header/Footer/Sidebar       │                                                                  
 │ Phase 3 │ 页面开发              │ 首页/文档页/搜索页          │                                                                  
 │ Phase 4 │ 搜索功能              │ Fuse.js集成                 │                                                                  
 │ Phase 5 │ 内容填充              │ 50+ 基础文档                │                                                                  
 │ Phase 6 │ Docker配置            │ Dockerfile + docker-compose │                                                                  
 │ Phase 7 │ 测试部署              │ 本地Docker运行验证          │                                                                  
 └─────────┴───────────────────────┴─────────────────────────────┘                                                                  
                                                                                                                                    
 ────────────────────────────────────────────────────────────────────────────────                                                   
                                                                                                                                    
 九、本地开发检查清单                                                                                                               
                                                                                                                                    
 ### 开发前确认                                                                                                                     
                                                                                                                                    
 - Node.js / npm 安装 (用于Tailwind CSS)                                                                                            
 - 代码编辑器 (VS Code推荐)                                                                                                         
 - Git安装                                                                                                                          
 - Docker Desktop安装                                                                                                               
                                                                                                                                    
 ### 开发中检查                                                                                                                     
                                                                                                                                    
 - 页面在桌面端显示正常                                                                                                             
 - 页面在移动端显示正常                                                                                                             
 - 搜索功能可用                                                                                                                     
 - 代码高亮正常                                                                                                                     
 - Docker构建成功                                                                                                                   
                                                                                                                                    
 ### 部署前检查                                                                                                                     
                                                                                                                                    
 - 所有静态资源加载正常                                                                                                             
 - SEO标签完整                                                                                                                      
 - sitemap.xml生成                                                                                                                  
 - Docker镜像大小 < 100MB                                                                                                           
                                                                                                                                    
 ────────────────────────────────────────────────────────────────────────────────                                                   
                                                                                                                                    
 十、后续运营 (部署后交给我)                                                                                                        
                                                                                                                                    
 当网站模板完成后，部署上去，我会接手：                                                                                             
                                                                                                                                    
 ┌────────────┬──────────────────────────────────┐                                                                                  
 │ 任务       │ 说明                             │                                                                                  
 ├────────────┼──────────────────────────────────┤                                                                                  
 │ 内容同步   │ 从GitHub Issues自动更新solutions │                                                                                  
 │ AI回复     │ 自动回复GitHub Issues            │                                                                                  
 │ 知识库增长 │ 新问题 → 自动创建解决方案页      │                                                                                  
 │ SEO优化    │ 持续添加长尾关键词内容           │                                                                                  
 └────────────┴──────────────────────────────────┘                                                                                  
                                                    