# SGO ADS 월별 자동 갱신 설정

## 사용자가 준비할 것

1. https://platform.openai.com/settings/organization/billing/overview 에서 월 100달러 크레딧을 받는 API 조직과 잔액을 확인합니다. ChatGPT 구독 혜택 활성화와 API 조직 연결이 필요합니다.
2. 같은 조직에 사고분석 전용 프로젝트를 만들고 https://platform.openai.com/api-keys 에서 프로젝트 API 키를 발급합니다. `gpt-6-astra` 모델 및 Responses API 사용 권한이 필요합니다.
3. https://github.com/dnf6541-max/ads-report-studio/settings/secrets/actions 에서 `New repository secret`을 선택해 이름 `OPENAI_API_KEY`, 값은 발급한 키로 등록합니다. 채팅, 저장소 파일, 프런트엔드 코드에는 키를 넣지 않습니다.
4. https://github.com/dnf6541-max/ads-report-studio/settings/pages 에서 Build and deployment → Source를 `GitHub Actions`로 설정합니다. 사용자 정의 워크플로에서 갱신 결과를 배포하기 위한 설정입니다.
5. https://github.com/dnf6541-max/ads-report-studio/actions/workflows/sgo-update.yml 에서 Run workflow → `connection`을 실행합니다. 선택 모델의 최소 연결 시험이며 크레딧을 소량 사용합니다. 성공한 뒤 `pilot`으로 최대 10건을 대조하여 품질·비용을 확인하고, `refresh`로 남은 데이터를 갱신합니다. 월별 자동화도 같은 워크플로를 사용합니다.

별도 서버 계정·도메인·NHTSA API 키는 필요하지 않습니다. GitHub Actions가 실행 중에만 OpenAI API에 접속합니다. GitHub Actions가 저장소에서 허용되어야 하며 Pages 배포 권한이 필요합니다. Actions 자체 이용 한도와 OpenAI 크레딧은 별개입니다.

## 실행 구조

월별 자동화가 `.github/sgo-update-request.json`에 새 요청 ID와 `refresh` 모드를 기록하면 GitHub Actions가 실행됩니다. 같은 요청을 중복 작성하지 않습니다. 한국시간 매월 15일 확인, 18일 재확인. 자료가 같고 미처리 검토 대상도 없으면 API를 호출하지 않습니다. 이 일정은 공식 공개를 보장하는 시간이 아닙니다.

공식 최신·이전 ADS CSV 다운로드 → 스키마 및 지문 비교 → 신규·수정 보고 추출 → 전체 원문·양쪽 행동·접촉부위 분석 → 별도 LLM 대조 → 연속 인용·버전·변수 검증 → 합계·분모 검산 → 앱의 데이터 패키지 및 Pages 갱신.

자동 분석은 사람의 검수와 구분한 LLM 이중 대조 초안입니다. 원인·법적 과실의 확정값이 아닙니다. 신규 동일 사고·차량 연결, 원문 비공개, 모순, 근거 미일치, 스키마 변경, 원본 보고 삭제는 보류합니다. 예산 초과분도 다음 검토 대상으로 남깁니다. 기존 자료를 임의로 없애거나 빈 내용을 추정하지 않습니다.

## 비용·검산

- `automation/config.json`: 모델 `gpt-6-astra`, 추론강도 `xhigh`.
- 최근 32일간 이 도구의 사용 상한 80달러, 실행당 최대 20달러를 먼저 예약합니다. 중도 취소 시 예약 금액을 유지하여 재실행이 예산을 우회하지 않게 합니다. 정상 종료하면 실제 사용량 기준으로 정산합니다.
- 이 장부는 이 도구의 요청만 기록합니다. 다른 앱의 API 사용, 크레딧 만료·갱신, 서버 제공자의 요금 변경을 통제하지 않습니다. 자동 충전은 별도로 켜지 않습니다.
- 연결 시험/분석의 추론 토큰도 출력 비용에 포함합니다. 불완전 출력·통신 오류를 자동 재호출하지 않습니다.
- `automation/latest-run.json`: 추가·수정·보류 건수, 토큰 사용량, 검산 결과, 난수 표본의 원문·변수·분류와 대조 기록. AI 대조 기록을 사람의 독립 검수라고 표시하지 않습니다.
- 공식 자료가 늦어져 변경분이 없으면 `no_change`; 키가 없으면 API를 호출하지 않고 실패 원인을 표시합니다.
- 국내 통계는 별도 출처이므로 이 작업이 갱신하지 않습니다.

## 실행 명령

`node --test automation/verify-automation.mjs`

`node automation/verify-current.mjs`

실제 API 요청은 키·실행 ID와 저장된 예산 예약이 있는 GitHub Actions에서만 실행하는 것을 권장합니다. 저장소의 원래 사고분석 프로그램은 변경하지 않습니다.
