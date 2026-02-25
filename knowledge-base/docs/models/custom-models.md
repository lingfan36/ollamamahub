# Custom Models with Modelfile

## 1. 什么是 Modelfile

`Modelfile` 用于基于现有模型创建“定制模型”，可以设置系统提示词、模板、参数和适配器。

## 2. 最小示例

```Dockerfile
FROM llama3.2

SYSTEM "You are a concise DevOps assistant."

PARAMETER temperature 0.2
PARAMETER num_ctx 8192
```

创建模型：

```bash
ollama create devops-assistant -f Modelfile
ollama run devops-assistant
```

## 3. 常用指令

- `FROM`：指定基模型或本地模型路径
- `SYSTEM`：系统角色设定
- `TEMPLATE`：自定义提示模板
- `PARAMETER`：采样与推理参数
- `ADAPTER`：加载 LoRA/适配器（按版本支持）

## 4. 参数建议

| 参数 | 含义 | 常见值 |
|---|---|---|
| `temperature` | 随机性 | `0.1`~`0.8` |
| `num_ctx` | 上下文窗口 | `4096` / `8192` / `32768` |
| `num_predict` | 最大输出 token | `256` / `1024` |
| `stop` | 停止词 | `"User:"` 等 |

## 5. 调试流程

1. 先固定 `temperature` 和 `seed` 做稳定回归。
2. 观察幻觉、重复、格式偏差。
3. 再逐步调大上下文和输出长度。

## 6. 版本管理建议

- 模型名语义化：`team-task-v1`, `team-task-v2`
- 为每次改动记录变更日志（system prompt/parameter/template）
- 对关键模型建立自动评测基线