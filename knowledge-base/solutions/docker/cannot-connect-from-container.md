# 无法从 Docker 容器连接 Ollama

## 症状

- 容器内请求 `http://localhost:11434` 失败（连接被拒绝）。
- 应用报错：`ECONNREFUSED` / `connection reset`。

## 根因

1. 容器内 `localhost` 指向容器自身，不是宿主机。
2. 宿主机 Ollama 默认只监听 `127.0.0.1`。
3. Linux 下未配置 `host.docker.internal` 映射。

## 解决步骤

### 1) 让宿主机 Ollama 对外监听

将 Ollama 监听地址设为 `0.0.0.0` 后重启服务。

- Linux（systemd 覆盖配置）：

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
Environment="OLLAMA_ORIGINS=*"
```

### 2) 容器内使用宿主机地址

```bash
docker run --rm \
  --add-host=host.docker.internal:host-gateway \
  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 \
  your-app:latest
```

> Linux 需要 `--add-host=host.docker.internal:host-gateway`；macOS/Windows 通常可直接使用 `host.docker.internal`。

### 3) Docker Compose 示例

```yaml
services:
  app:
    image: your-app:latest
    environment:
      - OLLAMA_BASE_URL=http://host.docker.internal:11434
    extra_hosts:
      - "host.docker.internal:host-gateway"
```

### 4) 连通性验证

```bash
docker exec -it <container> curl http://host.docker.internal:11434/api/tags
```

返回 JSON 即连通成功。

## 常见误区

- 在容器里访问 `http://localhost:11434`（错误）。
- 把 `OLLAMA_BASE_URL` 写成 `https://`（默认 Ollama 不是 TLS）。
- 忽略宿主机防火墙规则（需放行 Docker 网桥到 11434）。
