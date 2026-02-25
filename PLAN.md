# OllamaHub 开发计划

## 项目现状分析

### 已完成
- `prototypes/` — 6 个完整的原型页面（index, docs, solutions, search, resources, about）
- `components/` — 框架级组件占位（header, footer, sidebar, search-box, doc-card）
- `css/styles.css` — CSS 变量 + 基础样式
- `js/main.js` — 移动菜单、搜索跳转、TOC 滚动间谍占位
- `js/search.js` — 搜索逻辑
- `pages/docs/{api,advanced,installation,quickstart,configuration,models}/` — 目录结构存在，内容已完成
- `pages/solutions/{docker,installation,performance}/` — 目录存在，内容已完成
- `pages/search.html`, `pages/resources.html`, `pages/about.html` — 内容已完成
- `sitemap.xml`, `robots.txt` — SEO配置已就位
- `_data/` — JSON数据配置已就位
- `knowledge-base/docs/` — 13 篇 Markdown 文档已完成
- `knowledge-base/solutions/` — 10 篇 Markdown 解决方案已完成
- `Dockerfile`、`docker-compose.yml`、`nginx.conf` — 部署配置已就位

### 待完成（本计划范围）
原型图已定稿，现需将其转换为完整的、可运行的静态网站。

---

## 技术栈确认

| 类别 | 选择 | 说明 |
|------|------|------|
| 模板 | 原生 HTML（PHP 级别的 include 用 JS fetch 模拟） | 复用 Header/Footer 组件 |
| CSS | Tailwind CSS CDN | 与原型图保持一致 |
| 搜索 | Fuse.js（客户端全文搜索） | 读取 `_data/search-index.json` |
| 代码高亮 | Prism.js | 已在原型中使用 |
| 图标 | Phosphor Icons CDN | 已在原型中使用 |
| 字体 | Inter + JetBrains Mono（Google Fonts） | 已在原型中使用 |

---

## 开发任务清单

### Phase 1 — 设计系统 & 共享组件

**目标：** 提取原型中重复的 Header/Footer，封装为可复用 HTML 片段，统一所有页面风格。

| # | 任务 | 文件 | 说明 |
|---|------|------|------|
| 1.1 | 重写 Header 组件 | `components/header.html` | 对齐原型图样式（Tailwind + Phosphor Icons），包含 Logo、导航、搜索框、GitHub 链接、移动端汉堡菜单 |
| 1.2 | 重写 Footer 组件 | `components/footer.html` | 版权 + 友情链接，对齐原型图 |
| 1.3 | 重写 Sidebar 组件 | `components/sidebar.html` | 文档左侧导航（分类+链接），Solutions 左侧筛选器 |
| 1.4 | 重写 Doc Card 组件 | `components/doc-card.html` | 标题 + 描述 + 标签（原型图中的卡片样式） |
| 1.5 | 补充 Issue Card 组件 | `components/issue-card.html` | 投票数 + 分类标签 + 热度 + 更新时间 |
| 1.6 | 完善 CSS 变量 | `css/styles.css` | 补充 prose 样式、code block 样式、highlight 样式 |
| 1.7 | 添加 JS 组件加载器 | `js/components.js` | `fetch()` 注入 header/footer，使各页面 DRY |

---

### Phase 2 — 核心页面开发

**目标：** 将 6 个原型 HTML 转为正式 `pages/` 目录下的完整页面，补全所有链接，替换占位内容。

#### 2.1 首页 `pages/index.html`

对应原型：`prototypes/index.html`

| 模块 | 内容 |
|------|------|
| Hero Section | 标题 + 副标题 + 两个 CTA 按钮 + 搜索框（桌面/移动双版本） |
| Trending Docs | 3 张 DocCard，链接到真实文档页 |
| Latest Solutions | 3 张 IssueCard，链接到真实解决方案页 |
| CTA Banner | "Can't find what you're looking for?" + GitHub Issue 按钮 |
| SEO | `<title>`, `<meta description>`, Open Graph 标签 |

#### 2.2 文档列表页 `pages/docs/index.html`

对应原型：`prototypes/docs/index.html`（左侧导航 + 主内容区）

