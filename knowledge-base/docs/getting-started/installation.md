# Installation Guide

> 适用于 Ollama 0.5.x+（2026 年信息）。

## 1. macOS

### 方式 A：安装官方 App（推荐）
1. 打开 `https://ollama.com/download` 下载 macOS 安装包。
2. 安装并启动 Ollama。
3. 终端验证：

```bash
ollama --version
ollama run llama3.2
```

### 方式 B：命令行安装（仅 CLI 场景）
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

## 2. Windows

1. 从 `https://ollama.com/download` 下载 Windows 安装程序。
2. 安装后在 PowerShell 验证：

```powershell
ollama --version
ollama run llama3.2
```

> 如果首次运行慢，通常是模型下载时间。

## 3. Linux

### 快速安装
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### 启动与自启动（systemd）
```bash
sudo systemctl enable ollama
sudo systemctl start ollama
sudo systemctl status ollama
```

## 4. Docker 安装

### CPU 版
```bash
docker run -d \
  -v ollama:/root/.ollama \
  -p 11434:11434 \
  --name ollama \
  ollama/ollama:latest
```

### NVIDIA GPU
```bash
docker run -d --gpus=all \
  -v ollama:/root/.ollama \
  -p 11434:11434 \
  --name ollama-gpu \
  ollama/ollama:latest
```

### AMD ROCm
```bash
docker run -d \
  --device /dev/kfd --device /dev/dri \
  -v ollama:/root/.ollama \
  -p 11434:11434 \
  --name ollama-rocm \
  ollama/ollama:rocm
```

## 5. 安装后健康检查

```bash
curl http://localhost:11434/api/tags
curl http://localhost:11434/api/ps
```

## 6. 常见问题

- 端口冲突：确保 `11434` 未被其它进程占用。
- Docker 模型丢失：必须挂载持久化卷 `-v ollama:/root/.ollama`。
- 下载缓慢：优先检查网络与代理设置。