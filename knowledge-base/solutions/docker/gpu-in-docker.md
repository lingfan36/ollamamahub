# Docker 中 GPU 未被识别

## 症状

- `ollama ps` 显示 CPU 推理。
- 容器内 `nvidia-smi` 或 ROCm 设备不可见。

## NVIDIA 排查

### 1) 宿主机先通过

```bash
nvidia-smi
```

### 2) 验证容器 GPU 透传

```bash
docker run --rm --gpus=all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi
```

若失败，安装或修复 NVIDIA Container Toolkit 后重试。

### 3) 启动 Ollama（NVIDIA）

```bash
docker run -d --name ollama \
  --gpus=all \
  -p 11434:11434 \
  -v ollama:/root/.ollama \
  ollama/ollama:latest
```

## AMD ROCm 排查

### 1) 使用 ROCm 镜像

```bash
docker run -d --name ollama-rocm \
  --device /dev/kfd --device /dev/dri \
  -p 11434:11434 \
  -v ollama:/root/.ollama \
  ollama/ollama:rocm
```

### 2) 必要时设置兼容参数

- 特定显卡需设置 `HSA_OVERRIDE_GFX_VERSION`。
- 确认宿主机 ROCm 版本与驱动兼容。

## Apple Silicon 说明

- Docker 运行 Ollama通常为 CPU 路径。
- 如需 Metal GPU，请使用原生 macOS 安装方式。

## 验证

```bash
ollama ps
```

观察 `PROCESSOR` 字段是否为 GPU。
