# Multi-GPU Configuration

## 1. 适用目标

- 单模型超大，需要跨多卡装载。
- 并发高，需要多卡分担吞吐。

## 2. 关键理解

1. 多 GPU 并不总是线性加速。
2. 跨卡通信会引入额外开销。
3. 先确认瓶颈是算力、显存还是 I/O。

## 3. 实践策略

- 先做单卡基线压测（吞吐、P95 延迟）。
- 再开启多卡并记录收益。
- 调整：`OLLAMA_NUM_PARALLEL`、`OLLAMA_MAX_LOADED_MODELS`。

## 4. Docker 部署建议

```yaml
services:
  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
    environment:
      - OLLAMA_NUM_PARALLEL=4
      - OLLAMA_MAX_LOADED_MODELS=3
      - OLLAMA_FLASH_ATTENTION=1
```

## 5. 监控指标

- 每卡显存占用
- 每卡利用率
- 请求排队长度
- 首 token 延迟与总响应时间

## 6. 调优步骤

1. 固定模型与提示词。
2. 从并发 1,2,4,8 逐步压测。
3. 对比不同 `num_ctx` 与 KV cache 量化设置。
4. 选择综合成本最优配置。