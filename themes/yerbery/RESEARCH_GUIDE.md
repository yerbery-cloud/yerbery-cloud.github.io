# Yerbery 科研板块使用说明

## 1. 站点根目录 `_config.yml` 需要确认 category_map

主题已经把科研导航指向 `/categories/research/`，因此站点根目录（不是 `themes/yerbery/_config.yml`）建议保持：

```yml
category_map:
  学习: study
  科研: research
  阅读: reading
  电影: movies
  旅行: travel
```

如果原来已经有 `category_map`，只增加这一行即可：

```yml
  科研: research
```

## 2. 第一篇科研文章

把 Markdown 文件放到站点：

```text
source/_posts/
```

推荐 front matter：

```yml
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
# 可选：
# venue: EdgeBench / ByteDance Seed
# paper_url: https://...
# code_url: https://github.com/...
---
```

正文直接从 `# / ## / ###` 开始写即可。科研文章页会自动生成 h2/h3 目录，并启用 MathJax。

### 如果这篇 Markdown 带图片

你当前站点根配置中 `post_asset_folder: false`。因此像你科研仓库里这种 `image-1.png` 与 Markdown 同目录的写法，直接复制进 `source/_posts/` 后图片不会自动一起发布。

推荐做法：

```text
source/
├── _posts/
│   └── Edge_Bench_and_Benchbasics.md
└── images/
    └── research/
        └── edge-bench/
            ├── image.png
            └── image-1.png
```

然后把正文中的图片路径改成：

```md
![说明文字](/images/research/edge-bench/image-1.png)
```

这样最稳定，也不会改变你已有文章的资源管理方式。

支持的 `research_type`：

- `paper`：论文精读
- `experiment`：实验记录
- `benchmark`：Benchmark
- `idea`：想法与设计
- `weekly`：周报 / 进展

支持的 `status`：

- `ongoing`
- `done`
- `paused`

## 3. 本地预览

在网站根目录运行：

```bash
hexo clean
hexo generate
hexo server
```

或使用 package.json 中已有的 npm script。

注意：Hexo 只有在至少存在一篇 `categories: 科研` 的文章后，才会生成 `/categories/research/` 分类页。因此建议先放第一篇科研 Markdown，再一起预览和部署。

## 4. 发布

确认本地正常后：

```bash
git add .
git commit -m "feat: add research section"
git push origin main
```

之后由现有 GitHub Actions 自动构建并发布。
