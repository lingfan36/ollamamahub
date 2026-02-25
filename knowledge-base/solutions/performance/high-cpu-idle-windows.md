# Windows 空闲时 CPU 占用高

## 症状

- 对话结束后 CPU 仍持续占用。
- 任务管理器中 Ollama 相关进程长期不释放。

## 原因

1. 模型仍处于 keep-alive 状态。
2. 开机自启动后后台常驻。
3. 之前会话未主动卸载模型。

## 解决步骤

### 1) 立即卸载当前模型

```powershell
ollama stop <model_name>
```

### 2) 缩短或关闭 keep-alive

```powershell
[System.Environment]::SetEnvironmentVariable('OLLAMA_KEEP_ALIVE', '1m', 'User')
```

如希望请求完成即释放，可改为 `0`。

### 3) 关闭开机自启动（可选）

- 打开任务管理器 -> 启动应用。
- 禁用 Ollama 自启动项。

### 4) 重启 Ollama 进程

退出托盘图标后重新打开，确保新环境变量生效。

## 验证

- 无请求时 CPU 应接近空闲。
- `ollama ps` 无活跃模型或短时间内自动卸载。
