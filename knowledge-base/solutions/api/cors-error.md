# API 跨域 CORS 错误

## 症状

浏览器报错：

- `blocked by CORS policy`
- 预检请求（OPTIONS）失败

## 根因

Ollama 默认跨域来源受限，需要显式设置 `OLLAMA_ORIGINS`。

## 解决步骤

### 1) 开发环境快速放开

```bash
# Linux/macOS
export OLLAMA_ORIGINS=*
```

Windows（PowerShell 临时）：

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

### 2) 生产环境按域名精确放行

```bash
export OLLAMA_ORIGINS="https://your-site.com,http://localhost:3000"
```

### 3) 重启 Ollama

环境变量更新后必须重启 Ollama 进程。

### 4) 验证

```bash
curl -i -X OPTIONS http://localhost:11434/api/generate \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST"
```

应看到 CORS 相关响应头。

## 注意

- 反向代理场景需同时检查 Nginx/Caddy 的跨域配置。
- 前端 URL 与 `OLLAMA_ORIGINS` 中端口必须一致。
