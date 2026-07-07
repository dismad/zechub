<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly ニュースレター

ZecWeekly は毎週金曜日の朝に配信されるニュースレターです。このレターには、その週の Zcash 生態系におけるすべてのニュースが含まれています。

このニュースはコミュニティメンバーによって毎週キュレーションされ、関連するリンクもニュースレターに追加されています。

ニュースレターへの登録はこちらからお願いします [here](https://zechub.substack.com/).

## 貢献

ニュースレターの貢献は、1人の寄稿者が正しい週の編集を準備し、現在の報酬または調整スレッドに従い、週ごとのリンクが整った後にプルリクエストを提出する場合に最も効果的です。ZecHub がその版の日付を投稿または確認する前に、未来の版を提出しないでください。早期のプルリクエストは、週末の更新を逃すことが多く、担当キュレーターと競合したり、期限が間違っていたりすることがあります。

### 1. 現在の版を確認

書き始める前に：

- [ZecHub GitHub issues](https://github.com/ZecHub/zechub/issues) および [Dework](https://app.dework.xyz/zechub-2424) 上で現在のニュースレターのタスクを確認してください。
- イススのタイトルまたはタスク記述に記載されている日付を使用してください。
- イススを開き、他の寄稿者がすでにコメントしているか、割り当てられているか、リンクされたプルリクエストを開いているかを確認してください。
- 書き始めの前に、該当する問題番号と版日付でオープンなプルリクエストを検索してください。例：`is:pr is:open "May 30th" repo:ZecHub/zechub`。
- タスクが不明瞭な場合は、準備する前にその問題、ZecHub Discord、または [Twitter 上の ZecHub](https://twitter.com/ZecHub) に尋ねてください。

![現在の ZecWeekly ニュースレターのタスクをフィルタリングしたオープンな GitHub イスス](assets/zecweekly-current-task-search.png)

### 2. リポジトリをフォーク

GitHub が初めての方は、このワークフローを使用してください：

1. [ZecHub リポジトリ](https://github.com/ZecHub/zechub)を開きます。
2. **Fork** をクリックして、あなたの GitHub アカウント下にフォークを作成します。
3. あなたのフォークで、版用の新しいブランチを作成してください。明確なブランチ名が役立ちます。例：`digest-may-30-2026`。
4. プルリクエストが `ZecHub/zechub` をベースリポジトリとして、`main` をベースブランチとしてターゲットにすることを確認してください。

コマンドラインを使用する場合、同じワークフローは次のようになります：

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. ニュースレターのファイルを作成

[ニュースレターテンプレート](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) を起点としてください。ニュースレターの版は [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) フォルダに配置されます。

ファイルを作成する際には：

- イススまたは最近承認された版で要求されているファイル名形式に合わせてください。
- セクションの順序はテンプレートと同じにしてください。タスクが異なるフォーマットを要求している場合のみ変更してください。
- 関連する週からのみリンクを追加してください。
- 各リンクに対して、読者がその重要性を理解できるように短く明確な説明文を記入してください。
- 必要に応じて非英語のソースを英語で翻訳または要約してください。
- プルリクエストを開く前にすべてのリンクを確認してください。

### 4. 適切なタイミングでリンクを集める

ZecWeekly は通常、現在の週の Zcash 生態系活動をカバーし、週末に近いタイミングで公開されます。最も安全なタイミングは次の通りです：

- 現在のニュースレターの問題またはタスクが投稿された後からリンクの収集を開始してください。
- その週がまだ進行中の間はドラフトを保持してください。
- 週末の更新を確認した後に、リクエストされた提出日付に近いタイミングでプルリクエストを提出してください。
- タスクが存在するか、または ZecHub がその準備を依頼していることを確認するまで、未来の週のニュースレターは提出しないでください。

問題に特定の日付での提出が指定されている場合は、その日付に従ってください。このページと現在の問題との間に競合がある場合、現在の問題に従ってください。

### 5. プルリクエストを開く

ニュースレターのファイルが準備できたら：

1. 変更をフォークにコミットしてください。
2. `ZecHub/zechub` の `main` ブランチにプルリクエストを開いてください。
3. 版と一致するタイトルを使用してください。例：`Zcash Ecosystem Digest | May 30th`。
4. プルリクエストの本文で問題をリンクして、レビュアーが作業をタスクに関連付けることができるようにしてください。

プルリクエスト本文の例：

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

プルリクエストが開かれた後は、レビューコメントを確認してください。ZecHub が編集を求めた場合は、同じブランチを更新して、同じ版に対して2つのプルリクエストを開かないでください。

### 実際の例

これらのマージされたニュースレターのプルリクエストを使用して、承認された提出物の例として参考にしてください：

- [Zcash Ecosystem Digest | April 11th](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | March 28th](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | February 14th](https://github.com/ZecHub/zechub/pull/1474)

![マージされた ZecWeekly ニュースレターのプルリクエスト例](assets/zecweekly-example-pr.png)

自分の作業と例を比較する際には、ファイルの場所、タイトル形式、セクション順序、リンクの説明文、およびプルリクエストが正しいタスクに接続されているかに注目してください。

### 避けたい一般的なミス

- 版日付またはタスクが確認される前にプルリクエストを開く。
- すでにリンクされたプルリクエストがある問題を扱う。
- 自分のフォークではなく `ZecHub/zechub` にプルリクエストを送る。
- 間違ったファイル名を使用するか、`newsletter` フォルダの外にファイルを配置する。
- 古い版をコピーして日付、リンク、説明文をすべて更新しない。
- 適切な週からのリンクを追加しない。
- 破損したリンク、重複したリンク、またはテンプレートから残ったプレースホルダーのテキストを残す。
- レビューコメント後に新しいプルリクエストを開く代わりに、元のブランチを更新しない。

### 最終チェックリスト

レビューを依頼する前に確認してください：

- イススまたはタスクの日付があなたのニュースレターのファイルと一致しているか。
- 他のオープンなプルリクエストが同じ問題や版をすでにカバーしていないか。
- ファイルが `newsletter` フォルダ内にあるか。
- テンプレートセクションがすべて完成しているか。
- すべてのリンクが動作し、役に立つ説明文があるか。
- プルリクエスト本文で正しい問題をリンクしているか。
- レビュアーが変更を求めた場合でも編集可能な状態であるか。

## 過去の版

[ZecWeekly アーカイブ](https://zechub.substack.com/p/archive)
