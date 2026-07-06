---
<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="편집 페이지"/>
</a>

# ZecWeekly 뉴스레터

ZecWeekly는 매주 금요일 아침에 발송되는 뉴스레터입니다. 이 뉴스레터에는 한 주간 Zcash 생태계에서 일어난 모든 소식이 포함되어 있습니다.

뉴스는 커뮤니티 멤버들이 매주 정리하고, 관련 링크들은 모두 뉴스레터에 추가됩니다.

뉴스레터를 구독하려면 [여기](https://zechub.substack.com/)에서 구독해 주세요.

## 기여하기

뉴스레터 기여는 한 명의 기여자가 올바른 주에 대한 판을 준비하고, 현재 보상 또는 협업 스레드를 따르며, 주간 링크가 준비된 후에 pull request를 제출하는 것이 가장 효과적입니다. ZecHub가 해당 판의 날짜를 게시하거나 확인하기 전에는 미래의 판을 제출하지 마세요. 조기 pull request는 종종 한 주 마지막 업데이트를 놓치거나, 지정된 큐레이터와 충돌하거나, 잘못된 마감일을 사용할 수 있습니다.

### 1. 현재 판 확인하기

작성 시작 전에:

- [ZecHub GitHub 이슈](https://github.com/ZecHub/zechub/issues) 및 [Dework](https://app.dework.xyz/zechub-2424)에서 현재 뉴스레터 작업을 확인하세요.
- 이슈 제목 또는 작업 설명에 있는 날짜를 진실의 출처로 사용하세요.
- 이슈를 열고, 다른 기여자가 이미 댓글을 달았거나 할당되었거나 연결된 pull request를 열었는지 확인하세요.
- 작업 시작 전에 해당 이슈 번호와 판 날짜에 대한 open pull requests를 검색하세요. 예: `is:pr is:open "5월 30일" repo:ZecHub/zechub`로 검색합니다.
- 작업이 불분명하다면, 전체 판을 준비하기 전에 이슈, ZecHub Discord 또는 [Twitter에서 ZecHub에게 메시지](https://twitter.com/ZecHub)를 보내어 질문하세요.

![현재 ZecWeekly 뉴스레터 작업을 위한 필터링된 GitHub 오픈 이슈](assets/zecweekly-current-task-search.png)

### 2. 저장소 포크하기

GitHub에 익숙하지 않다면, 다음 워크플로를 사용하세요:

1. [ZecHub 저장소](https://github.com/ZecHub/zechub)를 열고,
2. **Fork** 버튼을 클릭하여 GitHub 계정 아래에 포크를 생성합니다.
3. 포크에서 해당 판을 위한 새 브랜치를 만듭니다. 명확한 이름의 브랜치가 도움이 됩니다, 예: `digest-may-30-2026`.
4. pull request가 기반 저장소로 `ZecHub/zechub`와 기반 브랜치로 `main`을 대상으로 하도록 확인하세요.

명령줄을 사용하는 경우, 같은 워크플로는 다음과 같습니다:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. 뉴스레터 파일 생성하기

[뉴스레터 템플릿](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md)을 시작점으로 사용하세요. 뉴스레터 판은 [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) 폴더에 있어야 합니다.

파일 생성 시:

- 이슈에서 요청한 파일 이름 형식 또는 최근 승인된 판에서 사용한 형식을 따르세요.
- 템플릿의 섹션 순서를 유지하세요. 작업이 다른 형식을 요구하는 경우에만 변경하세요.
- 해당 주에 관련된 링크만 추가하세요.
- 각 링크에 대해 짧고 명확한 설명을 작성하여 독자가 왜 중요한지 이해하도록 하세요.
- 필요할 때 영어가 아닌 출처를 영어로 번역하거나 요약하세요.
- pull request를 열기 전에 모든 링크를 확인하세요.

### 4. 적절한 시기에 링크 수집하기

ZecWeekly는 일반적으로 현재 주의 Zcash 생태계 활동을 다루며, 주말 끝에 게시됩니다. 가장 안전한 타이밍은 다음과 같습니다:

- 현재 뉴스레터 이슈 또는 작업이 게시된 후 링크를 수집하기 시작하세요.
- 해당 주가 진행 중일 때 초안을 유지하세요.
- 요청된 제출 날짜에 가까운 시점에 pull request를 제출하세요. 한 주 마지막 업데이트를 확인한 후에요.
- 해당 날짜의 작업이 존재하거나 ZecHub가 해당 판을 준비하도록 승인하기 전에는 미래 주의 뉴스레터를 제출하지 마세요.

이슈에서 특정 날짜까지 제출하라고 명시했다면 그 날짜를 따르세요. 이 페이지와 현재 이슈 사이에 충돌이 있다면, 현재 이슈를 따르세요.

### 5. pull request 열기

뉴스레터 파일이 준비되면:

1. 변경사항을 포크에 커밋하세요.
2. `ZecHub/zechub`의 `main` 브랜치로 pull request를 열어주세요.
3. 판과 일치하는 제목을 사용하세요, 예: `Zcash 생태계 요약 | 5월 30일`.
4. pull request 본문에서 이슈를 연결하여 리뷰어가 작업을 해당 작업에 연결할 수 있도록 하세요.

예시 pull request 본문:

```md
Closes #ISSUE_NUMBER

요약:
- 5월 30일의 Zcash 생태계 요약 추가.
- 뉴스레터 템플릿과 현재 이슈 마감일 사용.
- 요청된 주에 대한 링크와 설명 확인.
```

pull request가 열린 후, 리뷰 댓글을 주시하세요. ZecHub가 수정을 요청하면, 동일한 브랜치를 업데이트하여 두 번째 pull request를 열지 마세요.

### 실제 예시

이러한 합쳐진 뉴스레터 pull requests는 승인된 제출물의 예시로 사용하세요:

- [Zcash 생태계 요약 | 4월 11일](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash 생태계 요약 | 3월 28일](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash 생태계 요약 | 2월 14일](https://github.com/ZecHub/zechub/pull/1474)

![합쳐진 ZecWeekly 뉴스레터 pull request 예시](assets/zecweekly-example-pr.png)

예시와 비교할 때, 파일 위치, 제목 형식, 섹션 순서, 링크 설명 및 pull request가 올바른 작업에 연결되는지 주의하세요.

### 피해야 할 일반적인 실수

- 판 날짜 또는 작업이 확인되기 전에 pull request를 열기.
- 이미 연결된 pull request가 있는 이슈에 작업하기.
- `ZecHub/zechub` 대신 자신의 fork로 pull request 제출하기.
- 잘못된 파일 이름 사용하거나 `newsletter` 폴더 외부에 파일 배치하기.
- 날짜, 링크 및 설명을 업데이트하지 않은 이전 판 복사하기.
- 잘못된 주의 링크 추가하기.
- 손상된 링크, 중복 링크 또는 템플릿에서 가져온 플레이스홀더 텍스트 남기기.
- 리뷰 댓글 후 새로운 pull request 열기 대신 원래 브랜치 업데이트 하지 않기.

### 최종 확인 목록

리뷰 요청 전에 다음을 확인하세요:

- 이슈 또는 작업 날짜가 뉴스레터 파일과 일치하는지.
- 동일한 이슈 또는 판에 대한 다른 open pull request가 없는지.
- 파일이 `newsletter` 폴더에 있는지.
- 템플릿 섹션이 완료되어 있는지.
- 모든 링크가 작동하고 유용한 설명을 포함하는지.
- pull request 본문에서 올바른 이슈를 연결했는지.
- 리뷰어가 수정 요청 시 변경 사항을 적용할 수 있도록 가용성이 있는지.

## 과거 판

[ZecWeekly 아카이브](https://zechub.substack.com/p/archive)
