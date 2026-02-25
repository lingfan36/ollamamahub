# Linux 安装脚本失败

## 症状

执行：

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

出现下载失败、权限错误或服务启动失败。

## 常见原因

1. 网络受限（代理、DNS、防火墙）。
2. 缺少 `curl`/`ca-certificates`。
3. 非 systemd 环境导致服务命令不可用。
4. 权限不足。

## 解决步骤

### 1) 补齐基础依赖

```bash
sudo apt-get update
sudo apt-get install -y curl ca-certificates
```

### 2) 检查网络

```bash
curl -I https://ollama.com
```

如超时，配置企业代理后重试。

### 3) 手动检查服务

```bash
sudo systemctl status ollama
sudo journalctl -u ollama -n 200 --no-pager
```

### 4) 非 systemd 环境

在容器或精简发行版中，改用 Docker 方式运行 Ollama。

## Docker 兜底

```bash
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama:latest
```

## 验证

```bash
curl http://localhost:11434/api/tags
```

成功返回 JSON 则说明服务可用。