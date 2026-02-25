# Docker Deployment Best Practices

## 1. 基础部署

```bash
docker run -d \
  -v ollama:/root/.ollama \
  -p 11434:11434 \
  --name ollama \
  ollama/ollama:latest
```

## 2. GPU 部署

### NVIDIA
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

## 3. Compose 模板

```yaml
services:
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    environment:
      - OLLAMA_HOST=0.0.0.0:11434
      - OLLAMA_FLASH_ATTENTION=1
      - OLLAMA_KEEP_ALIVE=24h
      - OLLAMA_NUM_PARALLEL=4

volumes:
  ollama_data:
```

## 4. 生产建议

- 必须挂载持久卷，否则模型会丢失。
- 配置健康检查与自动重启策略。
- 前置网关设置请求超时与限流。
- 监控 CPU/GPU、内存、磁盘和请求延迟。

## 5. 安全建议

- 默认仅内网暴露 11434。
- 公网暴露时放在 API 网关后并加鉴权。
- 限制 `OLLAMA_ORIGINS`，避免任意站点跨域。

## 6. 常见坑

- 宿主机已有 Ollama 占用 11434 端口。
- NVIDIA 容器工具链未安装导致 `--gpus=all` 失败。
- Windows/WSL2 下载慢，需要排查虚拟网卡设置。