| 模块 | 内容 |
|------|------|
| 左侧 Sidebar | Getting Started / Models / API Reference / Advanced 4个分组，链接到各文档 |
| 主内容区 | 面包屑 + 文档文章（Installation 示例内容） + 代码块（Prism.js） |
| 右侧 TOC | "On this page" 锚点导航 |
| 翻页 | Previous / Next 导航 |

#### 2.3 文档详情页（子页面）

为以下路径各创建一个 `index.html`：

| 路径 | 主题 |
|------|------|
| `pages/docs/installation/index.html` | Installation Guide（macOS / Windows / Linux / Docker） |
| `pages/docs/models/index.html` | Model Library & Custom Models（Modelfile, GGUF import） |
| `pages/docs/api/index.html` | REST API Reference + Python/JS Library |

#### 2.4 解决方案列表页 `pages/solutions/index.html`

对应原型：`prototypes/solutions/index.html`

| 模块 | 内容 |
|------|------|
| 页头 Hero | 标题 + 搜索框 |
| 左侧筛选 | 分类（All/Installation/Models/Performance/API/Bug）+ 热门标签 + Contribute 提示卡 |
| 解决方案列表 | IssueCard 列表（投票 + 分类标签 + 标题 + 摘要 + 标签 + 时间） |
| 排序 | Most Helpful / Recently Updated / Highest Voted |
| 分页 | 页码导航 |

#### 2.5 解决方案详情页（子页面）

| 路径 | 主题 |
|------|------|
| `pages/solutions/installation/index.html` | Installation 类问题合集 |
| `pages/solutions/docker/index.html` | Docker 网络问题解决方案 |
| `pages/solutions/performance/index.html` | 性能优化方案 |

各详情页结构：问题描述 + 原因分析 + 步骤式解决方案 + 代码块 + 相关链接

#### 2.6 搜索页 `pages/search.html`

对应原型：`prototypes/search.html`

| 模块 | 内容 |
|------|------|
| 搜索框 | 支持 URL 参数 `?q=` 预填 |
| Tab 筛选 | All / Documentation / Solutions（带数量） |
| 搜索结果 | 含类型标签（Solution/Doc）、路径、摘要、关键词高亮 |
| 空状态 | 无结果时展示提示 + GitHub 链接 |
| Fuse.js 集成 | 从 `_data/search-index.json` 加载数据实时搜索 |

#### 2.7 Resources 页 `pages/resources.html`

对应原型：`prototypes/resources.html`

| 模块 | 内容 |
|------|------|
| 左侧分类导航 | UI Clients / Developer Tools / Integrations / Agents & Frameworks + OS 筛选 |
| 资源卡片网格 | 3列卡片（图标 + 名称 + 描述 + 标签 + Stars + Visit 链接） |
| 排序 & 视图切换 | Grid / List 视图 |

#### 2.8 关于页 `pages/about.html`

对应原型：`prototypes/about.html`

| 模块 | 内容 |
|------|------|
| Hero | 标题 + 副标题 |
| Our Vision | 项目定位段落 |
| Core Services | 4 张服务卡片（文档/解决方案/社区/模型资讯） |
| Contact Us | Email / GitHub / Twitter 3个联系方式 |

---

### Phase 3 — 数据层

**目标：** 创建 JSON 数据文件，为搜索和动态渲染提供数据源。

| # | 文件 | 内容 |
|---|------|------|
| 3.1 | `_data/nav.json` | 文档侧边栏导航结构（分组 + 链接） |
| 3.2 | `_data/solutions.json` | Solutions 列表数据（标题、分类、标签、投票、时间、链接） |
| 3.3 | `_data/resources.json` | Resources 工具列表（名称、描述、分类、OS、Stars、URL） |
| 3.4 | `_data/search-index.json` | 搜索索引（合并 docs + solutions 的标题、摘要、标签、URL） |
| 3.5 | `_data/tags.json` | 标签列表（名称 + 颜色 + 数量） |

---

### Phase 4 — 知识库内容

**目标：** 为主要文档和解决方案创建 Markdown 内容文件（作为内容来源，同时供后续 AI 工作流使用）。

#### 文档内容（`knowledge-base/docs/`）

