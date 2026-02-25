# Configuration

> 以下变量基于 2026 年常见 Ollama 版本行为整理。

## 1. 核心环境变量

| 变量 | 作用 | 常见值 |
|---|---|---|
| `OLLAMA_HOST` | 监听地址与端口 | `127.0.0.1:11434` / `0.0.0.0:11434` |
| `OLLAMA_MODELS` | 模型存储目录 | 自定义路径 |
| `OLLAMA_ORIGINS` | CORS 允许来源 | `*` 或指定域名 |
| `OLLAMA_KEEP_ALIVE` | 模型保活时间 | `5m` / `24h` / `-1` / `0` |
| `OLLAMA_NUM_PARALLEL` | 并发请求数 | `1`~`4+` |
| `OLLAMA_MAX_LOADED_MODELS` | 同时驻留模型数 | `1`~`N` |

## 2. 2026 常见高级变量

| 变量 | 说明 |
|---|---|
| `OLLAMA_FLASH_ATTENTION=1` | 启用 Flash Attention（通常更快更省显存） |
| `OLLAMA_NO_CLOUD=1` | 禁用云相关能力（隐私场景） |
| `OLLAMA_LOAD_TIMEOUT=10m` | 模型加载超时时间 |
| `OLLAMA_GPU_OVERHEAD=<bytes>` | 预留 GPU 显存，降低 OOM 风险 |

## 3. Linux（systemd）持久化配置

```bash
sudo systemctl edit ollama.service
```

写入：

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
Environment="OLLAMA_NUM_PARALLEL=4"
Environment="OLLAMA_MAX_LOADED_MODELS=2"
Environment="OLLAMA_KEEP_ALIVE=24h"
Environment="OLLAMA_FLASH_ATTENTION=1"
```

应用：

```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

## 4. macOS 配置

```bash
launchctl setenv OLLAMA_HOST 0.0.0.0:11434
launchctl setenv OLLAMA_NUM_PARALLEL 4
launchctl setenv OLLAMA_KEEP_ALIVE 24h
```

## 5. Windows 配置（PowerShell）

```powershell
[System.Environment]::SetEnvironmentVariable('OLLAMA_HOST','0.0.0.0:11434','User')
[System.Environment]::SetEnvironmentVariable('OLLAMA_NUM_PARALLEL','4','User')
[System.Environment]::SetEnvironmentVariable('OLLAMA_KEEP_ALIVE','24h','User')
```

## 6. Docker Compose 示例

```yaml
services:
  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    environment:
      - OLLAMA_HOST=0.0.0.0:11434
      - OLLAMA_NUM_PARALLEL=4
      - OLLAMA_MAX_LOADED_MODELS=2
      - OLLAMA_KEEP_ALIVE=24h
      - OLLAMA_FLASH_ATTENTION=1

volumes:
  ollama_data:
```

## 7. 配置验证

```bash
curl http://localhost:11434/api/ps
```

检查模型是否按预期常驻、并发是否稳定。