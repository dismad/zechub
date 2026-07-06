<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 지갑 동기화

## TL;DR

* 차폐된 Zcash 트랜잭션은 세부 정보를 숨기기 때문에, 서버는 Bitcoin이나 Ethereum 같은 투명한 코인처럼 지갑 잔액을 단순 조회할 수 없습니다.
* 라이트 월렛은 특수 서버(`lightwalletd`)에서 작은 “compact blocks”를 다운로드한 뒤, 자신의 개인 키로 관련 데이터를 직접 복호화합니다.
* 이러한 블록을 복호화하고 처리하는 데는 시간이 걸리므로, 지갑은 더 빠른 동기화 방식들을 사용해 사용자가 더 빨리 자금을 사용할 수 있게 합니다.
* 대표적인 접근 방식: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet), 그리고 제안된 DAGSync.
* 이러한 방법들은 일반적으로 더 빠른 동기화를 위해 추가 메모리나 처리 성능을 사용하는 트레이드오프를 가집니다.

## 핵심 설명

### Zcash 동기화는 어떻게 작동하나요

Zcash는 영지식 증명을 사용해 권한 없는 제3자가 트랜잭션 세부 정보를 볼 수 없도록 차폐합니다. 이러한 프라이버시 때문에 라이트 월렛의 동기화는 더 어려워집니다. 라이트 월렛은 전체 블록체인을 로컬에 저장하지 않고, 대신 필요한 정보를 서버에 의존하기 때문입니다. Bitcoin이나 Ethereum에서는 서버가 블록체인을 인덱싱해 계정 데이터를 빠르게 반환할 수 있습니다. 하지만 Zcash에서는 서버가 트랜잭션 세부 정보를 볼 수 없습니다. 그렇다면 라이트 월렛은 전체 블록체인을 스스로 다운로드하고 복호화하지 않고도 어떻게 잔액과 거래 내역을 동기화할 수 있을까요?

Zcash는 이 문제를 여러 접근 방식을 결합해 해결합니다. Zcash에는 전체 노드에서 데이터를 필터링하고 트랜잭션 식별에 필요한 정보만 유지하는 특수 서버인 lightwalletd가 있습니다. 이 데이터는 compact blocks라고 하며, 원래 블록보다 훨씬 작습니다. 라이트 월렛은 먼저 lightwalletd 서버에서 이 compact blocks를 다운로드한 뒤, 자신의 개인 키로 이를 복호화합니다.

이 compact blocks조차 복호화하고 처리하는 데 상당한 시간이 걸릴 수 있으며, 특히 블록당 트랜잭션 수가 많을 때 더욱 그렇습니다. 그래서 지갑은 동기화를 가속화하고 사용자가 가능한 한 빨리 자금을 사용할 수 있도록 다양한 방법을 사용합니다.

## 시각적 설명 / 비유

블록체인을 잠긴 상자들로 가득한 거대한 우편실이라고 생각해 보세요. 투명한 코인의 경우, 우편실 직원이 라벨을 읽고 어떤 상자들이 당신 것인지 즉시 알려줄 수 있습니다. 하지만 Zcash에서는 라벨이 숨겨져 있습니다 — 그래서 당신의 지갑은 자신의 열쇠를 가지고 직접 조용히 상자들을 확인하며, 열 수 있는 상자를 찾아야 합니다. 아래의 동기화 방식들은 그 상자들을 더 빠르게 확인하기 위한 서로 다른 전략입니다.

## 자세히 살펴보기

### Warp Sync

Warp sync는 YWallet의 기능으로, 각 compact block을 하나씩 복호화하고 처리하는 중간 단계를 건너뛰고 최종 결과로 바로 도달합니다.

이를 위해 각 단계를 일일이 거치지 않고도 최종 결과를 계산할 수 있도록 수학과 암호학을 사용합니다.

Warp sync는 초당 수천 개의 블록을 처리할 수 있어, 일반적인 동기화 방식보다 훨씬 빠릅니다. 이는 계정에 수십만 건의 트랜잭션과 수신된 노트가 있더라도 YWallet 사용자가 빠르고 부드러운 성능을 누릴 수 있음을 의미합니다.

이러한 단계 건너뛰기 기법 외에도, YWallet은 여러 블록을 동시에 처리할 수 있어 사용 가능한 하드웨어 전반에 부하를 분산시켜 과정을 더욱 빠르게 만듭니다.

