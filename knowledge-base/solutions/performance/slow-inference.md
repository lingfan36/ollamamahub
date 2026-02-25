# 推理速度慢排查

## 症状

- token/s 明显偏低。
- 机器有 GPU，但推理接近 CPU 水平。

## 快速判断

```bash
ollama ps
```

若处理器显示不是 `100% GPU`，通常是显存不足或后端未正确启用。

## 排查顺序

### 1) 确认后端与驱动

- NVIDIA：`nvidia-smi` 正常。
- AMD：ROCm 设备可见。
- Apple Silicon：优先原生安装（非 Docker）。

### 2) 降低模型内存压力

- 选择更小参数量或更高量化模型。
- 下调上下文窗口（`num_ctx`）。
- 降低并发：`OLLAMA_NUM_PARALLEL=1`。

### 3) 启用长上下文优化

```bash
# Linux/macOS
export OLLAMA_FLASH_ATTENTION=1
export OLLAMA_KV_CACHE_TYPE=q8_0
```

Windows 可通过系统环境变量配置同名键。

### 4) 避免资源争抢

- 同机运行多个大模型时限制：`OLLAMA_MAX_LOADED_MODELS=1`。
- 避免与其他 GPU 密集任务并行。

## 验证指标

- 对比优化前后 token/s。
- 观察 GPU 利用率与显存占用是否稳定。
