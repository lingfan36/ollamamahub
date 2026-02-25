# NVIDIA/AMD GPU Not Detected

## 症状

- `ollama ps` 显示 CPU 运行。
- 推理速度明显慢，GPU 使用率为 0。

## 快速判断

1. 裸机：先确认系统能识别显卡（`nvidia-smi`/`rocm-smi`）。
2. Docker：确认容器拿到 GPU 设备。

## NVIDIA 排查

```bash
nvidia-smi
```

Docker 测试：

```bash
docker run --rm --gpus=all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi
```

若失败，安装/修复 NVIDIA Container Toolkit。

## AMD ROCm 排查

- 使用 `ollama/ollama:rocm` 镜像。
- 容器传递设备：`--device /dev/kfd --device /dev/dri`。
- 必要时补充 `HSA_OVERRIDE_GFX_VERSION`（特定型号）。

## Docker 启动示例

```bash
# NVIDIA
docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama:latest

# AMD
docker run -d --device /dev/kfd --device /dev/dri -v ollama:/root/.ollama -p 11434:11434 --name ollama-rocm ollama/ollama:rocm
```

## Apple Silicon 说明

- Docker 通常 CPU-only。
- 要用 GPU（Metal）请使用原生 Ollama macOS App。

## 预防建议

- 升级前记录驱动、CUDA/ROCm、Ollama 版本。
- 在 CI/CD 增加 GPU 可用性探测。