| 文件 | 主题 |
|------|------|
| `getting-started/installation.md` | 安装指南（macOS/Windows/Linux/Docker） |
| `getting-started/quickstart.md` | 快速开始（pull + run + API 调用） |
| `getting-started/configuration.md` | 配置环境变量（OLLAMA_HOST, OLLAMA_MODELS 等） |
| `models/model-library.md` | 常用模型列表（Llama 3, Mistral, Phi-3 等） |
| `models/custom-models.md` | Modelfile 语法和自定义模型 |
| `models/import-gguf.md` | 从 HuggingFace 导入 GGUF 模型 |
| `api/rest-api.md` | REST API 完整参考（/api/generate, /api/chat, /api/embeddings） |
| `api/python-library.md` | ollama-python 使用指南 |
| `api/javascript-library.md` | ollama-js 使用指南 |
| `advanced/gpu-acceleration.md` | NVIDIA/AMD/Apple Silicon GPU 加速 |
| `advanced/multi-gpu.md` | 多 GPU 配置 |
| `advanced/docker-deployment.md` | Docker 部署最佳实践 |
| `advanced/quantization.md` | 模型量化说明（Q4_0, Q8_0 等） |

#### 解决方案内容（`knowledge-base/solutions/`）

| 文件 | 问题 |
|------|------|
| `installation/llama-runner-terminated.md` | Error: llama runner process has terminated |
| `installation/gpu-not-detected.md` | NVIDIA/AMD GPU Not Detected |
| `installation/install-script-fails-linux.md` | Linux 安装脚本失败 |
| `docker/cannot-connect-from-container.md` | 无法从 Docker 容器连接 Ollama |
| `docker/gpu-in-docker.md` | Docker 中 GPU 未被识别 |
| `performance/high-cpu-idle-windows.md` | Windows 空闲时 CPU 占用高 |
| `performance/slow-inference.md` | 推理速度慢排查 |
| `api/cors-error.md` | API 跨域 CORS 错误 |
| `models/gguf-import-failed.md` | GGUF 模型导入失败 |
| `models/model-download-slow.md` | 模型下载慢或失败 |

---

### Phase 5 — 搜索功能集成

**目标：** 实现基于 Fuse.js 的客户端全文搜索，支持关键词高亮。

| # | 任务 |
|---|------|
| 5.1 | 在 `js/main.js` 中集成 Fuse.js（CDN 引入） |
| 5.2 | 实现搜索索引加载（fetch `_data/search-index.json`） |
| 5.3 | 实现 Header 搜索框实时建议下拉（debounce 300ms） |
| 5.4 | 实现搜索页结果渲染 + 关键词高亮 |
| 5.5 | 实现 URL 参数 `?q=` 预填搜索词并自动触发搜索 |
| 5.6 | 实现结果 Tab 筛选（All / Documentation / Solutions） |
| 5.7 | 实现空结果状态 UI |

---

### Phase 6 — SEO 优化

**目标：** 为每个页面添加完整的 SEO 元数据。

| # | 任务 |
|---|------|
| 6.1 | 每页添加 `<meta name="description">` |
| 6.2 | 每页添加 Open Graph 标签（og:title, og:description, og:url, og:image） |
| 6.3 | 每页添加 Twitter Card 标签 |
| 6.4 | 所有 HTML 使用语义化标签（`<article>`, `<nav>`, `<aside>`, `<main>`） |
| 6.5 | 生成 `sitemap.xml` |
| 6.6 | 生成 `robots.txt` |
| 6.7 | 添加 `<link rel="canonical">` |

---

### Phase 7 — JavaScript 交互完善

**目标：** 补全 main.js 中的所有交互功能。

| # | 任务 |
|---|------|
| 7.1 | 移动端汉堡菜单（展开/收起导航） |
| 7.2 | 文档页 TOC 滚动高亮（Intersection Observer） |
| 7.3 | 代码块复制按钮（Copy to Clipboard） |
| 7.4 | Solutions 页分类筛选（点击分类过滤列表） |
| 7.5 | Solutions 页标签筛选（点击标签过滤） |
| 7.6 | Solutions 页排序切换 |
| 7.7 | Resources 页 Grid/List 视图切换 |
| 7.8 | Resources 页 OS 复选框筛选 |
| 7.9 | 键盘快捷键 `⌘K` / `Ctrl+K` 聚焦搜索框 |

