# Python Library Guide

## 1. 安装

```bash
pip install ollama
```

## 2. Chat 示例

```python
from ollama import chat

resp = chat(
    model='llama3.2',
    messages=[
        {'role': 'system', 'content': 'You are concise.'},
        {'role': 'user', 'content': 'Give me 3 tips for prompt design.'},
    ],
)

print(resp['message']['content'])
```

## 3. 指定服务地址

```python
from ollama import Client

client = Client(host='http://127.0.0.1:11434')
resp = client.chat(
    model='llama3.2',
    messages=[{'role': 'user', 'content': 'hello'}],
)
print(resp['message']['content'])
```

## 4. Embedding 示例

```python
from ollama import embed

result = embed(
    model='nomic-embed-text',
    input=['A', 'B', 'C'],
)

print(len(result['embeddings']))
```

## 5. 生产实践

- 统一超时配置与异常日志。
- 把模型名、温度、上下文窗口配置化。
- 对输出做 JSON schema 校验（结构化输出场景）。
- 避免把敏感数据写入 prompt 日志。