# GGUF 模型导入失败

## 症状

- `ollama create` 报错：文件不存在、digest mismatch 或构建失败。

## 常见原因

1. `Modelfile` 路径使用相对路径且工作目录不一致。
2. GGUF 文件下载不完整或损坏。
3. `FROM` 指向的基础模型/文件写法错误。
4. 某些多文件模型缺少配套文件。

## 标准导入流程

### 1) 使用绝对路径

`Modelfile` 示例：

```dockerfile
FROM /absolute/path/to/model.gguf
PARAMETER temperature 0.7
TEMPLATE """{{ .Prompt }}"""
```

### 2) 执行构建

```bash
ollama create my-gguf-model -f ./Modelfile
```

### 3) 运行验证

```bash
ollama run my-gguf-model
```

## 失败时处理

- 重新校验/重下 GGUF 文件。
- 文件名包含空格时用引号或改名。
- 检查磁盘空间是否充足。
- 保证 Ollama 版本较新，避免旧版本导入兼容问题。

## 最小排查命令

```bash
ls -lh /absolute/path/to/model.gguf
ollama --version
```