[Warp Sync](https://ywallet.app/warp/)에서 더 읽어보기

### Spend-before-sync

Spend-before-sync는 Zcash Mobile Wallet SDK V2의 새로운 기능으로, 사용자가 지갑을 열자마자 전체 지갑 동기화가 끝날 때까지 기다리지 않고 즉시 자금을 사용할 수 있게 해줍니다. 이 기능은 지갑의 사용 가능한 잔액을 더 빠르게 발견하게 하며 사용자 경험을 개선합니다.

Spend-before-sync는 lightwalletd 서버의 블록들을 비선형 순서로 처리하는 compact-blocks 동기화 알고리즘을 사용해 작동합니다. 즉, 하나의 블록이 완전히 처리될 때까지 기다린 뒤 다음 블록으로 넘어가는 대신, 지갑은 약간 더 많은 메모리와 처리 성능을 사용해 블록체인의 서로 다른 구간을 스캔할 수 있습니다. 보통은 서로 다른 범위를 스캔하면서, 오래된 블록이 다운로드되고 처리되는 동안 더 최근의 트랜잭션을 찾습니다. 최근의 미사용 노트가 발견되면, 즉시 사용 가능하게 됩니다.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Zecwallet 팀이 개발한 Blaze sync는 라이트 월렛을 위한 동기화 알고리즘으로, 가장 높은 최신 블록부터 시작해 뒤로 거슬러 내려가며 블록체인을 스캔합니다.

이렇게 하면 지갑은 수신된 노트보다 먼저 사용된 노트를 찾을 수 있고, 전체 동기화 과정이 끝날 때까지 기다리지 않고도 이전에 미사용이었던 노트를 사용 가능하게 만들 수 있습니다.

그뿐만 아니라, 블록 다운로드, trial decryption 수행, witness 업데이트 등 동기화의 각 구성 요소를 서로 분리하고 병렬로 처리하는 Out-of-Order Sync를 사용합니다. 이는 더 많은 메모리와 CPU 자원을 사용하지만 동기화 속도를 5배 향상시킵니다.

### DAGSync

DAGSync는 동기화 속도를 높여 Zcash 차폐 지갑의 사용자 경험을 개선하는 것을 목표로 하는 제안된 동기화 알고리즘입니다.

이 방식은 [Directed Acyclic Graph (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/)를 사용해 Zcash 지갑 안의 노트, witness, nullifier 간의 의존 관계를 표현합니다.

DAG는 노드와 엣지로 구성된 데이터 구조로, 각 엣지는 두 노드 사이의 관계를 나타내는 방향을 가집니다. DAG에는 사이클이 없으며, 이는 어떤 노드에서 시작해 엣지를 따라가다가 다시 같은 노드로 되돌아오는 경로가 없다는 뜻입니다.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

## 실질적인 의미

흥미롭게도, 이러한 메커니즘들은 모두 Zcash Security가 [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) 게시물에서 제기한 문제와, 그것이 프라이빗 결제 시스템과 맺는 관계를 다루려는 목적을 가지고 있습니다. 일부는 한 걸음 더 나아가 특정 주소에만 해당하는 데이터를 제외한 모든 메모 데이터를 서버에서 다운로드하기도 하며, 이는 약간의 추가 자원을 대가로 프라이버시를 높입니다.

또한 Zcash Foundation은 라이트 월렛의 성능을 개선하기 위한 다른 대안들도 검토해 왔습니다. 그 예가 [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/)로, 재단은 이것이 “최근 Zcash 지갑 사용자들에게 영향을 준 성능 문제에 대한 잠재적 해결책을 제공하는지 판단하기 위해” 연구해 온 구조입니다.

## 흔한 실수

**lightwalletd 서버가 당신의 잔액을 알고 있다고 가정하는 것.** 서버는 compact blocks만 전달할 뿐이며, 당신의 지갑이 자신의 키로 이를 로컬에서 복호화하고 해석합니다.

**동기화를 너무 일찍 중단하는 것.** 일부 방법은 전체 동기화가 완료되기 전에 최근의 사용 가능한 자금을 먼저 쓸 수 있게 해주지만, 더 오래된 거래 내역과 노트는 아직 처리 중일 수 있습니다.

**Zcash 동기화를 투명 체인의 동기화와 직접 비교하는 것.** 더 느린 경로는 결함이 아니라 프라이버시를 지키기 위한 비용일 수 있습니다 — 공개 코인 서버라면 당신의 계정을 공개적으로 읽어서 대신 해줄 작업을, 지갑이 직접 수행하고 있는 것입니다.


## 관련 페이지

- [Lightwallet 노드](/zcash-tech/lightwallet-nodes) — 라이트 월렛이 의존하는 lightwalletd 인프라.
- [Viewing Keys](/zcash-tech/viewing-keys) — 지갑이 자신의 노트를 탐지하고 복호화하는 데 사용하는 키.
- [Pepper Sync](/zcash-tech/pepper-sync) — Zcash 지갑 동기화에 대한 또 다른 접근 방식.
- [FROST](/zcash-tech/frost) — 차폐된 ZEC를 위한 분산 서명 권한.