---

### Phase 8 — Docker 部署验证

**目标：** 确保 Docker 构建成功，Nginx 服务正常。

| # | 任务 |
|---|------|
| 8.1 | 检查 `Dockerfile` 确保复制路径正确 |
| 8.2 | 检查 `nginx.conf` 确保 SPA-like URL 处理（404 → index.html fallback）|
| 8.3 | 本地 `docker compose up` 验证 |
| 8.4 | 验证镜像大小 < 100MB |

---

## 文件结构目标（完成后）

```
ollmamahub/
├── pages/
│   ├── index.html                    # 首页
│   ├── search.html                   # 搜索页
│   ├── resources.html                # Resources 页
│   ├── about.html                    # 关于页
│   ├── docs/
│   │   ├── index.html                # 文档列表（Installation 默认）
│   │   ├── installation/index.html   # 安装指南
│   │   ├── models/index.html         # 模型指南
│   │   └── api/index.html            # API 参考
│   └── solutions/
│       ├── index.html                # 解决方案列表
│       ├── installation/index.html   # 安装类问题
│       ├── docker/index.html         # Docker 类问题
│       └── performance/index.html    # 性能类问题
├── components/
│   ├── header.html                   # 复用 Header（Tailwind 样式）
│   ├── footer.html                   # 复用 Footer
│   ├── sidebar.html                  # 文档左侧导航
│   ├── search-box.html               # 搜索建议下拉
│   ├── doc-card.html                 # 文档卡片
│   └── issue-card.html               # 解决方案卡片
├── css/
│   └── styles.css                    # 全局样式 + CSS 变量
├── js/
│   ├── main.js                       # 页面交互（菜单/TOC/复制等）
│   ├── search.js                     # Fuse.js 搜索实现
│   └── components.js                 # Header/Footer 注入器
├── _data/
│   ├── nav.json                      # 文档导航结构
│   ├── solutions.json                # Solutions 数据
│   ├── resources.json                # Resources 数据
│   ├── search-index.json             # 全文搜索索引
│   └── tags.json                     # 标签数据
├── knowledge-base/
│   ├── docs/                         # 13 个 Markdown 文档
│   └── solutions/                    # 10 个 Markdown 解决方案
├── sitemap.xml
├── robots.txt
├── Dockerfile
├── docker-compose.yml
└── nginx.conf
```

---

## 开发优先级

| 优先级 | Phase | 原因 |
|--------|-------|------|
| P0（先做） | Phase 1 + Phase 2（首页、文档页、解决方案页） | 核心页面，决定网站基础可用性 |
| P0 | Phase 3（数据层） + Phase 5（搜索） | 搜索是核心功能，数据是基础 |
| P1 | Phase 2（搜索页、Resources 页、About 页） | 完整性 |
| P1 | Phase 4（知识库 Markdown） | 内容填充 |
| P1 | Phase 7（JS 交互） | 用户体验 |
| P2 | Phase 6（SEO） + Phase 8（Docker 验证） | 上线前完成 |

---

## 注意事项

1. **组件复用策略**：所有页面通过 `js/components.js` 用 `fetch()` + `innerHTML` 注入 Header/Footer，避免重复代码。本地开发需通过 HTTP 服务器运行（不能直接打开 `file://`），可用 `python -m http.server` 或 VS Code Live Server。

2. **路径规范**：
   - `pages/` 下的页面引用 CSS/JS 用相对路径：`../css/styles.css`
   - `pages/docs/` 或 `pages/solutions/` 子目录页面：`../../css/styles.css`
   - 组件 fetch 路径在 `components.js` 中统一管理

3. **数据驱动**：Solutions 列表页和 Resources 页的卡片内容从 JSON 文件读取，方便后续 AI 工作流自动更新。

4. **原型图为准**：所有页面的视觉设计以 `prototypes/` 目录为准，不自行发挥。

5. **不依赖构建工具**：保持零构建工具，Tailwind 通过 CDN，无 npm build 步骤，方便 Docker 部署。
