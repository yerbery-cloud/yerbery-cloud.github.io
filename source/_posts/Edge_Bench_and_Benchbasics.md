---
title: EdgeBench 与 Benchbasics：第一次接触 Benchmark 设计
subtitle: 从 Capability、Tasks、Environment、Evaluation 与 Protocol 理解一个 Benchmark 的基本结构
date: 2026-09-19 16:00:00

categories:
  - 科研

tags:
  - Benchmark
  - Agent
  - SNN-AutoResearch

research_type: benchmark
project: SNN-AutoResearch
status: ongoing

question: 一个好的 Benchmark 应该如何把“能力”转化为可验证、可复现的任务与评价协议？

---

#  第一周留痕：一些对于Benchmark的和针对SNN任务设计的学习

## 关于Edge_Bench:

一个用于检测Agent性能的Multi_Task Benchmark, developed by ByteDance, 2026.7

六大种类：
![EdgeBench](/images/research/edge-bench/image.png)

>"Each task is designed as a day-scale challenge with a performance ceiling high enough that no current agent can saturate it. Recorded human expert effort averages 57.2 hours per task (up to 320 hours)."


## [第一次接触Benchmark：如何设计一个好的Benchmark？]

***Benchmark=Capability + Tasks + Environment + Evaluation + Protocol***

### Capability

设计需要detailed，比如模型用来做科研，那他所需要的子能力就可能要有：

- 搜集论文
- 发现合适选题
- 设计实验
- 横向对比
- 撰写论文
……

但任务很容易体量过大，这个就需要考量**Capability taxonomy**:

参考能力树分支思想，不同任务测定不同的子能力。



### Construct Validity(有效性)

高分对应高能力的可靠性

### 任务真实性
从Github里面找真实的项目来跑

Edge Bench拥有非常好的设计模式：
**Work/Judge 隔离和 iterative evaluation**

### Benchmark Lottery

>一个方法看起来强不强，可能很大程度取决于你恰好选了哪些 Benchmark，而不完全取决于它本身是不是更强。

### 目前比较成熟的Benchmark了解：

#### ①SWE-Bench（非常成熟）
> 原始 ICLR 2024 版本有 2,294 个来自真实 GitHub issues / pull requests 的软件工程问题，之后又推出了人工确认可解的 SWE-bench Verified，并采用 Docker 做可复现 evaluation harness。

#### ②AgentBench
核心思想：

**Agent应该进入环境完成任务。**

于是设计了八种不同环境，例如：

- OS
- database
- nowledge graph
- web browsing
- shopping
- household environment

来评价多轮 reasoning 和 decision making

#### ③OSWorld

- 重点评估Agent使用电脑的能力
- 数百个真实计算机任务

### 个人总结，目前我需要关注的对于一个Benchmark比较重要的点：Task设计范式（怎么被包装）（也包括Harness的设计）

以Edge Bench为例：

采用sForce code评测框架：

>Agent（如 Claude Code 和 Codex）在隔离的 Docker 容器中完成骨架代码，然后提交到独立的 Judge 容器进行评分。Agent 可以多次提交，根据测试反馈迭代改进代码，直到超时为止，最终取所有提交中的最优分作为最终成绩。

>SForge 原生支持 EdgeBench，包含 130+ 评测任务，任务覆盖 Python、Java、Go、Rust、C/C++ 等多类运行环境，支持测试驱动、分数优化、交互式游戏、定理证明等多种评测类型。 *摘自bytedance管方文档*

流程如下图：
![EdgeBench taxonomy](/images/research/edge-bench/image-1.png)

### EdgeBench 的设计模式理解

- **核心是把真实任务包装成可执行、可评估的 Agent 任务。**
- 一个任务通常包含：**任务描述（agent query）+ 工作环境（Work）+ 隐藏评测环境（Judge）+ 评分逻辑（Evaluator）**。
- **Work / Judge 隔离**是关键：Agent 可以在 Work 中自由修改、实验，但不能看到隐藏测试和评分细节，避免针对答案作弊。
- EdgeBench 强调 **多轮迭代**：Agent 可以根据每次提交后的反馈继续修改，而不是一次作答结束，更接近真实科研 / 工程过程。
- 不同任务可以采用不同评测范式：
  - `test-driven`：看隐藏测试通过率；
  - `score optimization`：看连续分数；
  - `interactive task`：看最终环境状态或累计表现。
- Benchmark 的公平性依赖统一的 **时间、算力、提交次数、环境版本等 protocol**，否则不同 Agent 的成绩不可直接比较。

整体逻辑可以概括为：

```text
真实任务
→ 标准化 Task
→ 隔离 Work / Judge
→ Agent 多轮执行
→ 自动评测
→ 统一协议下比较不同 Agent


