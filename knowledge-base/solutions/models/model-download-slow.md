# 模型下载慢或失败

## 症状

- `ollama pull <model>` 长时间无进度。
- 中断后重试速度很慢，或反复失败。

## 常见原因

1. 网络质量不稳定（高丢包/高延迟）。
2. 企业代理配置不完整。
3. DNS 解析慢导致 registry 访问抖动。
4. 本地磁盘 IO 或空间不足。

## 解决步骤

### 1) 先做基础连通性测试

```bash
curl -I https://registry.ollama.ai
```

### 2) 在受限网络中配置代理

```bash
# Linux/macOS
export HTTPS_PROXY=http://proxy.example.com:8080
export NO_PROXY=localhost,127.0.0.1
```

> 实践中建议优先配置 `HTTPS_PROXY`，并确保本地回环地址在 `NO_PROXY`。

### 3) 保持服务稳定以便断点续传

下载大模型期间避免重启 Ollama 服务与机器。

### 4) 调整下载策略

- 优先拉取小模型验证链路。
- 大模型在网络空闲时段下载。
- 必要时在同网络内搭建缓存/镜像代理。

## 校验与重试

```bash
ollama list
ollama rm <model>
ollama pull <model>
```

## 预防建议

- 固定可靠 DNS。
- 在 CI/生产环境提前预拉取常用模型。
