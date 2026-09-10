---
title: 双通道 EEG 基础模型与认知负荷实时解码
date: 2026-09-10
categories:
  - 学习
tags:
  - EEG
  - BCI
  - Foundation Model
  - 自监督学习
  - PyTorch
  - 项目
mathjax: true
---

## 项目简介

这是我于 2026 年 8 月至 9 月在浙江大学完成的 EEG 研究项目。

项目围绕 Fp1/Fp2 双通道脑电，完成了：

- 基于 Masked Reconstruction 的自监督 EEG 预训练
- 20 → 60 被试的预训练 Scaling 实验
- Linear Probe、LoRA、Full Fine-tuning 对比
- EEGNet 与 CBraMod 基线比较
- LoongBrain + LSL 真机实时 EEG 推理
- 个体 Calibration 与实时认知负荷二分类 Demo

## 核心结果

- 20 → 60 被试后，同测试集重建 MSE 下降 **6.62%**
- Frozen Linear Probe F1 相对提升 **18.57%**
- LoRA 仅使用约 **4.6%** 的 Full Fine-tuning 可训练参数
- Same-session calibrated Demo Accuracy 达到 **80.56%**
- 平均实时推理延迟约 **5.21 ms**

> 80.56% 为同一 session 内经过个体校准后的 Demo 结果，并非跨 session 泛化准确率。

## 项目代码

👉 [GitHub Repository：eeg-foundation-model](https://github.com/yerbery-cloud/eeg-foundation-model)