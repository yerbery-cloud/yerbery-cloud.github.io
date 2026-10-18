---
title: Efficient AI系列笔记指路
subtitle: 自主学习Efficient AI相关知识和概念，详细笔记见McDocs笔记本页
date: 2026-10-18 20:00:00

categories:
  - 学习

tags:
  - Efficient AI
  - ResearchPulse

mathjax: true


---

## 笔记简介
### Background
2026.9 我打算自行探索学习Efficient AI相关知识。为敦促自己学习，且有一定的产出，我决定自行完成一个项目，最终选定了做ResearchPulse，因为还可以与另一项我比较感兴趣的技术：RSS相关联。最后成品我打算做成一个针对Efficient AI方向的ResearchPulse。关于ResearchPulse,我的设想是一个自动收集前沿论文与相关开源项目，能利用 AI 筛选和总结研究内容，并通过可复现的推理实验，比较不同模型与优化方案的实际表现，最终将结果呈现在一个可以部署和使用的 Web Dashboard 中。我觉得这个项目非常好的综合了各项能力的考察，既有利用RSS对论文进行收集，也有本地LLM的部署量化，在完成这个项目的过程中也能为我的Efficient AI之路奠基。

该系列笔记就是在这样一个项目背景下伴生的产物，希望我能在制作该笔记的过程中学习内化一些Efficient AI的相关知识内容，留下足迹，缘则精进。

### Structure (Ideal)

1. 从本地 LLM 推理到性能评估(已完成)
> 推理流程、精度、量化概念、性能指标、实验设计。

2. Transformer 推理机制与 KV Cache
> 深入 Attention、Prefill、Decode、KV Cache 与生成过程。

3. 模型量化原理与 INT8 / INT4 实践
> 量化误差、PTQ、CPU 兼容的量化工具链、质量与性能比较。

4. 模型推理性能分析与 Profiling
> 性能瓶颈、CPU 线程、内存带宽、算子耗时与可复现 Benchmark。

5. 高效推理系统与部署优化
> Batching、KV Cache 管理、推理服务、吞吐量和延迟优化。

### Note指路
👉详见笔记仓库：[Efficient AI Notes](https://yerbery-cloud.github.io/notebook/tech/)