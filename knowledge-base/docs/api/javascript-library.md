# JavaScript Library Guide

## 1. 安装

```bash
npm i ollama
```

## 2. 基本调用

```js
import ollama from 'ollama';

const response = await ollama.chat({
  model: 'llama3.2',
  messages: [{ role: 'user', content: 'Why use local LLMs?' }],
});

console.log(response.message.content);
```

## 3. 指定 Host

```js
import { Ollama } from 'ollama';

const client = new Ollama({ host: 'http://127.0.0.1:11434' });

const resp = await client.chat({
  model: 'llama3.2',
  messages: [{ role: 'user', content: 'hello' }],
});

console.log(resp.message.content);
```

## 4. Embedding

```js
const result = await client.embed({
  model: 'nomic-embed-text',
  input: ['doc1', 'doc2']
});

console.log(result.embeddings.length);
```

## 5. 流式响应（fetch 方案）

```js
const res = await fetch('http://127.0.0.1:11434/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama3.2',
    messages: [{ role: 'user', content: 'stream demo' }],
    stream: true,
  }),
});

// stream=true 时返回 NDJSON，需要逐行解析
```

## 6. 实战建议

- 浏览器直连前先处理 CORS（`OLLAMA_ORIGINS`）。
- 前端不要暴露敏感业务逻辑，建议通过后端转发。
- 对长响应使用流式渲染以降低首 token 延迟。