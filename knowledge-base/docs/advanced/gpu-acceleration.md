# GPU Acceleration

## 1. 平台支持概览（2026）

- NVIDIA：支持最好，推荐 CUDA + NVIDIA Container Toolkit（Docker 场景）。
- AMD：通过 ROCm 镜像支持（`ollama/ollama:rocm`）。
- Apple Silicon：原生 macOS App 才能使用 Metal；Docker 通常为 CPU-only。

## 2. NVIDIA（裸机 / Docker）

### 裸机
安装驱动后直接运行 Ollama，使用 `ollama ps` 观察 GPU 占用。

### Docker
```bash
docker run -d --gpus=all \
  -v ollama:/root/.ollama \
  -p 11434:11434 \
  --name ollama \
  ollama/ollama:latest
```

## 3. AMD ROCm

```bash
docker run -d \
  --device /dev/kfd --device /dev/dri \
  -v ollama:/root/.ollama \
  -p 11434:11434 \
  --name ollama-rocm \
  ollama/ollama:rocm
```

## 4. 性能参数建议

- `OLLAMA_FLASH_ATTENTION=1`
- `OLLAMA_KV_CACHE_TYPE=q8_0` 或 `q4_0`（按显存平衡）
- `OLLAMA_NUM_PARALLEL` 按压测结果设定

## 5. 验证方法

```bash
curl http://localhost:11434/api/ps
```

同时结合 `nvidia-smi` / `rocm-smi` / 活动监视器查看硬件利用率。

## 6. 常见问题

- GPU 未识别：驱动、容器 runtime 或权限问题。
- 速度不升反降：模型尺寸超过显存导致频繁换页。
- Mac Docker 无 GPU：属于平台限制，改用原生 App。