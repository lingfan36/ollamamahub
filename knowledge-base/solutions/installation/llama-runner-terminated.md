# Error: llama runner process has terminated

## 症状

- 运行 `ollama run <model>` 后立即退出。
- API 返回 500，并提示 runner terminated。

## 常见原因

1. 内存/显存不足导致进程崩溃。
2. 模型文件损坏或下载不完整。
3. GPU 驱动/runtime 不匹配。
4. 版本升级后缓存状态异常。

## 排查步骤

### 1) 查看服务日志

```bash
# Linux
journalctl -u ollama -f

# Docker
docker logs -f ollama
```

### 2) 验证模型完整性

```bash
ollama list
ollama rm <model>
ollama pull <model>
```

### 3) 降低资源压力

- 先换小模型验证（如 `phi3`）。
- 减小上下文：`num_ctx`。
- 降低并发：`OLLAMA_NUM_PARALLEL=1`。

### 4) 切换运行后端验证

- 先用 CPU 跑通，再切回 GPU。
- Docker 场景确认 GPU runtime 是否正常。

## 解决方案模板

```bash
export OLLAMA_NUM_PARALLEL=1
export OLLAMA_MAX_LOADED_MODELS=1
export OLLAMA_KEEP_ALIVE=5m
```

重启服务后复测。

## 预防建议

- 固定 Ollama 与驱动版本组合。
- 关键模型发布前先做压测。
- 建立异常日志采集与告警。