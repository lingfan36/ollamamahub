# Quickstart

## 目标
5 分钟内完成：拉取模型 -> 本地推理 -> 调用 API。

## 1. 拉取并运行模型

```bash
ollama pull llama3.2
ollama run llama3.2
```

在交互模式中输入问题即可得到回答。

## 2. 单轮生成（`/api/generate`）

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "用一句话解释什么是向量数据库",
  "stream": false
}'
```

## 3. 多轮对话（`/api/chat`）

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [
    {"role": "system", "content": "你是一个简洁的助手"},
    {"role": "user", "content": "给我 3 条 Ollama 入门建议"}
  ],
  "stream": false
}'
```

## 4. Embedding（推荐 `/api/embed`）

```bash
curl http://localhost:11434/api/embed -d '{
  "model": "nomic-embed-text",
  "input": ["hello", "ollama"],
  "truncate": true
}'
```

> 说明：`/api/embeddings` 仍可用，但已由 `/api/embed` 取代为推荐接口。

## 5. 最小 Python 示例

```python
import requests

resp = requests.post(
    "http://localhost:11434/api/chat",
    json={
        "model": "llama3.2",
        "messages": [{"role": "user", "content": "写一个 Python 函数求阶乘"}],
        "stream": False,
    },
    timeout=120,
)
print(resp.json()["message"]["content"])
```

## 6. 最小 JavaScript 示例

```js
const res = await fetch('http://localhost:11434/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama3.2',
    messages: [{ role: 'user', content: 'Explain RAG in one paragraph.' }],
    stream: false
  })
});

const data = await res.json();
console.log(data.message.content);
```

## 7. 下一步

- 学习环境变量：`configuration.md`
- 学习模型自定义：`models/custom-models.md`
- 学习生产部署：`advanced/docker-deployment.md`