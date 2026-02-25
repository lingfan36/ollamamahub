# Import GGUF Models

## 1. 适用场景

当你需要导入 Hugging Face 或本地下载的 GGUF 模型时使用。

## 2. 基本流程

1. 准备 `.gguf` 文件（确认来源可信）。
2. 编写 `Modelfile` 指向本地 GGUF。
3. 执行 `ollama create` 构建本地模型。

## 3. 示例

目录结构：

```text
my-model/
  ├─ model.gguf
  └─ Modelfile
```

`Modelfile`：

```Dockerfile
FROM ./model.gguf

SYSTEM "You are a helpful assistant."
PARAMETER temperature 0.3
```

创建：

```bash
cd my-model
ollama create my-gguf-model -f Modelfile
ollama run my-gguf-model
```

## 4. 校验清单

- 文件是否完整下载（哈希校验）
- 量化类型是否匹配硬件（如 Q4/Q8）
- 模型架构是否被当前 Ollama 版本支持

## 5. 常见错误

- `invalid file magic`：文件损坏或并非有效 GGUF。
- `unknown architecture`：当前 Ollama 不支持该架构或版本过旧。
- 加载非常慢：模型过大、磁盘 I/O 慢、内存/显存不足。

## 6. 性能建议

- 开发机优先 Q4/Q5，平衡质量与速度。
- 生产按 SLA 压测后再选 Q8 或更高精度。
- 大模型建议 NVMe + 充足内存。