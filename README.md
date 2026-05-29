# modu-mini-workshop

NestJS 모듈 아키텍처 워크샵 (강의 2 · 105분).
모두주차장의 입출차→결제→출차 흐름을 처음부터 같이 빌드합니다.

## 강의 전 준비

```bash
# 1. Node 20 이상
node --version   # v20.x.x

# 2. NestJS CLI
npm i -g @nestjs/cli

# 3. 이 레포 클론 + 설치
git clone <repo-url> modu-mini-workshop
cd modu-mini-workshop
yarn install

# 4. 서버 한 번 띄워보기
yarn dev
# → http://localhost:3000 떠야 함 (404 떠도 정상. Step 1에서 첫 엔드포인트를 추가합니다)

# 5. 체크포인트 태그 받아두기
git fetch --tags
git tag --list
# step1-done / step2-done / ... / step7-done 까지 보이면 OK
```

## 따라치다 막혔을 때

다음 Step의 시작점으로 점프하면 됩니다. 강사 화면은 계속 따라갈 수 있어요.

```bash
git stash                   # 진행하던 거 임시 보관
git checkout step3-done     # 예: Step 3 완성본부터 시작
yarn dev
```

각 Step의 파일·코드·시연 curl은 슬라이드에 그대로 나옵니다 (curl은 클릭 한 번에 복사).

## 결과물

105분 뒤 노트북에 작동하는 미니 서버 한 대가 남습니다.

```
GET  /parkinglots             주차장 목록
GET  /parkinglots/:id         상세
POST /sessions/enter          차량 입차
GET  /sessions/:id            현재 요금 (시간 × 시급)
POST /payments                결제 (Idempotency-Key로 두 번 막힘)
POST /sessions/:id/exit       출차 (결제된 세션만)
```

DB는 안 붙어 있습니다. Repository 안은 `Map`. 다음 주 #3 강의(토닉)에서 진짜 DB로 갈아낍니다.

## 시연용 데모 (강사용)

슬라이드 09 "아하 모멘트"에서 라이브로 띄우는 단일 파일 NestJS 앱입니다.
강의 1 #25b raw http 결제 핸들러(80줄)를 NestJS로 옮긴 12줄짜리 코드.

```bash
# 본 워크샵 서버(3000)와 충돌 안 나게 포트 3001로 뜹니다
yarn demo:aha

# 정상 요청
curl -X POST localhost:3001/payments \
  -H 'Content-Type: application/json' \
  -d '{"parkinglotId":1,"amount":3000}'

# 검증 실패 (자동 400)
curl -X POST localhost:3001/payments \
  -H 'Content-Type: application/json' \
  -d '{"amount":-100}'
```

코드 위치: `src/demo-aha.ts` (한 파일)

## 라이센스

내부 워크샵 자료.
