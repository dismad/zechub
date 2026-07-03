<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# ZecWeekly Newsletter

ZecWeekly 是一份每周五早晨发布的新闻通讯。它包含 Zcash 生态系统在这一周内发生的所有新闻。

新闻内容由社区成员每周整理，所有相关链接都会添加到新闻通讯中。

请在[这里](https://zechub.substack.com/)订阅新闻通讯。

## 贡献

当由一位贡献者为正确的周次准备当期内容、遵循当前的赏金或协作线程，并在每周链接准备完成后提交 pull request 时，新闻通讯贡献的效果最佳。请不要在 ZecHub 发布或确认该期日期之前提交未来期数。过早提交的 pull request 往往会遗漏周后期更新、与已分配的整理者冲突，或使用错误的截止日期。

### 1. 确认当前期数

在开始撰写之前：

- 查看当前新闻通讯任务对应的 [ZecHub GitHub issues](https://github.com/ZecHub/zechub/issues) 和 [Dework](https://app.dework.xyz/zechub-2424)。
- 以 issue 标题或任务描述中的日期为准。
- 打开 issue，检查是否已有其他贡献者评论、被指派，或已开启关联的 pull request。
- 在开始前，先搜索与该 issue 编号和该期日期相关的开放 pull request。例如，搜索 `is:pr is:open "May 30th" repo:ZecHub/zechub`。
- 如果任务不清楚，请先在 issue、ZecHub Discord 中提问，或通过 [ZecHub on Twitter](https://twitter.com/ZecHub) 发送消息，再准备完整期数内容。

![按当前 ZecWeekly 新闻通讯任务筛选的开放 GitHub issues](assets/zecweekly-current-task-search.png)

### 2. Fork 仓库

如果你是 GitHub 新手，请使用以下工作流程：

1. 打开 [ZecHub repository](https://github.com/ZecHub/zechub)。
2. 点击 **Fork**，并在你的 GitHub 账户下创建一个 fork。
3. 在你的 fork 中，为该期内容创建一个新分支。清晰的分支名会很有帮助，例如 `digest-may-30-2026`。
4. 确保你的 pull request 以 `ZecHub/zechub` 作为基础仓库，并以 `main` 作为基础分支。

如果你使用命令行，相同的工作流程如下：

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. 创建新闻通讯文件

请使用[新闻通讯模板](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md)作为起点。各期新闻通讯应放在 [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) 文件夹中。

创建文件时：

- 文件名格式应与 issue 要求一致，或与最近已接受的期数所使用的格式一致。
- 除非任务要求使用不同格式，否则请保持与模板相同的章节顺序。
- 仅添加相关那一周的链接。
- 为每个链接写一段简短清晰的说明，让读者了解其重要性。
- 如有需要，请将非英语来源翻译或概述为英文。
- 在开启 pull request 之前检查每一个链接。

### 4. 在合适的时间收集链接

ZecWeekly 通常涵盖当周 Zcash 生态系统的活动，并在接近周末时发布。最稳妥的时间安排是：

- 在当前新闻通讯 issue 或任务发布后开始收集链接。
- 在当周仍在进行时持续维护草稿。
- 在你检查完周后期更新之后，于要求的提交日期附近提交 pull request。
- 不要在该日期对应任务尚不存在，或在 ZecHub 尚未确认应由你准备之前，提交未来一周的新闻通讯。

如果 issue 要求在特定日期前提交，请遵循该日期。如果本页面与当前 issue 存在冲突，请以当前 issue 为准。

### 5. 开启 pull request

当你的新闻通讯文件准备就绪后：

1. 将更改提交到你的 fork。
2. 向 `ZecHub/zechub` 的 `main` 分支开启一个 pull request。
3. 使用与该期相匹配的标题，例如 `Zcash Ecosystem Digest | May 30th`。
4. 在 pull request 正文中链接对应的 issue，以便审阅者将这项工作与任务关联起来。

示例 pull request 正文：

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

开启 pull request 后，请留意审阅评论。如果 ZecHub 要求修改，请在同一个分支上更新，而不是为同一期再开启第二个 pull request。

### 真实示例

请参考以下已合并的新闻通讯 pull request，作为已被接受的提交示例：

- [Zcash Ecosystem Digest | April 11th](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | March 28th](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | February 14th](https://github.com/ZecHub/zechub/pull/1474)

![已合并的 ZecWeekly 新闻通讯 pull request 示例](assets/zecweekly-example-pr.png)

将你的工作与示例对比时，请重点关注文件位置、标题格式、章节顺序、链接说明，以及该 pull request 是否正确关联回对应任务。

### 需要避免的常见错误

- 在期数日期或任务尚未确认前就开启 pull request。
- 处理一个已经有关联 pull request 的 issue。
- 将 pull request 提交到你自己的 fork，而不是 `ZecHub/zechub`。
- 使用错误的文件名，或将文件放在 `newsletter` 文件夹之外。
- 复制旧期内容后，没有更新所有日期、链接和说明。
- 添加了错误周次的链接。
- 留下失效链接、重复链接，或模板中的占位文本。
- 在收到审阅评论后重新开启新的 pull request，而不是更新原分支。

### 最终检查清单

在请求审阅前，请确认：

- issue 或任务日期与你的新闻通讯文件一致。
- 没有其他开放的 pull request 正在覆盖同一个 issue 或期数。
- 文件位于 `newsletter` 文件夹中。
- 模板各部分内容完整。
- 每个链接都可用，并附有有价值的说明。
- pull request 正文链接到了正确的 issue。
- 如果审阅者要求修改，你可以进行更新。

## 往期期数

[ZecWeekly Archive](https://zechub.substack.com/p/archive)
