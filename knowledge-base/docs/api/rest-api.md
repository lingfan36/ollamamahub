# REST API Reference

> 默认服务地址：`http://localhost:11434`

## 1. `POST /api/generate`

单轮文本生成。

请求：

```json
{
  "model": "llama3.2",
  "prompt": "Explain KV cache in one paragraph",
  "stream": false,
  "options": {
    "temperature": 0.2,
    "num_ctx": 8192
  },
  "keep_alive": "10m"
}
```

## 2. `POST /api/chat`

多轮对话接口（推荐）。

```json
{
  "model": "llama3.2",
  "messages": [
    {"role": "system", "content": "You are concise."},
    {"role": "user", "content": "What is RAG?"}
  ],
  "stream": false
}
```

支持 `tools`（函数调用定义）与结构化输出。

## 3. `POST /api/embed`（推荐）

新版 embedding 接口，支持批量。

```json
{
  "model": "nomic-embed-text",
  "input": ["first text", "second text"],
  "truncate": true
}
```

> `/api/embeddings` 为旧接口，兼容但不再优先推荐。

## 4. 模型管理接口

- `GET /api/tags`：本地模型列表
- `GET /api/ps`：当前加载中的模型

## 5. 常用参数

| 参数 | 说明 |
|---|---|
| `stream` | 是否流式返回（默认 true） |
| `format` | `"json"` 或 JSON Schema |
| `options` | 温度、上下文、停止词等参数 |
| `keep_alive` | 模型保活时间 |

## 6. 响应统计字段

常见字段：`total_duration`、`load_duration`、`prompt_eval_count`、`eval_count`。

> 时间字段通常是纳秒级。

## 7. 错误处理建议

- 4xx：请求参数不合法（模型名、字段类型等）
- 5xx：服务内部错误（资源不足、模型加载失败）
- 生产上建议设置超时、重试（仅幂等场景）与熔断。