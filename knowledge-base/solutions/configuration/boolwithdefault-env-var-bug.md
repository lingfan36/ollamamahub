---
title: "boolwithdefault-silently-returns-true-on-invalid-e"
category: "Configuration"
tags: []
last_updated: 2026-02-25
---

# BoolWithDefault silently returns true on invalid env var values

## 问题描述

<!-- 自动生成自 GitHub Issue #14389 -->

### 🇺🇸 English


## Problem

`BoolWithDefault` function returns `true` when `strconv.ParseBool` fails to parse environment variable values, instead of returning `defaultValue`.

```go
func BoolWithDefault(k string) func(defaultValue bool) bool {
    return func(defaultValue bool) bool {
        if s := Var(k); s != "" {
            b, err := strconv.ParseBool(s)
            if err != nil {
                return true  // ❌ Should be defaultValue
            }
            return b
        }
        return defaultValue
    }
}
```

## Affected Values

`strconv.ParseBool` only accepts: `1`, `0`, `t`, `f`, `T`, `F`, `TRUE`, `FALSE`, `true`, `false`

Common values that trigger the bug: `yes`, `on`, `enabled`, `YES`, `ON`

## Temporary Solution

Use only standard boolean values:

```bash
# ✅ Correct
export OLLAMA_DEBUG=1
export OLLAMA_DEBUG=true
export OLLAMA_DEBUG=0
export OLLAMA_DEBUG=false

# ❌ Wrong (triggers the bug)
export OLLAMA_DEBUG=yes
export OLLAMA_DEBUG=on
export OLLAMA_DEBUG=enabled
```

## Fix Required

This is a code bug in Ollama. The fix should change line 166 from `return true` to `return defaultValue`.

## Related

- [GitHub Issue #14389](https://github.com/ollama/ollama/issues/14389)


### 🇨🇳 中文


## 问题描述

`BoolWithDefault` 函数在解析环境变量值失败时，会错误地返回 `true` 而不是默认值 `defaultValue`。

## 受影响场景

当用户设置以下常见布尔值时会导致问题：
- `OLLAMA_DEBUG=yes`
- `OLLAMA_DEBUG=on`
- `OLLAMA_DEBUG=enabled`

因为 `strconv.ParseBool` 只识别 `1`, `0`, `true`, `false` 等标准值。

## 临时解决方案

使用标准布尔值：
```bash
export OLLAMA_DEBUG=1     # ✅
export OLLAMA_DEBUG=true  # ✅
export OLLAMA_DEBUG=0     # ✅
export OLLAMA_DEBUG=false # ✅
```

## 状态

🔴 **待官方修复** - 这需要 Ollama 官方修改代码

