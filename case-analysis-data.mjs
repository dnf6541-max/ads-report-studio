/* Source-linked case review draft; statistics stay in deterministic analysis modules. */
export default {
  "schemaVersion": 1,
  "reviewedDate": "2026-11-25",
  "method": "전체 원문과 사고 전 행동·접촉부위 등 신고 변수의 AI 보조 검토 초안",
  "sourceCount": 134,
  "records": [
    {
      "id": "30270-16348",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was reversing northbound in an alley between [XXX] and [XXX] and initiating a parking maneuver into a parking stall located in a parking lot at the west side of the curb. While the Waymo AV was reversing at an angle, the rear left side of the Waymo AV made contact with a dumpster located near the east curb of the parking lot."
      ],
      "facts": [
        "골목에서 북쪽을 향해 후진하며 서측 주차면에 진입하는 주차 동작을 시작했다.",
        "비스듬히 후진하던 중 차량 좌측 후부가 주차장 동측 연석 근처의 쓰레기 수거함에 접촉했다.",
        "접촉 당시 Level 4 ADS가 작동 중이었고 차량 손상이 보고됐다. 신고 접촉부위는 차량 후면으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "서측 주차면으로 향하는 후진 경로에서 좌측 후부의 회전 궤적과 수거함 간격을 충분히 계산했는가?",
        "주차면을 선택한 뒤 후방 수거함의 위치·크기를 계속 갱신했는가?"
      ],
      "environmentHypotheses": [
        "동측 연석 부근 수거함의 돌출 정도가 후진 통로를 얼마나 제한했는가? 배치 자체의 부적절성은 확인되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "주차 동작 중 좌측 후부와 수거함의 최소 거리는 얼마였는가?",
          "material": "주차면·동서측 연석·수거함 실측 좌표와 크기, 차량 자세·조향각·후진 궤적"
        },
        {
          "question": "수거함을 언제 탐지하고 어떤 여유 거리를 적용했는가?",
          "material": "후방·측방 센서 원본, 객체 추적 및 점유지도, 후진 계획과 충돌검사 로그"
        },
        {
          "question": "이 주차 동작을 선택한 이유와 중단 가능 지점은 무엇인가?",
          "material": "목표 주차면 선택 기록, 대안 경로·정지 판단 로그, 현장 후진 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "비스듬한 후진의 좌측 후부 궤적까지 포함해 수거함과의 간격을 검사한다.",
          "후방 장애물 경계가 불확실하면 주차 경로를 다시 계산하거나 정지한다."
        ],
        "environment": [
          "실측 결과에 따라 수거함과 주차 동선 사이의 여유 공간 및 배치 표시를 검토한다."
        ],
        "operation": [
          "해당 주차면의 진입 동작을 재현 검증한 뒤 운행 경로에 반영한다."
        ]
      },
      "limits": "수거함의 정확한 위치·크기와 후진 각도가 없어 좌측 후부 접촉이 탐지, 경로 계획, 제어 중 어디에서 비롯됐는지 구분할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "reverse",
        "targetKind": "object",
        "targetLabel": "쓰레기 수거함",
        "relation": "behind",
        "stages": [
          "서측 주차면 진입 시작",
          "비스듬한 북향 후진",
          "좌측 후부 접촉"
        ],
        "caption": "주차면으로 비스듬히 후진하던 차량 좌측 후부가 수거함에 접촉",
        "geometryUnknown": [
          "주차면과 수거함의 상대 좌표",
          "후진 시작 자세와 조향 궤적",
          "수거함 돌출 폭"
        ],
        "evidence": [
          "The Waymo AV was reversing northbound in an alley between [XXX] and [XXX] and initiating a parking maneuver into a parking stall located in a parking lot at the west side of the curb. While the Waymo AV was reversing at an angle, the rear left side of the Waymo AV made contact with a dumpster located near the east curb of the parking lot."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4674:71f173d1:d9c625e1",
      "reportedRemediations": []
    },
    {
      "id": "35021-16694",
      "narrativeVersion": "1",
      "evidence": [
        "The MOIA AV was traveling eastbound on [XXX] and initiated a right turn onto southbound [XXX]. During the turn, the rear passenger-side wheel of the MOIA AV made contact with the curb. At the time of contact, the automated driving system was engaged."
      ],
      "facts": [
        "동쪽으로 주행한 뒤 남쪽 도로로 우회전하던 중 우측 뒷바퀴가 연석에 접촉했다.",
        "접촉 당시 ADS가 작동 중이었으며 이후 안전운전자가 수동 운전으로 전환해 정차·점검했다.",
        "우측 뒷바퀴에 작은 흠집이 발생했고 다른 도로 이용자는 관여하지 않았다고 보고됐다. 신고 접촉부위는 차량 후면 좌측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "우회전 안쪽을 지나는 우측 뒷바퀴의 궤적을 연석 경계와 충분히 분리했는가?",
        "차량 위치 추정 또는 조향 추종 오차가 회전 중 여유 거리를 줄였는가?"
      ],
      "environmentHypotheses": [
        "교차로 모서리 연석의 곡률·높이와 가시성이 지도 또는 현장 인식에 충분히 반영됐는가? 관리 결함은 보고되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "바퀴가 연석과 겹친 회전 구간은 어디인가?",
          "material": "교차로 모서리 연석의 실측 형상, 휠베이스·윤거, 시간별 차량 자세와 바퀴 궤적"
        },
        {
          "question": "계획 궤적과 실제 조향 사이에 차이가 있었는가?",
          "material": "연석 감지 원본, 위치 추정 공분산, 계획 경로·조향 명령·실제 조향각 로그"
        },
        {
          "question": "접촉 이후 통제 전환과 점검은 어떤 순서였는가?",
          "material": "충격·가속도 로그, 안전운전자 개입 시각, 정차 후 바퀴 사진과 점검 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "우회전 검증에서 우측 뒷바퀴의 안쪽 궤적과 연석 여유 거리를 별도로 확인한다."
        ],
        "environment": [
          "모서리 연석의 형상을 실측하고 지도·가시성 보완 필요 여부를 확인한다."
        ],
        "operation": [
          "연석 접촉 감지 후 정차·점검·재출발 조건을 운영 절차에 반영한다."
        ]
      },
      "limits": "Narrative는 우측 뒷바퀴 접촉, 신고 변수는 후면 좌측 접촉으로 표기해 좌우가 다르다. 장면은 구체적 Narrative를 따르며 원시 영상·손상 사진 대조가 필요하다. 연석 곡률과 실제 바퀴 궤적이 없어 경로 계획 오차와 제어 오차를 분리할 수 없다. raw 속도 7 mph가 전체 회전 구간 속도인지는 불명확하다.",
      "scene": {
        "setting": "intersection",
        "motion": "right",
        "targetKind": "curb",
        "targetLabel": "모서리 연석",
        "relation": "right",
        "stages": [
          "동향 접근",
          "남향 우회전",
          "우측 뒷바퀴 접촉"
        ],
        "caption": "동쪽에서 남쪽으로 우회전하던 차량의 우측 뒷바퀴가 연석에 접촉",
        "geometryUnknown": [
          "모서리 연석 반경·높이",
          "우측 뒷바퀴의 궤적",
          "회전 시작 위치"
        ],
        "evidence": [
          "The MOIA AV was traveling eastbound on [XXX] and initiated a right turn onto southbound [XXX]. During the turn, the rear passenger-side wheel of the MOIA AV made contact with the curb. At the time of contact, the automated driving system was engaged."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "5085:b90d02fc:3978f44",
      "reportedRemediations": []
    },
    {
      "id": "13781-16677",
      "narrativeVersion": "1",
      "evidence": [
        "The ADS was turning left in an alley and made contact with a utility meter at approximately 0.45MPH."
      ],
      "facts": [
        "골목에서 ADS가 좌회전하던 중 약 0.45 mph로 설비 계량기에 접촉했다.",
        "차량에 승객은 없었다고 보고됐다.",
        "신고 접촉부위는 차량 전면 좌측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "신고 변수에 신고된 전면 좌측의 어느 지점이 계량기와 겹쳤으며 해당 돌출물이 점유지도에 포함됐는가?",
        "극저속에서도 계량기까지의 남은 거리에 맞춘 정지 판단이 가능했는가?"
      ],
      "environmentHypotheses": [
        "계량기가 골목 회전 공간에 얼마나 돌출돼 있었는가? 설치 기준 위반 여부는 자료에 없다."
      ],
      "dataNeeded": [
        {
          "question": "계량기와 차량의 접촉 위치는 어디인가?",
          "material": "계량기 높이·폭·돌출 깊이 실측, 골목 폭, 차량 손상 사진과 좌회전 궤적"
        },
        {
          "question": "계량기 인식과 충돌 예측이 어떻게 이뤄졌는가?",
          "material": "측방 센서 원본, 물체 분류·점유지도, 경로 계획 및 제동 명령 로그"
        },
        {
          "question": "회전 전에 사용할 수 있는 대체 공간이 있었는가?",
          "material": "진입 전후 현장 영상, 주변 고정물 좌표, 정지·재계획 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "저속 좌회전의 차체 전체 궤적에 계량기 같은 작은 돌출물을 포함해 검사한다."
        ],
        "environment": [
          "골목 내 계량기의 돌출 정도를 확인하고 필요시 보호·시인성·통행 공간을 검토한다."
        ],
        "operation": [
          "접촉 위치를 확인해 해당 골목 회전 경로의 통과 조건을 재검증한다."
        ]
      },
      "limits": "신고 변수는 전면 좌측 접촉으로 표시하지만 계량기의 위치·높이와 구체적인 접촉 지점은 제시하지 않는다. raw의 반올림된 1 mph보다 사고 경위의 약 0.45 mph를 우선했다.",
      "scene": {
        "setting": "road",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "설비 계량기",
        "relation": "unknown",
        "stages": [
          "골목 내 이동",
          "약 0.45 mph 좌회전",
          "계량기 접촉"
        ],
        "caption": "골목에서 약 0.45 mph로 좌회전하던 ADS가 설비 계량기에 접촉",
        "geometryUnknown": [
          "계량기의 좌우 위치·높이",
          "전면 좌측의 구체적 접촉 지점",
          "골목 폭과 회전 반경"
        ],
        "evidence": [
          "The ADS was turning left in an alley and made contact with a utility meter at approximately 0.45MPH."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "3275:39835fe1:abcf3c3",
      "reportedRemediations": []
    },
    {
      "id": "13781-16675",
      "narrativeVersion": "1",
      "evidence": [
        "The ADS was turning left into an alley between an unmanned bicycle standing upright on the road to the left and a guardrail on the right and made contact with the guardrail at approximately 0.25MPH."
      ],
      "facts": [
        "ADS는 도로 왼쪽에 세워진 무인 자전거와 오른쪽 가드레일 사이로 골목에 좌회전 진입했다.",
        "약 0.25 mph에서 오른쪽 가드레일에 접촉했으며 승객은 없었다.",
        "신고 접촉부위는 차량 전면 좌측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "좌측 자전거를 피하는 경로에서 우측 가드레일까지의 차체 여유 거리를 충분히 확보했는가?",
        "좁은 통로가 통과 불가능하거나 불확실할 때 정지하는 기준이 적용됐는가?"
      ],
      "environmentHypotheses": [
        "자전거와 가드레일 사이 실제 유효 폭은 얼마였는가? 자전거의 존재만으로 주차·관리상 과실을 단정할 수 없다."
      ],
      "dataNeeded": [
        {
          "question": "차량이 통과할 수 있는 폭이 실제로 확보됐는가?",
          "material": "자전거·가드레일의 좌표와 돌출 형상, 골목 입구 폭, 차량 전후 코너 궤적"
        },
        {
          "question": "자전거 회피와 가드레일 간격을 어떻게 절충했는가?",
          "material": "좌우 센서 영상, 객체 경계·점유지도, 비용함수와 후보 경로·충돌검사 로그"
        },
        {
          "question": "극저속 진행을 지속한 조건은 무엇인가?",
          "material": "속도·조향·제동 로그, 정지 임계값, 원격 지원 또는 재계획 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "양쪽 장애물 사이 좌회전에서 차량 전체 궤적의 최소 간격을 확인하고 부족하면 정지한다."
        ],
        "environment": [
          "골목 입구의 자전거 위치와 가드레일 돌출을 확인해 통로 확보 방안을 검토한다."
        ],
        "operation": [
          "해당 협소 진입부를 재현해 통과·지원 요청 기준을 점검한다."
        ]
      },
      "limits": "신고 변수에 차량 전면 좌측 접촉이 표시되고 Narrative는 오른쪽 가드레일을 지목한다. 두 장애물 사이 폭과 차량 자세가 없어 전면 좌측이 오른쪽 가드레일과 만나는 구체적 배치를 재구성할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "left",
        "targetKind": "barrier",
        "targetLabel": "우측 가드레일",
        "relation": "right",
        "stages": [
          "좌측 자전거·우측 가드레일",
          "사이로 골목 좌회전",
          "우측 가드레일 접촉"
        ],
        "caption": "자전거와 가드레일 사이로 좌회전하던 ADS가 우측 가드레일에 접촉",
        "geometryUnknown": [
          "두 장애물 사이 유효 폭",
          "가드레일 높이·돌출",
          "전면 좌측을 포함한 좌회전 차체 궤적"
        ],
        "evidence": [
          "The ADS was turning left into an alley between an unmanned bicycle standing upright on the road to the left and a guardrail on the right and made contact with the guardrail at approximately 0.25MPH."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "3471:b214f7d9:851b84ad",
      "reportedRemediations": []
    },
    {
      "id": "13781-16674",
      "narrativeVersion": "1",
      "evidence": [
        "The ADS was stopped at the exit of a parking lot with the right turn signal activated. The ADS proceeded with its right turn to follow the navigation route and at approximately 4MPH made contact with a low-hanging metal chain with an octagonal sign hanging from the chain that was blocking the exit."
      ],
      "facts": [
        "주차장 출구에서 오른쪽 방향지시등을 켠 채 정차한 뒤 내비게이션 경로를 따라 우회전을 시작했다.",
        "약 4 mph로 진행하다 출구를 막고 있던 낮은 금속 체인과 접촉했다. 체인에는 팔각형 표지가 매달려 있었다.",
        "차량에 승객은 없었다. 신고 접촉부위는 차량 전면 우측, 상부으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "체인과 매달린 표지를 출구 폐쇄 장애물로 함께 인식했는가?",
        "정차 후 출발 시 내비게이션 경로보다 실시간 통행 가능성 판단을 우선했는가?"
      ],
      "environmentHypotheses": [
        "출구 차단 체인·표지의 높이, 대비, 사전 안내는 어떠했는가? 차단물이 있었다는 사실만으로 관리 과실을 추정할 수 없다."
      ],
      "dataNeeded": [
        {
          "question": "체인이 차량의 어느 높이와 궤적을 가로막았는가?",
          "material": "체인 양 끝 좌표·처짐 높이·표지 크기, 출구 폭, 우회전 진입 궤적과 접촉 사진"
        },
        {
          "question": "체인과 팔각형 표지를 언제 어떻게 분류했는가?",
          "material": "출구 정차 전후 카메라·라이다 원본, 표지 인식·점유지도·통행 가능성 로그"
        },
        {
          "question": "정차에서 진행으로 전환한 근거는 무엇인가?",
          "material": "내비게이션 경로, 출발 승인·장애물 회피·제동 명령 로그, 현장 차단 안내 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "얇은 체인과 연결된 표지를 하나의 통행 차단 경계로 추적한다.",
          "출발 전에 출구 개방 상태를 재확인하고 차단되면 다른 경로를 선택한다."
        ],
        "environment": [
          "차단 체인의 가시성 및 출구 폐쇄 안내 위치를 현장 확인한다."
        ],
        "operation": [
          "폐쇄 출구 발견 시 재경로·지원 요청 절차를 적용한다."
        ]
      },
      "limits": "팔각형이라는 모양만 알려져 표지의 문구나 법적 의미는 확인되지 않는다. 체인 높이와 탐지 시점도 불명확하다.",
      "scene": {
        "setting": "parking",
        "motion": "right",
        "targetKind": "barrier",
        "targetLabel": "표지가 달린 체인",
        "relation": "ahead",
        "stages": [
          "출구에서 정차",
          "우회전 출발",
          "차단 체인 접촉"
        ],
        "caption": "주차장 출구에서 우회전 출발 후 표지가 달린 낮은 체인에 접촉",
        "geometryUnknown": [
          "체인의 높이·처짐",
          "출구 폭과 체인 배치",
          "표지의 크기·방향"
        ],
        "evidence": [
          "The ADS was stopped at the exit of a parking lot with the right turn signal activated. The ADS proceeded with its right turn to follow the navigation route and at approximately 4MPH made contact with a low-hanging metal chain with an octagonal sign hanging from the chain that was blocking the exit."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "3679:597dfdc4:b4e49798",
      "reportedRemediations": []
    },
    {
      "id": "13781-16672",
      "narrativeVersion": "1",
      "evidence": [
        "The ADS was proceeding straight in a parking lot going as fast as 5MPH and drove into a large pothole filled with water. The ADS had a safety monitor present in the vehicle with no passengers."
      ],
      "facts": [
        "주차장에서 ADS가 최대 5 mph로 직진하다 물이 찬 큰 포트홀 안으로 들어갔다.",
        "안전 모니터 요원이 탑승했고 승객은 없었다.",
        "신고 접촉부위는 차체 하부이며, 피해수준은 재산피해·부상 보고 없음으로 분류됐다."
      ],
      "vehicleHypotheses": [
        "수면 아래 포트홀의 깊이와 통과 위험을 판단할 수 있었는가?",
        "주차장 저속 운행에서도 불확실한 노면 구간에 대한 감속·정지 기준이 적용됐는가?"
      ],
      "environmentHypotheses": [
        "물이 고인 원인과 포트홀의 깊이·지속 기간은 무엇인가? 배수 또는 보수상 과실은 현재 자료로 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "바퀴가 진입한 포트홀의 형상과 실제 속도는 어떠했는가?",
          "material": "배수 후 깊이·폭 실측, 수면 범위, 바퀴 궤적·속도·수직가속도 기록"
        },
        {
          "question": "수면과 노면 결손을 시스템이 어떻게 평가했는가?",
          "material": "전방 센서 원본, 지면 높이·주행 가능 영역 추정, 위험도·감속 계획 로그"
        },
        {
          "question": "안전 모니터가 위험을 확인하고 개입할 시간은 있었는가?",
          "material": "전방·실내 영상, 개입 요청·실제 개입 기록, 현장 조도 및 유지보수 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "물에 가린 노면의 형상 불확실성을 통과 판단에 반영하고 확인이 어려우면 정지한다."
        ],
        "environment": [
          "포트홀과 배수 상태를 실측해 보수·임시 표시 필요성을 검토한다."
        ],
        "operation": [
          "안전 모니터의 노면 위험 보고 및 정지 개입 기준을 확인한다."
        ]
      },
      "limits": "최대 5 mph라는 서술만 있어 진입 순간 속도·바퀴 궤적·손상 부품은 확인되지 않는다. 차체 하부 접촉은 신고 변수에 표시돼 있으나 원문만으로 미인지, 깊이 판단, 대응 중 어떤 문제가 있었는지 구분할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "pothole",
        "targetLabel": "물이 찬 포트홀",
        "relation": "under",
        "stages": [
          "주차장 직진",
          "물 고인 포트홀 접근",
          "포트홀 진입"
        ],
        "caption": "주차장에서 최대 5 mph로 직진하던 ADS가 물이 찬 큰 포트홀에 진입",
        "geometryUnknown": [
          "포트홀 깊이·폭",
          "수면 아래 결손 형상",
          "진입한 바퀴와 궤적"
        ],
        "evidence": [
          "The ADS was proceeding straight in a parking lot going as fast as 5MPH and drove into a large pothole filled with water. The ADS had a safety monitor present in the vehicle with no passengers."
        ],
        "roadConfirmed": true,
        "waterFilled": true
      },
      "sourceFingerprint": "3394:eafdf6dc:32e3c6c6",
      "reportedRemediations": []
    },
    {
      "id": "13781-16671",
      "narrativeVersion": "1",
      "evidence": [
        "The ADS was turning left into a parking lot to follow the navigation route and at approximately 3MPH, made contact with a low-hanging metal chain that was blocking the entrance of the parking lot."
      ],
      "facts": [
        "ADS가 내비게이션 경로를 따라 주차장으로 좌회전 진입했다.",
        "약 3 mph에서 입구를 막고 있던 낮은 금속 체인에 접촉했고 승객은 없었다.",
        "신고 접촉부위는 차량 전면 우측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "낮은 체인이 주차장 진입 경로를 가로막는다는 점을 인식했는가?",
        "입구 폐쇄 상태를 경로 추종보다 우선해 정지 또는 재경로를 선택했는가?"
      ],
      "environmentHypotheses": [
        "체인의 높이·두께와 입구 폐쇄 안내가 진입 방향에서 보였는가? 관리 적정성은 추가 확인이 필요하다."
      ],
      "dataNeeded": [
        {
          "question": "체인과 좌회전 경로가 어느 높이에서 만났는가?",
          "material": "입구·체인 고정점 실측, 처짐 높이, 차량 좌회전 궤적 및 접촉 위치"
        },
        {
          "question": "체인 탐지 이후 경로가 갱신됐는가?",
          "material": "전방·측방 영상과 라이다 원본, 얇은 장애물 탐지·점유지도·재계획 로그"
        },
        {
          "question": "차단된 입구 대신 이용할 접근 경로가 있었는가?",
          "material": "내비게이션 지도와 목적지 진입점, 현장 안내, 정지·우회 선택 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "진입 경로를 가로지르는 낮은 체인의 인식과 충돌검사를 검증한다."
        ],
        "environment": [
          "입구 차단물의 가시성 및 폐쇄 안내를 확인한다."
        ],
        "operation": [
          "차단 입구 감지 시 목적지 진입점을 변경하거나 지원을 요청한다."
        ]
      },
      "limits": "신고 변수에 전면 우측 접촉이 표시되지만 체인의 정확한 높이와 전면 우측의 접촉 지점은 제시되지 않는다. 인식 누락과 높이 기반 통과 판단 오류를 구분할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "barrier",
        "targetLabel": "입구 금속 체인",
        "relation": "ahead",
        "stages": [
          "주차장 경로 선택",
          "좌회전 진입",
          "낮은 체인 접촉"
        ],
        "caption": "주차장으로 좌회전 진입하던 ADS가 입구를 막은 낮은 체인에 접촉",
        "geometryUnknown": [
          "체인 높이·두께",
          "입구 폭과 고정점 위치",
          "좌회전 궤적"
        ],
        "evidence": [
          "The ADS was turning left into a parking lot to follow the navigation route and at approximately 3MPH, made contact with a low-hanging metal chain that was blocking the entrance of the parking lot."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "3472:3ce21893:64cb8637",
      "reportedRemediations": []
    },
    {
      "id": "30451-16657",
      "narrativeVersion": "1",
      "evidence": [
        "At the time of the incident, the Gatik truck was lawfully within the rightmost lane of a 3-lane northbound roadway when the topmost right (passenger) side corner of the cargo box was struck by a tree branch that protruded into the driveable roadway corridor. The event only resulted in minor damage to the top right corner of the box and minor cosmetic scuffing along the passenger side box panel."
      ],
      "facts": [
        "ADS가 작동 중인 Gatik 트럭이 북향 도로 오른쪽 끝 차로에서 주행했다.",
        "주행 가능한 도로 공간으로 뻗은 나뭇가지가 화물함 우측 상단 모서리에 닿았다.",
        "화물함 우측 상단과 우측 패널에 경미한 손상이 보고됐다. 신고 접촉부위는 차량 전면 좌측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "화물함 높이와 우측 상단의 입체 통과 공간이 경로 검사에 포함됐는가?",
        "상부·측방 나뭇가지의 위치를 충분한 거리에서 탐지하고 회피 또는 정지할 수 있었는가?"
      ],
      "environmentHypotheses": [
        "가지가 침범한 높이·폭과 당시 처짐 상태는 어떠했는가? 도로 공간으로 돌출됐다는 보고와 관리 주체의 과실은 별개다."
      ],
      "dataNeeded": [
        {
          "question": "가지와 화물함 상단이 겹친 입체 구간은 어디인가?",
          "material": "가지 높이·돌출 폭 실측, 화물함 치수, 차로 경계와 트럭 자세·궤적"
        },
        {
          "question": "상부 장애물을 감지하고 통과 높이를 검사했는가?",
          "material": "상방·전방 센서 원본, 3차원 점유지도, 차량 외형 모델·회피 계획 로그"
        },
        {
          "question": "야간 가지 위치와 가시성에 어떤 변동이 있었는가?",
          "material": "현장 조도·바람 기록, 사고 전후 가지 사진, 수목 점검·민원 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "화물함 우측 상단까지 포함한 3차원 통과 공간 검사를 강화한다."
        ],
        "environment": [
          "도로 위 가지 돌출을 실측하고 필요한 정리·표시 범위를 검토한다."
        ],
        "operation": [
          "높은 적재함 차량의 해당 구간 통과 조건을 재검증한다."
        ]
      },
      "limits": "Narrative는 화물함 우측 상단 접촉, 신고 변수는 전면 좌측 접촉으로 표기해 부위가 다르다. 장면은 구체적 Narrative를 따르며 원시 영상·손상 사진 대조가 필요하다. 사고 경위의 차로 내 주행 진술만으로 정확한 측방 간격이나 가지의 흔들림을 알 수 없다. 접촉 원인이 탐지 범위인지 경로 여유인지 확인이 필요하다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "돌출 나뭇가지",
        "relation": "above",
        "stages": [
          "북향 주행",
          "우측 상부 가지 접근",
          "화물함 우측 상단 접촉"
        ],
        "caption": "도로로 뻗은 나뭇가지가 주행 중인 트럭 화물함 우측 상단에 접촉",
        "geometryUnknown": [
          "가지의 높이·돌출 폭",
          "화물함 상단과 차로 경계 간격",
          "접촉 시 가지 처짐"
        ],
        "evidence": [
          "At the time of the incident, the Gatik truck was lawfully within the rightmost lane of a 3-lane northbound roadway when the topmost right (passenger) side corner of the cargo box was struck by a tree branch that protruded into the driveable roadway corridor. The event only resulted in minor damage to the top right corner of the box and minor cosmetic scuffing along the passenger side box panel."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4513:4fc6164c:28f3981e",
      "reportedRemediations": []
    },
    {
      "id": "30451-16656",
      "narrativeVersion": "1",
      "evidence": [
        "At the time of the incident, the Gatik truck was lawfully within the leftmost lane of a 3-lane roadway when the driverâs side front mirror assembly made light glancing contact with a street sign affixed to a post mounted on the raised center median."
      ],
      "facts": [
        "ADS가 작동 중인 트럭이 북서쪽으로 도로 왼쪽 끝 차로에서 주행했다.",
        "높아진 중앙분리대의 기둥에 설치된 도로 표지와 운전석 측 앞 거울이 스치듯 접촉했다.",
        "거울 케이스가 긁히고 분리됐다가 다시 장착됐다고 보고됐다. 신고 접촉부위는 차량 전면으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "차체보다 돌출된 운전석 측 거울과 중앙분리대 표지의 간격을 검사했는가?",
        "표지의 측방 돌출·높이를 도로 경계와 별도 장애물로 모델링했는가?"
      ],
      "environmentHypotheses": [
        "중앙분리대 표지가 통행 공간 쪽으로 얼마나 돌출돼 있었는가? 적정 설치 여부는 실측 없이 판단할 수 없다."
      ],
      "dataNeeded": [
        {
          "question": "거울 끝과 표지 사이 실제 간격은 얼마였는가?",
          "material": "표지 모서리·기둥·중앙분리대 실측, 거울 돌출 치수, 차량 자세와 횡방향 궤적"
        },
        {
          "question": "표지와 거울의 충돌 가능성을 언제 계산했는가?",
          "material": "좌측 센서 원본, 표지 경계 추정, 외형 모델·측방 안전거리·조향 제어 로그"
        },
        {
          "question": "보고된 경미한 접촉의 속도와 진동은 어떠했는가?",
          "material": "속도·가속도·조향 로그, 거울 손상 사진, 해당 표지 점검 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "차체 폭뿐 아니라 좌측 거울의 돌출 폭을 표지 회피 경로에 반영한다."
        ],
        "environment": [
          "중앙분리대 표지의 높이와 측방 여유를 실측해 배치 보완 필요성을 확인한다."
        ],
        "operation": [
          "표지 돌출 구간에서 트럭의 통과 위치·속도 조건을 검증한다."
        ]
      },
      "limits": "보고서가 차로 내 주행을 기술하나 표지의 돌출 폭과 차량 횡위치가 없어 충분한 간격이 있었는지 확인할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "중앙분리대 도로 표지",
        "relation": "left",
        "stages": [
          "북서향 주행",
          "중앙분리대 표지 접근",
          "운전석 앞 거울 접촉"
        ],
        "caption": "왼쪽 끝 차로를 달리던 트럭의 운전석 앞 거울이 중앙분리대 표지에 접촉",
        "geometryUnknown": [
          "표지의 측방 돌출·높이",
          "거울 끝의 실제 궤적",
          "중앙분리대와 차로 경계 위치"
        ],
        "evidence": [
          "At the time of the incident, the Gatik truck was lawfully within the leftmost lane of a 3-lane roadway when the driverâs side front mirror assembly made light glancing contact with a street sign affixed to a post mounted on the raised center median."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4532:ea7b0d8b:35bdb54b",
      "reportedRemediations": []
    },
    {
      "id": "30270-16347",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling northwestbound, turning right within a parking lot on [XXX] when it slowed to a stop near a section of parking bollards located near the north curb. The Waymo AV began reversing at an angle towards the south curb of the parking lot, and while the Waymo AV was reversing, the front right side of the Waymo AV made contact with a parking bollard to the right of the Waymo AV."
      ],
      "facts": [
        "주차장에서 북서향으로 우회전하다 북측 연석 근처 볼라드 구간 옆에 정차했다.",
        "남측 연석 방향으로 비스듬히 후진하던 중 차량 전면 우측이 우측 볼라드에 접촉했다.",
        "ADS 작동 중 접촉했으며 차량 손상과 견인이 보고됐다. 신고 접촉부위는 차량 전면 좌측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "후진 시 전면 우측이 옆으로 움직이는 궤적을 볼라드 회피에 포함했는가?",
        "정차 후 후진 방향을 정할 때 가까운 우측 볼라드의 경계를 충분히 유지했는가?"
      ],
      "environmentHypotheses": [
        "북측 연석 주변 볼라드 간격과 후진 회전 공간은 어떠했는가? 배치 과실은 확인되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "후진 중 전면 우측의 회전 궤적이 볼라드와 어떻게 겹쳤는가?",
          "material": "볼라드 좌표·지름, 남북 연석 위치, 차체 치수와 후진 자세·조향 궤적"
        },
        {
          "question": "후진 계획에서 전면 측방 충돌을 검사했는가?",
          "material": "전·측방 센서 원본, 볼라드 추적·차체 점유영역, 후진 후보 경로와 충돌검사 로그"
        },
        {
          "question": "정지 상태에서 이 후진 동작을 선택한 이유는 무엇인가?",
          "material": "우회전 종료 위치, 경로 재계획·정지 판단 기록, 접촉 전후 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "후진 경로 검증에 전면 우측의 회전 궤적과 볼라드 간격을 포함한다."
        ],
        "environment": [
          "볼라드와 주행·회차 공간의 실측 간격 및 표시를 검토한다."
        ],
        "operation": [
          "해당 볼라드 구간의 우회전 후 후진 동작을 재현 검증한다."
        ]
      },
      "limits": "Narrative는 전면 우측 접촉, 신고 변수는 전면 좌측 접촉으로 표기해 좌우가 다르다. 장면은 구체적 Narrative를 따르며 원시 영상·손상 사진 대조가 필요하다. 후진 각도와 볼라드 배치가 없어 전면 우측 접촉을 단순 후방 탐지 문제로 해석할 수 없다. 유사 서술의 다른 보고서와 동일 사건인지도 이 자료만으로 판단하지 않는다.",
      "scene": {
        "setting": "parking",
        "motion": "reverse",
        "targetKind": "barrier",
        "targetLabel": "우측 주차 볼라드",
        "relation": "right",
        "stages": [
          "우회전 후 정차",
          "남측으로 비스듬히 후진",
          "전면 우측 볼라드 접촉"
        ],
        "caption": "우회전 후 비스듬히 후진하던 차량의 전면 우측이 우측 볼라드에 접촉",
        "geometryUnknown": [
          "볼라드 좌표·간격",
          "후진 시작 자세·조향각",
          "전면 우측 회전 궤적"
        ],
        "evidence": [
          "The Waymo AV was traveling northwestbound, turning right within a parking lot on [XXX] when it slowed to a stop near a section of parking bollards located near the north curb. The Waymo AV began reversing at an angle towards the south curb of the parking lot, and while the Waymo AV was reversing, the front right side of the Waymo AV made contact with a parking bollard to the right of the Waymo AV."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "5040:861189e0:f3a9c3a6",
      "reportedRemediations": []
    },
    {
      "id": "13781-16256",
      "narrativeVersion": "2",
      "evidence": [
        "The ADS was stopped at the exit of a parking lot with the right turn signal activated. The ADS proceeded with its right turn to follow the navigation route and made contact with a low-hanging metal chain at approximately 2MPH that was blocking the exit."
      ],
      "facts": [
        "주차장 출구에서 우측 방향지시등을 켜고 정차한 뒤 경로를 따라 우회전을 시작했다.",
        "Narrative에 따르면 약 2 mph에서 출구를 막은 낮은 금속 체인에 접촉했다.",
        "승객은 없었으며 버전 2는 사고 시각 수정 보고라고 설명한다. 신고 접촉부위는 차량 전면 좌측, 전면 우측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "정차 중 낮은 체인의 출구 차단 상태를 확인하고 출발을 제한했는가?",
        "출발 이후 체인까지의 거리에 맞춘 정지 계획이 유지됐는가?"
      ],
      "environmentHypotheses": [
        "출구의 체인 높이·대비와 폐쇄 안내는 어떠했는가? 안내가 없었다는 근거는 없다."
      ],
      "dataNeeded": [
        {
          "question": "실제 출발·접촉 동작과 속도는 무엇인가?",
          "material": "사고 시각 정정 근거, 원시 속도·조향 로그, 동기화된 차량 영상; raw 직진·1 mph와 Narrative 우회전·약 2 mph 대조"
        },
        {
          "question": "체인이 어느 높이에서 경로를 막았는가?",
          "material": "체인 고정점·처짐 높이·출구 폭 실측, 차량 접촉 위치와 궤적"
        },
        {
          "question": "출발을 허용한 인식·계획 결과는 무엇인가?",
          "material": "정차 전후 센서 원본, 점유지도·차단물 분류, 출발 승인·제동·재경로 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "출구 정차 후 재출발 시 체인 등 낮은 경계물의 통과 가능성을 다시 확인한다."
        ],
        "environment": [
          "체인 가시성과 출구 폐쇄 안내를 확인해 보완 필요성을 검토한다."
        ],
        "operation": [
          "보고 필드 간 속도·동작 차이를 원시 기록으로 정리하고 차단 출구 대응을 점검한다."
        ]
      },
      "limits": "신고 변수는 직진·1 mph, Narrative는 우회전·약 2 mph로 서로 다르다. 장면은 상세 Narrative를 따르지만 실제 궤적·속도는 로그 확인이 필요하다.",
      "scene": {
        "setting": "parking",
        "motion": "right",
        "targetKind": "barrier",
        "targetLabel": "출구 금속 체인",
        "relation": "ahead",
        "stages": [
          "출구 정차",
          "우회전 출발",
          "차단 체인 접촉"
        ],
        "caption": "출구에서 우회전 출발한 ADS가 낮은 금속 체인에 접촉",
        "geometryUnknown": [
          "체인 높이와 고정점",
          "실제 회전 궤적",
          "차량 접촉 위치"
        ],
        "evidence": [
          "The ADS was stopped at the exit of a parking lot with the right turn signal activated. The ADS proceeded with its right turn to follow the navigation route and made contact with a low-hanging metal chain at approximately 2MPH that was blocking the exit."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "3741:bffb8354:e23457c6",
      "reportedRemediations": []
    },
    {
      "id": "35021-16401",
      "narrativeVersion": "2",
      "evidence": [
        "The MOIA AV was operating on a curved section of roadway within the Lake Nona medical campus during validation testing of a new map release. While following the curve through the left turn, the rear driver-side wheel made contact with the adjacent curb."
      ],
      "facts": [
        "새 지도 릴리스를 검증하던 MOIA 시험차가 의료 캠퍼스의 굽은 도로에서 좌회전을 수행했다.",
        "곡선을 따라 주행하던 중 운전석 측 뒷바퀴가 인접 연석에 접촉했다.",
        "ADS가 작동 중이었고 좌측 뒷바퀴 림 가장자리와 스포크 면의 마모가 보고됐다. 신고 접촉부위는 차량 후면으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "새 지도의 곡선·연석 경계가 실제 좌측 뒷바퀴 궤적에 맞게 표현됐는가?",
        "곡선을 따르는 동안 위치 추정이나 조향 추종 오차가 안쪽 간격을 줄였는가?"
      ],
      "environmentHypotheses": [
        "캠퍼스 도로의 실제 연석 곡률과 지도 기준 시점 사이에 차이가 있었는가? 현장 변경이나 관리 결함은 보고되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "좌측 뒷바퀴와 연석이 겹친 곡선 구간은 어디인가?",
          "material": "캠퍼스 연석 실측 형상, 차량 치수·자세·바퀴 궤적, 손상 위치 사진"
        },
        {
          "question": "새 지도와 인식한 도로 경계가 일치했는가?",
          "material": "검증 대상 지도 버전·변경점, 센서 원본과 연석 추정, 위치 추정·계획·제어 로그"
        },
        {
          "question": "접촉을 당시 감지하고 검증 절차에 반영했는가?",
          "material": "충격·가속도 로그, 시험 시나리오와 이벤트 기록, 사후 손상 점검·검토 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "지도 검증에 곡선 안쪽 뒷바퀴의 연석 여유 거리 검사를 포함한다."
        ],
        "environment": [
          "캠퍼스 곡선 연석을 실측해 지도 경계와 대조한다."
        ],
        "operation": [
          "지도 릴리스 시험에서 경미한 바퀴 접촉도 즉시 점검·분류한다."
        ]
      },
      "limits": "신고 변수는 Parking Lot, Narrative는 의료 캠퍼스의 굽은 도로로 기술해 법적 도로 구분은 불명확하다. 새 지도 시험이라는 배경만으로 지도 오류를 원인으로 볼 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "left",
        "targetKind": "curb",
        "targetLabel": "좌측 곡선 연석",
        "relation": "left",
        "stages": [
          "새 지도 검증 주행",
          "곡선 따라 좌회전",
          "좌측 뒷바퀴 접촉"
        ],
        "caption": "의료 캠퍼스에서 새 지도를 검증하던 시험차의 좌측 뒷바퀴가 연석에 접촉",
        "geometryUnknown": [
          "연석 곡률·높이",
          "좌측 뒷바퀴의 실제 궤적",
          "지도와 실측 경계의 차이"
        ],
        "evidence": [
          "The MOIA AV was operating on a curved section of roadway within the Lake Nona medical campus during validation testing of a new map release. While following the curve through the left turn, the rear driver-side wheel made contact with the adjacent curb."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "6237:6c390aaf:3694537f",
      "reportedRemediations": []
    },
    {
      "id": "30270-16366",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was stopped facing north in a drive aisle of a parking lot on [XXX] near [XXX], yielding to southbound traffic in the drive aisle. After southbound traffic cleared, the Waymo AV initiated a reversing maneuver to execute a multi-point turn, and as the Waymo AV reversed, the rear of the Waymo AV made contact with a dumpster positioned along the west side wall of the parking lot."
      ],
      "facts": [
        "주차장 통로에서 북쪽을 향해 정차하고 남향 차량이 지나가기를 기다렸다.",
        "남향 차량이 지나간 뒤 여러 번 방향을 바꾸는 회차를 위해 후진했고, 차량 후부가 서측 벽을 따라 놓인 수거함에 접촉했다.",
        "ADS 작동 중 접촉했으며 차량 손상과 견인이 보고됐다. 신고 접촉부위는 차량 후면 우측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "회차 첫 후진 구간에서 서측 벽 옆 수거함까지의 후방 여유를 충분히 확인했는가?",
        "남향 차량 통과 후 고정 장애물과 차량 자세를 다시 확인했는가?"
      ],
      "environmentHypotheses": [
        "서측 벽·수거함과 주행 통로 사이의 회차 공간은 얼마였는가? 수거함 배치의 적정성은 미확인이다."
      ],
      "dataNeeded": [
        {
          "question": "후진 시작 자세에서 수거함까지 통과 가능한 공간은 얼마였는가?",
          "material": "서측 벽·수거함 좌표와 크기, 통로 폭, 정차 자세 및 후진 궤적"
        },
        {
          "question": "회차 계획이 수거함을 어떤 위치로 인식했는가?",
          "material": "후방 센서 원본, 객체 추적·점유지도, 다중 회차 계획·충돌검사 로그"
        },
        {
          "question": "남향 차량이 지나간 뒤 어떤 조건으로 후진을 시작했는가?",
          "material": "교통 객체 추적 기록, 후진 승인·기어·제동 로그, 현장 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "다중 회차의 각 후진 구간마다 후방 고정물과 차체 간격을 재검사한다."
        ],
        "environment": [
          "벽 옆 수거함과 회차 통로의 유효 공간을 실측해 배치·표시를 검토한다."
        ],
        "operation": [
          "이 통로에서 회차 가능한 차량 자세와 지원 요청 조건을 검증한다."
        ]
      },
      "limits": "서측 벽을 따라 놓인 수거함이라는 설명만 있어 후진 각도와 수거함까지의 거리는 불명확하다. 남향 교통이 직접 접촉에 관여했다는 근거는 없다.",
      "scene": {
        "setting": "parking",
        "motion": "reverse",
        "targetKind": "object",
        "targetLabel": "벽 옆 쓰레기 수거함",
        "relation": "behind",
        "stages": [
          "남향 교통에 양보",
          "회차 위해 후진",
          "차량 후부 수거함 접촉"
        ],
        "caption": "남향 교통에 양보한 뒤 회차를 위해 후진하다 차량 후부가 수거함에 접촉",
        "geometryUnknown": [
          "서측 벽·수거함 위치",
          "통로 폭과 후진 각도",
          "차량 후부의 접촉 지점"
        ],
        "evidence": [
          "The Waymo AV was stopped facing north in a drive aisle of a parking lot on [XXX] near [XXX], yielding to southbound traffic in the drive aisle. After southbound traffic cleared, the Waymo AV initiated a reversing maneuver to execute a multi-point turn, and as the Waymo AV reversed, the rear of the Waymo AV made contact with a dumpster positioned along the west side wall of the parking lot."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4854:d7005446:efc2670e",
      "reportedRemediations": []
    },
    {
      "id": "30270-16360",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling northbound on [XXX] when it initiated a left turn into a parking lot on the west side of the roadway with its left turn signal activated. As the Waymo AV was turning left into the parking lot entrance, it approached an elevated ramp, and the undercarriage of the Waymo AV made contact with the raised pavement at the beginning of the ramp."
      ],
      "facts": [
        "북향 도로를 달리다 왼쪽 방향지시등을 켜고 서측 주차장 입구로 좌회전했다.",
        "높아진 경사로에 접근하는 중 경사로 시작 부분의 솟은 포장면에 차량 하부가 접촉했다.",
        "ADS 작동 중이었으며 차량 손상이 보고됐다. 신고 접촉부위는 차량 하부으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "경사로 시작부의 높이 변화와 차량 하부 여유를 좌회전 접근각에 맞춰 계산했는가?",
        "경사 진입 시 속도와 차체 피치 변화가 통과 가능성 판단에 반영됐는가?"
      ],
      "environmentHypotheses": [
        "경사로 시작부의 단차·종단 기울기는 어떠했는가? 높아진 포장면의 존재만으로 시공·관리 결함을 확정할 수 없다."
      ],
      "dataNeeded": [
        {
          "question": "어떤 진입각과 차체 자세에서 하부가 닿았는가?",
          "material": "경사로 시작부 3차원 측량, 차량 최저지상고·축간거리·적재 상태, 좌회전 궤적"
        },
        {
          "question": "단차를 인식하고 통과 가능성을 평가했는가?",
          "material": "전방 센서 원본, 지면 높이 지도·통과성 판단, 속도 계획·제동 로그"
        },
        {
          "question": "접촉 시 차체 피치와 속도는 어떠했는가?",
          "material": "IMU·서스펜션·휠 속도 로그, 하부 손상 위치 사진, 진입 전후 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "경사로 시작부의 단차와 좌회전 진입각에 따른 하부 궤적을 검사한다."
        ],
        "environment": [
          "입구 단차·기울기를 실측하고 전이부 보완 또는 통과 조건 안내를 검토한다."
        ],
        "operation": [
          "해당 입구의 차량별 통과 가능 접근각·속도 조건을 검증한다."
        ]
      },
      "limits": "포장면 높이와 접촉한 하부 부위가 없어 지상고 부족, 동적 차체 움직임, 경로 선택의 영향을 구분할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "경사로 시작부 포장면",
        "relation": "under",
        "stages": [
          "서측 주차장 좌회전",
          "경사로 시작부 접근",
          "차량 하부 포장면 접촉"
        ],
        "caption": "주차장으로 좌회전 진입하던 차량 하부가 경사로 시작부의 솟은 포장면에 접촉",
        "geometryUnknown": [
          "경사로 시작 단차·기울기",
          "좌회전 진입각",
          "차량 하부 최저점"
        ],
        "evidence": [
          "The Waymo AV was traveling northbound on [XXX] when it initiated a left turn into a parking lot on the west side of the roadway with its left turn signal activated. As the Waymo AV was turning left into the parking lot entrance, it approached an elevated ramp, and the undercarriage of the Waymo AV made contact with the raised pavement at the beginning of the ramp."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4728:7ece0958:d28bc48a",
      "reportedRemediations": []
    },
    {
      "id": "30270-16342",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling westbound on [XXX] in the second lane from the right. With its left turn signal activated, the Waymo AV initiated a left turn into a parking lot on [XXX]. As the Waymo AV entered the parking lot, the Waymo AV drove over a raised section of pavement, and the undercarriage of the Waymo AV made contact with the raised section of pavement."
      ],
      "facts": [
        "서향 도로의 오른쪽에서 두 번째 차로를 주행하다 왼쪽 방향지시등을 켜고 주차장으로 좌회전했다.",
        "주차장에 진입해 솟은 포장 구간을 넘어가던 중 차량 하부가 포장면에 접촉했다.",
        "접촉 당시 ADS가 작동 중이었고 차량 손상과 견인이 보고됐다. 신고 접촉부위는 차량 하부으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "주차장 입구의 솟은 포장면을 지상고 제약이 있는 구간으로 평가했는가?",
        "좌회전에서 진입으로 전환할 때 하부의 동적 여유 거리를 확인했는가?"
      ],
      "environmentHypotheses": [
        "높아진 포장 구간의 높이·길이·전이부 기울기는 어떠했는가? 결함 또는 부적절한 관리인지는 미확인이다."
      ],
      "dataNeeded": [
        {
          "question": "어떤 궤적으로 솟은 포장면을 넘었는가?",
          "material": "주차장 입구 3차원 노면 측량, 차량 자세·진입각·바퀴 궤적과 하부 손상 위치"
        },
        {
          "question": "노면 높이와 통과성은 어떻게 판단됐는가?",
          "material": "센서 원본, 지면 높이·불확실성 지도, 통과성·경로 계획 로그"
        },
        {
          "question": "속도와 하중이 하부 간격에 미친 영향은 무엇인가?",
          "material": "휠 속도·IMU·서스펜션 로그, 차량 적재 상태와 최저지상고"
        }
      ],
      "improvements": {
        "vehicle": [
          "솟은 노면을 넘는 좌회전 진입의 하부 궤적과 속도 조건을 검증한다."
        ],
        "environment": [
          "해당 포장 구간의 종단 형상을 실측해 전이부 개선·표시 필요성을 확인한다."
        ],
        "operation": [
          "검증 전에는 해당 입구의 차량별 접근 조건을 재검토한다."
        ]
      },
      "limits": "신고 변수는 직진으로 분류하지만 Narrative는 좌회전 진입을 설명한다. 접촉 시점의 회전 완료 여부와 포장 높이는 명확하지 않다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "솟은 포장 구간",
        "relation": "under",
        "stages": [
          "서향 도로 주행",
          "주차장 좌회전 진입",
          "솟은 포장면 하부 접촉"
        ],
        "caption": "서향 도로에서 주차장으로 좌회전 진입한 차량 하부가 솟은 포장면에 접촉",
        "geometryUnknown": [
          "포장면 높이·길이",
          "접촉 시 회전 완료 여부",
          "차량 하부와 노면 간격"
        ],
        "evidence": [
          "The Waymo AV was traveling westbound on [XXX] in the second lane from the right. With its left turn signal activated, the Waymo AV initiated a left turn into a parking lot on [XXX]. As the Waymo AV entered the parking lot, the Waymo AV drove over a raised section of pavement, and the undercarriage of the Waymo AV made contact with the raised section of pavement."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4769:421ffed4:ca45f824",
      "reportedRemediations": []
    },
    {
      "id": "30270-16395",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling northwestbound,turning right within a parking lot on [XXX] when it slowed to a stop near a section of parking bollards located near the north curb.. The Waymo AV began reversing at an angle towards the south curb of the parking lot, and while the Waymo AV was reversing, the front right side of the Waymo AV made contact with a parking bollard to the right of the Waymo AV."
      ],
      "facts": [
        "오전 1시 15분 주차장에서 북서향으로 우회전하다 북측 연석 근처 볼라드 구간 옆에 정차했다.",
        "남측 연석 쪽으로 비스듬히 후진하는 동안 전면 우측이 차량 오른쪽 볼라드에 접촉했다.",
        "접촉 당시 ADS가 작동 중이었고 차량 손상과 견인이 보고됐다. 신고 접촉부위는 차량 전면 좌측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "후진 시 전면 우측의 바깥쪽 움직임을 볼라드와의 충돌검사에 반영했는가?",
        "밤 시간의 볼라드 경계 추정 불확실성이 후진 여유 거리에 반영됐는가?"
      ],
      "environmentHypotheses": [
        "이 시각 볼라드의 대비·조명과 북측 연석 주변 회차 공간은 어떠했는가? 어두웠거나 관리가 부적절했다는 결론은 자료에 없다."
      ],
      "dataNeeded": [
        {
          "question": "후진 중 전면 우측과 볼라드의 상대 궤적은 어떠했는가?",
          "material": "볼라드·남북 연석 실측 좌표, 후진 시작 자세와 시간별 조향·차체 궤적"
        },
        {
          "question": "볼라드가 어떻게 탐지되고 충돌검사를 통과했는가?",
          "material": "사고 전후 센서 원본, 객체 경계·불확실성, 후진 경로·충돌검사 로그"
        },
        {
          "question": "야간 조건이나 현장 배치가 인식에 영향을 줄 수 있었는가?",
          "material": "당시 조도·현장 영상, 볼라드 표면·높이·주변 배치 사진, 지도 갱신 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "비스듬한 후진 중 전면 코너의 궤적과 측방 볼라드 간격을 검증한다."
        ],
        "environment": [
          "볼라드의 야간 가시성과 회차 공간을 확인해 표시·배치 보완을 검토한다."
        ],
        "operation": [
          "같은 유형의 우회전 후 후진 동작을 야간 조건에서도 재현 평가한다."
        ]
      },
      "limits": "Narrative는 전면 우측 접촉, 신고 변수는 전면 좌측 접촉으로 표기해 좌우가 다르다. 장면은 구체적 Narrative를 따르며 원시 영상·손상 사진 대조가 필요하다. 시각이 야간이라는 사실만으로 조도나 인식 성능 저하를 단정할 수 없다. 볼라드 위치와 후진 조향각이 없어 접촉 기전을 세분할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "reverse",
        "targetKind": "barrier",
        "targetLabel": "우측 주차 볼라드",
        "relation": "right",
        "stages": [
          "볼라드 옆 정차",
          "남측으로 후진",
          "전면 우측 접촉"
        ],
        "caption": "야간 주차장에서 비스듬히 후진하던 차량의 전면 우측이 볼라드에 접촉",
        "geometryUnknown": [
          "볼라드 높이·배치",
          "남북 연석 사이 유효 폭",
          "전면 우측 후진 궤적"
        ],
        "evidence": [
          "The Waymo AV was traveling northwestbound,turning right within a parking lot on [XXX] when it slowed to a stop near a section of parking bollards located near the north curb.. The Waymo AV began reversing at an angle towards the south curb of the parking lot, and while the Waymo AV was reversing, the front right side of the Waymo AV made contact with a parking bollard to the right of the Waymo AV."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4817:b7777b9c:99801988",
      "reportedRemediations": []
    },
    {
      "id": "35021-16402",
      "narrativeVersion": "1",
      "evidence": [
        "The MOIA AV was traveling eastbound on [XXX] and turning right onto southbound [XXX] when the passenger rear tire made contact with the curb at the corner of the intersection."
      ],
      "facts": [
        "동향 도로에서 남향 도로로 우회전하던 MOIA 시험차의 우측 뒷타이어가 교차로 모서리 연석에 접촉했다.",
        "ADS는 계속 작동했고 차량은 경로를 이어갔다. 운행 중 기록된 종방향 가속도 신호를 사후 검토해 접촉을 확인했다.",
        "우측 뒷타이어와 휠에 긁힘이 보고됐다. 신고 접촉부위는 차량 후면 좌측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "우회전 안쪽 뒷바퀴 궤적과 모서리 연석 사이의 여유가 충분했는가?",
        "접촉에 해당하는 가속도 신호를 실시간 운행 지속 여부 판단에 활용했는가?"
      ],
      "environmentHypotheses": [
        "교차로 모서리의 실제 곡률·높이와 시스템의 연석 모델이 일치했는가? 현장 관리 결함은 보고되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "우측 뒷타이어가 연석을 스친 지점은 어디인가?",
          "material": "모서리 연석 실측 형상, 바퀴·차체 궤적, 조향각·속도 기록과 타이어 손상 사진"
        },
        {
          "question": "계획 경로와 실제 뒷바퀴 궤적이 달랐는가?",
          "material": "연석 감지·위치 추정 로그, 계획 궤적과 조향 추종 오차, 센서 원본"
        },
        {
          "question": "접촉 신호 이후 계속 주행한 판단 근거는 무엇인가?",
          "material": "종방향 가속도 원시 신호, 이벤트 감지 기준·상태 전이 로그, 운전자 기록 및 점검 시각"
        }
      ],
      "improvements": {
        "vehicle": [
          "우회전 안쪽 뒷바퀴의 연석 간격을 별도로 검사한다.",
          "가속도 기반 접촉 신호를 손상 점검 필요성 판단과 연계한다."
        ],
        "environment": [
          "교차로 모서리 연석의 실측 형상과 지도 차이를 확인한다."
        ],
        "operation": [
          "운전자 기록과 충격 신호가 있을 때 정차·점검 및 운행 재개 기준을 명확히 한다."
        ]
      },
      "limits": "Narrative는 우측 뒷타이어 접촉, 신고 변수는 후면 좌측 접촉으로 표기해 좌우가 다르다. 장면은 구체적 Narrative를 따르며 원시 영상·손상 사진 대조가 필요하다. 종방향 가속도 신호가 접촉을 확인했다는 보고만 있고 파형·조향 오차·연석 형상은 제공되지 않아 원인을 확정할 수 없다.",
      "scene": {
        "setting": "intersection",
        "motion": "right",
        "targetKind": "curb",
        "targetLabel": "교차로 모서리 연석",
        "relation": "right",
        "stages": [
          "동향 접근·우회전",
          "우측 뒷타이어 접촉",
          "자율주행 경로 계속"
        ],
        "caption": "교차로 우회전 중 우측 뒷타이어가 연석에 닿은 뒤 자율주행을 계속함",
        "geometryUnknown": [
          "연석 모서리 곡률·높이",
          "우측 뒷바퀴 궤적",
          "접촉 시 차량 자세"
        ],
        "evidence": [
          "The MOIA AV was traveling eastbound on [XXX] and turning right onto southbound [XXX] when the passenger rear tire made contact with the curb at the corner of the intersection."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "6133:d7ccebc5:80ca7b59",
      "reportedRemediations": []
    },
    {
      "id": "35021-16400",
      "narrativeVersion": "1",
      "evidence": [
        "The MOIA AV was operating on a curved section of roadway within the [XXX] medical campus during validation testing of a new map release. While following the curve through the left turn, the rear driver-side wheel made contact with the adjacent curb."
      ],
      "facts": [
        "3월에 새 지도 릴리스를 검증하던 MOIA 시험차가 의료 캠퍼스의 굽은 도로를 주행했다.",
        "곡선을 따라 좌회전하던 중 운전석 측 뒷바퀴가 인접 연석에 닿았다.",
        "ADS 작동 중 접촉했으며 좌측 뒷바퀴 림 가장자리에 마모가 보고됐다. 신고 접촉부위는 차량 후면으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "검증 중인 지도에 표시된 곡선 경계와 실제 안쪽 연석 사이에 차이가 있었는가?",
        "차량의 좌측 뒷바퀴 궤적까지 반영한 회전 여유가 설정됐는가?"
      ],
      "environmentHypotheses": [
        "캠퍼스 곡선의 연석 형상이나 시인성이 센서·지도에 어떻게 나타났는가? 새 지도 검증이라는 사정만으로 현장 또는 지도 결함이 입증되지는 않는다."
      ],
      "dataNeeded": [
        {
          "question": "안쪽 뒷바퀴와 연석의 간격은 어디서 줄었는가?",
          "material": "연석 곡률 실측, 차량 자세·조향각·바퀴 궤적과 림 손상 사진"
        },
        {
          "question": "지도 경계·실시간 인식·차량 위치가 일치했는가?",
          "material": "당시 지도 릴리스와 변경 내역, 센서 원본, 연석 추정·위치 추정·계획 제어 로그"
        },
        {
          "question": "시험 중 접촉과 손상을 어떻게 기록·평가했는가?",
          "material": "시험 주행 이벤트·가속도 로그, 사후 점검 기록, 동일 구간 검증 결과"
        }
      ],
      "improvements": {
        "vehicle": [
          "새 지도 검증에서 곡선 안쪽 뒷바퀴 여유를 실측 경계와 대조한다."
        ],
        "environment": [
          "캠퍼스 연석의 현장 형상과 지도 기준을 확인한다."
        ],
        "operation": [
          "경미한 림 접촉도 지도 검증의 재검토 항목으로 기록한다."
        ]
      },
      "limits": "raw의 Parking Lot 분류와 사고 경위의 캠퍼스 도로 표현이 달라 법적 도로 구분은 알 수 없다. 다른 월의 유사 보고와 동일 장소·원인이라고 단정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "left",
        "targetKind": "curb",
        "targetLabel": "좌측 곡선 연석",
        "relation": "left",
        "stages": [
          "캠퍼스 지도 검증",
          "곡선 따라 좌회전",
          "좌측 뒷바퀴 접촉"
        ],
        "caption": "3월 지도 검증 중 곡선 좌회전을 하던 시험차의 좌측 뒷바퀴가 연석에 접촉",
        "geometryUnknown": [
          "곡선 연석 반경·높이",
          "뒷바퀴와 연석의 최소 간격",
          "지도 기준선과 실제 경계 차이"
        ],
        "evidence": [
          "The MOIA AV was operating on a curved section of roadway within the [XXX] medical campus during validation testing of a new map release. While following the curve through the left turn, the rear driver-side wheel made contact with the adjacent curb."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "5759:9fba6878:c8080f9c",
      "reportedRemediations": []
    },
    {
      "id": "30270-16286",
      "narrativeVersion": "2",
      "evidence": [
        "The Waymo AV was traveling northwestbound and turning right to continue traveling in a parking lot at [XXX]. when it slowed to a stop near a section of parking bollards located near the north curb of the parking lot, to its right. The Waymo AV began reversing at an angle towards the south curb of the parking lot, and while the Waymo AV was reversing, the front right side of the Waymo AV made contact with a parking bollard to the right of the Waymo AV."
      ],
      "facts": [
        "오후 11시 16분 주차장에서 북서향 우회전 중 우측 북측 연석 근처 볼라드 옆에 정차했다.",
        "남측 연석 쪽으로 비스듬히 후진하던 중 차량 전면 우측이 오른쪽 볼라드에 접촉했다.",
        "버전 2 서술은 ADS 작동 중 접촉과 차량 손상·견인을 보고한다. 신고 접촉부위는 차량 전면 좌측, 전면 우측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "후진 방향과 반대로 벌어질 수 있는 전면 우측의 회전 공간을 확보했는가?",
        "정차 위치에서 가까운 볼라드의 추적 경계가 후진 내내 유지됐는가?"
      ],
      "environmentHypotheses": [
        "북측 연석의 볼라드와 남측 연석 사이에서 해당 후진 동작을 수행할 공간이 있었는가? 배치 부적절성은 미확인이다."
      ],
      "dataNeeded": [
        {
          "question": "정차 위치와 후진 조향이 전면 우측 간격에 어떤 영향을 줬는가?",
          "material": "남북 연석·볼라드 실측, 차량 정차 자세, 시간별 조향각·차체 궤적"
        },
        {
          "question": "후진 경로에 전면 측방 충돌 가능성이 표시됐는가?",
          "material": "센서 원본, 볼라드 추적·점유지도, 전진에서 후진으로 전환한 계획·충돌검사 로그"
        },
        {
          "question": "늦은 시각 현장 가시성과 지도 배치는 어떠했는가?",
          "material": "현장 조도·전후 영상, 볼라드 반사·표면 상태, 지도 및 현장 배치 변경 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "후진 시 전면 코너의 측방 궤적을 포함한 볼라드 간격 검사를 적용한다."
        ],
        "environment": [
          "볼라드와 회차 공간의 간격·야간 시인성을 실측 확인한다."
        ],
        "operation": [
          "해당 정차 위치에서 남향 비스듬한 후진의 허용 조건을 재검증한다."
        ]
      },
      "limits": "신고 변수에는 전면 좌우가 함께 표시돼 Narrative에 기술된 접촉 부위 외 추가 접촉 여부는 원시 기록 대조가 필요하다. 정차 자세, 후진 각도, 조도 수치가 없어 탐지·경로·제어의 영향을 구분할 수 없다. 유사 서술의 다른 ID와 사건을 합치지 않는다.",
      "scene": {
        "setting": "parking",
        "motion": "reverse",
        "targetKind": "barrier",
        "targetLabel": "우측 주차 볼라드",
        "relation": "right",
        "stages": [
          "우측 볼라드 옆 정차",
          "남측으로 비스듬히 후진",
          "전면 우측 접촉"
        ],
        "caption": "늦은 밤 주차장에서 후진하던 차량의 전면 우측이 우측 볼라드에 접촉",
        "geometryUnknown": [
          "정차 시 볼라드와 차체 간격",
          "후진 각도·조향 궤적",
          "남북 연석과 볼라드 배치"
        ],
        "evidence": [
          "The Waymo AV was traveling northwestbound and turning right to continue traveling in a parking lot at [XXX]. when it slowed to a stop near a section of parking bollards located near the north curb of the parking lot, to its right. The Waymo AV began reversing at an angle towards the south curb of the parking lot, and while the Waymo AV was reversing, the front right side of the Waymo AV made contact with a parking bollard to the right of the Waymo AV."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4909:1423aec2:ba8f55fa",
      "reportedRemediations": []
    },
    {
      "id": "30270-16287",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling east on [XXX]. As the Waymo AV approached the intersection with [XXX], the Waymo AV slowed to a stop for a stop sign with its right turn signal activated. The Waymo AV then turned right onto [XXX] and subsequently initiated a left turn into an adjacent parking lot at [XXX]. As the Waymo AV entered the parking lot, the Waymo AV drove over a raised section of pavement, and the undercarriage of the Waymo AV made contact with the raised section of pavement."
      ],
      "facts": [
        "동향으로 주행하다 정지 표지에서 정차한 뒤 우회전했고, 이어 인접 주차장으로 좌회전을 시작했다.",
        "주차장 진입 중 솟은 포장 구간을 넘다가 차량 하부가 포장면에 접촉했다.",
        "ADS가 작동 중이었으며 차량 손상과 견인이 보고됐다. 신고 접촉부위는 차량 하부으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "연속 우회전·좌회전 후 주차장 진입 경로에 맞춰 노면 높이와 하부 여유를 다시 평가했는가?",
        "솟은 포장 구간 통과 시 속도·피치 변화를 고려했는가?"
      ],
      "environmentHypotheses": [
        "주차장 입구의 포장 높이와 전이 구간 길이는 어떠했는가? 보수 또는 시공상 결함은 확인되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "연속 회전 후 어떤 각도로 솟은 포장 구간에 진입했는가?",
          "material": "도로·입구·포장 구간 3차원 실측, 우회전부터 좌회전까지의 차량 궤적"
        },
        {
          "question": "솟은 노면의 통과 가능성을 언제 평가했는가?",
          "material": "전방 센서 원본, 지면 높이 추정·불확실성, 경로 전환·속도 계획·충돌검사 로그"
        },
        {
          "question": "하부 접촉 때 실제 간격과 자세는 어떠했는가?",
          "material": "차량 지상고·하중, IMU·서스펜션·휠 속도 로그, 하부 손상 사진"
        }
      ],
      "improvements": {
        "vehicle": [
          "연속 회전 뒤 진입하는 주차장 단차에 대해 접근각별 하부 통과성을 검사한다."
        ],
        "environment": [
          "주차장 진입부 높이·기울기를 확인하고 전이부 보완이나 안내를 검토한다."
        ],
        "operation": [
          "해당 연속 회전 경로의 입구 통과 조건을 재현 검증한다."
        ]
      },
      "limits": "정지 표지 정차·우회전은 선행 동작이며 접촉은 이후 주차장 진입 중 발생했다. 노면 형상과 접촉 당시 속도·자세는 제공되지 않았다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "솟은 입구 포장면",
        "relation": "under",
        "stages": [
          "정차 후 우회전",
          "인접 주차장 좌회전",
          "하부 포장면 접촉"
        ],
        "caption": "우회전 후 인접 주차장으로 좌회전 진입하다 차량 하부가 솟은 포장면에 접촉",
        "geometryUnknown": [
          "주차장 진입각",
          "솟은 포장면 높이·길이",
          "하부 접촉 위치"
        ],
        "evidence": [
          "The Waymo AV was traveling east on [XXX]. As the Waymo AV approached the intersection with [XXX], the Waymo AV slowed to a stop for a stop sign with its right turn signal activated. The Waymo AV then turned right onto [XXX] and subsequently initiated a left turn into an adjacent parking lot at [XXX]. As the Waymo AV entered the parking lot, the Waymo AV drove over a raised section of pavement, and the undercarriage of the Waymo AV made contact with the raised section of pavement."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "5003:a80c1356:6a5bfd14",
      "reportedRemediations": []
    },
    {
      "id": "30270-16262",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling westbound in an alley between [XXX] and [XXX]. As the Waymo AV proceeded forward, the Waymo AV drove over an uneven, partially-paved section of roadway containing debris, and the undercarriage of the Waymo AV made contact with the debris."
      ],
      "facts": [
        "골목을 서쪽으로 진행하던 차량이 잔해가 있는 불균일한 부분 포장 구간을 통과했다.",
        "차량 하부가 그 구간의 잔해에 접촉했고 ADS가 작동 중이었다.",
        "차량 손상과 견인이 보고됐다. 신고 접촉부위는 차량 하부으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "불균일한 노면 위 잔해의 높이를 지면과 분리해 인식했는가?",
        "저속 통과 계획에 바퀴 높이 변화와 하부 궤적을 함께 반영했는가?"
      ],
      "environmentHypotheses": [
        "부분 포장 구간의 단차와 잔해 크기·위치는 어떠했는가? 공사 여부나 관리 주체의 책임은 서술에 없다."
      ],
      "dataNeeded": [
        {
          "question": "잔해와 노면 중 어떤 형상이 하부 간격을 줄였는가?",
          "material": "골목 노면 3차원 측량, 잔해 높이·형상·좌표, 바퀴 궤적과 하부 손상 위치"
        },
        {
          "question": "잔해 및 불균일한 노면을 어떤 위험으로 평가했는가?",
          "material": "센서 원본, 지면 분할·객체 탐지·통과성 추정, 계획·제동 로그"
        },
        {
          "question": "구간 진입 전 정지·우회 가능성이 있었는가?",
          "material": "진입 시야와 통로 폭 영상, 지도·경로 선택 기록, 현장 유지보수·차단 안내 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "잔해 높이와 노면 굴곡을 결합한 하부 통과성 검사를 수행한다."
        ],
        "environment": [
          "잔해 제거와 불균일 포장 구간의 임시 표시·보수 필요성을 현장 확인한다."
        ],
        "operation": [
          "부분 포장·잔해 구간 발견 시 정지 후 우회 또는 지원 요청 조건을 적용한다."
        ]
      },
      "limits": "부분 포장이라는 표현만으로 공사 구간이라고 볼 수 없다. 접촉한 잔해의 재질·높이와 차체 자세가 없어 직접 기전을 확정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "부분 포장 구간 잔해",
        "relation": "under",
        "stages": [
          "골목 서향 주행",
          "불균일 구간 통과",
          "차량 하부 잔해 접촉"
        ],
        "caption": "골목의 불균일한 부분 포장 구간을 지나던 차량 하부가 잔해에 접촉",
        "geometryUnknown": [
          "잔해 높이·형상·위치",
          "노면 단차와 바퀴 궤적",
          "골목 유효 폭"
        ],
        "evidence": [
          "The Waymo AV was traveling westbound in an alley between [XXX] and [XXX]. As the Waymo AV proceeded forward, the Waymo AV drove over an uneven, partially-paved section of roadway containing debris, and the undercarriage of the Waymo AV made contact with the debris."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4611:f07b7843:c6b9e4b1",
      "reportedRemediations": []
    },
    {
      "id": "30270-16203",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling northwest bound in the rightmost lane on [XXX]. As the Waymo AV proceeded through the intersection with [XXX], the undercarriage of the Waymo AV made contact with a metal sheet covering placed on the roadway."
      ],
      "facts": [
        "북서향 도로의 가장 오른쪽 차로를 주행했다.",
        "교차로를 통과하는 중 도로 위에 놓인 금속 덮개에 차량 하부가 접촉했다.",
        "접촉 당시 ADS가 작동 중이었고 차량 손상과 견인이 보고됐다. 신고 접촉부위는 차량 하부으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "금속 덮개의 높이와 가장자리 단차를 하부 통과 제약으로 모델링했는가?",
        "교차로 통과 속도와 차체 수직 움직임에 맞는 여유를 확보했는가?"
      ],
      "environmentHypotheses": [
        "금속판의 높이·고정 상태·가장자리 전이 처리는 어떠했는가? 설치 목적이나 관리상 과실은 보고서로 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "금속판 어느 지점에 하부가 닿았는가?",
          "material": "금속판 두께·들뜸·경사 실측, 차로 내 좌표, 차량 바퀴 궤적과 하부 손상 사진"
        },
        {
          "question": "금속판과 노면 높이 차이를 인식했는가?",
          "material": "전방 센서 원본, 지면 높이 지도·불확실성, 통과성·속도 계획 로그"
        },
        {
          "question": "충격 당시 속도·피치와 금속판 상태는 어떠했는가?",
          "material": "IMU·휠 속도·서스펜션 기록, 현장 설치·점검 기록, 접촉 전후 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "교차로 내 금속판의 가장자리와 들뜸을 포함해 하부 통과성을 검증한다."
        ],
        "environment": [
          "금속판 고정·전이부·표시 상태를 실측 점검한다."
        ],
        "operation": [
          "금속판 구간의 차량별 통과 속도·경로 조건을 재평가한다."
        ]
      },
      "limits": "Narrative 도입부는 솟은 포장면, 본문은 금속 덮개로 기술한다. 금속판 형상·설치 목적·접촉 부위가 없어 결함 여부나 직접 기전을 판단할 수 없다.",
      "scene": {
        "setting": "intersection",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "도로 위 금속 덮개",
        "relation": "under",
        "stages": [
          "북서향 오른쪽 차로",
          "교차로 통과",
          "하부 금속 덮개 접촉"
        ],
        "caption": "교차로를 통과하던 차량 하부가 도로 위 금속 덮개에 접촉",
        "geometryUnknown": [
          "금속판 높이·들뜸·경사",
          "교차로 내 금속판 위치",
          "차량 하부 접촉점"
        ],
        "evidence": [
          "The Waymo AV was traveling northwest bound in the rightmost lane on [XXX]. As the Waymo AV proceeded through the intersection with [XXX], the undercarriage of the Waymo AV made contact with a metal sheet covering placed on the roadway."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4486:97f3fdc2:3a1efd6e",
      "reportedRemediations": []
    },
    {
      "id": "30610-16275",
      "narrativeVersion": "1",
      "evidence": [
        "An unoccupied Zoox autonomous vehicle was traveling east on [XXX] in Miami, when an unleashed dog on the right sidewalk ran into the vehicle's path, resulting in contact with the Zoox vehicle. The Zoox vehicle executed a hard braking maneuver, coming to a near stop, then slowly resumed motion with the right rear wheel apparently making contact with the dog."
      ],
      "facts": [
        "승객이 없는 Zoox 차량이 동쪽으로 주행하던 중 오른쪽 보도에 있던 목줄 없는 개가 차량 경로로 뛰어들어 접촉했다.",
        "차량은 급제동해 거의 정지한 뒤 천천히 다시 움직였으며, 오른쪽 뒷바퀴가 개와 접촉한 것으로 서술됐다.",
        "차량 손상은 없었고 개 주인은 개가 다쳤다고 신고했다. 신고 접촉부위는 차량 전면 우측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "최초 접촉·급제동 후 개의 위치가 불확실한 상태에서 재출발을 허용했는가?",
        "차량 가까이 또는 하부에 있는 동물의 위치를 후륜 궤적과 함께 추적했는가?"
      ],
      "environmentHypotheses": [
        "오른쪽 보도에서 차로로 진입하는 개를 언제부터 볼 수 있었는가? 목줄이 없었다는 보고만으로 책임 비율을 판단할 수 없다."
      ],
      "dataNeeded": [
        {
          "question": "최초 접촉부터 재출발까지 개와 각 바퀴의 위치는 어떠했는가?",
          "material": "동기화된 전·측·후방 영상, 개 이동 궤적, 차량 자세·휠 회전 및 접촉 흔적"
        },
        {
          "question": "급제동과 재출발을 결정한 객체 상태는 무엇인가?",
          "material": "동물 분류·추적 신뢰도, 근거리 점유지도, 제동·정지 유지·재출발 승인 로그"
        },
        {
          "question": "우측 보도에서의 최초 탐지 거리와 시야는 어떠했는가?",
          "material": "보도·차로 폭과 가림물 실측, 센서 원본, 속도·감속 시간 기록"
        },
        {
          "question": "두 접촉의 순서와 손상 여부를 확인할 수 있는가?",
          "material": "현장·주변 영상, 차량 검사 기록, 개 주인의 신고와 제공 가능한 동물 진료 자료"
        }
      ],
      "improvements": {
        "vehicle": [
          "동물 접촉 또는 위치 불확실성 이후에는 후륜 주변 점유를 확인할 때까지 정지 유지 조건을 강화한다."
        ],
        "environment": [
          "해당 보도·차로 경계의 시야와 동물 유입 경로를 확인한다."
        ],
        "operation": [
          "동물 접촉 후 정지 유지·상황 확인·지원 절차를 점검한다."
        ]
      },
      "limits": "두 번째 접촉은 apparently라는 유보 표현이다. 신고 변수에는 전면 우측 접촉이 표시되지만 어느 접촉 단계에 해당하는지와 재출발 전 개의 위치는 불명확하다. 개의 부상은 주인의 신고 내용이다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "animal",
        "targetLabel": "오른쪽 보도에서 뛰어든 개",
        "relation": "crossing",
        "stages": [
          "개가 경로로 뛰어듦",
          "접촉 후 급제동",
          "재출발 중 후륜 접촉 추정"
        ],
        "caption": "오른쪽 보도에서 뛰어든 개와 접촉 후 급제동·재출발 과정의 추가 접촉이 보고됨",
        "geometryUnknown": [
          "개의 진입·접촉 궤적",
          "거의 정지한 위치와 개의 상대 위치",
          "재출발 시 우측 후륜 궤적"
        ],
        "evidence": [
          "An unoccupied Zoox autonomous vehicle was traveling east on [XXX] in Miami, when an unleashed dog on the right sidewalk ran into the vehicle's path, resulting in contact with the Zoox vehicle. The Zoox vehicle executed a hard braking maneuver, coming to a near stop, then slowly resumed motion with the right rear wheel apparently making contact with the dog."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4032:e2b77e21:a2b613d1",
      "reportedRemediations": []
    },
    {
      "id": "30270-16259",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling southeast bound on [XXX] near [XXX]. As the Waymo AV exited the intersection with [XXX], the Waymo AV drove over a pothole and the undercarriage of the Waymo AV made contact with the pavement."
      ],
      "facts": [
        "남동쪽으로 주행하던 차량이 교차로를 빠져나오면서 포트홀을 통과했다.",
        "포트홀을 지나던 중 차량 하부가 포장면에 접촉했다.",
        "ADS 작동 중이었고 시험 운전자가 운전석에 있었으며 차량 손상과 견인이 보고됐다. 신고 접촉부위는 차량 하부으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "교차로 출구의 포트홀 형상과 바퀴 낙하에 따른 하부 궤적을 예측했는가?",
        "접근 속도와 포트홀 회피·정지 가능성을 충분히 평가했는가?"
      ],
      "environmentHypotheses": [
        "포트홀의 깊이·폭과 교차로 출구에서의 가시성은 어떠했는가? 보수 지연이나 관리 과실은 확인되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "어느 바퀴의 포트홀 통과가 하부 접촉과 연결됐는가?",
          "material": "포트홀 단면·좌표 실측, 바퀴 궤적, 차체 피치·롤과 하부 손상 위치"
        },
        {
          "question": "포트홀을 언제 탐지하고 어떤 경로를 선택했는가?",
          "material": "전방 센서 원본, 노면 결손·주행 가능 영역 추정, 경로·속도 계획 로그"
        },
        {
          "question": "시험 운전자에게 개입 여유가 있었는가?",
          "material": "실내·전방 영상, 경고·개입·제동 기록, 당시 조도와 교차로 출구 시야"
        }
      ],
      "improvements": {
        "vehicle": [
          "교차로 출구 노면 결손과 하부 동적 여유를 통합해 통과 경로를 판단한다."
        ],
        "environment": [
          "출구 포트홀의 형상·가시성을 확인해 보수와 임시 표시를 검토한다."
        ],
        "operation": [
          "시험 운전 중 포트홀 위험 경고·개입 기준을 점검한다."
        ]
      },
      "limits": "포트홀 통과와 하부 포장면 접촉의 순서는 명확하지만 어느 바퀴가 들어갔는지, 포트홀의 어느 가장자리와 닿았는지는 알 수 없다.",
      "scene": {
        "setting": "intersection",
        "motion": "straight",
        "targetKind": "pothole",
        "targetLabel": "교차로 출구 포트홀",
        "relation": "under",
        "stages": [
          "교차로 출구 진행",
          "포트홀 통과",
          "하부 포장면 접촉"
        ],
        "caption": "교차로를 빠져나오며 포트홀을 통과하던 차량 하부가 포장면에 접촉",
        "geometryUnknown": [
          "포트홀 깊이·가장자리 형상",
          "진입한 바퀴와 궤적",
          "교차로 출구와 포트홀 거리"
        ],
        "evidence": [
          "The Waymo AV was traveling southeast bound on [XXX] near [XXX]. As the Waymo AV exited the intersection with [XXX], the Waymo AV drove over a pothole and the undercarriage of the Waymo AV made contact with the pavement."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4798:3b812dbf:76137f79",
      "reportedRemediations": []
    },
    {
      "id": "30270-16038",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV unparked and proceeded forward on westbound [XXX], then came to a stop to yield to the stopped SUV in the Waymo AV's lane of travel. The vehicles in the queue of traffic, including the stopped SUV, nudged forward momentarily, and the Waymo AV proceeded forward at a low rate of speed to maneuver between the stopped SUV and a passenger car parked facing south perpendicular to the north curb, on the Waymo AV's immediate right, and the right side of the Waymo AV made contact with the front of the parked passenger car."
      ],
      "facts": [
        "양쪽에 직각 주차 차량이 있는 좁은 도로에서 승객 하차 후 정차했던 차량이 서쪽으로 출발했다. 차로에 걸쳐 선 SUV에 양보하며 다시 정차했다.",
        "대기 차량들이 조금 전진한 뒤 SUV와 바로 오른쪽의 주차된 승용차 사이를 저속으로 통과하려 했다.",
        "차량 우측이 주차된 승용차의 앞부분에 접촉했다. ADS 작동 중이었으며 두 차량 손상이 보고됐다. 신고 접촉부위는 차량 우측 / 상대차 전면 우측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "SUV가 조금 움직인 뒤 실제 통과 폭을 재평가할 때 우측 주차 차량 전면의 돌출을 충분히 반영했는가?",
        "동적 SUV와 고정된 주차 차량 사이의 안전 여유가 부족하면 정지를 유지하도록 계획됐는가?"
      ],
      "environmentHypotheses": [
        "직각 주차 차량과 차로에 걸친 SUV 사이 유효 폭은 얼마였는가? 주차·대기 상태의 존재만으로 위법 또는 과실을 판단할 수 없다."
      ],
      "dataNeeded": [
        {
          "question": "접촉 순간 두 장애물 사이 통과 폭은 얼마였는가?",
          "material": "SUV·주차 승용차의 동기화 위치·방향·차체 치수, 도로 폭, AV 전후 코너 궤적"
        },
        {
          "question": "SUV의 작은 전진 후 어떤 판단으로 재출발했는가?",
          "material": "객체 추적·예측, 후보 경로·측방 간격·정지 유지 판단 로그, 센서 원본"
        },
        {
          "question": "접촉 상대와 접촉 부위가 본문대로 확인되는가?",
          "material": "AV 우측·승용차 전면 손상 사진, 다각도 현장 영상, 차량별 사고 위치 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "차로에 걸친 차량 옆을 지날 때 반대편 주차 차량 돌출을 포함한 전체 차체 여유를 재검사한다."
        ],
        "environment": [
          "직각 주차 돌출과 대기 차량이 좁히는 통행 공간을 실측해 운영·표시 보완을 검토한다."
        ],
        "operation": [
          "대기 차량이 조금 움직여도 통과 폭이 불확실하면 정지를 유지하거나 지원을 요청한다."
        ]
      },
      "limits": "도입부는 SUV 관련 충돌이라고 표현하지만 실제 접촉 본문은 우측 주차 승용차 전면을 지목한다. SUV와 승용차 사이 폭·동시 궤적이 없어 책임이나 회피 가능성을 단정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "vehicle",
        "targetLabel": "우측 주차 승용차",
        "relation": "right",
        "stages": [
          "SUV에 양보 정차",
          "좁은 틈으로 재출발",
          "우측 주차차 전면 접촉"
        ],
        "caption": "차로에 걸친 SUV와 주차차 사이를 통과하다 우측 주차 승용차 전면에 접촉",
        "geometryUnknown": [
          "SUV와 주차 승용차 사이 폭",
          "주차차 전면 돌출 길이",
          "재출발 후 차량 측면 궤적"
        ],
        "evidence": [
          "The Waymo AV unparked and proceeded forward on westbound [XXX], then came to a stop to yield to the stopped SUV in the Waymo AV's lane of travel. The vehicles in the queue of traffic, including the stopped SUV, nudged forward momentarily, and the Waymo AV proceeded forward at a low rate of speed to maneuver between the stopped SUV and a passenger car parked facing south perpendicular to the north curb, on the Waymo AV's immediate right, and the right side of the Waymo AV made contact with the front of the parked passenger car."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "6276:c4935cee:8c9b2f88",
      "reportedRemediations": []
    },
    {
      "id": "31101-16018",
      "narrativeVersion": "1",
      "evidence": [
        "The AVRIDE AV was traveling northwestbound in autonomous mode in the parking lot off of [XXX]. As the AVRIDE AV proceeded forward, the right side of the AVRIDE AV made light contact with the left side of a parked passenger car in the parking lot."
      ],
      "facts": [
        "주차장에서 AVRIDE 차량이 자율주행 모드로 북서쪽으로 진행했다.",
        "계속 앞으로 가던 중 차량 우측이 주차된 승용차의 좌측에 가볍게 접촉했다.",
        "두 차량에 경미한 손상이 발생했고 부상은 보고되지 않았다. 신고 접촉부위는 차량 우측 / 상대차 좌측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "우측 주차 차량의 측면 경계와 AV 전체 폭 사이 여유를 충분히 확보했는가?",
        "계획한 측방 간격과 실제 위치·조향 추종 사이에 차이가 있었는가?"
      ],
      "environmentHypotheses": [
        "주차 차량의 배치와 통로 폭이 실제 통과 공간을 얼마나 남겼는가? 주차선 위반 여부는 Narrative에 없다."
      ],
      "dataNeeded": [
        {
          "question": "두 차량 측면의 최소 간격은 어디서 사라졌는가?",
          "material": "주차 차량 위치·방향·치수, 주차 통로 실측, AV 자세·측면 궤적과 손상 사진"
        },
        {
          "question": "주차 차량 경계와 경로 여유를 어떻게 계산했는가?",
          "material": "측방 센서 원본, 객체 경계·위치 추정, 계획 궤적·조향 추종 로그"
        },
        {
          "question": "전진 구간에 회피·정지 공간이 있었는가?",
          "material": "접촉 전후 현장 영상, 주변 주차 배치, 속도·제동 및 대안 경로 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "주차 차량 측면을 지나는 저속 경로에서 전체 차폭과 추종 오차를 반영한 여유를 검증한다."
        ],
        "environment": [
          "해당 주차 통로 폭과 차량 배치를 확인해 통행 표시·운영 개선을 검토한다."
        ],
        "operation": [
          "측방 간격이 불확실한 주차 통로에서 정지·재계획 기준을 적용한다."
        ]
      },
      "limits": "주차 차량의 방향, 통로 폭, AV 궤적이 없어 접촉이 계획 간격 부족인지 위치·제어 오차인지 구분되지 않는다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "vehicle",
        "targetLabel": "우측 주차 승용차",
        "relation": "right",
        "stages": [
          "주차장 북서향 진행",
          "주차차 옆 전진",
          "서로 측면 접촉"
        ],
        "caption": "주차장에서 전진하던 AVRIDE 차량 우측이 주차 승용차 좌측에 접촉",
        "geometryUnknown": [
          "주차 통로 유효 폭",
          "주차 차량 위치·방향",
          "AV 우측면 궤적"
        ],
        "evidence": [
          "The AVRIDE AV was traveling northwestbound in autonomous mode in the parking lot off of [XXX]. As the AVRIDE AV proceeded forward, the right side of the AVRIDE AV made light contact with the left side of a parked passenger car in the parking lot."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "3926:a83ce240:5b420af6",
      "reportedRemediations": []
    },
    {
      "id": "13781-16255",
      "narrativeVersion": "1",
      "evidence": [
        "The ADS was slowly maneuvering at less than 1MPH around the left side of a shuttle bus stopped along the right curb with its hazard lights on in the hotel driveway and made contact with a metal bollard on the left side."
      ],
      "facts": [
        "호텔 진입로 오른쪽 연석에는 비상등을 켠 셔틀버스가 정차해 있었다.",
        "ADS는 버스 왼쪽으로 1 mph 미만의 속도로 우회하다 왼쪽 금속 볼라드에 접촉했다.",
        "차량에는 승객 두 명이 탑승했다. 신고 접촉부위는 차량 좌측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "버스 회피 경로에서 반대편 볼라드와의 차체 여유를 함께 확보했는가?",
        "1 mph 미만의 저속에서도 협소 통로가 불확실하면 정지하도록 판단했는가?"
      ],
      "environmentHypotheses": [
        "정차 셔틀버스와 왼쪽 볼라드 사이 유효 폭은 어떠했는가? 버스 정차나 볼라드 배치의 적정성은 확인되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "셔틀버스와 볼라드 사이로 통과 가능한 폭이 있었는가?",
          "material": "버스·볼라드·연석의 실측 좌표와 치수, 차량 전후 코너 궤적"
        },
        {
          "question": "버스 회피와 볼라드 간격을 계획에서 어떻게 처리했는가?",
          "material": "좌우 센서 원본, 객체 경계·점유지도, 후보 경로·충돌검사·정지 판단 로그"
        },
        {
          "question": "승객 탑승 상태에서 어떤 저속 통과 조건이 적용됐는가?",
          "material": "속도·조향·제동 로그, 운영 경로 규칙, 접촉 부위와 실내 이벤트 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "셔틀버스 옆 협소 통과 경로에서 반대편 볼라드와 전체 차체 간격을 검사한다."
        ],
        "environment": [
          "호텔 진입로의 셔틀 정차 위치와 볼라드 사이 통행 여유를 실측 검토한다."
        ],
        "operation": [
          "셔틀 정차로 통과 폭이 제한되면 대기·재경로·지원 요청을 적용한다."
        ]
      },
      "limits": "신고 변수에는 차량 좌측 접촉이 표시되지만 구체적인 지점과 버스·볼라드 사이 폭은 없어 물리적 통과 가능성을 확인할 수 없다. raw 1 mph보다 사고 경위의 1 mph 미만을 따른다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "barrier",
        "targetLabel": "좌측 금속 볼라드",
        "relation": "left",
        "stages": [
          "우측 셔틀버스 정차",
          "버스 왼쪽으로 저속 우회",
          "좌측 볼라드 접촉"
        ],
        "caption": "호텔 진입로에서 정차 셔틀버스 왼쪽을 우회하던 ADS가 좌측 볼라드에 접촉",
        "geometryUnknown": [
          "버스와 볼라드 사이 폭",
          "볼라드 위치·높이",
          "차량 좌측의 구체적 접촉 지점·궤적"
        ],
        "evidence": [
          "The ADS was slowly maneuvering at less than 1MPH around the left side of a shuttle bus stopped along the right curb with its hazard lights on in the hotel driveway and made contact with a metal bollard on the left side."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "3559:8704bc5f:44e54201",
      "reportedRemediations": []
    },
    {
      "id": "30270-16171",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling northwestbound and turning right to continue traveling in a parking lot at [XXX] when it slowed to a stop near a section of parking bollards, surrounding a dumpster located near the north curb of the parking lot, to its right. The Waymo AV began reversing at an angle towards the south curb of the parking lot, and while the Waymo AV was reversing, the front right side of the Waymo AV made contact with a parking bollard to the right of the Waymo AV."
      ],
      "facts": [
        "주차장에서 북서향 우회전 중 북측 연석 근처 쓰레기 수거함을 둘러싼 볼라드 구간 옆에 정차했다.",
        "남측 연석 쪽으로 비스듬히 후진하던 중 전면 우측이 차량 오른쪽 볼라드에 접촉했다.",
        "접촉 당시 ADS가 작동 중이었고 차량 손상과 견인이 보고됐다. 신고 접촉부위는 차량 전면 좌측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "수거함 주위 여러 볼라드의 개별 경계가 후진 시 전면 우측 궤적 검사에 반영됐는가?",
        "후진 시작 위치에서 전면 우측을 옆으로 돌릴 공간이 충분하다고 판단한 근거는 무엇인가?"
      ],
      "environmentHypotheses": [
        "수거함 보호 볼라드와 남측 연석 사이의 회차 공간은 어떠했는가? 보호 시설의 존재 자체가 관리 결함의 근거는 아니다."
      ],
      "dataNeeded": [
        {
          "question": "수거함·볼라드 배치와 전면 우측 회전 궤적은 어떻게 겹쳤는가?",
          "material": "수거함 외곽·각 볼라드·남북 연석 실측, 후진 시작 자세·조향 궤적"
        },
        {
          "question": "수거함과 여러 볼라드를 개별 장애물로 추적했는가?",
          "material": "전·측방 센서 원본, 객체 분리·점유지도, 후진 경로·충돌검사 로그"
        },
        {
          "question": "정차 뒤 남측 후진을 선택한 이유는 무엇인가?",
          "material": "경로 재계획과 대안 후보 기록, 정지 유지·지원 요청 조건, 접촉 전후 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "수거함 주변 볼라드를 개별 경계로 유지하며 후진 시 전면 코너 궤적을 검사한다."
        ],
        "environment": [
          "수거함 보호 시설과 회차 동선 사이 공간·표시를 실측 검토한다."
        ],
        "operation": [
          "해당 보호 시설 옆 정차·후진 패턴의 허용 조건을 검증한다."
        ]
      },
      "limits": "Narrative는 전면 우측 접촉, 신고 변수는 전면 좌측 접촉으로 표기해 좌우가 다르다. 장면은 구체적 Narrative를 따르며 원시 영상·손상 사진 대조가 필요하다. 이 Narrative는 볼라드가 수거함을 둘러싼다고 구체적으로 설명하지만 개수·간격은 제시하지 않는다. 다른 볼라드 보고에 이 배치를 임의로 적용할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "reverse",
        "targetKind": "barrier",
        "targetLabel": "수거함 주변 볼라드",
        "relation": "right",
        "stages": [
          "수거함 볼라드 옆 정차",
          "남측으로 비스듬히 후진",
          "전면 우측 볼라드 접촉"
        ],
        "caption": "수거함을 둘러싼 볼라드 옆에서 후진하던 차량의 전면 우측이 볼라드에 접촉",
        "geometryUnknown": [
          "수거함과 볼라드의 좌표·간격",
          "남측 연석까지 회차 공간",
          "전면 우측 후진 궤적"
        ],
        "evidence": [
          "The Waymo AV was traveling northwestbound and turning right to continue traveling in a parking lot at [XXX] when it slowed to a stop near a section of parking bollards, surrounding a dumpster located near the north curb of the parking lot, to its right. The Waymo AV began reversing at an angle towards the south curb of the parking lot, and while the Waymo AV was reversing, the front right side of the Waymo AV made contact with a parking bollard to the right of the Waymo AV."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4958:40f5033f:754087fb",
      "reportedRemediations": []
    },
    {
      "id": "30270-16090",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling southbound in a parking lot at [XXX] and approaching a sloped exit to an adjacent parking lot. The Waymo AV initiated a left turn to continue traveling eastbound through the parking lot, proceeded partially onto the sloped parking lot exit, and the underside of the Waymo AV made contact with the pavement."
      ],
      "facts": [
        "주차장에서 남향으로 주행하며 인접 주차장으로 이어지는 경사진 출구에 접근했다.",
        "동향으로 계속 주행하려 좌회전하던 중 일부가 경사진 출구 위로 올라가 차량 하부가 포장면에 접촉했다.",
        "ADS 작동 중 차량 손상과 견인이 보고됐다. 탑승객 한 명은 당시 안전띠를 매지 않은 상태로 서술됐다. 신고 접촉부위는 차량 하부으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "계획된 동향 좌회전 궤적이 인접 경사 출구를 일부 침범한다는 점을 통과성 평가에 반영했는가?",
        "경사면에 부분적으로 걸친 차체의 롤·피치와 하부 여유를 계산했는가?"
      ],
      "environmentHypotheses": [
        "좌회전 동선과 경사 출구가 만나는 전이부 형상은 어떠했는가? 경사로의 존재만으로 시설 결함을 추정할 수 없다."
      ],
      "dataNeeded": [
        {
          "question": "차량 어느 부분이 경사 출구에 올라갔는가?",
          "material": "출구와 좌회전 동선의 3차원 측량, 바퀴별 궤적·차량 자세, 하부 접촉 사진"
        },
        {
          "question": "경사 출구를 경로 계획에서 어떻게 분류했는가?",
          "material": "지도·지면 높이 추정, 전방 센서 원본, 좌회전 계획·통과성 및 제어 로그"
        },
        {
          "question": "접촉 당시 속도·기울기와 승객 상태 확인 절차는 어떠했는가?",
          "material": "휠 속도·IMU·서스펜션 로그, 안전띠 상태·안내 이벤트, 운행 후 점검 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "좌회전 중 차량 일부가 옆 경사로를 밟는 경우까지 하부 통과성을 검사한다."
        ],
        "environment": [
          "경사 출구와 내부 회전 동선의 경계·전이부 형상을 확인해 안내·표시를 검토한다."
        ],
        "operation": [
          "경사 접촉 후 차량·승객 상태를 확인하고 안전띠 안내 절차를 점검한다."
        ]
      },
      "limits": "어느 바퀴가 경사 출구에 올라갔는지와 하부 접촉 지점이 불명확하다. 안전띠 미착용 사실을 접촉 원인이나 부상 발생 근거로 사용하지 않는다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "경사 출구 포장면",
        "relation": "under",
        "stages": [
          "남향으로 경사 출구 접근",
          "동향 좌회전 중 일부 진입",
          "하부 포장면 접촉"
        ],
        "caption": "주차장 좌회전 중 경사 출구에 일부 올라간 차량 하부가 포장면에 접촉",
        "geometryUnknown": [
          "경사 출구의 기울기·전이부",
          "경사면에 올라간 바퀴 위치",
          "좌회전 궤적과 하부 접촉점"
        ],
        "evidence": [
          "The Waymo AV was traveling southbound in a parking lot at [XXX] and approaching a sloped exit to an adjacent parking lot. The Waymo AV initiated a left turn to continue traveling eastbound through the parking lot, proceeded partially onto the sloped parking lot exit, and the underside of the Waymo AV made contact with the pavement."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "5052:8e03fd23:717cc441",
      "reportedRemediations": []
    },
    {
      "id": "30270-15934",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling northbound in a parking lot at [XXX] and approaching a parking area. The Waymo AV initiated a left turn with its left turn signal activated, and the front right side of the Waymo AV made contact with a pole."
      ],
      "facts": [
        "주차장에서 북쪽으로 주행하며 주차 구역에 접근했다.",
        "왼쪽 방향지시등을 켜고 좌회전을 시작하던 중 전면 우측이 기둥에 접촉했다.",
        "접촉 당시 ADS가 작동 중이었고 차량 손상과 견인이 보고됐다. 신고 접촉부위는 차량 전면으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "좌회전 시작 시 전면 우측 코너의 이동 공간을 기둥 경계와 대조했는가?",
        "기둥이 가까운 주차 구역 진입에서 전체 차체의 회전 궤적을 확인했는가?"
      ],
      "environmentHypotheses": [
        "기둥의 위치·지름과 주차 구역 진입 통로 폭은 어떠했는가? 기둥의 용도나 배치 위반은 서술에 없다."
      ],
      "dataNeeded": [
        {
          "question": "좌회전 중 전면 우측이 기둥과 만난 위치는 어디인가?",
          "material": "기둥 좌표·지름·높이, 주차 구역 경계, 차량 초기 자세와 전면 코너 궤적"
        },
        {
          "question": "기둥 인식과 전체 차체 충돌검사가 이루어졌는가?",
          "material": "전·측방 센서 원본, 기둥 추적·점유지도, 좌회전 계획·조향 명령 로그"
        },
        {
          "question": "접촉 전 정지 또는 경로 수정이 가능했는가?",
          "material": "속도·제동·조향 추종 기록, 대안 경로 후보와 재계획 시각, 현장 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "좌회전에서도 바깥쪽 전면 코너와 가까운 기둥의 간격을 검사한다."
        ],
        "environment": [
          "주차 구역 진입부 기둥 위치와 통행 공간을 실측해 가시성·표시 보완을 검토한다."
        ],
        "operation": [
          "기둥이 인접한 주차 구역 진입 동작을 재현 검증한다."
        ]
      },
      "limits": "전면 우측 접촉은 명시됐지만 기둥이 진입 전 기준 어느 방향에 있었는지, 차량이 얼마나 회전했는지는 알 수 없어 상대 위치는 확정하지 않는다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "주차장 기둥",
        "relation": "unknown",
        "stages": [
          "주차 구역 접근",
          "좌회전 시작",
          "전면 우측 기둥 접촉"
        ],
        "caption": "주차 구역에 접근해 좌회전을 시작한 차량의 전면 우측이 기둥에 접촉",
        "geometryUnknown": [
          "기둥의 정확한 상대 위치",
          "좌회전 시작 자세·궤적",
          "주차 구역 진입 폭"
        ],
        "evidence": [
          "The Waymo AV was traveling northbound in a parking lot at [XXX] and approaching a parking area. The Waymo AV initiated a left turn with its left turn signal activated, and the front right side of the Waymo AV made contact with a pole."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4728:99bf0a41:7e989fd3",
      "reportedRemediations": []
    },
    {
      "id": "30270-15670",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was stopped facing east partially within a parking stall and partially in-lane in a parking lot at [XXX], with its hazard lights activated for a passenger dropoff. The Waymo AV began to reverse into the parking stall and the rear of the Waymo AV made contact with a pole shaft."
      ],
      "facts": [
        "승객 하차를 위해 비상등을 켠 차량이 동쪽을 향한 채 주차면과 통로에 걸쳐 정차했다.",
        "이후 주차면 안으로 후진하다 차량 후면이 기둥 몸체와 접촉했고, 접촉 당시 ADS가 작동 중이었다.",
        "신고 접촉부위는 차량 후면 우측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "후진 시작 전에 기둥의 폭·위치와 차량 후면의 이동 범위가 주차 경로에 충분히 반영됐는가?",
        "하차 정차 상태에서 후진으로 전환할 때 후방 장애물 정보가 갱신됐는가?"
      ],
      "environmentHypotheses": [
        "주차면 내부 또는 주변 기둥이 후진 공간을 얼마나 제한했고, 차량 진입부에서 식별 가능한 표지가 있었는가?"
      ],
      "dataNeeded": [
        {
          "question": "후진 직전 차량과 기둥 사이 여유는 얼마였는가?",
          "material": "주차선·통로·기둥의 실측 배치, 기둥 직경, 차량 자세와 후면 궤적"
        },
        {
          "question": "기둥을 인식한 시점과 계획한 정지 위치는 언제였는가?",
          "material": "후방 카메라·라이다 원시자료, 장애물 추적·자유공간·후진 경로 계획 로그"
        },
        {
          "question": "후진 명령과 실제 정지 동작이 일치했는가?",
          "material": "기어·조향·제동 명령, 휠 속도, 접촉 전후 가속도와 동기화 시각"
        }
      ],
      "improvements": {
        "vehicle": [
          "기둥과 후면 돌출부를 포함한 후진 궤적 검증 및 정지 여유 기준을 점검한다."
        ],
        "environment": [
          "기둥 주변 주차 가능 범위와 시인성을 현장 실측에 따라 재검토한다."
        ],
        "operation": [
          "하차 지점의 후진 필요성과 주차면 내 고정물 위치를 운행 지도 검수 항목에 넣는다."
        ]
      },
      "limits": "기둥과 주차선의 상대 위치, 최초 후방 간격, 후진 조향각이 없어 인지·계획·제어 중 어느 단계가 접촉에 기여했는지 구분할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "reverse",
        "targetKind": "object",
        "targetLabel": "기둥",
        "relation": "behind",
        "stages": [
          "하차 정차",
          "주차면으로 후진",
          "후면·기둥 접촉"
        ],
        "caption": "주차면과 통로에 걸쳐 정차한 뒤 후진하며 기둥에 접촉",
        "geometryUnknown": [
          "기둥과 주차선의 간격",
          "후진 시작 자세와 후면 궤적"
        ],
        "evidence": [
          "The Waymo AV was stopped facing east partially within a parking stall and partially in-lane in a parking lot at [XXX], with its hazard lights activated for a passenger dropoff. The Waymo AV began to reverse into the parking stall and the rear of the Waymo AV made contact with a pole shaft."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4470:7168cc50:62831a6c",
      "reportedRemediations": []
    },
    {
      "id": "30270-15710",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling eastbound, with its hazard lights activated in preparation for a passenger dropoff, in a parking lot at [XXX]. The Waymo AV maneuvered to the right and began to travel underneath a carport on the south side of the parking lot at a low rate of speed.",
        "As the Waymo AV proceeded forward, the sensor mounted on the roof of the Waymo AV made contact with a support beam on the underside of the carport."
      ],
      "facts": [
        "주차장에서 동쪽으로 진행하던 차량이 승객 하차를 준비하며 비상등을 켜고 오른쪽으로 움직여 남쪽 카포트 아래로 진입했다.",
        "저속 전진 중 지붕 센서가 카포트 하부 지지보와 접촉했다.",
        "하차를 준비하던 승객 한 명이 접촉 당시 안전띠를 착용하지 않았다고 보고됐으며, 이 사실만으로 접촉 원인을 설명할 수는 없다. 신고 접촉부위는 차량 상부으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "지붕 센서까지 포함한 차량 전체 높이와 카포트 하부 여유가 경로 계획에 반영됐는가?",
        "하차 지점 선택 과정에서 상부 지지보의 높이를 확인할 수 있었는가?"
      ],
      "environmentHypotheses": [
        "카포트의 최저 통과 높이와 접근 경사, 높이 제한 안내는 어떤 상태였는가?"
      ],
      "dataNeeded": [
        {
          "question": "센서와 지지보의 실제 높이 여유는 얼마였는가?",
          "material": "지지보 하단 높이·노면 경사 실측, 지붕 센서 포함 전고, 진입 자세와 접촉점 사진"
        },
        {
          "question": "상부 구조물이 인식·지도에 어떻게 표현됐는가?",
          "material": "상향 시야 포함 센서 자료, 3차원 장애물 모델, 카포트 지도와 경로 선택 로그"
        },
        {
          "question": "하차 준비와 계속 전진하는 제어 상태는 어떻게 이어졌는가?",
          "material": "하차 위치 요청·정차 계획·속도 명령·실제 속도·승객 안내의 시각별 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "지붕 센서 포함 3차원 차체 외곽과 진입 경사를 함께 사용해 상부 통과 여유를 검증한다."
        ],
        "environment": [
          "카포트 최저 높이를 확인하고 차량 접근 전 확인 가능한 높이 안내와 하차 공간을 검토한다."
        ],
        "operation": [
          "완전 정차 전 하차 준비 안내와 저높이 카포트 하차 지점 등록 절차를 점검한다."
        ]
      },
      "limits": "센서 전고, 지지보 최저 높이 및 진입 경사가 없어 상부 공간 오인과 차량 높이 모델 오차를 구분할 수 없다. 안전띠 미착용과 충돌 발생의 인과관계는 제시되지 않았다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "barrier",
        "targetLabel": "카포트 지지보",
        "relation": "above",
        "stages": [
          "하차 지점 접근",
          "카포트 아래 전진",
          "지붕 센서·보 접촉"
        ],
        "caption": "하차를 준비하며 카포트 아래로 전진하다 지붕 센서가 보와 접촉",
        "geometryUnknown": [
          "지지보 하단 높이",
          "진입부 경사와 차량 자세",
          "센서 포함 차량 전고"
        ],
        "evidence": [
          "The Waymo AV was traveling eastbound, with its hazard lights activated in preparation for a passenger dropoff, in a parking lot at [XXX]. The Waymo AV maneuvered to the right and began to travel underneath a carport on the south side of the parking lot at a low rate of speed.",
          "As the Waymo AV proceeded forward, the sensor mounted on the roof of the Waymo AV made contact with a support beam on the underside of the carport."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4996:27c9a34c:aba1d90a",
      "reportedRemediations": []
    },
    {
      "id": "30270-15505",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling eastbound in a parking lot at [XXX] at a low rate of speed, with its hazard lights activated, when it maneuvered to the right and began to travel underneath a carport on the north side of the parking lot.",
        "As the Waymo AV continued to proceed forward, the sensor mounted on the roof of the Waymo AV made contact with a support beam on the underside of the carport."
      ],
      "facts": [
        "주차장에서 동쪽으로 저속 진행하던 차량이 비상등을 켠 상태로 오른쪽으로 움직여 보고서상 북쪽 카포트 아래로 진입했다.",
        "계속 전진하는 동안 지붕 장착 센서가 카포트 하부 지지보와 접촉했고 차량 손상이 보고됐다.",
        "신고 접촉부위는 차량 상부으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "카포트 진입 경로에서 지붕 센서의 이동 높이와 지지보의 최저 높이를 비교했는가?",
        "상부 장애물 인식 결과가 저속 전진 허용 판단에 전달됐는가?"
      ],
      "environmentHypotheses": [
        "북쪽 카포트의 지지보 위치·높이 및 높이 제한 표시를 접근 중 확인할 수 있었는가?"
      ],
      "dataNeeded": [
        {
          "question": "보고된 동진·우측 이동·북쪽 카포트의 실제 배치는 어떤가?",
          "material": "현장 평면도, 카포트 위치와 진입 궤적, 차량 위치 추정 기록"
        },
        {
          "question": "접촉 당시의 수직 여유는 얼마였는가?",
          "material": "지지보 실측 높이, 노면 단면, 센서 포함 전고와 차체 피치·롤 기록"
        },
        {
          "question": "시스템이 카포트를 통과 가능 공간으로 판단한 근거는 무엇인가?",
          "material": "원시 센서, 상부 장애물 인식·지도 버전, 3차원 충돌 검사와 전진 제어 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "카포트 진입 시 상부 지지보와 지붕 센서의 충돌 검사를 포함하도록 통과 공간 모델을 검토한다."
        ],
        "environment": [
          "현장 배치 및 최저 통과 높이를 측량해 접근 안내와 진입 가능 구역을 재검토한다."
        ],
        "operation": [
          "카포트 경로를 등록할 때 평면 위치와 높이 정보를 함께 검수한다."
        ]
      },
      "limits": "서술의 동쪽 진행·오른쪽 이동·북쪽 카포트라는 관계를 평면도 없이 단순 도식으로 확정할 수 없다. 지지보 높이와 차량 자세도 알려지지 않았다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "barrier",
        "targetLabel": "카포트 지지보",
        "relation": "above",
        "stages": [
          "주차장 저속 이동",
          "카포트 아래 진입",
          "지붕 센서·보 접촉"
        ],
        "caption": "카포트 아래에서 전진 중 지붕 센서가 하부 지지보에 접촉",
        "geometryUnknown": [
          "카포트와 접근 경로의 실제 방향",
          "지지보 높이와 센서 전고",
          "진입부 노면 경사"
        ],
        "evidence": [
          "The Waymo AV was traveling eastbound in a parking lot at [XXX] at a low rate of speed, with its hazard lights activated, when it maneuvered to the right and began to travel underneath a carport on the north side of the parking lot.",
          "As the Waymo AV continued to proceed forward, the sensor mounted on the roof of the Waymo AV made contact with a support beam on the underside of the carport."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4696:e0886649:399240d",
      "reportedRemediations": []
    },
    {
      "id": "13781-15399",
      "narrativeVersion": "1",
      "evidence": [
        "The Tesla ADS made a right turn into an entrance of a parking lot. As the ADS entered the parking lot, the ADS made contact with a thin metal chain that was blocking the entrance of the parking lot."
      ],
      "facts": [
        "ADS 차량이 주차장 입구로 우회전했다.",
        "주차장에 진입하면서 입구를 가로막은 얇은 금속 체인과 접촉했으며 차량에 승객은 없었다.",
        "신고 접촉부위는 차량 전면 우측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "얇은 금속 체인의 인식 범위와 신뢰도가 진입 허용 판단에 충분했는가?",
        "입구를 통행 가능한 연결 경로로 보는 지도 판단보다 현장 폐쇄물 판단이 우선됐는가?"
      ],
      "environmentHypotheses": [
        "체인의 높이·처짐·대비 및 입구 폐쇄 안내는 접근 방향에서 어떤 모습이었는가?"
      ],
      "dataNeeded": [
        {
          "question": "체인이 차량의 어느 높이·부분과 만났는가?",
          "material": "체인 양끝 고정점·처짐·노면 높이 실측, 접촉 부위 사진과 우회전 궤적"
        },
        {
          "question": "체인이 언제 탐지됐고 경로에 어떻게 반영됐는가?",
          "material": "접근 센서 원시자료, 물체 인식·자유공간 추정·경로 재계획 로그"
        },
        {
          "question": "우회전 진입 결정을 내린 기준은 무엇인가?",
          "material": "주차장 진입 경로·지도 버전, 폐쇄물 판단, 속도·제동 명령 및 실제 움직임 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "얇고 처진 체인에 대한 감지·불확실성 처리와 진입 중단 기준을 검증한다."
        ],
        "environment": [
          "체인 폐쇄구간의 접근 시인성과 통행 제한 안내를 현장 조건에 맞춰 개선할 여지를 확인한다."
        ],
        "operation": [
          "주차장 진입 허용 여부를 현장 폐쇄물 정보와 대조하는 절차를 점검한다."
        ]
      },
      "limits": "체인이 입구를 막고 신고 변수에 전면 우측 접촉이 표시된 사실 외에 높이·처짐·조명과 구체적 접촉 지점이 제시되지 않아 감지 실패나 관리상 과실을 확정할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "right",
        "targetKind": "barrier",
        "targetLabel": "입구 금속 체인",
        "relation": "ahead",
        "stages": [
          "입구로 우회전",
          "주차장 진입",
          "얇은 체인 접촉"
        ],
        "caption": "주차장으로 우회전 진입하며 입구를 막은 얇은 체인에 접촉",
        "geometryUnknown": [
          "체인 높이와 처짐",
          "입구 폭과 우회전 궤적",
          "전면 우측의 구체적 접촉 지점"
        ],
        "evidence": [
          "The Tesla ADS made a right turn into an entrance of a parking lot. As the ADS entered the parking lot, the ADS made contact with a thin metal chain that was blocking the entrance of the parking lot."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "3495:4cf82486:b2b05c48",
      "reportedRemediations": []
    },
    {
      "id": "31101-14923",
      "narrativeVersion": "1",
      "evidence": [
        "The AVRIDE AV was traveling southbound in autonomous mode at slow speeds in the left lane as it entered the dropoff zone at the [XXX]. As the AVRIDE AV entered the dropoff zone, an SUV parked and unloading in the right lane had its rear left door open.",
        "The AVRIDE AV began to slowly proceed past the parked SUV when the right mirror of the AVRIDE AV made contact with the open rear door of the SUV."
      ],
      "facts": [
        "AVRIDE 차량이 하차 구역의 왼쪽 차로를 따라 남쪽으로 저속 진입했다.",
        "오른쪽 차로에서 하차 중인 SUV의 왼쪽 뒷문이 열린 상태였고, 이를 지나던 AV의 오른쪽 미러가 열린 문과 접촉했다.",
        "양 차량에 경미한 외관 손상이 보고됐고 부상은 보고되지 않았다. 신고 접촉부위는 차량 우측 / 상대차 좌측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "SUV 차체뿐 아니라 열린 뒷문의 돌출 범위와 AV 미러 폭을 통과 여유 계산에 포함했는가?",
        "하차 중인 차량을 지날 때 문 주변 불확실성에 따른 정지 기준이 적용됐는가?"
      ],
      "environmentHypotheses": [
        "하차 중 문이 열리는 공간과 옆 통행 공간 사이에 어느 정도 여유가 확보돼 있었는가?"
      ],
      "dataNeeded": [
        {
          "question": "문과 미러 사이의 통과 공간은 얼마였는가?",
          "material": "SUV 정차 위치·뒷문 개방각·문 끝 위치·차로 폭 실측, AV 미러 포함 외곽과 궤적"
        },
        {
          "question": "열린 문을 접촉 전 얼마 동안 인식할 수 있었는가?",
          "material": "동기화 영상·라이다, 문 및 차량 추적 로그와 최초 감지 시각"
        },
        {
          "question": "저속 통과 계획과 실제 측방 이동은 일치했는가?",
          "material": "측방 여유 추정·계획 궤적·속도 및 조향 명령·실제 자세 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "열린 문과 미러 돌출부를 포함한 하차 구역 통과 여유 및 대기 기준을 점검한다."
        ],
        "environment": [
          "하차 차량의 문 개방 공간과 통행 공간의 분리 가능성을 현장 배치로 검토한다."
        ],
        "operation": [
          "하차 중인 차량 옆을 통과하는 시나리오에 문 개방 상태를 포함해 운행 검증한다."
        ]
      },
      "limits": "문이 열린 상태였다는 서술은 있지만 개방각·AV의 측방 간격·문 움직임 기록이 없어 문 상태 오인과 경로 여유 부족을 구분할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "vehicle",
        "targetLabel": "SUV 열린 뒷문",
        "relation": "right",
        "stages": [
          "하차 구역 진입",
          "열린 문 옆 통과",
          "오른쪽 미러 접촉"
        ],
        "caption": "하차 중인 SUV를 저속으로 지나며 열린 뒷문과 오른쪽 미러가 접촉",
        "geometryUnknown": [
          "SUV 뒷문 개방각",
          "문 끝과 AV 미러의 간격",
          "통행 공간 폭"
        ],
        "evidence": [
          "The AVRIDE AV was traveling southbound in autonomous mode at slow speeds in the left lane as it entered the dropoff zone at the [XXX]. As the AVRIDE AV entered the dropoff zone, an SUV parked and unloading in the right lane had its rear left door open.",
          "The AVRIDE AV began to slowly proceed past the parked SUV when the right mirror of the AVRIDE AV made contact with the open rear door of the SUV."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4229:286db473:43d1d5d3",
      "reportedRemediations": []
    },
    {
      "id": "30270-14901",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling westbound on [XXX] when it approached the roundabout at the intersection with [XXX]. As the Waymo AV began to slow and traverse the roundabout, the undercarriage of the Waymo AV made contact with a temporary speed bump across the roadway."
      ],
      "facts": [
        "서쪽으로 진행하던 차량이 교차로의 회전교차로에 접근했다.",
        "감속하며 회전교차로를 통과하던 중 차도에 설치된 임시 과속방지턱과 차체 하부가 접촉했다.",
        "접촉 시 ADS가 작동 중이었고 차량 손상이 보고됐다. 신고 접촉부위는 차량 하부으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "임시 과속방지턱의 높이·형상과 차체 하부 여유를 감속 계획에 반영했는가?",
        "회전교차로 통과 경로와 차체 피치 변화가 하부 접촉 예측에 반영됐는가?"
      ],
      "environmentHypotheses": [
        "임시 방지턱의 형상·고정 상태·접근 안내는 어땠으며 설치 정보가 운영자에게 전달됐는가?"
      ],
      "dataNeeded": [
        {
          "question": "방지턱과 하부가 겹치는 기하 조건은 무엇인가?",
          "material": "방지턱 높이·폭·단면, 차량 최저지상고·축간거리, 바퀴 궤적과 접촉점"
        },
        {
          "question": "감속 후 실제 통과 속도와 차체 자세는 어땠는가?",
          "material": "접근 속도·브레이크·서스펜션·피치·가속도 시계열과 접촉 시각"
        },
        {
          "question": "임시 방지턱 정보가 판단에 포함됐는가?",
          "material": "원시 센서, 노면 높이 추정·장애물 분류·지도 갱신 및 속도 계획 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "임시 방지턱의 단면과 차체 자세를 고려한 하부 여유 및 통과 속도 기준을 검증한다."
        ],
        "environment": [
          "방지턱 설치 단면과 시인성·사전 안내 상태를 점검하고 현장 정보 공유를 검토한다."
        ],
        "operation": [
          "회전교차로의 임시 노면시설 변경을 경로 검수에 반영한다."
        ]
      },
      "limits": "방지턱 치수·실제 접촉 속도·차체 자세가 없으며, 회전교차로 내부의 정확한 궤적도 제시되지 않았다. 원자료의 직진 분류만으로 원형 주행 경로를 확정할 수 없다.",
      "scene": {
        "setting": "intersection",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "임시 과속방지턱",
        "relation": "under",
        "stages": [
          "회전교차로 접근",
          "감속하며 통과",
          "하부·방지턱 접촉"
        ],
        "caption": "회전교차로를 감속 통과하며 임시 과속방지턱에 차체 하부가 접촉",
        "geometryUnknown": [
          "방지턱 단면 치수",
          "바퀴 통과 궤적",
          "접촉 순간 차체 높이와 자세"
        ],
        "evidence": [
          "The Waymo AV was traveling westbound on [XXX] when it approached the roundabout at the intersection with [XXX]. As the Waymo AV began to slow and traverse the roundabout, the undercarriage of the Waymo AV made contact with a temporary speed bump across the roadway."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4438:8ab42bf2:f0d6ac0",
      "reportedRemediations": []
    },
    {
      "id": "30270-14580",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling southwestbound in an alley between [XXX] and [XXX] when the undercarriage of the Waymo AV made contact with the raised pavement located in the driving lane surrounding an underground utility access cover."
      ],
      "facts": [
        "차량이 골목을 따라 남서쪽으로 진행했다.",
        "주행 경로 안 지하 설비 접근 덮개 주변의 융기한 포장면과 차체 하부가 접촉했다.",
        "ADS가 작동 중이었으며 차량 손상이 보고됐다. 신고 접촉부위는 차량 하부으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "접근 덮개 주변의 국소 융기를 노면 높이 모델이 구분했는가?",
        "바퀴 사이로 지나가는 융기와 하부 최저점을 경로의 통과 가능성 판단에 포함했는가?"
      ],
      "environmentHypotheses": [
        "덮개 주변 융기의 단차·범위·시인성은 어땠으며 노면 점검 기록이 존재하는가?"
      ],
      "dataNeeded": [
        {
          "question": "어떤 노면 형상이 하부와 접촉했는가?",
          "material": "접근 덮개 및 주변 융기 3차원 실측, 하부 손상 위치, 바퀴 궤적"
        },
        {
          "question": "융기를 접촉 전에 관측했는가?",
          "material": "전방 영상·라이다 원시자료와 노면 높이·장애물 분류 로그"
        },
        {
          "question": "통과 속도와 차체 움직임이 여유에 어떤 영향을 줬는가?",
          "material": "실제 속도·브레이크·피치·서스펜션 로그, 적재 상태와 최저지상고"
        }
      ],
      "improvements": {
        "vehicle": [
          "덮개 주변 국소 융기의 위치·높이와 전체 차체 하부 간섭을 함께 검사한다."
        ],
        "environment": [
          "덮개 주변 포장 단차를 측량하고 필요한 보수·표시 조치를 현장 기준에 따라 검토한다."
        ],
        "operation": [
          "골목 노면의 국소 융기 정보를 운행 경로 점검에 반영한다."
        ]
      },
      "limits": "융기 높이와 접촉점, 차량의 바퀴 궤적 및 동적 지상고가 없어 포장 형상과 차량 동작의 기여를 나눌 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "덮개 주변 융기",
        "relation": "under",
        "stages": [
          "골목 진행",
          "덮개 주변 융기 통과",
          "차체 하부 접촉"
        ],
        "caption": "골목 주행 중 지하 설비 덮개 주변 융기와 차체 하부가 접촉",
        "geometryUnknown": [
          "덮개 주변 융기의 높이·폭",
          "차량 바퀴 궤적",
          "하부 접촉점"
        ],
        "evidence": [
          "The Waymo AV was traveling southwestbound in an alley between [XXX] and [XXX] when the undercarriage of the Waymo AV made contact with the raised pavement located in the driving lane surrounding an underground utility access cover."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4426:8562383d:e44f27c5",
      "reportedRemediations": []
    },
    {
      "id": "31101-13612",
      "narrativeVersion": "5",
      "evidence": [
        "The AVRIDE AV was traveling southeastbound on [XXX] engaged in autonomous mode when it approached a pickup truck parked on the right curb with both doors open. As the AVRIDE AV proceeded to pass the parked pickup truck, the right side of the AVRIDE AV made contact with the open front left side door of the parked pickup truck.",
        "Following the collision, the AVRIDE AV pulled over to the side of the road. Both vehicles sustained minor damage."
      ],
      "facts": [
        "남동쪽으로 진행하던 AV가 오른쪽 연석에 주차돼 문 두 개가 열린 픽업트럭에 접근했다.",
        "픽업트럭을 지나면서 AV 오른쪽이 열린 왼쪽 앞문과 접촉했고, 이후 AV가 도로 가장자리로 이동했다.",
        "수정 보고서는 한때 보험사를 통해 부상 주장이 접수됐으나 후속 자료가 제공되지 않아 최종 부상 분류를 재변경했다고 설명한다. 신고 접촉부위는 차량 전면 좌측, 우측 / 상대차 좌측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "픽업트럭의 열린 앞문 끝과 AV 오른쪽 외곽을 포함한 통과 간격을 충분히 계산했는가?",
        "열린 문을 지나가는 동안 필요한 감속·정지 판단이 문 위치의 불확실성을 반영했는가?"
      ],
      "environmentHypotheses": [
        "연석 주차 위치와 열린 문이 차지한 공간 때문에 이용 가능한 통과 폭이 얼마나 줄었는가?"
      ],
      "dataNeeded": [
        {
          "question": "문과 차량 궤적은 어디서 겹쳤는가?",
          "material": "픽업 정차 위치·앞문 개방각·문 끝 높이, AV 궤적과 오른쪽 손상 위치"
        },
        {
          "question": "열린 앞문을 인식한 시점과 범위는 어떤가?",
          "material": "접근 영상·라이다와 차량·문 추적 로그, 최초 감지 및 가림 기록"
        },
        {
          "question": "통과 판단과 제어가 계획한 여유를 유지했는가?",
          "material": "계획 측방 간격·경로·속도·조향 로그와 실제 위치 추정, 접촉 후 정차 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "열린 차량 문을 차체와 별도 돌출 공간으로 평가하고 불확실할 때 통과를 보류하는 기준을 점검한다."
        ],
        "environment": [
          "연석 주차와 문 개방 시 통행 공간 간섭을 현장 폭 측정에 따라 검토한다."
        ],
        "operation": [
          "문이 열린 주차 차량 옆 통과를 재현해 필요한 측방 여유와 대기 조건을 검증한다."
        ]
      },
      "limits": "신고 변수에는 전면 좌측과 우측가 함께 표시돼 Narrative에 기술된 접촉 부위 외 추가 접촉 여부는 원시 기록 대조가 필요하다. 문 개방각과 통과 간격이 없어 인지·계획·제어의 기여를 구분할 수 없다. 부상 분류 변경은 보고 과정의 설명이며 부상 유무를 독립적으로 판정한 자료는 아니다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "vehicle",
        "targetLabel": "픽업트럭 열린 앞문",
        "relation": "right",
        "stages": [
          "열린 문 차량 접근",
          "픽업트럭 옆 통과",
          "AV 오른쪽·앞문 접촉"
        ],
        "caption": "연석에 주차된 픽업트럭을 지나며 열린 왼쪽 앞문에 접촉",
        "geometryUnknown": [
          "앞문 개방각과 돌출 폭",
          "주차 위치 및 통과 가능 폭",
          "AV의 측방 간격"
        ],
        "evidence": [
          "The AVRIDE AV was traveling southeastbound on [XXX] engaged in autonomous mode when it approached a pickup truck parked on the right curb with both doors open. As the AVRIDE AV proceeded to pass the parked pickup truck, the right side of the AVRIDE AV made contact with the open front left side door of the parked pickup truck.",
          "Following the collision, the AVRIDE AV pulled over to the side of the road. Both vehicles sustained minor damage."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "5576:53134284:cde1d584",
      "reportedRemediations": []
    },
    {
      "id": "30270-14976",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling northwestbound on [XXX] when it began to slow for a stop sign at the intersection with [XXX]. While the Waymo AV was slowing, the front left tire entered a pothole in the road and deflated."
      ],
      "facts": [
        "북서쪽으로 진행하던 차량이 교차로 정지표지를 앞두고 감속했다.",
        "감속 중 왼쪽 앞바퀴가 도로 포트홀에 들어가 타이어 공기가 빠졌고, ADS는 접촉 당시 작동 중이었다.",
        "차량 손상과 견인 사실이 보고됐다. 신고 접촉부위는 차량 전면으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "정지표지 대응 중 포트홀의 음의 높이와 왼쪽 바퀴의 예상 경로를 함께 평가했는가?",
        "포트홀 접근 시 감속 또는 회피 가능성을 판단할 만큼 이른 탐지가 있었는가?"
      ],
      "environmentHypotheses": [
        "포트홀의 깊이·모서리 형상과 당시 시인성, 신고·점검 이력은 어떠했는가?"
      ],
      "dataNeeded": [
        {
          "question": "왼쪽 앞바퀴가 포트홀의 어디를 밟았는가?",
          "material": "포트홀 평면·깊이·모서리 실측, 바퀴 궤적, 타이어와 휠 손상 사진"
        },
        {
          "question": "정지표지 감속과 포트홀 인식은 어떤 순서였는가?",
          "material": "전방 센서, 노면 높이 추정·장애물 추적·정지 계획 로그와 동기화 시각"
        },
        {
          "question": "공기압 손실과 충격 시 실제 차량 상태는 어땠는가?",
          "material": "속도·제동·가속도·TPMS 시계열, 사고 전 타이어 공기압·상태 점검 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "정지 접근 상황에서도 각 바퀴 경로의 포트홀 위험을 평가하고 감속·회피 가능성을 검증한다."
        ],
        "environment": [
          "포트홀 깊이와 모서리 상태를 조사해 보수·안내 필요성을 검토한다."
        ],
        "operation": [
          "타이어 손상과 견인으로 이어진 포트홀 위치를 경로 재검수에 반영한다."
        ]
      },
      "limits": "포트홀 크기·시인거리·충격 순간 속도와 타이어 기존 상태가 없어 감지 한계, 노면 충격, 타이어 조건을 분리할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "pothole",
        "targetLabel": "도로 포트홀",
        "relation": "under",
        "stages": [
          "정지표지 앞 감속",
          "왼쪽 앞바퀴 진입",
          "타이어 공기압 손실"
        ],
        "caption": "정지표지를 앞두고 감속하던 중 왼쪽 앞바퀴가 포트홀에 들어감",
        "geometryUnknown": [
          "포트홀 깊이와 모서리 형상",
          "왼쪽 앞바퀴의 통과 경로",
          "포트홀과 정지 위치 간 거리"
        ],
        "evidence": [
          "The Waymo AV was traveling northwestbound on [XXX] when it began to slow for a stop sign at the intersection with [XXX]. While the Waymo AV was slowing, the front left tire entered a pothole in the road and deflated."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4436:9e569f43:1b82a565",
      "reportedRemediations": []
    },
    {
      "id": "30270-14828",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling southbound on [XXX] when it slowed and maneuvered to the left for a fallen utility line hanging in the travel lane. As the Waymo AV proceeded forward, the front of the Waymo AV made contact with the fallen utility line."
      ],
      "facts": [
        "남쪽으로 진행하던 차량이 주행 차로에 늘어진 전선에 대응해 감속하며 왼쪽으로 움직였다.",
        "이후 전진하던 차량 전면이 늘어진 전선과 접촉했으며, 접촉 당시 ADS가 작동 중이었다.",
        "차량 손상과 견인 사실이 보고됐다. 신고 접촉부위는 차량 전면 우측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "왼쪽으로 이동한 이후에도 전선의 처짐과 차량 전면이 겹치는 범위를 충분히 추적했는가?",
        "늘어진 선의 위치 불확실성을 회피 통과 허용 기준에 반영했는가?"
      ],
      "environmentHypotheses": [
        "전선의 처짐 높이·고정 상태 및 통행 제한이나 현장 경고의 존재 여부는 어떠했는가?"
      ],
      "dataNeeded": [
        {
          "question": "회피 후에도 전면과 전선이 겹친 형상은 무엇인가?",
          "material": "전선 처짐 곡선·높이·고정점, AV 조향 궤적과 전면 접촉점"
        },
        {
          "question": "시스템이 전선을 어떤 범위와 신뢰도로 표현했는가?",
          "material": "원시 영상·라이다, 선형 장애물 추적·3차원 충돌 검사·경로 재계획 로그"
        },
        {
          "question": "감속·좌측 이동·전진 허용 판단은 어떻게 이어졌는가?",
          "material": "속도·제동·조향 명령과 실제 자세, 장애물 회피 판단·정지 대안 평가 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "늘어진 선의 전체 처짐 범위와 불확실성을 고려해 통과보다 정지를 선택할 조건을 검증한다."
        ],
        "environment": [
          "전선 상태와 현장 통행 제한·안내를 확인하고 위험 구간 차단·관리기관 통보 절차를 검토한다."
        ],
        "operation": [
          "늘어진 전선을 발견한 경로의 재진입 조건과 현장 확인 절차를 점검한다."
        ]
      },
      "limits": "감속·좌측 회피는 보고됐지만 전선 높이·이동 여부와 회피 폭이 없어 왜 전면 접촉이 남았는지 판단할 수 없다. 전선의 전기적 상태도 제시되지 않았다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "늘어진 전선",
        "relation": "ahead",
        "stages": [
          "전선 앞 감속",
          "왼쪽으로 회피",
          "전진 중 전면 접촉"
        ],
        "caption": "차로에 늘어진 전선을 피해 왼쪽으로 움직인 뒤 전진 중 접촉",
        "geometryUnknown": [
          "전선 처짐 높이와 고정점",
          "좌측 회피 폭",
          "전면 접촉 위치"
        ],
        "evidence": [
          "The Waymo AV was traveling southbound on [XXX] when it slowed and maneuvered to the left for a fallen utility line hanging in the travel lane. As the Waymo AV proceeded forward, the front of the Waymo AV made contact with the fallen utility line."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4525:26d57da0:546cfb84",
      "reportedRemediations": []
    },
    {
      "id": "31101-14654",
      "narrativeVersion": "1",
      "evidence": [
        "The AVRIDE AV was traveling northwestbound on [XXX] in autonomous mode when it approached a duck lying down in the road. As the AVRIDE AV proceeded straight ahead, it made contact with the duck. This collision resulted in the death of the duck."
      ],
      "facts": [
        "북서쪽으로 자율주행하던 차량이 도로에 누워 있던 오리에 접근했다.",
        "차량이 그대로 직진하며 오리와 접촉했고, 보고서는 이 충돌로 오리가 죽었다고 설명한다.",
        "AV 차량에는 손상이 없었고 다른 부상은 보고되지 않았다."
      ],
      "vehicleHypotheses": [
        "노면에 낮게 누운 오리를 주행 장애물로 인식·추적했는가?",
        "오리를 인식한 거리에서 가능한 감속·정지 대안이 계획 과정에 반영됐는가?"
      ],
      "environmentHypotheses": [
        "오리가 누워 있던 위치의 시야 가림과 도로 대비, 동물 출현 조건은 어떠했는가?"
      ],
      "dataNeeded": [
        {
          "question": "오리의 위치와 크기에 비해 가시거리·정지거리는 충분했는가?",
          "material": "오리 위치·자세 추정, 접근 영상, 차로 형상, 최초 가시 시점과 속도별 정지거리 재구성"
        },
        {
          "question": "오리를 어떤 물체로 처리했는가?",
          "material": "카메라·라이다 원시자료, 소형 동물 분류·추적·신뢰도 및 자유공간 로그"
        },
        {
          "question": "직진을 유지한 판단 근거는 무엇인가?",
          "material": "경로 후보·충돌 예측·감속 및 정지 대안 기록, 실제 속도·제동 명령·차체 움직임"
        }
      ],
      "improvements": {
        "vehicle": [
          "노면에 낮게 누운 소형 동물의 감지와 감속·정지 조건을 재현 검증한다."
        ],
        "environment": [
          "현장 시야와 동물 출현 경로를 확인해 안내나 접근 관리 필요성을 검토한다."
        ],
        "operation": [
          "동물 접촉 사례를 원시 센서와 함께 검토해 해당 도로의 운행 대응 조건을 갱신한다."
        ]
      },
      "limits": "오리의 정확한 위치·크기·가시거리와 최초 감지 시점이 없어 감지 실패와 회피 불가능 상황을 구분할 수 없다. 급작스러운 진입은 서술되지 않았다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "animal",
        "targetLabel": "도로에 누운 오리",
        "relation": "ahead",
        "stages": [
          "도로 위 오리 접근",
          "직진 지속",
          "오리 접촉"
        ],
        "caption": "도로에 누워 있던 오리에 접근한 뒤 직진 중 접촉",
        "geometryUnknown": [
          "오리의 차로 내 위치",
          "접근 시야와 가시거리",
          "차량과 오리의 접촉 부위"
        ],
        "evidence": [
          "The AVRIDE AV was traveling northwestbound on [XXX] in autonomous mode when it approached a duck lying down in the road. As the AVRIDE AV proceeded straight ahead, it made contact with the duck. This collision resulted in the death of the duck."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "3882:ec40555a:5863d3d2",
      "reportedRemediations": []
    },
    {
      "id": "31101-14650",
      "narrativeVersion": "1",
      "evidence": [
        "The AVRIDE AV was traveling southbound in autonomous mode on [XXX] in the right lane when it approached a road sign lying down in the middle of the right lane. As the AVRIDE AV proceeded straight ahead, the front of the AVRIDE AV made contact with the road sign which was already lying down on the road."
      ],
      "facts": [
        "AV가 오른쪽 차로를 따라 남쪽으로 자율주행하던 중 차로 중앙에 쓰러져 있던 도로 표지판에 접근했다.",
        "직진을 계속한 차량 전면이 이미 노면에 누워 있던 표지판과 접촉했다.",
        "차량에는 경미한 손상이 있었고 표지판 손상과 부상은 보고되지 않았다. 신고 접촉부위는 차량 전면 우측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "노면에 낮게 쓰러진 표지판을 통과 가능한 노면과 구분했는가?",
        "차로 중앙의 표지판에 대한 충돌 예측이 정지·회피 계획으로 이어졌는가?"
      ],
      "environmentHypotheses": [
        "표지판의 크기·돌출 높이·노면 대비와 발견·조치 기록은 어떠했는가?"
      ],
      "dataNeeded": [
        {
          "question": "표지판의 어느 부분이 차량 전면과 겹쳤는가?",
          "material": "표지판 자세·크기·돌출 높이, 차로 내 위치, 전면 손상 사진과 차량 궤적"
        },
        {
          "question": "쓰러진 표지판을 언제 어떤 대상으로 인식했는가?",
          "material": "접근 센서 원시자료, 낮은 장애물 분류·자유공간·추적 로그"
        },
        {
          "question": "차로 유지와 정지·회피 대안은 어떻게 비교됐는가?",
          "material": "경로 후보·충돌 예측·제동 명령, 실제 속도·조향·가속도와 주변 교통 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "쓰러진 표지판의 평면부와 지지부를 포함한 낮은 장애물 감지 및 정지 기준을 점검한다."
        ],
        "environment": [
          "표지판 전도 상태와 발견 후 표시·회수 절차를 현장 기록으로 확인한다."
        ],
        "operation": [
          "차로 중앙 낙하물 발견 시 경로 중단·현장 정보 전달 절차를 검토한다."
        ]
      },
      "limits": "표지판이 이미 쓰러져 있었다는 사실은 확인되지만 크기·전도 시점·가시거리 및 주변 회피 공간은 알려지지 않아 책임이나 회피 가능성을 확정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "쓰러진 도로 표지판",
        "relation": "ahead",
        "stages": [
          "오른쪽 차로 진행",
          "쓰러진 표지판 접근",
          "차량 전면 접촉"
        ],
        "caption": "오른쪽 차로 중앙에 쓰러진 도로 표지판과 직진 중 전면 접촉",
        "geometryUnknown": [
          "표지판의 높이·방향·크기",
          "차로 중앙 내 정확한 위치",
          "전면 접촉점과 회피 여유"
        ],
        "evidence": [
          "The AVRIDE AV was traveling southbound in autonomous mode on [XXX] in the right lane when it approached a road sign lying down in the middle of the right lane. As the AVRIDE AV proceeded straight ahead, the front of the AVRIDE AV made contact with the road sign which was already lying down on the road."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4074:93b9022f:af48bcf5",
      "reportedRemediations": []
    },
    {
      "id": "30270-14514",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling eastbound in the right lane on [XXX] when it began to slow and maneuver to the right, towards the south curb, and the front right tire of the Waymo AV made contact with the south curb."
      ],
      "facts": [
        "동쪽으로 오른쪽 차로를 주행하던 차량이 감속하며 남쪽 연석 쪽으로 오른쪽 이동을 시작했다.",
        "이 과정에서 오른쪽 앞타이어가 남쪽 연석과 접촉했고 ADS 작동 중 차량 손상이 보고됐다.",
        "신고 접촉부위는 차량 전면 좌측으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "오른쪽 이동 목표와 연석 경계 사이에 오른쪽 앞바퀴 궤적의 여유가 확보됐는가?",
        "감속·우측 이동 명령과 실제 조향 응답의 차이가 연석 접근에 영향을 줬는가?"
      ],
      "environmentHypotheses": [
        "남쪽 연석의 형상·시인성과 주행 가능 경계 표시는 어떤 상태였는가?"
      ],
      "dataNeeded": [
        {
          "question": "우측 이동 경로와 연석은 어디서 겹쳤는가?",
          "material": "연석 높이·선형, 차로 경계와 차량 위치, 오른쪽 앞바퀴 궤적"
        },
        {
          "question": "오른쪽으로 이동한 목적과 목표 위치는 무엇인가?",
          "material": "행동 계획·경로 목표·정차 또는 회피 요청 로그와 주변 상황 영상"
        },
        {
          "question": "인지한 경계와 실제 조향 동작은 일치했는가?",
          "material": "연석 인식·위치 추정·계획 궤적, 조향·제동 명령과 실제 속도·요레이트"
        }
      ],
      "improvements": {
        "vehicle": [
          "우측 이동 시 앞바퀴의 연석 여유를 검증하고 목표 위치·제어 오차 허용 범위를 점검한다."
        ],
        "environment": [
          "연석 경계가 접근 방향에서 구분되는지 확인하고 표시 보완 필요성을 검토한다."
        ],
        "operation": [
          "우측 이동을 유발한 운행 지시와 해당 구간의 정차·회피 경로를 재검수한다."
        ]
      },
      "limits": "Narrative는 우측 앞타이어 접촉, 신고 변수는 전면 좌측 접촉으로 표기해 좌우가 다르다. 장면은 구체적 Narrative를 따르며 원시 영상·손상 사진 대조가 필요하다. 오른쪽 이동의 목적과 연석까지의 시작 간격·조향각이 없어 경로 선택 문제인지 경계 인식 또는 제어 문제인지 판단할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "unknown",
        "targetKind": "curb",
        "targetLabel": "남쪽 연석",
        "relation": "right",
        "stages": [
          "오른쪽 차로 주행",
          "감속·우측 이동",
          "오른쪽 앞타이어 접촉"
        ],
        "caption": "동진 중 감속하며 오른쪽으로 이동하다 오른쪽 앞타이어가 연석에 접촉",
        "geometryUnknown": [
          "연석의 선형과 높이",
          "우측 이동 시작 간격",
          "오른쪽 앞바퀴 궤적"
        ],
        "evidence": [
          "The Waymo AV was traveling eastbound in the right lane on [XXX] when it began to slow and maneuver to the right, towards the south curb, and the front right tire of the Waymo AV made contact with the south curb."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4314:aa95f471:36b2c2bb",
      "reportedRemediations": []
    },
    {
      "id": "30410-14562",
      "narrativeVersion": "1",
      "evidence": [
        "While proceeding within its lane of travel, the vehicle encountered a piece of concrete debris located in the roadway. The vehicle subsequently struck the debris, resulting in a punctured front tire and damage to the vehicle's undercarriage.",
        "Following the impact, the safety driver brought the vehicle to a controlled stop and pulled over to the side of the roadway."
      ],
      "facts": [
        "남쪽으로 자기 차로를 주행하던 Motional 차량이 도로에 놓인 콘크리트 파편과 충돌했다.",
        "충돌로 앞타이어가 뚫리고 차체 하부가 손상됐다.",
        "안전운전자가 차량을 통제해 정지하고 도로 가장자리로 이동했으며, 타이어 손상으로 주행할 수 없어 견인됐다. 신고 접촉부위는 차량 하부으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "콘크리트 파편의 높이·모서리를 위험 장애물로 인식했는가?",
        "파편 접근 시 충돌 예측과 제동·회피 계획이 어느 시점에 작동했는가?"
      ],
      "environmentHypotheses": [
        "파편의 크기·노면 대비·시야 가림과 낙하물 발견·회수 기록은 어떠했는가?"
      ],
      "dataNeeded": [
        {
          "question": "앞타이어와 하부는 파편의 어느 부분과 접촉했는가?",
          "material": "콘크리트 파편 치수·형상·차로 내 위치, 타이어 및 하부 손상 사진, 바퀴 궤적"
        },
        {
          "question": "탐지에서 충돌까지 어떤 판단이 있었는가?",
          "material": "동기화 원시 센서, 장애물 분류·충돌 예측·경로 후보·제동 명령 로그"
        },
        {
          "question": "충돌 전후 차량 제어와 안전운전자 개입은 어떻게 이어졌는가?",
          "material": "실제 속도·타이어 압력·가속도, ADS 상태와 운전자 입력·개입 시각, 정지 궤적"
        }
      ],
      "improvements": {
        "vehicle": [
          "날카로운 콘크리트 파편의 타이어·하부 위험을 고려한 감지 및 통과 금지 판단을 검증한다."
        ],
        "environment": [
          "현장 파편 수거·경고 절차와 발견 정보를 공유하는 경로를 점검한다."
        ],
        "operation": [
          "타이어 손상 이후 제어 정지와 견인 전환 절차를 해당 개입 기록으로 검토한다."
        ]
      },
      "limits": "파편의 크기·가시거리·발생 시점이 제시되지 않았고 앞타이어의 좌우도 명시되지 않았다. 원시 ADS 상태와 개입 로그 없이 충돌 전 제어 책임을 확정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "콘크리트 파편",
        "relation": "ahead",
        "stages": [
          "차로 내 진행",
          "콘크리트 파편 충돌",
          "안전운전자 정지"
        ],
        "caption": "차로의 콘크리트 파편 충돌로 앞타이어와 하부가 손상된 뒤 정지",
        "geometryUnknown": [
          "파편 치수와 차로 내 위치",
          "앞타이어 좌우 및 접촉점",
          "충돌 전후 차량 궤적"
        ],
        "evidence": [
          "While proceeding within its lane of travel, the vehicle encountered a piece of concrete debris located in the roadway. The vehicle subsequently struck the debris, resulting in a punctured front tire and damage to the vehicle's undercarriage.",
          "Following the impact, the safety driver brought the vehicle to a controlled stop and pulled over to the side of the roadway."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4328:ec5a8798:33a5d714",
      "reportedRemediations": []
    },
    {
      "id": "30270-14384",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling westbound in the left lane on [XXX] and making a left turn into a parking lot driveway entrance at [XXX] when the undercarriage of the Waymo AV made contact with the pavement."
      ],
      "facts": [
        "서쪽 방향 왼쪽 차로를 진행하던 차량이 주차장 진입로로 좌회전했다.",
        "주차장 진입로 입구에서 차량 하부가 포장면과 접촉했으며 접촉 당시 ADS가 작동 중이었다.",
        "차량 손상과 견인 사실이 보고됐다. 신고 접촉부위는 차량 하부으로 표기됐다."
      ],
      "vehicleHypotheses": [
        "좌회전 진입 경로의 종단·횡단 경사와 차체 하부 여유를 함께 평가했는가?",
        "진입 속도와 조향에 따른 차체 자세 변화가 하부 간섭 예측에 반영됐는가?"
      ],
      "environmentHypotheses": [
        "차도와 주차장 진입로의 접속부 단면·단차는 어떠했으며 현장 안내나 관리 기록은 있는가?"
      ],
      "dataNeeded": [
        {
          "question": "어떤 포장면 형상이 하부 접촉을 만들었는가?",
          "material": "차도·진입로 접속부 3차원 측량, 경사·단차 단면, 하부 손상 위치와 바퀴 궤적"
        },
        {
          "question": "진입 경로와 실제 차량 자세는 어떠했는가?",
          "material": "좌회전 계획·실제 위치, 속도·조향·피치·롤·서스펜션 시계열"
        },
        {
          "question": "노면 높이와 차량 지상고가 통행 판단에 반영됐는가?",
          "material": "원시 센서·노면 높이 추정·지도, 차체 하부 모델과 경로 충돌 검사 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "좌회전 진입 시 접속부 노면과 차체 하부의 3차원 여유를 검사하도록 경로 검증을 점검한다."
        ],
        "environment": [
          "진입로 접속부 단면을 측량해 통과 가능 차량 조건과 보수·안내 필요성을 검토한다."
        ],
        "operation": [
          "해당 입구의 진입 각도·속도 조건을 현장 검증한 뒤 경로 정보에 반영한다."
        ]
      },
      "limits": "서술에는 포장면 접촉만 제시돼 융기·급경사·단차 중 어느 형상이 있었는지 알 수 없다. 차체 자세와 최저지상고도 없어 특정 노면 결함을 단정할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "진입로 포장면",
        "relation": "under",
        "stages": [
          "서쪽으로 진행",
          "진입로 좌회전",
          "차체 하부·노면 접촉"
        ],
        "caption": "주차장 진입로로 좌회전하던 중 차체 하부가 포장면에 접촉",
        "geometryUnknown": [
          "진입로 접속부 경사·단차",
          "좌회전 바퀴 궤적",
          "하부 접촉점과 동적 지상고"
        ],
        "evidence": [
          "The Waymo AV was traveling westbound in the left lane on [XXX] and making a left turn into a parking lot driveway entrance at [XXX] when the undercarriage of the Waymo AV made contact with the pavement."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4418:57866ade:581e9ae8",
      "reportedRemediations": []
    },
    {
      "id": "30270-14344",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling eastbound in the right lane on [XXX] when it activated its right turn signal and began to slow and maneuver to the right, towards the south curb, and the front right tire of the Waymo AV made contact with the south curb."
      ],
      "facts": [
        "동쪽 방향 우측 차로에서 우측 방향지시등을 켜고 감속하면서 남쪽 연석 쪽으로 이동했다.",
        "우전륜이 남쪽 연석에 접촉했고 ADS 작동 및 차량 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "감속하며 우측으로 접근할 때 우전륜 궤적과 연석 사이의 여유가 계획·제어에 반영되었는가?"
      ],
      "environmentHypotheses": [
        "남쪽 연석의 높이·돌출·표시는 어떠했는가? 접촉 보고만으로 연석 관리상 결함은 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "우전륜이 연석까지 이동한 실제 경로는 무엇인가?",
          "material": "남쪽 연석 실측 형상, 차량 위치·조향각·바퀴 궤적과 주변 영상"
        },
        {
          "question": "우측 기동 목표와 연석 경계 인지는 어떠했는가?",
          "material": "방향지시 활성화 전후 경로계획, 연석 객체·도로경계 추정, 제어 명령 로그"
        },
        {
          "question": "감속 명령과 실제 접촉 속도는 일치했는가?",
          "material": "원시표 18 mph의 기준시각, 시계 동기화된 속도·제동·접촉 시각 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "남쪽 연석 접근 상황에서 우전륜 외곽 궤적과 감속 완료 위치를 함께 검증한다."
        ],
        "environment": [
          "연석의 국소 돌출과 노면 대비를 실측해 접근 경로에 반영한다."
        ],
        "operation": [
          "도로변 접근 동작에서 여유가 불명확하면 정지 후 경로를 재평가하도록 점검한다."
        ]
      },
      "limits": "우측 접근의 목적과 연석 높이·접근각은 공개되지 않았다. 원시 접촉 부위 표기보다 경위의 우전륜 설명을 우선했으며 원인은 확정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "right",
        "targetKind": "curb",
        "targetLabel": "남쪽 연석",
        "relation": "right",
        "stages": [
          "동쪽 진행",
          "우측 감속 접근",
          "우전륜 연석 접촉"
        ],
        "caption": "우측 감속 접근 중 우전륜이 남쪽 연석에 접촉",
        "geometryUnknown": [
          "연석 높이·돌출",
          "우전륜과 연석 간격"
        ],
        "evidence": [
          "The Waymo AV was traveling eastbound in the right lane on [XXX] when it activated its right turn signal and began to slow and maneuver to the right, towards the south curb, and the front right tire of the Waymo AV made contact with the south curb."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4468:aec1c31c:82cc7d4a",
      "reportedRemediations": []
    },
    {
      "id": "13781-13645",
      "narrativeVersion": "2",
      "evidence": [
        "The Tesla ADS started reversing  after encountering a blocked alley.  As the ADS was reversing, the ADS's rear end made contact with a wooden electrical pole."
      ],
      "facts": [
        "막힌 골목을 만난 뒤 Tesla ADS가 후진을 시작했다.",
        "후진 중 차량 후부가 목재 전신주에 접촉했다. 안전 모니터는 있었고 승객은 없었다."
      ],
      "vehicleHypotheses": [
        "골목에서 퇴출하기 위한 후진 경로에 전신주와 차량 후부의 간격이 지속적으로 반영되었는가?"
      ],
      "environmentHypotheses": [
        "막힌 구간과 전신주의 배치가 확보 가능한 후진 공간을 얼마나 제한했는가? 전신주의 부적절한 설치는 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "후진 경로와 전신주 위치가 어떻게 겹쳤는가?",
          "material": "골목·주차구역 실측, 전신주 좌표·직경, 후방 영상과 차량 후진 궤적"
        },
        {
          "question": "막힘을 인지한 뒤 후진 계획은 어떻게 생성되었는가?",
          "material": "막힘 판단, 전신주 객체 추적, 후진 후보 경로·충돌 검사 로그"
        },
        {
          "question": "안전 모니터가 개입할 수 있었던 시점은 언제였는가?",
          "material": "원시표 1 mph의 시점, 후진 시작·경고·모니터 입력·접촉 동기 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "막힌 골목에서의 후진 경로에 가는 전신주와 후부 외곽 충돌 검사를 강화한다."
        ],
        "environment": [
          "후진에 필요한 실측 폭과 전신주·차단물의 상대 위치를 확인한다."
        ],
        "operation": [
          "막힘 이후 후진 전 후방 가용 공간을 확인하는 운용 기준을 검토한다."
        ]
      },
      "limits": "경위는 골목, 원시표는 주차장으로 기재한다. 전신주의 정확한 측방 위치와 막힘 원인이 없어 후진 가능 폭이나 회피 가능성은 계산할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "reverse",
        "targetKind": "object",
        "targetLabel": "목재 전신주",
        "relation": "behind",
        "stages": [
          "막힌 골목 도달",
          "후진 시작",
          "후부 전신주 접촉"
        ],
        "caption": "막힌 골목에서 후진하던 차량 후부가 전신주에 접촉",
        "geometryUnknown": [
          "골목·주차장 연결 형태",
          "전신주와 후진 경로 간격"
        ],
        "evidence": [
          "The Tesla ADS started reversing  after encountering a blocked alley.  As the ADS was reversing, the ADS's rear end made contact with a wooden electrical pole."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "3857:286f25f2:729efc4e",
      "reportedRemediations": []
    },
    {
      "id": "13781-13646",
      "narrativeVersion": "2",
      "evidence": [
        "The Tesla ADS  was reversing in a parking lot. As the ADS was reversing into an empty parking space, the ADS's right rear tire made contact with a corner of a curb."
      ],
      "facts": [
        "Tesla ADS가 주차장에서 빈 주차 공간으로 후진했다.",
        "후진 중 우후륜이 연석 모서리에 접촉했다. 안전 모니터는 있었고 승객은 없었다."
      ],
      "vehicleHypotheses": [
        "빈 주차 공간으로 들어가는 우후륜 궤적 계산에 연석 모서리의 실제 형상이 반영되었는가?"
      ],
      "environmentHypotheses": [
        "주차 구획과 연석 모서리의 높이·위치는 어떠했는가? 빈 공간이라는 설명은 연석 결함이나 충분한 진입 여유를 뜻하지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "우후륜이 모서리를 지나간 각도와 거리는 얼마였는가?",
          "material": "주차 구획·연석 3차원 실측, 후방 영상, 조향각과 우후륜 궤적"
        },
        {
          "question": "주차 목표점과 연석 인지 경계는 일치했는가?",
          "material": "주차구획 추정, 연석 인지·주차경로·충돌 검사 로그"
        },
        {
          "question": "모서리 접근 중 재계획이나 제동이 있었는가?",
          "material": "원시표 2 mph 기준시점, 속도·제동·조향 명령과 모니터 입력 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "후진 주차 시 차체뿐 아니라 우후륜이 지나는 모서리 여유를 검증한다."
        ],
        "environment": [
          "연석 모서리와 주차 구획의 실제 경계를 확인하고 식별성을 점검한다."
        ],
        "operation": [
          "연석 형상이 불명확한 빈 공간은 진입 전 정지·재평가 대상으로 삼는다."
        ]
      },
      "limits": "주차구획 폭, 연석 높이와 후진 조향 방향이 공개되지 않아 단순 직선 후진으로 재구성할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "reverse",
        "targetKind": "curb",
        "targetLabel": "연석 모서리",
        "relation": "behind",
        "stages": [
          "빈 주차공간 접근",
          "후진 진입",
          "우후륜 연석 접촉"
        ],
        "caption": "빈 주차공간으로 후진하다 우후륜이 연석 모서리에 접촉",
        "geometryUnknown": [
          "연석 모서리 높이",
          "후진 곡률·주차구획 폭"
        ],
        "evidence": [
          "The Tesla ADS  was reversing in a parking lot. As the ADS was reversing into an empty parking space, the ADS's right rear tire made contact with a corner of a curb."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "3878:e6bcb639:4ea30a29",
      "reportedRemediations": []
    },
    {
      "id": "13781-13644",
      "narrativeVersion": "2",
      "evidence": [
        "The Tesla ADS  was proceeding straight on a street, where space was minimal due to a parked heavy duty tow truck and a parked passenger vehicle on the either side of the street. As the ADS continued straight, the ADS's left side mirror made contact with the heavy duty tow truck's left side of the bed."
      ],
      "facts": [
        "도로 양측의 주차된 대형 견인차와 승용차 때문에 공간이 매우 좁은 곳을 Tesla ADS가 직진했다.",
        "차량 좌측 거울이 대형 견인차 적재함 좌측에 접촉했다. 안전 모니터와 승객 1명이 탑승했다."
      ],
      "vehicleHypotheses": [
        "견인차 적재함의 돌출 범위와 좌측 거울까지 포함한 통과 폭을 과소평가했는가?"
      ],
      "environmentHypotheses": [
        "주차 차량 사이의 실제 통과 폭은 얼마였는가? 좁은 공간은 보고됐지만 불법 주차나 관리 과실은 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "두 주차 차량 사이에서 거울까지 확보 가능한 폭은 얼마였는가?",
          "material": "견인차 적재함·승용차 외곽 실측, 차량 거울 폭, 접촉 전 궤적 영상"
        },
        {
          "question": "적재함 좌측은 어떤 객체 경계로 인지되었는가?",
          "material": "센서 원시자료, 견인차 3차원 경계·거울 외곽 충돌검사 로그"
        },
        {
          "question": "직진 유지와 정지 선택은 어떤 근거였는가?",
          "material": "원시표 4 mph의 시계열, 통과 가능 폭 임계값, 계획 후보·정지 판단 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "좁은 통과 공간에서 적재함 돌출과 거울 폭을 포함해 최소 여유를 평가한다."
        ],
        "environment": [
          "견인차와 승용차가 형성한 통로 폭·적재함 높이를 측정한다."
        ],
        "operation": [
          "실측 폭이나 객체 경계 확신이 부족하면 좁은 구간 진입을 보류하도록 검토한다."
        ]
      },
      "limits": "견인차 적재함의 높이·돌출량과 반대편 승용차의 정확한 배치가 없어 경로 선택이나 접촉 책임을 판단할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "vehicle",
        "targetLabel": "주차 견인차",
        "relation": "left",
        "stages": [
          "좁은 도로 진입",
          "양측 차량 사이 직진",
          "좌측 거울 적재함 접촉"
        ],
        "caption": "주차 차량 사이를 직진하던 좌측 거울이 견인차 적재함에 접촉",
        "geometryUnknown": [
          "양측 주차 차량 간격",
          "적재함 돌출 높이·폭"
        ],
        "evidence": [
          "The Tesla ADS  was proceeding straight on a street, where space was minimal due to a parked heavy duty tow truck and a parked passenger vehicle on the either side of the street. As the ADS continued straight, the ADS's left side mirror made contact with the heavy duty tow truck's left side of the bed."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4115:94aa8155:b658dfa1",
      "reportedRemediations": []
    },
    {
      "id": "13781-13647",
      "narrativeVersion": "2",
      "evidence": [
        "As the ADS continued straight on the street, the ADS's rear right tire proceeded over an uneven pavement that punctured the rear right tire. As the ADS reduced vehicle speed to approximately 18MPH while pulling over to the side of the road, the ADS's rear right tire made contact with the corner of a right curb."
      ],
      "facts": [
        "Tesla ADS가 도로를 직진하던 중 우후륜이 고르지 않은 포장면을 지나며 펑크가 났다고 보고됐다.",
        "차량이 도로변으로 이동하며 약 18 mph로 감속하는 과정에서 우후륜이 우측 연석 모서리에 접촉했다.",
        "타이어 압력 손실로 최소위험상태 기동이 시작됐다. 원시표 충돌 전 속도는 17 mph로, 경위 속도와 기준시점 확인이 필요하다."
      ],
      "vehicleHypotheses": [
        "타이어 압력 저하가 발생한 뒤 최소위험 기동에서 변화한 차량 거동과 우후륜의 연석 여유를 반영했는가?"
      ],
      "environmentHypotheses": [
        "펑크를 유발했다고 보고된 불균일 포장의 형상과 도로변 연석 연결부는 어떠했는가? 노면 관리 책임은 별도 확인이 필요하다."
      ],
      "dataNeeded": [
        {
          "question": "노면 통과부터 펑크·연석 접촉까지 실제 순서는 어떠했는가?",
          "material": "불균일 포장·연석 실측, 타이어 손상 분석, 전후방 영상과 이동 궤적"
        },
        {
          "question": "압력 손실 후 기동은 언제·어떻게 변경됐는가?",
          "material": "TPMS 시계열, 최소위험상태 전이, 경로·조향·제동 제어 로그"
        },
        {
          "question": "17 mph와 약 18 mph는 각각 어느 시점인가?",
          "material": "속도 원시자료·보고 산출 기준, 시간 동기화된 압력경보·접촉 이벤트 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "펑크 이후 도로변 정차 기동에 타이어 성능 변화와 연석 여유를 함께 시험한다."
        ],
        "environment": [
          "불균일 포장 위치·높이와 연석 모서리를 실측하고 보수·점검 기록을 확인한다."
        ],
        "operation": [
          "압력 손실 이후 정차 위치 선택과 접촉 후 운행 중지 기준을 검토한다."
        ]
      },
      "limits": "펑크 원인에 대한 보고는 있으나 포장 형상·타이어 감정이 없고 최소위험 기동 시작 시점이 상세하지 않아 두 접촉의 인과 기여를 분리할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "right",
        "targetKind": "curb",
        "targetLabel": "우측 연석",
        "relation": "right",
        "stages": [
          "불균일 노면 통과·펑크",
          "감속하며 도로변 이동",
          "우후륜 연석 접촉"
        ],
        "caption": "펑크 보고 후 도로변으로 감속 이동하다 우후륜이 연석에 접촉",
        "geometryUnknown": [
          "불균일 포장과 연석 간 거리",
          "도로변 이동 각도·연석 높이"
        ],
        "evidence": [
          "As the ADS continued straight on the street, the ADS's rear right tire proceeded over an uneven pavement that punctured the rear right tire. As the ADS reduced vehicle speed to approximately 18MPH while pulling over to the side of the road, the ADS's rear right tire made contact with the corner of a right curb."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4494:c433210:fe75a704",
      "reportedRemediations": []
    },
    {
      "id": "13781-11687",
      "narrativeVersion": "3",
      "evidence": [
        "When the two lanes of oncoming traffic were clear, the ADS made an unprotected left turn into an entrance of a parking lot. As the ADS entered the parking lot, the ADS made contact with a metal chain."
      ],
      "facts": [
        "Tesla ADS가 중앙 좌회전 차로에서 좌측 방향지시등을 켜고 정지한 뒤 맞은편 두 차로가 비자 비보호 좌회전으로 주차장에 진입했다.",
        "주차장에 들어가며 금속 체인에 접촉했다. 안전 모니터와 승객 1명이 탑승했다.",
        "최신 경위는 이전 제출의 에어백 전개·견인 표시가 오류였으며 실제로 둘 다 없었다고 정정했다."
      ],
      "vehicleHypotheses": [
        "맞은편 교통이 비었음을 확인한 뒤 주차장 입구 체인의 차단 범위까지 좌회전 경로에 반영했는가?"
      ],
      "environmentHypotheses": [
        "금속 체인의 높이·처짐·대비가 입구를 차단하는 상태를 드러냈는가? 체인 존재 외 관리 결함은 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "좌회전 경로와 체인의 교차 위치는 어디였는가?",
          "material": "입구·체인 지지점·처짐 실측, 진입 영상과 차체 궤적"
        },
        {
          "question": "체인을 언제 어떤 형태로 인지했는가?",
          "material": "좌회전 전후 센서 자료, 체인 객체·주행가능영역·경로계획 로그"
        },
        {
          "question": "안전 모니터 개입과 접촉 시점은 어떠했는가?",
          "material": "원시표 6 mph의 기준시각, 감속·경고·모니터 입력·접촉 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "비보호 좌회전 완료 전 입구의 얇은 금속 체인까지 장애물 검사를 지속한다."
        ],
        "environment": [
          "주차장 입구 체인의 차단 높이와 식별 표시를 점검한다."
        ],
        "operation": [
          "입구 개방 여부가 불확실하면 대향 교통 통과 판단과 별개로 진입을 보류한다."
        ]
      },
      "limits": "신고 변수에는 차량 전면 우측 접촉이 표시되지만 체인의 정확한 접촉점·높이와 접근 궤적은 미확인이다. 체인을 미인지했는지 통과 가능성을 오판했는지는 센서·계획 로그를 확인해야 한다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "barrier",
        "targetLabel": "입구 금속 체인",
        "relation": "ahead",
        "stages": [
          "중앙 차로 정지",
          "주차장 좌회전 진입",
          "금속 체인 접촉"
        ],
        "caption": "대향 차로가 빈 뒤 주차장으로 좌회전하다 금속 체인에 접촉",
        "geometryUnknown": [
          "체인 높이·처짐",
          "입구 폭·회전 경로"
        ],
        "evidence": [
          "When the two lanes of oncoming traffic were clear, the ADS made an unprotected left turn into an entrance of a parking lot. As the ADS entered the parking lot, the ADS made contact with a metal chain."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4917:b393832d:9c57b877",
      "reportedRemediations": []
    },
    {
      "id": "30270-14385",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV proceeded forward and to the left to maneuver around the traffic cone, and the bottom of the Waymo AV made contact with a curb located near the parking lot exit."
      ],
      "facts": [
        "Waymo AV가 주차장 출구 부근의 자기 진로에 있는 교통콘을 보고 감속·정지했다.",
        "다시 전진하면서 왼쪽으로 콘을 우회하다 차량 하부가 출구 부근 연석에 접촉했다."
      ],
      "vehicleHypotheses": [
        "콘을 피하는 전방·좌측 대체 경로에서 연석 높이와 하부 통과 가능성을 함께 검증했는가?"
      ],
      "environmentHypotheses": [
        "출구의 콘과 연석 사이에 통과 가능한 공간이 있었는가? 콘 배치와 연석 존재만으로 부적절한 통제는 확정되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "콘 우회 궤적이 연석의 어느 부분을 넘었는가?",
          "material": "출구·콘·연석 3차원 실측, 바퀴·차체 궤적 영상"
        },
        {
          "question": "콘 회피 계획에 연석과 하부 외곽이 포함됐는가?",
          "material": "콘·연석 인지 지도, 대체 경로 비용·충돌검사·제어 로그"
        },
        {
          "question": "정지 후 재출발 속도와 하부 여유는 어떠했는가?",
          "material": "원시표 6 mph 시점, 속도·차체 자세·지상고·하중 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "콘 우회 후보에 바퀴 경로와 차체 하부의 연석 통과 검사를 결합한다."
        ],
        "environment": [
          "출구 콘 위치와 연석 사이 가용 통로를 실측한다."
        ],
        "operation": [
          "출구가 콘으로 막힌 경우 연석을 넘는 우회보다 정지·대체 출구 검토 기준을 둔다."
        ]
      },
      "limits": "연석이 콘의 어느 쪽에 있었는지와 실제 접촉 지점은 제시되지 않아 왼쪽 연석으로 단정하지 않는다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "curb",
        "targetLabel": "출구 부근 연석",
        "relation": "under",
        "stages": [
          "교통콘 앞 정지",
          "전진·좌측 우회",
          "하부 연석 접촉"
        ],
        "caption": "출구 교통콘을 왼쪽으로 우회하다 하부가 연석에 접촉",
        "geometryUnknown": [
          "콘과 연석 간격",
          "연석 높이·접촉 위치"
        ],
        "evidence": [
          "The Waymo AV proceeded forward and to the left to maneuver around the traffic cone, and the bottom of the Waymo AV made contact with a curb located near the parking lot exit."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4712:be933f9a:2565bc1e",
      "reportedRemediations": []
    },
    {
      "id": "30270-14172",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was stopped facing north underneath a covered driveway in a parking lot at [XXX]. The Waymo AV then began to proceed straight at a slow rate of speed, and the sensor mounted on the roof of the Waymo AV made contact with the clearance bar."
      ],
      "facts": [
        "Waymo AV가 주차장의 지붕 있는 진입로 아래에서 북쪽을 향해 정지해 있었다.",
        "저속 직진을 시작한 뒤 지붕에 장착된 센서가 높이 제한봉에 접촉했다."
      ],
      "vehicleHypotheses": [
        "출발 전후 상부 장애물 검사에서 지붕 센서를 포함한 전체 차량 높이를 적용했는가?"
      ],
      "environmentHypotheses": [
        "높이 제한봉의 실제 높이와 진입로 경사·표시는 어떠했는가? 제한봉 설치·관리 결함은 보고되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "지붕 센서와 제한봉의 수직·진행방향 여유는 얼마였는가?",
          "material": "제한봉 높이·처짐, 지붕 센서 최고점, 진입로 종단면 실측"
        },
        {
          "question": "상부 장애물은 주행가능 공간에서 어떻게 처리됐는가?",
          "material": "상향 센서 자료, 제한봉 인지·높이 모델·충돌 검사 로그"
        },
        {
          "question": "정지 상태에서 직진 출발을 허용한 근거는 무엇인가?",
          "material": "원시표 2 mph 시점, 출발 판단·속도·차체 피치와 계획 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "지붕 센서 최고점을 포함한 수직 여유 검사를 저속 출발에 적용한다."
        ],
        "environment": [
          "제한봉 높이와 지붕 있는 진입로의 경사·높이 표시를 확인한다."
        ],
        "operation": [
          "차고가 확인되지 않은 덮개 진입로는 출발·진입을 보류하도록 검토한다."
        ]
      },
      "limits": "제한봉의 높이, 출발 위치와 차량 피치가 공개되지 않아 정적 높이 부족과 동적 자세 변화의 기여를 구분할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "barrier",
        "targetLabel": "높이 제한봉",
        "relation": "above",
        "stages": [
          "덮개 진입로 아래 정지",
          "저속 직진 시작",
          "지붕 센서 제한봉 접촉"
        ],
        "caption": "지붕 있는 진입로에서 출발한 차량의 지붕 센서가 제한봉에 접촉",
        "geometryUnknown": [
          "제한봉 높이",
          "정지 위치·진입로 경사"
        ],
        "evidence": [
          "The Waymo AV was stopped facing north underneath a covered driveway in a parking lot at [XXX]. The Waymo AV then began to proceed straight at a slow rate of speed, and the sensor mounted on the roof of the Waymo AV made contact with the clearance bar."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4456:b1e86bf4:4b1071b6",
      "reportedRemediations": []
    },
    {
      "id": "31101-14066",
      "narrativeVersion": "1",
      "evidence": [
        "The AVRIDE AV was traveling eastbound on [XXX] engaged in autonomous mode when it approached a pickup truck traveling in front of the AVRIDE AV in the same lane attempting to turn left at the intersection onto [XXX].",
        "At the intersection, the pickup truck stopped which resulted in the front of the AVRIDE AV making contact with the rear of the pickup truck."
      ],
      "facts": [
        "AVRIDE AV가 같은 차로 앞에서 좌회전을 시도하는 픽업트럭을 따라 동쪽으로 교차로에 접근했다.",
        "교차로에서 픽업트럭이 정지한 뒤 AV 전면이 픽업 후면에 접촉했다. AV 손상과 부상은 보고되지 않았다."
      ],
      "vehicleHypotheses": [
        "좌회전 대기 중인 선행 픽업트럭의 정지에 대해 추종 거리와 제동 시점이 충분했는가?"
      ],
      "environmentHypotheses": [
        "교차로 시야나 좌회전 대기 조건이 선행차 정지 예측에 영향을 주었는가? 신호 상태나 시설 결함은 경위에 없다."
      ],
      "dataNeeded": [
        {
          "question": "선행차가 정지했을 때 두 차량의 거리·속도는 얼마였는가?",
          "material": "동기화된 두 차량 궤적, 앞보기 영상, 교차로 평면·정지 위치 실측"
        },
        {
          "question": "픽업의 좌회전·정지는 언제 예측됐는가?",
          "material": "선행차 추적·행동예측·추종 목표거리·제동 요청 로그"
        },
        {
          "question": "요청한 제동과 실제 감속 사이 차이가 있었는가?",
          "material": "원시표 3 mph 시점, 브레이크 압력·실제 속도·제어 응답·접촉시각 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "좌회전하려다 멈추는 선행 픽업에 대한 저속 추종·정지 여유를 검증한다."
        ],
        "environment": [
          "해당 교차로의 좌회전 시야와 정지 위치를 확인한다."
        ],
        "operation": [
          "교차로 추종 시험에 선행차의 좌회전 직전 정지 시나리오를 포함한다."
        ]
      },
      "limits": "차간거리와 감속률, 신호·우선권 상태가 공개되지 않아 접촉의 시스템 원인이나 법적 책임을 확정할 수 없다.",
      "scene": {
        "setting": "intersection",
        "motion": "straight",
        "targetKind": "vehicle",
        "targetLabel": "선행 픽업트럭",
        "relation": "ahead",
        "stages": [
          "선행차 좌회전 시도",
          "교차로에서 선행차 정지",
          "AV 전면·픽업 후면 접촉"
        ],
        "caption": "좌회전하려던 선행 픽업이 교차로에서 멈춘 뒤 AV가 후면에 접촉",
        "geometryUnknown": [
          "정지 직전 차간거리",
          "교차로 내 두 차량 위치"
        ],
        "evidence": [
          "The AVRIDE AV was traveling eastbound on [XXX] engaged in autonomous mode when it approached a pickup truck traveling in front of the AVRIDE AV in the same lane attempting to turn left at the intersection onto [XXX].",
          "At the intersection, the pickup truck stopped which resulted in the front of the AVRIDE AV making contact with the rear of the pickup truck."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4162:dc3921db:f9b2144b",
      "reportedRemediations": []
    },
    {
      "id": "30270-13778",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling northbound on [XXX], and making a left turn into a parking lot driveway entrance at [XXX] when  the undercarriage of the Waymo AV made contact with the pavement."
      ],
      "facts": [
        "북쪽으로 주행하던 Waymo AV가 주차장 진입로로 좌회전했다.",
        "진입 과정에서 차체 하부가 포장면에 접촉했고 차량 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "좌회전 진입 경로에 따라 달라지는 진입각과 하부 여유가 통과 가능성 판단에 반영되었는가?"
      ],
      "environmentHypotheses": [
        "주차장 진입로와 도로 사이의 경사 변화는 어떠했는가? 경위는 포장면 접촉만 보고하며 단차나 파손을 명시하지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "좌회전 중 어느 하부 부위가 포장면과 겹쳤는가?",
          "material": "입구 3차원 종단·횡단 측량, 하부 손상 위치, 차량 회전 궤적"
        },
        {
          "question": "진입로 높이 모델을 어떻게 사용했는가?",
          "material": "노면 추정·경로계획·주행가능성 평가와 위치추정 로그"
        },
        {
          "question": "9 mph 기록 전후 차체 자세와 하중은 어떠했는가?",
          "material": "속도 시계열, 피치·롤·서스펜션·탑재하중 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "북향 도로에서 좌회전하는 입구 경로의 접근각·하부 여유를 검증한다."
        ],
        "environment": [
          "도로와 진입로 사이 실제 경사 변화를 측량한다."
        ],
        "operation": [
          "미검증 진입로를 경로에 추가할 때 하부 통과 검증을 포함한다."
        ]
      },
      "limits": "포장면 형상이나 접촉 지점이 없어 높은 단차·과속·지상고 부족 중 어느 요소가 작용했는지 판단할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "진입로 포장면",
        "relation": "under",
        "stages": [
          "북쪽 도로 주행",
          "주차장 좌회전 진입",
          "하부 포장면 접촉"
        ],
        "caption": "주차장 진입로로 좌회전하던 차량 하부가 포장면에 접촉",
        "geometryUnknown": [
          "진입로 경사·접속부 형상",
          "좌회전 진입각"
        ],
        "evidence": [
          "The Waymo AV was traveling northbound on [XXX], and making a left turn into a parking lot driveway entrance at [XXX] when  the undercarriage of the Waymo AV made contact with the pavement."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4417:3f5f299a:99a78458",
      "reportedRemediations": []
    },
    {
      "id": "31101-13621",
      "narrativeVersion": "1",
      "evidence": [
        "The AVRIDE AV was traveling southbound on [XXX] engaged in autonomous mode when it made contact with a stationary dumpster located on the right side of the road and the right side of the AVRIDE AV made contact with the left side of the stationary dumpster."
      ],
      "facts": [
        "AVRIDE AV가 자율 모드로 도로를 남쪽으로 진행했다.",
        "차량 우측이 도로 우측에 정지해 있던 대형 폐기물통의 좌측과 접촉했다. 차량 손상이 있고 부상은 보고되지 않았다."
      ],
      "vehicleHypotheses": [
        "도로 우측 폐기물통의 실제 외곽과 차량 우측 사이 여유를 적절히 추정·유지했는가?"
      ],
      "environmentHypotheses": [
        "폐기물통이 도로에 차지한 폭과 가시성은 어떠했는가? 정지된 위치는 보고됐지만 설치 위반이나 관리 과실은 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "폐기물통과 주행 차체 사이 실제 측방 간격은 얼마였는가?",
          "material": "도로 폭·폐기물통 외곽 실측, 우측 영상·차량 궤적·손상 부위"
        },
        {
          "question": "폐기물통 경계가 시간에 따라 어떻게 인지됐는가?",
          "material": "객체 분류·크기·추적 및 도로경계·경로계획 로그"
        },
        {
          "question": "접촉 전 감속이나 회피 후보가 있었는가?",
          "material": "원시표 17 mph 시점, 속도·조향·제동과 후보 경로 평가 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "대형 폐기물통의 불규칙 외곽과 우측 차체의 최소 통과 간격을 검증한다."
        ],
        "environment": [
          "폐기물통의 도로 점유 폭과 접근 방향에서의 식별성을 확인한다."
        ],
        "operation": [
          "주행 공간을 줄이는 고정 장애물 구간의 정지·우회 기준을 점검한다."
        ]
      },
      "limits": "폐기물통의 정확한 도로 침범량과 차량 궤적이 없어 인지 실패와 경로·제어 문제를 구분할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "정지 폐기물통",
        "relation": "right",
        "stages": [
          "남쪽 주행",
          "우측 폐기물통 접근",
          "차량 우측 접촉"
        ],
        "caption": "남쪽 진행 중 차량 우측이 도로 우측 폐기물통에 접촉",
        "geometryUnknown": [
          "폐기물통의 도로 점유 폭",
          "차량과 폐기물통 간격"
        ],
        "evidence": [
          "The AVRIDE AV was traveling southbound on [XXX] engaged in autonomous mode when it made contact with a stationary dumpster located on the right side of the road and the right side of the AVRIDE AV made contact with the left side of the stationary dumpster."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "3945:e84ee3b2:348a8f80",
      "reportedRemediations": []
    },
    {
      "id": "30270-13583",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling southwestbound in an alley between [XXX] and [XXX] when the undercarriage of the Waymo AV made contact with the raised pavement located in the driving lane surrounding an underground utility access cover."
      ],
      "facts": [
        "Waymo AV가 골목을 남서쪽으로 주행했다.",
        "주행 차로의 지하 설비 점검구 덮개 주변에 솟은 포장면과 차체 하부가 접촉했다."
      ],
      "vehicleHypotheses": [
        "점검구 주변의 국소 융기 형상이 노면 추정과 하부 통과 가능성 평가에 반영되었는가?"
      ],
      "environmentHypotheses": [
        "덮개 주변 융기 높이·폭과 보수 이력은 어떠했는가? 융기는 보고되지만 관리상 과실은 자료만으로 확정되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "융기와 하부의 간섭 위치는 어디였는가?",
          "material": "점검구·주변 포장 3차원 측량, 바퀴 궤적·하부 손상 위치"
        },
        {
          "question": "국소 융기를 노면 모델이 유지했는가?",
          "material": "센서 고도 자료, 노면 필터·통과가능성·경로계획 로그"
        },
        {
          "question": "10 mph 기록에서 차량 자세·하중은 어떠했는가?",
          "material": "시계열 속도·피치·서스펜션 변위·탑재하중 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "골목 점검구 주변의 짧은 융기를 하부 간섭 검사에 반영한다."
        ],
        "environment": [
          "덮개와 주변 포장의 높이 차이·보수 상태를 실측 점검한다."
        ],
        "operation": [
          "점검구 융기 확인 구간을 경로 검증과 접촉 후 하부 검사 대상으로 관리한다."
        ]
      },
      "limits": "융기의 높이·길이, 실제 속도와 차량 하중이 없어 도로 형상과 차량 측 요인의 기여를 산출할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "점검구 주변 융기",
        "relation": "under",
        "stages": [
          "골목 남서향 주행",
          "점검구 주변 통과",
          "하부 융기 포장 접촉"
        ],
        "caption": "골목 주행 중 하부가 점검구 주변의 솟은 포장면에 접촉",
        "geometryUnknown": [
          "점검구 주변 융기 높이·폭",
          "바퀴 궤적과 점검구 관계"
        ],
        "evidence": [
          "The Waymo AV was traveling southwestbound in an alley between [XXX] and [XXX] when the undercarriage of the Waymo AV made contact with the raised pavement located in the driving lane surrounding an underground utility access cover."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4514:100efa33:6a457d65",
      "reportedRemediations": []
    },
    {
      "id": "30270-13559",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling eastbound on [XXX] when it made a slight right turn onto [XXX], then began turning left into a parking lot driveway entrance at [XXX].",
        "As the Waymo AV completed turning left and entering the parking lot entrance at a low rate of speed, the undercarriage of the Waymo AV made contact with a speed bump."
      ],
      "facts": [
        "동쪽으로 주행하던 Waymo AV가 약한 우회전 후 주차장 진입로로 좌회전을 시작했다.",
        "저속으로 좌회전을 마치며 진입하는 과정에서 하부가 과속방지턱에 접촉했다.",
        "차량 손상과 당시 한 승객의 안전벨트 미착용이 보고됐으나 이를 접촉 원인으로 볼 근거는 없다."
      ],
      "vehicleHypotheses": [
        "연속 우·좌회전 후 방지턱을 만날 때 진입각과 차체 피치를 반영한 하부 여유를 평가했는가?"
      ],
      "environmentHypotheses": [
        "주차장 입구 방지턱의 높이·단면과 진입로 경사가 어떠했는가? 방지턱 규격 위반은 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "좌회전 종료 위치와 방지턱 횡단각은 어떠했는가?",
          "material": "입구·방지턱 3차원 형상, 회전 궤적·바퀴 통과 영상"
        },
        {
          "question": "방지턱은 언제 인지되어 감속 목표에 반영됐는가?",
          "material": "노면 객체·경로·속도계획·제어 로그"
        },
        {
          "question": "저속 기록에서도 하부 여유가 줄었는가?",
          "material": "원시표 5 mph 시계열, 피치·롤·서스펜션·하중·하부 손상 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "연속 회전 뒤 입구 방지턱을 지나는 진입각·차체 자세 조합을 시험한다."
        ],
        "environment": [
          "입구 경사와 방지턱 단면을 함께 측량한다."
        ],
        "operation": [
          "주차장 입구 통과 검증과 승차 후 안전벨트 확인 절차를 점검한다."
        ]
      },
      "limits": "저속이라는 설명과 벨트 상태만으로 접촉 원인이나 부상을 추정할 수 없다. 방지턱 형상과 자세 자료가 필요하다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "입구 과속방지턱",
        "relation": "under",
        "stages": [
          "약한 우회전",
          "좌회전으로 입구 진입",
          "하부 방지턱 접촉"
        ],
        "caption": "우회전 후 주차장으로 좌회전 진입하며 하부가 방지턱에 접촉",
        "geometryUnknown": [
          "방지턱 높이·단면",
          "좌회전 종료점·횡단각"
        ],
        "evidence": [
          "The Waymo AV was traveling eastbound on [XXX] when it made a slight right turn onto [XXX], then began turning left into a parking lot driveway entrance at [XXX].",
          "As the Waymo AV completed turning left and entering the parking lot entrance at a low rate of speed, the undercarriage of the Waymo AV made contact with a speed bump."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4846:d053b028:d2830a20",
      "reportedRemediations": []
    },
    {
      "id": "30270-13514",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling southwestbound on [XXX] when the front of the Waymo AV made contact with a fallen utility line hanging in the travel lane."
      ],
      "facts": [
        "오전 8시 20분 San Francisco에서 Waymo AV가 남서쪽으로 주행했다.",
        "차로 안에 늘어진 내려온 설비선과 차량 전면이 접촉했고 차량 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "차로에 늘어진 가는 설비선을 차량 전면을 가로막는 장애물로 인지·추적했는가?"
      ],
      "environmentHypotheses": [
        "설비선의 처짐 높이·가시성과 현장 경고 여부는 어떠했는가? 내려온 원인이나 통제 책임은 보고되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "차량 높이에서 설비선이 차로를 어떻게 점유했는가?",
          "material": "설비선 지지점·처짐·높이 측량, 전방 영상과 접촉 흔적"
        },
        {
          "question": "설비선은 언제 탐지되고 경로에 반영됐는가?",
          "material": "원시 센서·가는 선 객체 추적·장애물 경계·정지 판단 로그"
        },
        {
          "question": "접촉 전 정지 가능한 시간·거리는 얼마였는가?",
          "material": "원시표 25 mph 기준시점, 감속 시계열·첫 가시 시점·노면 상태"
        }
      ],
      "improvements": {
        "vehicle": [
          "늘어진 설비선의 가는 형상과 차량 전면 높이에서의 충돌 검사를 검증한다."
        ],
        "environment": [
          "처진 선의 높이·차로 점유와 경고·통제 상태를 확인한다."
        ],
        "operation": [
          "차로 내 설비선 발견 시 정지·우회 및 현장 확인 절차를 검토한다."
        ]
      },
      "limits": "설비선의 높이·낙하 시점·전기적 상태와 감지 거리가 없어 발견 가능성이나 관리 책임을 단정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "늘어진 설비선",
        "relation": "ahead",
        "stages": [
          "남서쪽 주행",
          "차로 내 설비선 접근",
          "전면 접촉"
        ],
        "caption": "남서쪽 주행 중 전면이 차로에 늘어진 설비선과 접촉",
        "geometryUnknown": [
          "설비선 처짐 높이",
          "첫 가시거리·차로 점유 위치"
        ],
        "evidence": [
          "The Waymo AV was traveling southwestbound on [XXX] when the front of the Waymo AV made contact with a fallen utility line hanging in the travel lane."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4336:7c8393a3:b47d9513",
      "reportedRemediations": []
    },
    {
      "id": "30270-13509",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling eastbound on [XXX] when the front of the Waymo AV made contact with a fallen utility line hanging in the travel lane."
      ],
      "facts": [
        "오전 4시 8분 San Francisco에서 Waymo AV가 동쪽으로 주행했다.",
        "차로에 늘어진 내려온 설비선과 차량 전면이 접촉했고 설비선 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "동쪽 접근에서 가는 설비선의 점유 공간을 감지해 정지 판단으로 연결했는가?"
      ],
      "environmentHypotheses": [
        "해당 시각의 실제 조명과 선의 대비·처짐 높이는 어떠했는가? 이른 시각이라는 사실만으로 시야 불량이나 통제 부재를 확정할 수 없다."
      ],
      "dataNeeded": [
        {
          "question": "동쪽 접근 차량 전면과 선의 교차 위치는 어디였는가?",
          "material": "설비선 높이·처짐 실측, 전방 영상·차량 궤적"
        },
        {
          "question": "선 인지와 통과 판단은 어떤 순서였는가?",
          "material": "센서 원시자료, 선 객체·주행가능영역·정지 판단 로그"
        },
        {
          "question": "접촉 전 가시거리와 감속 여유는 얼마였는가?",
          "material": "원시표 18 mph 시계열, 현장 조명·영상 노출·제동 명령 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "동쪽 접근 조건의 얇은 선 인지와 전면 충돌 검사 성능을 재현 평가한다."
        ],
        "environment": [
          "해당 선의 실제 처짐·조명 대비와 현장 통제 이력을 확인한다."
        ],
        "operation": [
          "설비선이 차로를 점유한 구간의 통행 보류·현장 확인 기준을 점검한다."
        ]
      },
      "limits": "설비선 손상은 보고됐지만 차량 손상·선의 전기적 위험은 이 경위에 명시되지 않았다. 낙하 시점과 높이가 없어 원인을 특정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "차로 설비선",
        "relation": "ahead",
        "stages": [
          "동쪽 주행",
          "늘어진 설비선 접근",
          "전면 접촉·선 손상"
        ],
        "caption": "동쪽 주행 중 전면이 늘어진 설비선에 접촉해 선 손상이 보고됨",
        "geometryUnknown": [
          "설비선 높이·처짐",
          "동쪽 접근 가시거리"
        ],
        "evidence": [
          "The Waymo AV was traveling eastbound on [XXX] when the front of the Waymo AV made contact with a fallen utility line hanging in the travel lane."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4334:19a35d87:decea3df",
      "reportedRemediations": []
    },
    {
      "id": "30270-13487",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling southeastbound on [XXX] in the left lane, and began to turn left into a parking lot driveway entrance when the underside of the Waymo AV made contact with the pavement."
      ],
      "facts": [
        "오후 3시 2분 Austin에서 남동쪽 왼쪽 차로를 주행하던 Waymo AV가 주차장 진입로로 좌회전을 시작했다.",
        "차량 아랫부분이 진입로 포장면에 접촉했고 차량 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "좌측 차로에서 입구로 회전하는 경로의 종·횡경사와 차체 하부 여유가 반영되었는가?"
      ],
      "environmentHypotheses": [
        "입구 포장과 도로의 접속 형상은 어떠했는가? 경위는 단차나 파손을 특정하지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "접촉 순간의 좌회전 각도와 하부 위치는 어떠했는가?",
          "material": "해당 입구 종·횡단면, 차량 궤적, 하부 접촉흔적·손상 사진"
        },
        {
          "question": "입구 높이와 경로를 어떤 자료로 판단했는가?",
          "material": "노면 모델·지도 버전·위치추정·좌회전 경로계획 로그"
        },
        {
          "question": "10 mph 기록 전후 동적 지상고는 어떠했는가?",
          "material": "속도·피치·서스펜션·하중 시계열과 제동 명령"
        }
      ],
      "improvements": {
        "vehicle": [
          "남동향 왼쪽 차로에서 좌회전하는 입구 경로의 하부 통과 여유를 검증한다."
        ],
        "environment": [
          "입구와 도로 접속부의 종·횡경사를 측량한다."
        ],
        "operation": [
          "해당 입구 재진입 전 접촉 지점과 차량 하부 상태를 확인한다."
        ]
      },
      "limits": "지리 정보가 비공개여서 비슷한 2시 50분 보고와 같은 장소·원인으로 합칠 수 없다. 입구 형상과 접촉 속도도 불명확하다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "입구 포장면",
        "relation": "under",
        "stages": [
          "남동쪽 왼쪽 차로 주행",
          "입구로 좌회전 시작",
          "차량 하부 포장 접촉"
        ],
        "caption": "오후 3시 2분 주차장 입구로 좌회전하며 차량 하부가 포장면에 접촉",
        "geometryUnknown": [
          "입구 접속부 종·횡경사",
          "회전 궤적·하부 접촉점"
        ],
        "evidence": [
          "The Waymo AV was traveling southeastbound on [XXX] in the left lane, and began to turn left into a parking lot driveway entrance when the underside of the Waymo AV made contact with the pavement."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4432:1db93e55:7bf9880d",
      "reportedRemediations": []
    },
    {
      "id": "30270-13485",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling southeastbound on [XXX] in the left lane, and began to turn left into a parking lot driveway entrance when the underside of the Waymo AV made contact with the pavement."
      ],
      "facts": [
        "오후 2시 50분 Austin에서 Waymo AV가 남동쪽 왼쪽 차로를 진행하다 주차장 진입로로 좌회전을 시작했다.",
        "진입 중 차량 아랫부분이 포장면에 접촉했고 차량 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "좌회전 시작 시 선택한 접근각과 실제 노면 경사에 대해 하부 여유를 충분히 모델링했는가?"
      ],
      "environmentHypotheses": [
        "진입로 경사 변화와 포장 상태가 어땠는가? 포장면 접촉 사실만으로 부적절한 도로 설계를 입증하지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "진입 시작 후 포장면 접촉까지 차체 자세는 어떻게 변했는가?",
          "material": "입구 3차원 형상, 차량 회전·높이 궤적, 하부 손상 위치"
        },
        {
          "question": "좌회전 계획과 실제 위치가 얼마나 일치했는가?",
          "material": "지도·위치추정·노면모델·계획경로·추종오차 로그"
        },
        {
          "question": "원시표 10 mph는 접촉 시점의 속도인가?",
          "material": "속도 산출 시점, 제동·피치·서스펜션·하중 시계열"
        }
      ],
      "improvements": {
        "vehicle": [
          "좌회전 시작부터 입구 진입까지 하부 외곽과 노면 간 간섭을 검증한다."
        ],
        "environment": [
          "입구 경사 변화와 포장 상태를 현장 측량으로 확인한다."
        ],
        "operation": [
          "같은 입구인지 확인하기 전 유사 보고를 분리 관리하고 각각 경로를 검증한다."
        ]
      },
      "limits": "오후 3시 2분 보고와 경위가 유사하지만 공개된 주소로 동일 지점을 확인할 수 없다. 노면 높이와 차량 자세가 없어 독립적 원인 판단이 필요하다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "입구 포장면",
        "relation": "under",
        "stages": [
          "남동쪽 차로 주행",
          "좌회전 시작",
          "하부 포장면 접촉"
        ],
        "caption": "오후 2시 50분 주차장으로 좌회전을 시작하다 하부가 포장면에 접촉",
        "geometryUnknown": [
          "진입로 경사 변화",
          "회전 시작점·차체 자세"
        ],
        "evidence": [
          "The Waymo AV was traveling southeastbound on [XXX] in the left lane, and began to turn left into a parking lot driveway entrance when the underside of the Waymo AV made contact with the pavement."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4432:45b143d9:21918781",
      "reportedRemediations": []
    },
    {
      "id": "30270-13443",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling westbound on [XXX] when the Waymo AV's undercarriage made contact with the pavement."
      ],
      "facts": [
        "Waymo AV가 Los Angeles의 도로를 서쪽으로 주행했다.",
        "차체 하부가 포장면에 접촉했고 차량 손상이 보고됐다. 당시 승객은 안전벨트를 착용하지 않았다."
      ],
      "vehicleHypotheses": [
        "주행 중 노면 높이 변화와 동적 지상고를 반영한 통과 판단이 이루어졌는가?"
      ],
      "environmentHypotheses": [
        "접촉 지점의 포장 형상·경사는 어떠했는가? 경위에는 융기·포트홀·방지턱 등 구체적인 결함이 없다."
      ],
      "dataNeeded": [
        {
          "question": "어떤 포장 형상과 하부 부위가 맞닿았는가?",
          "material": "접촉 지점 종·횡단 측량, 하부 손상 사진, 주행 궤적 영상"
        },
        {
          "question": "노면 모델과 실제 차량 높이는 일치했는가?",
          "material": "노면 추정·위치추정·속도계획·하부 통과 평가 로그"
        },
        {
          "question": "접촉 당시 차량 동적 자세는 어떠했는가?",
          "material": "원시표 10 mph 시계열, 피치·서스펜션·하중·제동 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "형상이 확인된 실제 노면을 사용해 서향 주행 시 하부 여유를 재현 평가한다."
        ],
        "environment": [
          "접촉 지점 포장 형상을 먼저 측정한 후 보수 필요성을 검토한다."
        ],
        "operation": [
          "하부 접촉 후 차량 점검과 승객 안전벨트 확인 절차를 검토한다."
        ]
      },
      "limits": "접촉 대상은 포장면으로만 설명돼 도로 결함의 종류를 지정할 수 없다. 벨트 미착용은 보고 사실이며 접촉 원인이나 상해를 입증하지 않는다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "도로 포장면",
        "relation": "under",
        "stages": [
          "서쪽 도로 주행",
          "포장면 통과",
          "하부 포장면 접촉"
        ],
        "caption": "서쪽 도로 주행 중 하부가 포장면에 접촉",
        "geometryUnknown": [
          "포장면 높이·형상",
          "하부 접촉점·차체 자세"
        ],
        "evidence": [
          "The Waymo AV was traveling westbound on [XXX] when the Waymo AV's undercarriage made contact with the pavement."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4376:c85c8c08:afe76124",
      "reportedRemediations": []
    },
    {
      "id": "30270-13270",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling northbound on [XXX] when the front right side of the Waymo AV made contact with a domestic animal in the Waymo AV's lane of travel."
      ],
      "facts": [
        "Waymo AV가 북쪽으로 주행하던 중 자기 차로에 있던 가축·반려동물로 표현된 동물과 접촉했다.",
        "접촉 부위는 차량 우전방이며 동물 부상이 보고됐다. 동물의 종이나 접근 방향은 경위에 없다."
      ],
      "vehicleHypotheses": [
        "차로 내 작은 동물의 위치·이동 가능성을 언제 인지하고 감속 판단에 반영했는가?"
      ],
      "environmentHypotheses": [
        "동물이 차로에 들어온 경로와 주변 가림·조명 조건은 어떠했는가? 보호자 부재나 관리 소홀은 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "동물과 차량의 상대 이동은 어떠했는가?",
          "material": "전방·우측 영상, 동물 위치·크기·이동 궤적, 차량 궤적"
        },
        {
          "question": "동물 분류·추적과 충돌 예측은 언제 시작됐는가?",
          "material": "센서 원시자료, 동물 객체 추적·예측·제동 판단 로그"
        },
        {
          "question": "가시거리에서 정지 여유가 있었는가?",
          "material": "원시표 20 mph 시계열, 첫 가시 시점, 제동 응답·현장 조명 자료"
        }
      ],
      "improvements": {
        "vehicle": [
          "차로 내 동물의 작은 크기·불규칙 움직임을 반영한 탐지·감속 사례를 검증한다."
        ],
        "environment": [
          "접촉 구간의 가림과 동물 유입 경로를 확인한다."
        ],
        "operation": [
          "동물 감지 신뢰도가 낮은 근거리 상황의 감속·정지 기준을 점검한다."
        ]
      },
      "limits": "우전방 접촉만으로 동물이 우측에서 횡단했다고 볼 수 없다. 동물 종류·위치·시간 자료가 없어 회피 가능성을 확정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "animal",
        "targetLabel": "차로 내 동물",
        "relation": "ahead",
        "stages": [
          "북쪽 주행",
          "차로 내 동물과 근접",
          "우전방 동물 접촉"
        ],
        "caption": "북쪽 주행 중 우전방이 차로 내 동물과 접촉",
        "geometryUnknown": [
          "동물 최초 위치·이동 방향",
          "차량과 동물의 거리"
        ],
        "evidence": [
          "The Waymo AV was traveling northbound on [XXX] when the front right side of the Waymo AV made contact with a domestic animal in the Waymo AV's lane of travel."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4255:118494ca:e488503e",
      "reportedRemediations": []
    },
    {
      "id": "30270-13256",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling southbound on [XXX] when it slowed and maneuvered to the left for a fallen utility line hanging in the travel lane. As the Waymo AV proceeded forward, the front of the Waymo AV made contact with the fallen utility line."
      ],
      "facts": [
        "Waymo AV가 남쪽 주행 중 차로에 늘어진 내려온 설비선을 보고 감속하고 왼쪽으로 이동했다.",
        "계속 전진하면서 차량 전면이 설비선과 접촉했고 차량 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "설비선을 피하기 위한 왼쪽 경로가 선의 전체 처짐 범위와 차량 전면 높이를 포함해 평가되었는가?"
      ],
      "environmentHypotheses": [
        "설비선이 횡·수직으로 차지한 범위와 좌측 가용 공간은 어떠했는가? 선의 관리 책임은 경위로 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "왼쪽 이동 뒤에도 선과 겹친 위치는 어디인가?",
          "material": "설비선 3차원 처짐·지지점, 차량 전진·좌측 궤적과 전방 영상"
        },
        {
          "question": "선 인지에서 우회 선택까지 판단은 어떠했는가?",
          "material": "객체 추적·선 형상 모델·후보 경로 충돌 검사 로그"
        },
        {
          "question": "감속이 접촉 전 어느 수준까지 이루어졌는가?",
          "material": "원시표 12 mph 시점, 속도·조향·제동 명령 및 실제 응답 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "가는 설비선을 감지한 뒤 우회 경로가 선의 전체 공간을 벗어나는지 검사한다."
        ],
        "environment": [
          "선의 실제 처짐 범위와 좌측 통과 공간을 확인한다."
        ],
        "operation": [
          "늘어진 선의 높이·끝점이 불확실하면 통과보다 정지·현장 확인을 검토한다."
        ]
      },
      "limits": "회피 기동은 명시됐지만 선의 형상과 이동량이 없어 인지 실패로 단순 분류하거나 회피가 가능했다고 단정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "늘어진 설비선",
        "relation": "ahead",
        "stages": [
          "남쪽 주행",
          "감속·좌측 이동",
          "전진 중 선 접촉"
        ],
        "caption": "늘어진 설비선을 피해 감속·좌측 이동했으나 전면이 접촉",
        "geometryUnknown": [
          "설비선 처짐 범위",
          "좌측 이동량·가용 공간"
        ],
        "evidence": [
          "The Waymo AV was traveling southbound on [XXX] when it slowed and maneuvered to the left for a fallen utility line hanging in the travel lane. As the Waymo AV proceeded forward, the front of the Waymo AV made contact with the fallen utility line."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4424:9f575d0b:ca05b863",
      "reportedRemediations": []
    },
    {
      "id": "30413-13249",
      "narrativeVersion": "1",
      "evidence": [
        "During normal autonomous operation, the May autonomous shuttle (Ego) was traveling through a narrow section of roadway in a parking lot bordered by parked vehicles on the left and a retaining wall on the right on experimental software version v29.0.20.",
        "The newer lidar points, toward the forward edge of the elongated object, exceeding the limit were filtered out, causing the track to disappear when the ego approached 5m from the track (i.e. the wall).",
        "As a result, the Ego drove too close to the wall, scraping it at a speed of 2 meters per second while driving straight (i.e. in lane-nominal policy) with no nudge or veer corrections."
      ],
      "facts": [
        "May 셔틀은 좌측 주차 차량과 우측 옹벽 사이의 좁은 주차장 통로를 시험 소프트웨어 v29.0.20으로 직진했다.",
        "보고서는 옹벽 라이다 점 수가 검출기 한도를 넘어 앞쪽 점들이 제거되고 약 5 m 거리에서 추적이 사라졌으며, 잘못 그린 도로 경계도 옹벽을 통과했다고 설명한다.",
        "셔틀은 별도 측방 보정 없이 약 2 m/s로 옹벽을 스쳤다. 보고사는 v32.0에서 라이다 한도를 없애고 지도 경계를 수정했다고 밝혔다."
      ],
      "vehicleHypotheses": [
        "보고된 점 수 제한과 도로 경계 오류가 동시에 존재할 때 정적 벽 추적 소실을 감지하는 대체 정지·경계 검사가 작동했는가?"
      ],
      "environmentHypotheses": [
        "실제 옹벽과 지도 경계가 얼마나 어긋났으며 주차 차량이 줄인 통과 폭은 얼마였는가? 물리적 옹벽의 관리 결함은 명시되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "추적 소실 시점에 옹벽과 차체 사이 여유는 얼마였는가?",
          "material": "옹벽·주차차량 실측, 차량 궤적, 약 5 m 접근 구간 센서·접촉 영상"
        },
        {
          "question": "라이다 한도 초과와 경계 오류의 기여는 각각 얼마였는가?",
          "material": "v29.0.20 원시 라이다·필터 전후 점군·추적 로그, 당시 지도와 수정 지도 재생 비교"
        },
        {
          "question": "v32.0 수정이 동일 조건에서 추적과 통과 여유를 유지하는가?",
          "material": "v26.0~v32.0 변경내역, 동일 장면 회귀 재생, 정지·계획·제어 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "보고된 라이다 한도 제거 효과와 추적 소실 시 벽 경계 대체 검사를 재현 검증한다."
        ],
        "environment": [
          "수정 지도 경계를 옹벽 실측 위치와 대조하고 좁은 통로의 배치 변화를 점검한다."
        ],
        "operation": [
          "시험 소프트웨어 배포 시 긴 비정형 벽·잘못된 경계의 결합 사례를 회귀 검증한다."
        ]
      },
      "limits": "회사는 구체적 실패 메커니즘과 수정 조치를 보고했으나 원시 로그·실측 폭은 공개되지 않았다. 수정의 효과나 개별 기여 비율은 독립 검증이 필요하다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "barrier",
        "targetLabel": "우측 옹벽",
        "relation": "right",
        "stages": [
          "좁은 통로 직진",
          "옹벽 추적 소실",
          "옹벽 측면 접촉"
        ],
        "caption": "좌측 주차차량과 우측 옹벽 사이 직진 중 벽 추적 소실 뒤 접촉",
        "geometryUnknown": [
          "옹벽·주차차량 사이 실측 폭",
          "지도 경계와 실제 벽 편차"
        ],
        "evidence": [
          "During normal autonomous operation, the May autonomous shuttle (Ego) was traveling through a narrow section of roadway in a parking lot bordered by parked vehicles on the left and a retaining wall on the right on experimental software version v29.0.20.",
          "As a result, the Ego drove too close to the wall, scraping it at a speed of 2 meters per second while driving straight (i.e. in lane-nominal policy) with no nudge or veer corrections."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "6187:61fecce9:a7bded77",
      "reportedRemediations": [
        {
          "summaryKo": "소프트웨어 v32.0에서 라이다 임계치를 제거했고, 잘못된 도로 경계 주석을 수정해 지도를 갱신했다고 보고했다.",
          "evidence": [
            "in v32.0 an optimization was made to remove the LIDAR threshold entirely and mitigate the vulnerability.",
            "the incorrect road edge annotation was corrected shortly after this incident and the map updated for the deployed vehicles."
          ]
        }
      ]
    },
    {
      "id": "30270-13246",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV initially reversed, then proceeded forward, then reversed again at an angle until the Waymo AV was facing east, before again coming to a stop. The Waymo AV then continued to reverse and the front right side of the Waymo AV made contact with a parking bollard."
      ],
      "facts": [
        "Waymo AV가 주차장에서 북쪽으로 진행하며 우회전을 시작하다 서쪽을 향해 주차된 승용차를 보고 정지했다.",
        "후진·전진·비스듬한 후진을 거쳐 동쪽을 향해 다시 정지한 뒤 후진을 계속했다.",
        "마지막 후진 중 차량 우전방이 주차 볼라드에 접촉했다. 원시표 속도는 1 mph다."
      ],
      "vehicleHypotheses": [
        "여러 번 방향을 전환한 뒤 후진 시 전방이 옆으로 움직이는 궤적과 볼라드 사이 여유를 계속 계산했는가?"
      ],
      "environmentHypotheses": [
        "주차 승용차와 볼라드가 형성한 회전 공간은 얼마였는가? 볼라드가 부적절하게 설치됐는지는 보고되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "각 전·후진 단계의 차량 자세와 볼라드 위치는 어떠했는가?",
          "material": "주차장·볼라드·승용차 배치 실측, 다단계 차량 위치·조향 궤적"
        },
        {
          "question": "방향 전환마다 전방 외곽 충돌 검사가 갱신됐는가?",
          "material": "각 기어 전환의 경로계획·볼라드 추적·차체 외곽 검사 로그"
        },
        {
          "question": "마지막 정지 후 후진을 재개한 조건은 무엇인가?",
          "material": "정지·기어·속도·조향·재출발 허가 로그와 전방 우측 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "다단계 전후진 전환 후 차량 전방의 측방 이동 범위까지 볼라드 충돌 검사를 갱신한다."
        ],
        "environment": [
          "주차차량과 볼라드 사이 회전 가용 공간을 실측한다."
        ],
        "operation": [
          "반복 전후진에서 여유가 축소되면 추가 기동을 중단하고 경로를 재검토하도록 점검한다."
        ]
      },
      "limits": "우전방 접촉은 확인되지만 볼라드가 차량 어느 방향에 처음 있었는지, 각 기동의 거리·조향이 없어 정확한 재현은 불가능하다.",
      "scene": {
        "setting": "parking",
        "motion": "reverse",
        "targetKind": "object",
        "targetLabel": "주차 볼라드",
        "relation": "unknown",
        "stages": [
          "주차차량 앞 정지",
          "전·후진 반복 후 정지",
          "후진 중 우전방 접촉"
        ],
        "caption": "전·후진을 반복한 뒤 후진하던 차량 우전방이 볼라드에 접촉",
        "geometryUnknown": [
          "각 기동 거리·회전각",
          "볼라드의 최초 상대 위치"
        ],
        "evidence": [
          "The Waymo AV initially reversed, then proceeded forward, then reversed again at an angle until the Waymo AV was facing east, before again coming to a stop. The Waymo AV then continued to reverse and the front right side of the Waymo AV made contact with a parking bollard."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4883:e16a1190:7b5759ca",
      "reportedRemediations": []
    },
    {
      "id": "30270-12070",
      "narrativeVersion": "1",
      "evidence": [
        "As the passengers were boarding the Waymo AV, a cat approached the Waymo AV from the southern sidewalk of [XXX] and sat in the roadway partially under the front right corner of the Waymo AV.",
        "As they did so, the cat moved farther from the sidewalk under the Waymo AV and the pedestrian stepped back onto the sidewalk.",
        "The Waymo AV then departed the pickup location and the rear right tire made contact with the cat."
      ],
      "facts": [
        "승객 탑승을 위해 동쪽을 향해 연석 옆에 정지한 AV의 우전방 아래에 남쪽 인도에서 온 고양이가 일부 들어갔다.",
        "인도에서 접근한 보행자가 몸을 낮추고 손을 뻗는 듯한 행동을 하자 고양이는 차 밑으로 더 이동했고 보행자는 인도로 돌아갔다.",
        "AV가 출발한 뒤 우후륜이 고양이와 접촉했다. Waymo는 이후 고양이가 생존하지 못했다는 통지를 받았다고 보고했다."
      ],
      "vehicleHypotheses": [
        "차 밑으로 이동한 고양이의 추적이 가려짐 이후에도 유지되고 출발 허가에 반영되었는가?"
      ],
      "environmentHypotheses": [
        "연석 주변에서 고양이가 하부로 접근하는 가림과 승차 공간은 어떠했는가? 보행자의 행동은 보고된 순서이며 접촉 책임을 입증하지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "고양이가 우전방에서 우후륜 부근으로 이동한 경로는 무엇인가?",
          "material": "차량 주변·하부 가용 영상, 고양이 위치 시계열, 차체·바퀴 위치 실측"
        },
        {
          "question": "보행자 복귀 이후 고양이 객체 상태는 어떻게 처리됐는가?",
          "material": "고양이·보행자 추적 ID, 가림 처리·정적 장애물 유지·출발 허가 로그"
        },
        {
          "question": "차량 출발과 우후륜 접촉 사이 시간·이동량은 얼마였는가?",
          "material": "원시표 5 mph의 시점, 출발·바퀴회전·제동·접촉 동기 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "승차 중 차 밑으로 들어간 동물의 미확인 상태를 출발 판단에 지속 반영하는지 검증한다."
        ],
        "environment": [
          "승차 구역 연석·하부 주변 가시성과 동물 접근 경로를 확인한다."
        ],
        "operation": [
          "동물의 하부 진입이 관찰된 경우 위치 확인 전 출발 보류 절차를 검토한다."
        ]
      },
      "limits": "고양이의 차 밑 실제 궤적과 센서 가시 영역이 공개되지 않아 추적 소실 시점이나 회피 가능성을 확정할 수 없다. 보행자의 의도는 추정 표현이다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "animal",
        "targetLabel": "차 밑 고양이",
        "relation": "under",
        "stages": [
          "승차 중 고양이 접근",
          "고양이가 하부로 이동",
          "출발 후 우후륜 접촉"
        ],
        "caption": "승차 중 차 밑으로 이동한 고양이가 출발 후 우후륜과 접촉",
        "geometryUnknown": [
          "고양이의 하부 이동 경로",
          "우후륜 접촉 전 차량 이동량"
        ],
        "evidence": [
          "As the passengers were boarding the Waymo AV, a cat approached the Waymo AV from the southern sidewalk of [XXX] and sat in the roadway partially under the front right corner of the Waymo AV.",
          "The Waymo AV then departed the pickup location and the rear right tire made contact with the cat."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "5560:43ebd147:6f45c9a1",
      "reportedRemediations": []
    },
    {
      "id": "30530-13119",
      "narrativeVersion": "1",
      "evidence": [
        "While traversing a very narrow lane between temporary barriers and a ditch, slowly and with support of remote assist, the Aurora truck brushed a roadside barrier, resulting in minor scraping on the side of the truck."
      ],
      "facts": [
        "Aurora 트럭은 개발 시험 소프트웨어를 사용해 임시 차단물과 도랑 사이의 매우 좁은 차로를 약 7 mph로 지나갔다.",
        "원격 지원을 받으며 자율 주행하던 중 도로변 차단물을 스쳐 트럭 측면에 가벼운 긁힘이 발생했다.",
        "운전자가 자율 모드를 해제하고 터미널까지 수동 운전했다. 부상과 관찰된 차단물 손상은 없었다."
      ],
      "vehicleHypotheses": [
        "도랑과 임시 차단물 사이를 통과할 때 트럭 전체 외곽·주행 오차를 고려한 여유 판단이 충분했는가?"
      ],
      "environmentHypotheses": [
        "임시 차단물과 도랑 사이의 실제 폭·배치는 어떠했는가? 좁은 차로는 보고됐지만 차단물 관리 과실은 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "차단물 접촉 전 트럭의 측방 여유는 얼마였는가?",
          "material": "차단물·도랑 실측, 트럭 외곽 치수와 차량 궤적·측면 영상"
        },
        {
          "question": "원격 지원과 자율 경로 선택은 어떻게 연결됐는가?",
          "material": "원격 지원 대화·명령, 시험 소프트웨어 버전, 경로·충돌검사·제어 로그"
        },
        {
          "question": "운전자의 해제 시점과 실제 속도는 어떠했는가?",
          "material": "약 7 mph 속도 시계열, 접촉·경고·운전자 개입·모드 전환 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "임시 차단물·도랑이 양쪽을 제한하는 상황에서 트럭 외곽과 제어 오차를 포함한 통과 검사를 시험한다."
        ],
        "environment": [
          "임시 통로 폭·도랑 경계와 차단물 배치를 실측 확인한다."
        ],
        "operation": [
          "개발 시험의 원격 지원·현장 운전자 중지 기준을 좁은 통로 조건으로 구체화한다."
        ]
      },
      "limits": "개발 시험이며 상용 무인 소프트웨어가 아니라고 명시됐다. 접촉한 측면·통로 폭과 원격 지원 내용이 없어 원인이나 상용 운행 성능으로 일반화할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "barrier",
        "targetLabel": "임시 공사 차단물",
        "relation": "unknown",
        "stages": [
          "좁은 임시 통로 진입",
          "원격 지원 중 저속 통과",
          "측면 접촉 후 수동 전환"
        ],
        "caption": "임시 차단물과 도랑 사이를 저속 통과하던 시험 트럭 측면이 접촉",
        "geometryUnknown": [
          "차단물·도랑 사이 폭",
          "접촉 측면·차단물 위치"
        ],
        "evidence": [
          "While traversing a very narrow lane between temporary barriers and a ditch, slowly and with support of remote assist, the Aurora truck brushed a roadside barrier, resulting in minor scraping on the side of the truck."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4872:cc391e57:91f95521",
      "reportedRemediations": []
    },
    {
      "id": "30270-12035",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling northwestbound on [XXX] at a low rate of speed when the undercarriage of the Waymo AV made contact with a speed bump."
      ],
      "facts": [
        "Waymo AV가 Tempe의 도로를 북서쪽으로 저속 주행했다.",
        "차체 하부가 과속방지턱에 접촉했고 차량 손상이 보고됐다. 당시 한 승객은 안전벨트를 착용하지 않았다."
      ],
      "vehicleHypotheses": [
        "저속 주행 중에도 방지턱 단면과 차량 동적 지상고를 반영한 통과 가능성을 확인했는가?"
      ],
      "environmentHypotheses": [
        "도로 방지턱의 높이·길이·진입부 형상은 어떠했는가? 방지턱 규격 위반이나 관리 소홀은 명시되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "어느 바퀴 통과 단계에서 하부가 닿았는가?",
          "material": "방지턱 종·횡단 측량, 바퀴 통과 궤적·하부 손상 사진"
        },
        {
          "question": "방지턱 인지는 속도·경로 계획에 어떻게 반영됐는가?",
          "material": "노면·방지턱 추정, 속도 목표·제어 명령·통과 검사 로그"
        },
        {
          "question": "5 mph 기록과 접촉 순간 차체 높이는 어떠했는가?",
          "material": "속도·피치·서스펜션 변위·탑재하중 시계열"
        }
      ],
      "improvements": {
        "vehicle": [
          "도로 방지턱 통과에서 저속 조건의 피치·지상고 변화를 함께 검증한다."
        ],
        "environment": [
          "방지턱의 실제 높이·길이와 접속 단면을 측량한다."
        ],
        "operation": [
          "접촉 후 하부 점검과 승객 안전벨트 확인 절차를 검토한다."
        ]
      },
      "limits": "저속은 보고됐으나 방지턱 형상·차체 하중이 없어 접촉 원인을 특정할 수 없다. 벨트 미착용을 접촉이나 상해의 원인으로 연결하지 않는다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "과속방지턱",
        "relation": "under",
        "stages": [
          "북서쪽 저속 주행",
          "방지턱 통과",
          "하부 방지턱 접촉"
        ],
        "caption": "북서쪽 저속 주행 중 차량 하부가 방지턱에 접촉",
        "geometryUnknown": [
          "방지턱 높이·길이",
          "차량 횡단각·피치"
        ],
        "evidence": [
          "The Waymo AV was traveling northwestbound on [XXX] at a low rate of speed when the undercarriage of the Waymo AV made contact with a speed bump."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4421:a7d58962:bb31cfc4",
      "reportedRemediations": []
    },
    {
      "id": "30270-11951",
      "narrativeVersion": "1",
      "evidence": [
        "As the Waymo AV proceeded westbound into the parking lot, the Waymo AV's undercarriage made contact with the raised pavement in the parking lot."
      ],
      "facts": [
        "Waymo AV가 북쪽 주행 중 주차장으로 좌회전했다.",
        "서쪽으로 주차장 안에 진입하면서 차량 하부가 솟은 포장면에 접촉했다."
      ],
      "vehicleHypotheses": [
        "좌회전을 마치고 서쪽으로 진입하는 경로에서 포장 융기와 하부 여유를 함께 평가했는가?"
      ],
      "environmentHypotheses": [
        "주차장 내 융기의 높이·폭과 입구 경사는 어떠했는가? 융기 존재는 보고됐으나 부적절한 관리 여부는 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "서쪽 진입 궤적과 융기 포장의 관계는 어떠했는가?",
          "material": "입구·융기 종횡단 측량, 회전 및 진입 궤적, 하부 접촉 위치"
        },
        {
          "question": "융기 형상이 노면 모델에 반영됐는가?",
          "material": "센서 점군·노면 고도 추정·진입경로·충돌 검사 로그"
        },
        {
          "question": "9 mph 기록과 차체 피치·하중은 어떠했는가?",
          "material": "동기화된 속도·조향·피치·서스펜션·탑재하중 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "좌회전 후 서향 진입 구간의 포장 융기와 차체 하부 간섭을 검증한다."
        ],
        "environment": [
          "주차장 입구와 내부 융기 형상을 연속 측량한다."
        ],
        "operation": [
          "융기가 있는 입구 경로를 재사용하기 전 통과 조건을 확인한다."
        ]
      },
      "limits": "융기 높이와 접촉 위치, 회전 완료 시점이 없어 경사 전이와 융기 자체의 기여를 분리할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "주차장 융기 포장",
        "relation": "under",
        "stages": [
          "북쪽 주행 후 좌회전",
          "서쪽으로 주차장 진입",
          "하부 융기 포장 접촉"
        ],
        "caption": "좌회전 뒤 서쪽으로 주차장에 진입하며 하부가 솟은 포장면에 접촉",
        "geometryUnknown": [
          "융기 높이·폭",
          "입구 경사·차량 진입각"
        ],
        "evidence": [
          "As the Waymo AV proceeded westbound into the parking lot, the Waymo AV's undercarriage made contact with the raised pavement in the parking lot."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4572:f835495b:10a54967",
      "reportedRemediations": []
    },
    {
      "id": "30270-11888",
      "narrativeVersion": "1",
      "evidence": [
        "While proceeding over the dividing curb, the undercarriage of the Waymo AV made contact with the curb and the left side rail trim of the Waymo AV partially detached.",
        "After remaining stopped for approximately five minutes, the passenger pick-up was cancelled and the Waymo AV traveled northwestbound on [XXX] for a short distance and then proceeded over a rubber speed bump.",
        "As the Waymo AV traveled over the rubber speed bump, the partially detached left side rail trim of the Waymo AV caught on the rubber speed bump."
      ],
      "facts": [
        "Waymo AV가 주차 구획을 나누는 연석 위로 유턴하면서 하부가 연석에 접촉했고 좌측 사이드 레일 트림이 일부 떨어졌다.",
        "유턴 후 승객 픽업을 위해 주차해 약 5분 대기했으나 픽업이 취소되어 다시 출발했다.",
        "이후 고무 방지턱을 넘을 때 부분 탈락한 트림이 걸렸고 차량과 방지턱 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "첫 연석 접촉 후 부분 탈락한 트림에 따른 차체 외곽·하부 여유 변화를 감지하고 후속 주행에 반영했는가?"
      ],
      "environmentHypotheses": [
        "주차구획 연석과 후속 고무 방지턱의 형상·배치는 어떠했는가? 두 시설의 관리 결함은 보고되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "연석 통과와 방지턱 접촉의 각각의 형상은 어떠했는가?",
          "material": "연석·고무 방지턱 실측, 유턴·이후 주행 궤적, 트림 탈락·접촉 사진"
        },
        {
          "question": "첫 접촉과 트림 변화를 시스템이 인지했는가?",
          "material": "접촉 감지·차량 상태·하부 외곽·운행계속 판단 로그"
        },
        {
          "question": "약 5분 정지 뒤 재출발 때 상태 점검이 있었는가?",
          "material": "픽업·취소·재출발 이벤트, 현장·원격 점검 기록, 속도·제어 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "연석을 넘는 유턴의 하부 간섭과 최초 접촉 후 변형된 외곽 상태 판단을 검증한다."
        ],
        "environment": [
          "구획 연석의 높이와 다음 고무 방지턱 형상·위치를 확인한다."
        ],
        "operation": [
          "하부 접촉·외장재 탈락 가능성이 있으면 후속 운행 전 점검하는 기준을 검토한다."
        ]
      },
      "limits": "경위는 두 접촉을 연결하지만 트림 변형 크기·감지 여부와 두 지점 거리가 공개되지 않았다. 유턴의 좌우 회전 방향은 명시되지 않았다.",
      "scene": {
        "setting": "parking",
        "motion": "unknown",
        "targetKind": "curb",
        "targetLabel": "구획 연석·후속 방지턱",
        "relation": "under",
        "stages": [
          "연석 위 유턴·트림 탈락",
          "픽업 대기 후 취소",
          "트림이 고무 방지턱에 걸림"
        ],
        "caption": "연석 위 유턴 후 탈락한 트림이 다음 주행의 고무 방지턱에 걸림",
        "geometryUnknown": [
          "유턴 궤적·연석 높이",
          "트림 변형량·방지턱 형상"
        ],
        "evidence": [
          "While proceeding over the dividing curb, the undercarriage of the Waymo AV made contact with the curb and the left side rail trim of the Waymo AV partially detached.",
          "As the Waymo AV traveled over the rubber speed bump, the partially detached left side rail trim of the Waymo AV caught on the rubber speed bump."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "5763:618adfa2:370557b6",
      "reportedRemediations": []
    },
    {
      "id": "30270-11805",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling westbound through a collection of parking lots behind [XXX] when it proceeded to the west exit of the parking lot area and the front of the Waymo AV made contact with a hanging chain separating a section of the parking lot."
      ],
      "facts": [
        "Waymo AV가 여러 주차장이 이어진 구역을 서쪽으로 주행해 서쪽 출구로 향했다.",
        "주차장 일부를 구분하는 매달린 체인에 차량 전면이 접촉했고 체인 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "서쪽 출구 경로를 선택할 때 얇게 매달린 체인이 출구를 차단하는 상태를 인지했는가?"
      ],
      "environmentHypotheses": [
        "체인의 높이·처짐과 출구 개방 표시가 어떠했는가? 출구 방향이라는 설명만으로 통행 허용이나 체인 관리 결함을 알 수 없다."
      ],
      "dataNeeded": [
        {
          "question": "체인이 서쪽 출구의 어느 범위를 차단했는가?",
          "material": "체인 지지점·높이·처짐과 출구 폭 실측, 접근 영상·차량 궤적"
        },
        {
          "question": "출구 개방 판단과 체인 탐지는 언제 이루어졌는가?",
          "material": "체인 객체·주행가능영역·출구 선택·정지 판단 로그"
        },
        {
          "question": "체인 접촉 전 감속 여유는 얼마였는가?",
          "material": "원시표 8 mph 시계열, 첫 가시 시점·제동 요청·실제 응답"
        }
      ],
      "improvements": {
        "vehicle": [
          "연속 주차장 내 출구 경로의 체인 차단 상태를 경로 계획과 함께 검사한다."
        ],
        "environment": [
          "서쪽 출구 체인의 차단 범위와 접근 시 식별성을 확인한다."
        ],
        "operation": [
          "개방 상태가 검증되지 않은 주차장 간 연결·출구는 진입 전 확인하도록 점검한다."
        ]
      },
      "limits": "체인 높이와 출구 통행 상태가 공개되지 않아 발견 가능성·차단 목적·관리 책임은 확정할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "barrier",
        "targetLabel": "서쪽 출구 체인",
        "relation": "ahead",
        "stages": [
          "주차장 구역 서쪽 주행",
          "서쪽 출구 접근",
          "전면 체인 접촉"
        ],
        "caption": "여러 주차장을 지나 서쪽 출구로 향하던 전면이 체인에 접촉",
        "geometryUnknown": [
          "체인 높이·처짐",
          "출구 폭·체인 지지점"
        ],
        "evidence": [
          "The Waymo AV was traveling westbound through a collection of parking lots behind [XXX] when it proceeded to the west exit of the parking lot area and the front of the Waymo AV made contact with a hanging chain separating a section of the parking lot."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4431:8edda1:6ae780cf",
      "reportedRemediations": []
    },
    {
      "id": "30270-11836",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV slowed to a stop to yield to the parked heavy truck, which was partially in the Waymo AV's lane of travel.",
        "The Waymo AV proceeded to maneuver around the left side of the heavy truck and the front right side of the Waymo AV made contact with the rear left side of the flatbed of the heavy truck."
      ],
      "facts": [
        "동쪽으로 주행하던 Waymo AV 앞의 평판 트레일러 연결 대형 트럭이 남쪽 연석에 정차·주차했고 일부가 AV 차로를 차지했다.",
        "AV는 먼저 정지한 뒤 트럭 왼쪽으로 우회했다.",
        "우회 중 AV 우전방이 평판 적재부 좌후방과 접촉했다."
      ],
      "vehicleHypotheses": [
        "트럭 왼쪽을 우회하는 경로에 평판 트레일러 좌후방의 돌출 형상과 AV 우전방 외곽을 반영했는가?"
      ],
      "environmentHypotheses": [
        "주차 트럭의 차로 점유 폭과 교차로 정지표지 부근의 통과 공간은 어떠했는가? 주차 위반은 이 경위로 판단하지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "트레일러 모서리와 AV 우전방의 최근접 거리는 얼마였는가?",
          "material": "평판 트레일러 외곽·차로 점유 실측, 우회 궤적·우전방 영상"
        },
        {
          "question": "트럭 정차 이후 객체 경계와 우회 경로는 어떻게 갱신됐는가?",
          "material": "트럭·트레일러 분리 추적, 돌출 경계·후보경로 충돌 검사 로그"
        },
        {
          "question": "정지 후 1 mph 기동의 조향과 제어 오차는 어떠했는가?",
          "material": "속도·조향·실제 궤적·계획 추종오차·접촉시각 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "주차 트럭의 평판 트레일러 모서리까지 포함해 저속 우회 외곽 검사를 수행한다."
        ],
        "environment": [
          "트럭의 실제 차로 점유 폭과 교차로 부근 통과 공간을 확인한다."
        ],
        "operation": [
          "우회 여유가 확인되지 않으면 재출발을 보류하고 경로를 재평가하도록 검토한다."
        ]
      },
      "limits": "우회 방향과 접촉 부위는 명시되지만 실제 남은 폭·트레일러 높이·조향 궤적이 없어 인지와 제어 기여를 구분할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "left",
        "targetKind": "vehicle",
        "targetLabel": "평판 트레일러",
        "relation": "right",
        "stages": [
          "선행 트럭 연석 주차",
          "AV 정지 후 좌측 우회",
          "우전방·평판 좌후방 접촉"
        ],
        "caption": "차로를 일부 차지한 트럭의 왼쪽으로 우회하다 평판 모서리에 접촉",
        "geometryUnknown": [
          "트레일러 차로 점유 폭",
          "우회 시 측방 간격"
        ],
        "evidence": [
          "The Waymo AV slowed to a stop to yield to the parked heavy truck, which was partially in the Waymo AV's lane of travel.",
          "The Waymo AV proceeded to maneuver around the left side of the heavy truck and the front right side of the Waymo AV made contact with the rear left side of the flatbed of the heavy truck."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "5117:e25e82fa:768603e",
      "reportedRemediations": []
    },
    {
      "id": "30270-11771",
      "narrativeVersion": "1",
      "evidence": [
        "After the drop-off was completed, the Waymo AV proceeded to maneuver around the right side of the heavy truck and enter the leftmost lane, and the front left side of the Waymo AV made contact with the rear right corner of the loading ramp of the heavy truck."
      ],
      "facts": [
        "Waymo AV가 북서쪽을 향해 연석에 정지하여 하차를 진행했고 앞쪽 트럭은 후방 적재 경사판을 내리고 비상등을 켠 채 주차 중이었다.",
        "하차 후 AV가 트럭 오른쪽을 돌아 가장 왼쪽 차로로 진입하려고 움직였다.",
        "AV 좌전방이 내려진 경사판의 우후방 모서리에 접촉했다."
      ],
      "vehicleHypotheses": [
        "트럭 차체 외곽뿐 아니라 낮게 내려진 적재 경사판의 끝과 AV 좌전방 궤적을 함께 계산했는가?"
      ],
      "environmentHypotheses": [
        "경사판의 길이·높이와 연석 주변 통과 공간은 어떠했는가? 비상등 점등과 경사판 배치는 보고됐지만 적법성·관리 과실은 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "트럭 오른쪽 우회와 왼쪽 차로 진입의 실제 평면 관계는 어떠했는가?",
          "material": "연석·차로·트럭·경사판 실측, AV 위치·조향 궤적과 전방 영상"
        },
        {
          "question": "내려진 경사판은 어떤 3차원 경계로 처리됐는가?",
          "material": "트럭·경사판 센서 점군, 객체 외곽·저상 장애물·충돌 검사 로그"
        },
        {
          "question": "하차 후 재출발에서 여유 판단은 어떻게 이루어졌는가?",
          "material": "원시표 2 mph 시점, 하차완료·재출발·경로후보·제어 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "하차 후 출발 경로에 트럭의 내려진 후방 경사판과 좌전방 외곽을 포함한다."
        ],
        "environment": [
          "경사판이 차지하는 길이·높이와 도로변 통과 여유를 확인한다."
        ],
        "operation": [
          "적재 경사판 부근 승하차 지점은 출발 가능한 경로까지 확인해 선택하도록 검토한다."
        ]
      },
      "limits": "트럭 오른쪽 우회와 가장 왼쪽 차로 진입은 경위 표현 그대로이며 차로·연석 배치가 없어 일반 도로 형태로 추정해 그릴 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "right",
        "targetKind": "vehicle",
        "targetLabel": "트럭 후방 경사판",
        "relation": "left",
        "stages": [
          "트럭 뒤 승객 하차",
          "트럭 오른쪽 우회 출발",
          "좌전방·경사판 모서리 접촉"
        ],
        "caption": "하차 후 트럭 오른쪽으로 출발하다 좌전방이 내려진 경사판에 접촉",
        "geometryUnknown": [
          "연석·차로·트럭 배치",
          "경사판 돌출 길이·높이"
        ],
        "evidence": [
          "After the drop-off was completed, the Waymo AV proceeded to maneuver around the right side of the heavy truck and enter the leftmost lane, and the front left side of the Waymo AV made contact with the rear right corner of the loading ramp of the heavy truck."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4978:8266fe9f:2f1880ff",
      "reportedRemediations": []
    },
    {
      "id": "30270-11689",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was in autonomous mode traveling eastbound on [XXX] when it began to turn left into a parking lot at [XXX]. As the Waymo AV proceeded northbound into the entrance of the parking lot, the Waymo AV's undercarriage made contact with the pavement at the entrance of the parking lot."
      ],
      "facts": [
        "샌프란시스코에서 동쪽으로 주행하던 차량이 주차장으로 좌회전을 시작했다.",
        "북쪽으로 주차장 입구에 진입하던 중 차체 하부가 입구 포장면과 접촉했다.",
        "접촉 당시 ADS가 작동 중이었고 운전석의 시험 운전자는 경미한 부상을 주장했다."
      ],
      "vehicleHypotheses": [
        "좌회전 후 북향 진입 궤적에서 입구 종단 형상과 차량 하부 여유가 충분히 평가됐는가?"
      ],
      "environmentHypotheses": [
        "입구 포장면의 경사 변화와 높이가 해당 차량의 통과 여유에 어떤 영향을 주었는가? 포장 결함은 서술에 명시되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "하부 접촉을 만든 진입 각도와 높이 변화는 무엇인가?",
          "material": "입구의 종·횡단 측량, 접촉 흔적 위치, 차량 하부 치수와 당시 하중"
        },
        {
          "question": "좌회전에서 북향 진입까지 실제 궤적과 차체 자세는 어땠는가?",
          "material": "동기화된 외부 영상, 조향각·속도·피치·서스펜션 시계열"
        },
        {
          "question": "ADS는 입구를 어떤 높이 형상으로 인식하고 통과 경로를 선택했는가?",
          "material": "노면 인식 출력, 지면 모델, 통과 가능성 평가 및 계획·제어 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "좌회전으로 비스듬히 진입하는 주차장 입구에서 차체 하부 여유와 피치 변화를 함께 검증한다."
        ],
        "environment": [
          "해당 입구의 경사 전환부를 측량하고 필요한 경우 진입 형상 또는 안내를 조정한다."
        ],
        "operation": [
          "시험 운행의 주차장 진입 경로를 차량 하중별로 확인하고 하부 접촉 후 운행 지속 기준을 점검한다."
        ]
      },
      "limits": "입구 경사·차체 하중·접촉 위치가 없어 속도나 포장 상태의 기여를 확정할 수 없다. 부상은 시험 운전자의 주장으로 보고됐다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "입구 포장면",
        "relation": "under",
        "stages": [
          "동향 주행",
          "주차장 좌회전",
          "입구 하부 접촉"
        ],
        "caption": "주차장으로 좌회전한 뒤 북향 진입 중 하부가 포장면에 접촉했다.",
        "geometryUnknown": [
          "입구의 경사 변화와 높이",
          "차량 진입 각도와 하부 접촉점"
        ],
        "evidence": [
          "The Waymo AV was in autonomous mode traveling eastbound on [XXX] when it began to turn left into a parking lot at [XXX]. As the Waymo AV proceeded northbound into the entrance of the parking lot, the Waymo AV's undercarriage made contact with the pavement at the entrance of the parking lot."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4824:aac21c2d:9230ba27",
      "reportedRemediations": []
    },
    {
      "id": "30270-11594",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling northbound on [XXX] when it came to a stop to yield to an automated flagger assistance device that was positioned near the east curb of [XXX]. The arm of the automated flagger assistance device lowered onto the front of the Waymo AV and then the Waymo AV proceeded forward, making further contact with the arm of the automated flagger assistance device."
      ],
      "facts": [
        "북향 주행 차량은 동쪽 연석 부근의 자동 교통통제 보조장치에 양보하려고 정지했다.",
        "장치의 봉이 차량 전면 위로 내려온 뒤 차량이 다시 전진하면서 추가 접촉했다.",
        "접촉 당시 ADS가 작동 중이었고 통제장치의 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "정지 위치가 봉의 하강 범위 안에 있었는지 ADS가 평가했는가?",
        "최초 접촉 후 봉이 여전히 전면을 막은 상태에서 전진을 허용한 판단 근거는 무엇인가?"
      ],
      "environmentHypotheses": [
        "장치의 설치 위치·봉 하강 범위·정지 안내가 서로 어떻게 배치됐는가? 하강 사실만으로 장치 오작동이나 관리 과실은 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "정지한 차량과 하강 봉의 공간 관계는 어땠는가?",
          "material": "장치 설치도, 봉 길이·회전축·하강 궤적 측량, 차량 최초 정지 위치"
        },
        {
          "question": "봉 하강과 재출발은 어떤 시간 순서로 발생했는가?",
          "material": "동기화된 현장 영상, 장치 작동 기록, 차량 속도·브레이크 시계열"
        },
        {
          "question": "최초 접촉 이후 ADS가 정지 경계를 변경하거나 해제했는가?",
          "material": "봉 객체 추적, 장치 상태 인식, 정지 경계·재출발 결정 및 접촉 감지 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "하강하는 통제봉의 전체 운동 범위를 정지 경계에 반영하고 접촉 후 전진 허용 조건을 재검증한다."
        ],
        "environment": [
          "봉의 하강 범위와 차량 대기 위치가 겹치는지 확인하고 장치 배치·정지 안내를 조정한다."
        ],
        "operation": [
          "통제장치가 차량과 접촉한 경우 원격 확인과 정지 유지 절차를 점검한다."
        ]
      },
      "limits": "최초 정지 거리, 장치 명령, 재출발 신호가 공개되지 않아 봉 하강과 차량 전진 각각의 원인을 확정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "barrier",
        "targetLabel": "통제장치 봉",
        "relation": "ahead",
        "stages": [
          "장치 앞 정지",
          "봉 하강 접촉",
          "전진 후 추가 접촉"
        ],
        "caption": "정지 차량 전면에 봉이 내려온 뒤 차량이 전진하며 다시 접촉했다.",
        "geometryUnknown": [
          "정지 위치와 봉 회전축의 거리",
          "봉 높이와 하강 범위"
        ],
        "evidence": [
          "The Waymo AV was traveling northbound on [XXX] when it came to a stop to yield to an automated flagger assistance device that was positioned near the east curb of [XXX]. The arm of the automated flagger assistance device lowered onto the front of the Waymo AV and then the Waymo AV proceeded forward, making further contact with the arm of the automated flagger assistance device."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4701:449e9985:e16e3c2d",
      "reportedRemediations": []
    },
    {
      "id": "30270-11671",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was parked at the curb facing west on [XXX] and a pickup truck with an attached flatbed trailer was parked in front of the Waymo AV. The Waymo AV proceeded forward and to the left to exit the parking spot, and the front right side of the Waymo AV made contact with the left rear side of the flatbed."
      ],
      "facts": [
        "차량은 도로변에 서쪽을 향해 주차돼 있었고 앞에는 평판 트레일러를 연결한 픽업트럭이 주차돼 있었다.",
        "주차 위치를 빠져나오려고 전진하며 왼쪽으로 이동하던 중 우측 전면이 평판의 좌측 후면과 접촉했다."
      ],
      "vehicleHypotheses": [
        "평판 트레일러의 후단 돌출부를 차량 본체와 구분해 충분한 범위로 인식했는가?",
        "왼쪽으로 빠져나갈 때 우측 앞 모서리의 궤적에 충분한 여유가 있었는가?"
      ],
      "environmentHypotheses": [
        "주차 차량 사이의 초기 간격과 평판 후단의 돌출 정도가 출차 공간을 얼마나 제한했는가? 상대 차량의 주차 위반은 서술에 없다."
      ],
      "dataNeeded": [
        {
          "question": "출차 시작 시 평판 후단과 우측 전면 사이 간격은 얼마였는가?",
          "material": "차량·트레일러의 실측 외형, 주차 위치, 접촉점 및 현장 영상"
        },
        {
          "question": "전진과 좌측 이동의 조합이 우측 전면을 어떻게 이동시켰는가?",
          "material": "자차 위치·조향각·속도 기록과 실제 차체 외곽 궤적"
        },
        {
          "question": "평판 후단의 인식 범위와 계획상 장애물 여유는 무엇이었는가?",
          "material": "센서 원시 데이터, 트레일러 객체 외곽선, 경로 후보·충돌 검사 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "평판 트레일러의 후단을 포함한 3차원 외형과 자차 우측 앞 모서리 궤적을 출차 검사에 반영한다."
        ],
        "environment": [
          "평판 트레일러가 있는 도로변의 실제 출차 여유와 돌출부 시인성을 확인한다."
        ],
        "operation": [
          "앞 차량의 후단 형상이 불확실하거나 출차 여유가 부족할 때 추가 확인·대기 기준을 적용한다."
        ]
      },
      "limits": "평판의 정확한 형상·초기 간격·출차 조향 궤적이 없어 인식 오류와 경로 여유 부족을 구별할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "left",
        "targetKind": "vehicle",
        "targetLabel": "평판 트레일러",
        "relation": "ahead",
        "stages": [
          "서향 도로변 주차",
          "전진·좌측 출차",
          "평판 후단 접촉"
        ],
        "caption": "앞에 주차된 평판 트레일러 옆으로 출차하다 우측 전면이 접촉했다.",
        "geometryUnknown": [
          "주차 상태의 앞뒤 간격",
          "평판 후단 돌출과 출차 궤적"
        ],
        "evidence": [
          "The Waymo AV was parked at the curb facing west on [XXX] and a pickup truck with an attached flatbed trailer was parked in front of the Waymo AV. The Waymo AV proceeded forward and to the left to exit the parking spot, and the front right side of the Waymo AV made contact with the left rear side of the flatbed."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4503:e5d3088a:4bbcc6e",
      "reportedRemediations": []
    },
    {
      "id": "30270-11548",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling westbound in an alley behind [XXX] and proceeding to pass to the right of a passenger car that was parked facing east. As the Waymo AV was maneuvering around the passenger car, the right of the Waymo AV made contact with vegetation growing on the north wall of the alley and extending into the roadway."
      ],
      "facts": [
        "골목에서 서향 주행하던 차량이 동쪽을 향해 주차된 승용차의 오른쪽으로 지나가려 했다.",
        "승용차를 돌아 지나던 중 차량 오른쪽이 북쪽 벽에서 도로로 뻗은 식생과 접촉했고 차량 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "벽 자체뿐 아니라 도로로 뻗은 식생의 외곽과 변형 가능성이 통과 여유 평가에 반영됐는가?"
      ],
      "environmentHypotheses": [
        "주차 승용차와 돌출 식생 사이의 실제 통과 폭은 얼마였는가?",
        "식생이 도로로 뻗었다는 보고를 바탕으로 가지치기·통행 관리 필요성을 확인할 수 있는가? 관리 과실은 아직 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "차량이 통과하려던 공간은 실제로 얼마나 좁았는가?",
          "material": "주차 승용차 위치, 골목·벽 측량, 식생 돌출 범위와 접촉 높이"
        },
        {
          "question": "주차 승용차를 피해 움직일 때 차량 오른쪽이 어디를 통과했는가?",
          "material": "주행 영상, 위치·조향·속도 기록, 차체 외곽의 통과 궤적"
        },
        {
          "question": "식생을 어떤 장애물 경계로 처리했는가?",
          "material": "점군·영상, 식생 분류 및 객체 외곽 출력, 횡방향 여유·경로 선택 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "벽면 식생이 돌출된 좁은 골목에서 주차차량 회피와 차체 측면 여유를 함께 검사한다."
        ],
        "environment": [
          "북쪽 벽의 돌출 식생과 주차차량 사이 가용 폭을 확인하고 필요시 식생 정비 또는 통행 안내를 시행한다."
        ],
        "operation": [
          "식생 때문에 통과 폭이 불명확한 골목은 대기·우회 판단 대상으로 관리한다."
        ]
      },
      "limits": "식생의 단단한 부분 위치와 실제 통과 폭이 없어 식생 인식, 경로 선택, 접촉 손상의 기여를 나눌 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "right",
        "targetKind": "object",
        "targetLabel": "벽면 돌출 식생",
        "relation": "right",
        "stages": [
          "골목 서향 주행",
          "주차차 오른쪽 통과",
          "우측 식생 접촉"
        ],
        "caption": "골목에서 주차차량을 지나던 중 오른쪽이 벽면 돌출 식생에 닿았다.",
        "geometryUnknown": [
          "주차차량과 식생 사이 가용 폭",
          "식생의 돌출 높이와 깊이"
        ],
        "evidence": [
          "The Waymo AV was traveling westbound in an alley behind [XXX] and proceeding to pass to the right of a passenger car that was parked facing east. As the Waymo AV was maneuvering around the passenger car, the right of the Waymo AV made contact with vegetation growing on the north wall of the alley and extending into the roadway."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4477:46c6fdf0:12c662e6",
      "reportedRemediations": []
    },
    {
      "id": "30270-11664",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling westbound in the middle of three lanes on [XXX] and came to a stop for a red light at the intersection with [XXX]. An SUV was stopped facing west in the left lane with its hazard lights activated. While the Waymo AV remained stopped, passengers entering the stationary SUV opened the rear right side door. The traffic light then turned green and the Waymo AV remained stopped for the passenger of the SUV standing to the left of the Waymo AV. Once the passengers entered the SUV, the Waymo AV proceeded forward, and the opened rear right door made contact with the rear left side of the Waymo AV."
      ],
      "facts": [
        "차량은 서향 교차로의 가운데 차로에서 적색 신호로 정지했고, 왼쪽 차로의 정지 SUV는 승객 탑승 중 우측 뒷문을 열었다.",
        "녹색 신호 후에도 차량은 왼쪽에 서 있는 SUV 승객 때문에 기다렸다가 승객이 탑승하자 전진했다.",
        "열려 있던 SUV 우측 뒷문이 차량 좌측 후면과 접촉했고 양 차량 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "승객의 탑승 완료와 별개로 열린 문이 차체 전체 통과 경로를 막는지를 확인했는가?",
        "전진하면서 자차 후부가 열린 문 옆을 지날 때까지 충돌 여유를 유지했는가?"
      ],
      "environmentHypotheses": [
        "SUV의 문 열림 각도와 두 차량의 횡방향 간격은 어떤 관계였는가? 문 개방 사실만으로 책임은 판단할 수 없다."
      ],
      "dataNeeded": [
        {
          "question": "열린 문과 자차 좌측 후면은 어느 궤적에서 겹쳤는가?",
          "material": "SUV 문 길이·열림 각도, 두 차량 상대 위치, 접촉 흔적과 영상"
        },
        {
          "question": "승객 탑승·문 움직임·자차 재출발은 어떤 순서였는가?",
          "material": "동기화 영상, 자차 속도·조향 기록, 문 열림 각도 시계열"
        },
        {
          "question": "재출발 시 보행자와 열린 문을 각각 어떻게 추적했는가?",
          "material": "보행자·문 객체 추적, 정지 해제 조건, 차체 후부 충돌 검사 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "승객이 차에 탄 뒤에도 문 외곽을 별도 장애물로 유지하고 자차 후부 통과 완료까지 여유를 검사한다."
        ],
        "environment": [
          "해당 교차로의 정차·승하차 공간과 인접 차로 사이 문 개방 여유를 확인한다."
        ],
        "operation": [
          "인접 차량 승하차 후 재출발 기준에 문 닫힘 또는 문과의 충분한 통과 여유 확인을 포함한다."
        ]
      },
      "limits": "접촉 직전 문이 고정돼 있었는지 움직였는지, 두 차량 간격이 얼마였는지가 없어 재출발 판단과 문 움직임의 기여를 확정할 수 없다.",
      "scene": {
        "setting": "intersection",
        "motion": "straight",
        "targetKind": "vehicle",
        "targetLabel": "SUV 열린 뒷문",
        "relation": "left",
        "stages": [
          "신호·승객 대기",
          "승객 탑승 후 전진",
          "열린 문과 후부 접촉"
        ],
        "caption": "SUV 승객 탑승 후 출발하며 열린 우측 뒷문과 자차 좌측 후면이 접촉했다.",
        "geometryUnknown": [
          "SUV 문 열림 각도와 변화",
          "차량 간 횡방향 간격"
        ],
        "evidence": [
          "The Waymo AV was traveling westbound in the middle of three lanes on [XXX] and came to a stop for a red light at the intersection with [XXX]. An SUV was stopped facing west in the left lane with its hazard lights activated. While the Waymo AV remained stopped, passengers entering the stationary SUV opened the rear right side door. The traffic light then turned green and the Waymo AV remained stopped for the passenger of the SUV standing to the left of the Waymo AV. Once the passengers entered the SUV, the Waymo AV proceeded forward, and the opened rear right door made contact with the rear left side of the Waymo AV."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "5154:753ed0e3:fa6ce293",
      "reportedRemediations": []
    },
    {
      "id": "30270-11608",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was parked at the curb facing west on [XXX] and a flatbed pickup truck was parked in front of the Waymo AV. The Waymo AV proceeded to maneuver forward and to the left to exit its parking spot, and the front right side of the Waymo AV made contact with the left rear side of the flatbed of the truck."
      ],
      "facts": [
        "서쪽을 향해 도로변에 주차된 차량 앞에 평판 픽업트럭이 주차돼 있었다.",
        "차량이 전진하면서 왼쪽으로 출차하던 중 우측 전면이 픽업트럭 평판의 좌측 후면과 접촉했다.",
        "접촉 당시 ADS가 작동 중이었으며 차량 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "평판 픽업트럭 후단의 폭과 높이를 출차 경로 충돌 검사에서 충분히 반영했는가?"
      ],
      "environmentHypotheses": [
        "앞 평판 픽업트럭의 후단과 자차 사이 공간이 전진 출차에 충분했는가? 정차 간격이나 돌출부 표시 상태는 서술에 없다."
      ],
      "dataNeeded": [
        {
          "question": "평판의 좌측 후단과 자차 우측 앞 모서리 사이 초기 공간은 얼마였는가?",
          "material": "픽업트럭 평판 치수, 두 차량 주차 위치, 접촉 흔적"
        },
        {
          "question": "어느 전진 거리와 조향각에서 접촉했는가?",
          "material": "속도·조향·위치 시계열, 출차 영상, 차체 외곽 궤적"
        },
        {
          "question": "평판 후단 인식과 경로 계획 사이 불일치가 있었는가?",
          "material": "평판 객체 추적·외곽선, 계획 궤적, 충돌 여유 및 제어 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "평판 픽업트럭 앞에서 출차할 때 우측 앞 모서리와 평판 후단 사이 최소 여유를 경로 전체에서 검사한다."
        ],
        "environment": [
          "이 위치의 도로변 주차 간격과 평판 후단 시인성을 점검한다."
        ],
        "operation": [
          "앞 차량 후단 형상을 확정하지 못한 출차 상황에서 추가 확인·대기 기준을 적용한다."
        ]
      },
      "limits": "보고는 접촉 방향을 설명하지만 초기 간격과 평판 형상을 제공하지 않아 인식·계획·제어 중 원인을 특정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "left",
        "targetKind": "vehicle",
        "targetLabel": "평판 픽업트럭",
        "relation": "ahead",
        "stages": [
          "서향 도로변 주차",
          "전진·좌측 출차",
          "평판 후단 접촉"
        ],
        "caption": "도로변 주차 위치에서 출차하며 앞 평판 픽업트럭의 후단에 닿았다.",
        "geometryUnknown": [
          "평판 후단 형상과 초기 간격",
          "출차 조향 반경"
        ],
        "evidence": [
          "The Waymo AV was parked at the curb facing west on [XXX] and a flatbed pickup truck was parked in front of the Waymo AV. The Waymo AV proceeded to maneuver forward and to the left to exit its parking spot, and the front right side of the Waymo AV made contact with the left rear side of the flatbed of the truck."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4562:29256470:2dc56948",
      "reportedRemediations": []
    },
    {
      "id": "30270-11546",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling westbound in the right lane on [XXX] when the front of the Waymo AV made contact with a fallen utility line hanging in the travel lane."
      ],
      "facts": [
        "피닉스에서 우측 차로를 따라 서쪽으로 주행하던 차량 전면이 차로에 늘어진 유틸리티 선과 접촉했다.",
        "접촉 당시 ADS가 작동 중이었고 차량 손상이 보고됐다. 구조화 항목의 충돌 전 속도는 29 mph다."
      ],
      "vehicleHypotheses": [
        "차로에 늘어진 가는 선을 차량 전면과 충돌할 장애물로 어느 거리에서 인식했는가?",
        "보고된 충돌 전 속도 29 mph에서 인식 가능한 거리와 감속 여유가 어떻게 평가됐는가?"
      ],
      "environmentHypotheses": [
        "늘어진 선의 높이·처짐과 도로 이용자에게 제공된 경고·통제 상태는 어떠했는가? 선의 낙하 원인이나 관리 과실은 서술에 없다."
      ],
      "dataNeeded": [
        {
          "question": "선이 차로의 어느 높이와 범위를 가로막았는가?",
          "material": "선의 설치·처짐 형상 측량, 접촉 높이, 사고 당시 사진·영상"
        },
        {
          "question": "전면 접촉 전에 감속이나 조향 대응이 있었는가?",
          "material": "접근 영상과 속도·가속도·제동·조향 시계열"
        },
        {
          "question": "선의 최초 검출부터 충돌 판단까지 무엇이 기록됐는가?",
          "material": "영상·점군 원시 데이터, 선형 객체 검출·추적, 위험 판단 및 경로 계획 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "주행 차로에 처진 가는 선의 높이와 연속성을 인식하고 접근 속도별 정지 여유를 검증한다."
        ],
        "environment": [
          "선의 처짐 상태를 확인하고 위험 구간의 임시 통제·경고와 복구 절차를 점검한다."
        ],
        "operation": [
          "늘어진 선 발견·신고 정보를 경로 제한과 운행 중지 판단에 연결한다."
        ]
      },
      "limits": "선의 높이·두께·발견 가능 거리와 실제 충돌 속도가 없어 인지 실패나 회피 가능성을 확정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "늘어진 유틸리티 선",
        "relation": "ahead",
        "stages": [
          "우측 차로 서향 주행",
          "차로 내 선에 접근",
          "차량 전면 접촉"
        ],
        "caption": "우측 차로를 서향 주행하던 차량 전면이 차로에 늘어진 선과 접촉했다.",
        "geometryUnknown": [
          "선의 높이와 처짐 범위",
          "선이 보이기 시작한 거리"
        ],
        "evidence": [
          "The Waymo AV was traveling westbound in the right lane on [XXX] when the front of the Waymo AV made contact with a fallen utility line hanging in the travel lane."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4236:88d8e705:2af6b0c7",
      "reportedRemediations": []
    },
    {
      "id": "30270-11379",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was stopped facing north at the entrance of a parking lot at [XXX] for a passenger drop-off. After the passengers had exited, the Waymo AV traveled northbound to enter the parking lot and the front and undercarriage of the Waymo AV made contact with a small piece of concrete on the pavement in the center of the driveway and attached to a chain at the entrance of the parking lot."
      ],
      "facts": [
        "차량은 주차장 입구에서 북쪽을 향해 정지한 채 승객을 하차시켰다.",
        "하차 후 북향으로 진입하면서 진입로 중앙의 체인에 연결된 작은 콘크리트 조각에 차량 전면과 하부가 접촉했다."
      ],
      "vehicleHypotheses": [
        "재출발 전에 진입로 중앙의 낮은 콘크리트 조각과 연결된 체인을 하나의 통과 제약으로 평가했는가?"
      ],
      "environmentHypotheses": [
        "체인과 콘크리트 조각의 배치가 실제 출입 가능 범위를 어떻게 표시했는가? 해당 배치의 적정성이나 관리 과실은 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "콘크리트 조각과 체인의 형상은 차량 통과 공간을 어떻게 제한했는가?",
          "material": "콘크리트 높이·폭·위치, 체인 연결점·처짐, 진입로 폭 측량"
        },
        {
          "question": "정지 위치에서 재출발한 차량의 바퀴와 하부는 어느 경로를 따랐는가?",
          "material": "하차·재출발 영상, 위치·속도·조향 시계열, 접촉 흔적"
        },
        {
          "question": "낮은 장애물과 체인이 재출발 결정에 반영됐는가?",
          "material": "근거리 센서 데이터, 장애물·지면 모델, 출발 허용 및 통과 가능성 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "승객 하차 후 재출발 시 낮은 콘크리트 장애물과 연결 체인을 함께 재확인하도록 검증한다."
        ],
        "environment": [
          "진입로 중앙의 콘크리트·체인 배치와 표시를 점검하고 실제 개방 통로를 명확히 한다."
        ],
        "operation": [
          "차단용 물체가 있는 입구를 승하차 지점으로 사용하는 경우 진입 허용 범위를 사전에 확인한다."
        ]
      },
      "limits": "콘크리트 크기, 체인의 당시 상태, 정지 차량에서의 가시 범위가 없어 낮은 장애물 인지와 출입 상태 판단을 구별할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "체인 연결 콘크리트",
        "relation": "ahead",
        "stages": [
          "입구 승객 하차",
          "북향 재출발",
          "전면·하부 접촉"
        ],
        "caption": "승객 하차 후 진입하며 진입로 중앙의 체인 연결 콘크리트에 닿았다.",
        "geometryUnknown": [
          "콘크리트 조각의 높이와 폭",
          "체인의 높이와 연결 범위"
        ],
        "evidence": [
          "The Waymo AV was stopped facing north at the entrance of a parking lot at [XXX] for a passenger drop-off. After the passengers had exited, the Waymo AV traveled northbound to enter the parking lot and the front and undercarriage of the Waymo AV made contact with a small piece of concrete on the pavement in the center of the driveway and attached to a chain at the entrance of the parking lot."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4635:bbbc3d59:92a9787b",
      "reportedRemediations": []
    },
    {
      "id": "30270-11467",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling westbound at the southeastern entrance to a parking lot at [XXX] and came to a stop for a closed barrier arm. The Waymo AV proceeded forward at a low speed and the front of the Waymo AV made contact with the closed barrier arm."
      ],
      "facts": [
        "차량은 주차장 남동쪽 입구에서 서쪽으로 이동하다 닫힌 차단봉 때문에 정지했다.",
        "이후 저속으로 전진하면서 차량 전면이 여전히 닫힌 차단봉과 접촉했고 차량과 봉의 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "닫힌 차단봉 때문에 설정한 정지 경계가 재출발 시 왜 유지되지 않았는가?"
      ],
      "environmentHypotheses": [
        "차단봉 상태와 출입 허용 신호가 일치했는가? 서술은 봉이 닫혀 있었다고만 하며 장치 오작동은 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "정지 시 차단봉과 차량 전면 사이 거리는 얼마였는가?",
          "material": "입구·차단봉 실측 배치, 최초 정지 위치, 봉 높이와 길이"
        },
        {
          "question": "정지 후 저속 전진을 시작하기까지 봉이나 출입 신호에 변화가 있었는가?",
          "material": "동기화된 차량·출입구 영상, 차단기 작동 기록, 속도·제동 시계열"
        },
        {
          "question": "어떤 조건이 닫힌 봉 앞 재출발을 허용했는가?",
          "material": "차단봉 추적·개폐 상태, 정지 경계, 재출발 허용 및 경로 계획 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "닫힌 차단봉 앞 정지 후 재출발에는 봉의 실제 개방과 차체 통과 여유 확인이 필요한지 검증한다."
        ],
        "environment": [
          "해당 입구의 차단봉 표시와 출입 허용 신호·개폐 상태의 일치 여부를 점검한다."
        ],
        "operation": [
          "차단봉 상태가 불명확한 입구에서 정지 유지와 원격 확인 절차를 적용한다."
        ]
      },
      "limits": "재출발의 계기와 봉 상태 인식 로그가 없어 최초 검출 이후 추적·상태 판단·계획 중 어느 부분이 기여했는지 알 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "barrier",
        "targetLabel": "닫힌 차단봉",
        "relation": "ahead",
        "stages": [
          "닫힌 봉 앞 정지",
          "저속 전진",
          "전면 접촉"
        ],
        "caption": "주차장 입구의 닫힌 차단봉 앞에 정지한 뒤 전진하며 봉에 접촉했다.",
        "geometryUnknown": [
          "최초 정지 거리",
          "차단봉 높이와 길이"
        ],
        "evidence": [
          "The Waymo AV was traveling westbound at the southeastern entrance to a parking lot at [XXX] and came to a stop for a closed barrier arm. The Waymo AV proceeded forward at a low speed and the front of the Waymo AV made contact with the closed barrier arm."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4414:101ab06e:51b325d2",
      "reportedRemediations": []
    },
    {
      "id": "30270-11334",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was stopped facing east in the rightmost lane at an active railroad crossing on [XXX], where the train appeared to be stopped on the tracks. While the railroad gate remained down, the Waymo AV initiated a U-turn onto westbound [XXX] and proceeded across the second from the right and the leftmost lane of eastbound [XXX]. As the Waymo AV was completing its U-turn, the undercarriage of the Waymo AV made contact with the concrete median between eastbound and westbound [XXX]."
      ],
      "facts": [
        "철도 건널목에서 차단기가 내려가 있고 열차가 선로 위에 정지한 것으로 보이는 동안 차량은 동향 우측 끝 차로에 정지해 있었다.",
        "차단기가 내려간 상태에서 서향으로 유턴하기 시작해 동향의 다른 차로들을 가로질렀다.",
        "유턴을 마치는 과정에서 하부가 동·서향 도로 사이 콘크리트 중앙분리대와 접촉했다."
      ],
      "vehicleHypotheses": [
        "유턴 경로의 중앙분리대 높이와 차량 하부 통과 여유가 경로 선택에 반영됐는가?",
        "철도 건널목 대기에서 유턴으로 전환할 때 전체 회전 궤적의 지면 형상을 다시 평가했는가?"
      ],
      "environmentHypotheses": [
        "중앙분리대의 형상과 실제 회차 가능한 공간은 어땠는가? 철도 차단기 고장이나 중앙분리대 관리 결함은 보고되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "중앙분리대의 어떤 부분을 차량이 통과하려 했는가?",
          "material": "중앙분리대 높이·폭·끝단 형상, 차로와 건널목의 현장 측량"
        },
        {
          "question": "정지 위치부터 유턴 완료까지 바퀴와 하부 궤적은 어땠는가?",
          "material": "주행 영상, 위치·조향·속도·차체 자세 시계열과 접촉점"
        },
        {
          "question": "유턴 선택과 중앙분리대 통과 가능성은 어떻게 판단됐는가?",
          "material": "경로 변경 사유, 지도 경계·노면 모델, 유턴 후보 및 지상고 충돌 검사 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "건널목 대기 중 대체 유턴 경로를 선택할 때 중앙분리대 높이와 바퀴·하부의 전체 궤적을 검사한다."
        ],
        "environment": [
          "중앙분리대 끝단과 회차 가능 구역의 실제 형상·표시를 확인한다."
        ],
        "operation": [
          "건널목 대기 시 검증된 우회 경로와 제자리 대기 선택 기준을 점검한다."
        ]
      },
      "limits": "중앙분리대 형상과 경로 선택 근거가 없어 유턴 공간 부족·지도 표현·높이 판단의 기여를 확정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "unknown",
        "targetKind": "curb",
        "targetLabel": "콘크리트 중앙분리대",
        "relation": "under",
        "stages": [
          "건널목 앞 대기",
          "서향 유턴",
          "중앙분리대 하부 접촉"
        ],
        "caption": "건널목 차단기가 내려간 상태에서 유턴하다 중앙분리대에 하부가 닿았다.",
        "geometryUnknown": [
          "중앙분리대 높이와 끝단 위치",
          "유턴 반경과 실제 접촉점"
        ],
        "evidence": [
          "The Waymo AV was stopped facing east in the rightmost lane at an active railroad crossing on [XXX], where the train appeared to be stopped on the tracks. While the railroad gate remained down, the Waymo AV initiated a U-turn onto westbound [XXX] and proceeded across the second from the right and the leftmost lane of eastbound [XXX]. As the Waymo AV was completing its U-turn, the undercarriage of the Waymo AV made contact with the concrete median between eastbound and westbound [XXX]."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4786:2c7c16b5:f7beabb7",
      "reportedRemediations": []
    },
    {
      "id": "30270-11193",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling southwestbound in a parking lot at [XXX] when the front of the Waymo AV made contact with a chain separating a section of the parking lot."
      ],
      "facts": [
        "로스앤젤레스의 주차장에서 차량이 남서쪽으로 주행하던 중 전면이 주차장 일부를 구분하는 체인과 접촉했다.",
        "접촉 당시 ADS가 작동 중이었고 차량 손상이 보고됐다. 구조화 항목의 충돌 전 속도는 2 mph다."
      ],
      "vehicleHypotheses": [
        "낮은 속도로 접근하는 동안 구획 체인의 연속된 차단 범위를 인식했는가?"
      ],
      "environmentHypotheses": [
        "체인의 높이·처짐·대비가 구획 경계를 얼마나 명확히 나타냈는가? 체인 표시나 관리의 결함은 서술만으로 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "체인은 차량 진로의 어느 높이와 폭을 막고 있었는가?",
          "material": "체인 양끝 위치·높이·처짐 측량, 접촉 부위와 현장 사진"
        },
        {
          "question": "남서향 접근 경로에서 체인은 언제 보였고 차량은 어떻게 움직였는가?",
          "material": "접근 영상, 차량 위치·속도·제동 기록, 당시 조명 자료"
        },
        {
          "question": "ADS는 체인을 어떤 객체 또는 통행 경계로 처리했는가?",
          "material": "센서 원시 데이터, 체인 검출·추적, 주행 가능 영역과 정지 판단 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "주차장 구획 체인을 저속 주행 가능 영역의 경계로 유지하는 인식·계획 동작을 검증한다."
        ],
        "environment": [
          "해당 체인의 실제 차단 범위와 시인성을 확인하고 필요한 표시를 보완한다."
        ],
        "operation": [
          "체인으로 분리된 주차장 구역의 진입 경계를 경로 검증에 반영한다."
        ]
      },
      "limits": "체인 높이·조명·최초 검출 거리와 접촉 전 대응이 없어 인식 실패와 정지 판단 문제를 구분할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "barrier",
        "targetLabel": "주차장 구획 체인",
        "relation": "ahead",
        "stages": [
          "주차장 남서향 주행",
          "구획 체인 접근",
          "전면 접촉"
        ],
        "caption": "주차장에서 남서향으로 주행하던 차량 전면이 구획 체인과 접촉했다.",
        "geometryUnknown": [
          "체인의 높이와 처짐",
          "체인 양끝과 통행 구역의 위치"
        ],
        "evidence": [
          "The Waymo AV was traveling southwestbound in a parking lot at [XXX] when the front of the Waymo AV made contact with a chain separating a section of the parking lot."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4160:5e21cc71:909c8dc7",
      "reportedRemediations": []
    },
    {
      "id": "30270-11161",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling southbound in the parking lot of [XXX] and came to a stop to complete a multi-point turn. A trailer was parked in a parking stall located on the driver side of the Waymo AV. As the Waymo AV initiated its multi-point maneuver, it reversed northbound and the front driver side of the Waymo AV made contact with the hitch of the trailer."
      ],
      "facts": [
        "차량은 주차장에서 남향 주행하다 여러 번 전·후진하는 회차를 위해 정지했고 운전석 쪽 주차구획에 트레일러가 있었다.",
        "회차를 시작하며 북쪽으로 후진하던 중 운전석 쪽 전면이 트레일러 견인 연결부와 접촉했다."
      ],
      "vehicleHypotheses": [
        "후진 회차 때 차량 전면이 옆으로 이동하는 궤적과 트레일러 연결부 돌출을 함께 검사했는가?"
      ],
      "environmentHypotheses": [
        "주차된 트레일러 연결부가 회차 통로로 얼마나 돌출돼 있었는가? 구획 침범이나 부적절한 주차는 서술에 명시되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "트레일러 연결부와 자차 운전석 쪽 전면은 어떻게 배치돼 있었는가?",
          "material": "트레일러·연결부 실측 치수, 주차구획 경계, 회차 시작 위치"
        },
        {
          "question": "북향 후진 중 전면의 측방 이동은 어느 정도였는가?",
          "material": "후진 영상, 조향각·차량 위치·속도 기록, 전면 외곽 궤적"
        },
        {
          "question": "연결부가 트레일러 인식 외형과 회차 충돌 검사에 포함됐는가?",
          "material": "근거리 영상·점군, 트레일러 외곽선, 다지점 회차 계획 및 충돌 검사 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "후진 회차에서 전면의 측방 이동과 낮게 돌출된 트레일러 연결부를 포함해 전체 차체 여유를 검증한다."
        ],
        "environment": [
          "트레일러 연결부와 회차 통로 사이 실제 여유 및 돌출부 시인성을 점검한다."
        ],
        "operation": [
          "연결부가 있는 트레일러 옆 회차 경로의 검증과 대체 회차 위치 선택 기준을 마련한다."
        ]
      },
      "limits": "후진 방향은 명시됐지만 조향 방향·연결부 형상·초기 간격은 없어 전면 접촉의 세부 궤적을 재구성할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "reverse",
        "targetKind": "vehicle",
        "targetLabel": "트레일러 연결부",
        "relation": "left",
        "stages": [
          "회차 위해 정지",
          "북향 후진 시작",
          "운전석 쪽 전면 접촉"
        ],
        "caption": "주차장에서 북향 후진 회차를 시작하며 옆 트레일러 연결부에 전면이 닿았다.",
        "geometryUnknown": [
          "연결부 돌출 길이와 높이",
          "후진 조향각과 전면 측방 궤적"
        ],
        "evidence": [
          "The Waymo AV was traveling southbound in the parking lot of [XXX] and came to a stop to complete a multi-point turn. A trailer was parked in a parking stall located on the driver side of the Waymo AV. As the Waymo AV initiated its multi-point maneuver, it reversed northbound and the front driver side of the Waymo AV made contact with the hitch of the trailer."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4599:476dea70:765596f8",
      "reportedRemediations": []
    },
    {
      "id": "30270-11209",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling eastbound in a parking lot at [XXX] through a gate opening when the bottom of the Waymo AV made contact with the elevated gate track."
      ],
      "facts": [
        "챈들러에서 오전 9시 5분에 주차장 내부를 동향으로 주행하던 차량이 게이트 개구부를 통과했다.",
        "통과 중 차량 하부가 높게 돌출된 게이트 레일과 접촉했고 차량 손상이 보고됐다. 구조화 항목의 충돌 전 속도는 10 mph다."
      ],
      "vehicleHypotheses": [
        "게이트가 열린 상태에서도 바닥 레일의 돌출 높이와 차량 하부 여유를 별도로 평가했는가?",
        "레일 접근 속도와 차체 상하 움직임이 통과 가능성 판단에 반영됐는가?"
      ],
      "environmentHypotheses": [
        "레일과 주변 포장면의 높이 차는 어느 정도였는가? 레일이 높다는 보고만으로 설치·관리상 결함은 확정되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "레일 형상이 차량 하부 통과 여유를 어떻게 제한했는가?",
          "material": "레일 높이·폭, 주변 종단 경사, 차량 하부 치수와 당시 하중"
        },
        {
          "question": "동향 통과 중 바퀴와 차체는 어떤 자세로 레일을 지났는가?",
          "material": "접근 영상, 위치·속도·피치·서스펜션 시계열과 접촉 흔적"
        },
        {
          "question": "레일을 노면과 구별해 통과 가능성을 판단했는가?",
          "material": "지면 모델·레일 검출, 지도 높이 정보, 경로·속도 계획 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "게이트 개구부의 바닥 레일을 높이 장애물로 평가하고 하중·차체 자세별 통과 조건을 검증한다."
        ],
        "environment": [
          "게이트 레일과 주변 포장면의 높이 차를 측량하고 필요한 형상 보완 또는 경고를 검토한다."
        ],
        "operation": [
          "이 게이트의 통과 조건을 현장 측량으로 확인한 뒤 운행 경로와 접근 속도 기준에 반영한다."
        ]
      },
      "limits": "레일 높이·접근 각도·차체 하중이 없으며 10 mph는 구조화된 충돌 전 속도이므로 실제 접촉 속도와 동일하다고 단정할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "돌출 게이트 레일",
        "relation": "under",
        "stages": [
          "주차장 동향 주행",
          "게이트 개구부 통과",
          "레일과 하부 접촉"
        ],
        "caption": "오전 9시 5분 주차장 게이트를 동향 통과하며 돌출 레일에 하부가 닿았다.",
        "geometryUnknown": [
          "레일 돌출 높이와 폭",
          "접근 경사와 당시 지상고"
        ],
        "evidence": [
          "The Waymo AV was traveling eastbound in a parking lot at [XXX] through a gate opening when the bottom of the Waymo AV made contact with the elevated gate track."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4233:37018082:863c888a",
      "reportedRemediations": []
    },
    {
      "id": "30270-11174",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling eastbound in a parking lot at [XXX] through a gate opening when the bottom of the Waymo AV made contact with the elevated gate track."
      ],
      "facts": [
        "챈들러에서 오전 8시 16분에 차량이 주차장 게이트의 열린 공간을 동쪽으로 통과했다.",
        "통과 중 차량 하부와 돌출된 게이트 레일이 접촉했고 차량 손상이 보고됐다. 구조화 항목의 충돌 전 속도는 10 mph다."
      ],
      "vehicleHypotheses": [
        "레일의 높이 변화가 평탄한 주행 가능 지면으로 처리됐는가?",
        "동향 통과 궤적의 접근 각도와 차량 하중을 반영했을 때 하부 여유는 충분했는가?"
      ],
      "environmentHypotheses": [
        "차량 통행 구간의 레일 높이와 주변 포장 경사가 어떤 조합이었는가? 별도 보고와 같은 위치인지도 공개 주소만으로 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "이 보고의 레일과 접근면은 어떤 높이 형상이었는가?",
          "material": "사건 위치 확인 자료, 레일·포장면 3차원 측량, 차체 접촉 흔적"
        },
        {
          "question": "동향 진입의 실제 속도·각도·지상고는 어땠는가?",
          "material": "차량 위치·속도·피치·서스펜션 기록, 하중 자료와 외부 영상"
        },
        {
          "question": "레일 높이와 통과 위험이 ADS 판단에 표현됐는가?",
          "material": "센서 지면 추정, 높이 장애물 인식, 통과 가능성·속도 계획 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "게이트 레일의 얕고 좁은 돌출 형상도 차량 하부 통과 검사에 반영하는지 검증한다."
        ],
        "environment": [
          "해당 사건 위치의 레일과 포장 연결부를 측량해 차량 통과 여유와 표시 필요성을 확인한다."
        ],
        "operation": [
          "유사 게이트 레일 접촉 보고와 위치·형상을 대조하되 동일 장소로 단정하지 않고 경로별 통과 조건을 관리한다."
        ]
      },
      "limits": "주소와 날짜 일부가 가려져 유사 보고와의 장소 관계를 알 수 없고 레일 높이·하중·접촉 속도도 공개되지 않았다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "돌출 게이트 레일",
        "relation": "under",
        "stages": [
          "주차장 동향 진입",
          "열린 게이트 통과",
          "레일과 하부 접촉"
        ],
        "caption": "오전 8시 16분 열린 게이트를 동향 통과하던 차량 하부가 레일에 닿았다.",
        "geometryUnknown": [
          "게이트 레일과 포장면의 높이 차",
          "동향 접근 각도와 차량 하중"
        ],
        "evidence": [
          "The Waymo AV was traveling eastbound in a parking lot at [XXX] through a gate opening when the bottom of the Waymo AV made contact with the elevated gate track."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4233:f29cf07f:f8b578d",
      "reportedRemediations": []
    },
    {
      "id": "30270-10891",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling southbound on [XXX] when it made a left turn into a parking lot at [XXX]. As the Waymo AV was turning into the parking lot, the front driver side of the Waymo AV made contact with a hanging chain separating a section of the parking lot."
      ],
      "facts": [
        "템피에서 남쪽으로 주행하던 차량이 주차장으로 좌회전했다.",
        "주차장으로 회전 진입하던 중 운전석 쪽 전면이 주차장 일부를 구분하는 매달린 체인과 접촉했다.",
        "접촉 당시 ADS가 작동 중이었고 차량과 체인의 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "좌회전 중 운전석 쪽 전면의 궤적에 걸리는 체인의 높이와 처짐을 충분히 인식했는가?",
        "주차장 진입 경로에서 체인으로 막힌 구획이 주행 가능 영역에 포함됐는가?"
      ],
      "environmentHypotheses": [
        "매달린 체인의 설치 위치와 시인성이 주차장 개방 통로와 차단 구획을 어떻게 구분했는가? 체인의 부적절한 설치는 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "좌회전 진입 궤적과 체인의 어느 부분이 겹쳤는가?",
          "material": "체인 양끝·처짐·높이 측량, 입구 형상, 차량 접촉점"
        },
        {
          "question": "남향 접근에서 좌회전 중 체인의 가시성과 차량 움직임은 어땠는가?",
          "material": "주행 영상, 당시 조명 자료, 위치·조향·속도 시계열"
        },
        {
          "question": "체인과 차단 구획을 어떤 경계로 인식했는가?",
          "material": "영상·점군, 체인 추적과 주행 가능 영역, 회전 경로·정지 판단 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "주차장 좌회전 진입에서 얇은 체인의 높이·처짐과 운전석 쪽 전면의 궤적을 함께 검사한다."
        ],
        "environment": [
          "체인이 분리하는 구획과 실제 진입 통로의 경계·반사 표시를 확인한다."
        ],
        "operation": [
          "구획 체인이 있는 주차장 진입 경로는 차단 상태와 회전 여유를 현장에서 검증한다."
        ]
      },
      "limits": "체인의 높이·입구 배치·좌회전 반경과 인식 시점이 없어 체인 미검출과 경로 선택 문제를 구별할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "barrier",
        "targetLabel": "매달린 구획 체인",
        "relation": "ahead",
        "stages": [
          "남향 도로 주행",
          "주차장 좌회전",
          "운전석 쪽 전면 접촉"
        ],
        "caption": "남향 주행 후 주차장으로 좌회전하면서 운전석 쪽 전면이 체인에 닿았다.",
        "geometryUnknown": [
          "체인의 높이와 처짐 범위",
          "좌회전 반경과 구획 경계"
        ],
        "evidence": [
          "The Waymo AV was traveling southbound on [XXX] when it made a left turn into a parking lot at [XXX]. As the Waymo AV was turning into the parking lot, the front driver side of the Waymo AV made contact with a hanging chain separating a section of the parking lot."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4460:b0c90413:6b159733",
      "reportedRemediations": []
    },
    {
      "id": "30270-11088",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling southbound on [XXX] when it turned left into a parking lot at [XXX].",
        "the Waymo AV's undercarriage made contact with the raised pavement at the entrance of the parking lot."
      ],
      "facts": [
        "남향 주행하던 차량이 주차장으로 좌회전해 진입했다.",
        "입구의 높아진 포장면에 차체 하부가 접촉했고 차량 손상이 보고됐다. ADS는 접촉 당시 작동 중이었다.",
        "원시 보고의 사전 속도는 9 mph이며 장소는 주차장이다."
      ],
      "vehicleHypotheses": [
        "입구의 종단 높이 변화와 차량 하중·지상고를 통과 가능성 판단에 어떻게 반영했는가?",
        "좌회전 진입 궤적과 속도가 하부 여유를 줄였을 가능성이 있는가?"
      ],
      "environmentHypotheses": [
        "입구 포장면의 높이·경사 전환은 어느 정도였고 사전 표시가 있었는가? 높은 노면이라는 보고만으로 관리상 과실은 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "어느 지점에서 하부 여유가 소진됐는가?",
          "material": "입구 3차원 종·횡단 측량, 접촉 흔적, 실제 차량 궤적, 적재 상태별 지상고"
        },
        {
          "question": "높은 입구를 감지하고 통과 가능하다고 판단했는가?",
          "material": "사고 전 센서 원시자료, 노면 높이 추정, 주행 가능 영역·경로 후보·속도 계획 로그"
        },
        {
          "question": "진입 속도나 각도 변경 여지가 있었는가?",
          "material": "시간별 조향·속도·제동 로그, 입구 가용 폭과 주변 교통 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "측정된 입구 형상과 적재별 차체 하부를 사용해 좌회전 통과 궤적·속도를 재검증한다."
        ],
        "environment": [
          "입구 경사 전환부를 측량하고 필요 시 완화·경고 표시 가능성을 검토한다."
        ],
        "operation": [
          "주차장 진입 전 하부 여유가 불확실한 위치의 대기·다른 입구 선택 기준을 정한다."
        ]
      },
      "limits": "입구 높이·접근각·하중과 접촉 시각별 제어 기록이 없어 감지 누락, 통과성 판단, 속도·경로 기여를 구분할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "높아진 입구 노면",
        "relation": "under",
        "stages": [
          "남향 주행",
          "주차장 좌회전",
          "하부 노면 접촉"
        ],
        "caption": "주차장 좌회전 진입 중 높아진 입구 노면에 하부 접촉",
        "geometryUnknown": [
          "입구 경사·단차",
          "차량 궤적·접촉점"
        ],
        "evidence": [
          "The Waymo AV was traveling southbound on [XXX] when it turned left into a parking lot at [XXX]."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4652:f1d6d0be:aafeb81c",
      "reportedRemediations": []
    },
    {
      "id": "30270-11003",
      "narrativeVersion": "1",
      "evidence": [
        "the front driver side wheel separated from the Waymo AV, resulting in the underside of the Waymo AV making contact with the pavement.",
        "The passenger in the Waymo AV reported a minor injury."
      ],
      "facts": [
        "차량이 교차로에서 서향 왼쪽 차로를 주행하던 중 좌전륜이 분리됐다.",
        "이후 차체 하부가 포장면에 접촉해 손상됐으며 승객의 경상이 보고됐다.",
        "접촉 당시 ADS가 작동했고 원시 사전 속도는 34 mph다."
      ],
      "vehicleHypotheses": [
        "좌전륜 체결부·허브·베어링 중 무엇이 먼저 이탈 또는 파손됐는가?",
        "분리 전후 차륜·자세 이상 신호를 언제 포착하고 어떤 정지 대응을 했는가?"
      ],
      "environmentHypotheses": [
        "분리 직전 외부 충격이나 노면 변화가 있었는가? 원문에는 노면 결함이 원인이라고 기재되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "분리의 기계적 시작점은 어디인가?",
          "material": "회수 차륜·허브·체결부의 파단·마모 분석, 체결 토크와 정비·부품 교체 이력"
        },
        {
          "question": "분리와 하부 접촉의 공간·시간 순서는 어떠했는가?",
          "material": "차량 자세·차륜 궤적 영상, 노면 측량과 접촉 흔적, 시각 동기화된 가속도 자료"
        },
        {
          "question": "이상 징후와 ADS 대응 사이 간격은 얼마인가?",
          "material": "휠 속도·조향·진동·진단 고장 코드, 제동·ADS 상태 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "좌전륜 파손 부품과 체결 공정의 원인을 조사하고 차륜 이상 시 안정화·정지 대응을 검증한다."
        ],
        "environment": [
          "사고 지점 충격 흔적을 확보해 차량 기계 고장과 외부 노면 요인을 구분한다."
        ],
        "operation": [
          "동일 부품·정비 이력 차량의 점검 범위를 조사 결과에 따라 정한다."
        ]
      },
      "limits": "바퀴 분리와 하부 접촉은 명시됐으나 분리 원인·경상 발생 기전·회피 가능성은 제시되지 않아 ADS 알고리즘 결함으로 단정할 수 없다.",
      "scene": {
        "setting": "intersection",
        "motion": "straight",
        "targetKind": "wheel",
        "targetLabel": "분리된 좌전륜",
        "relation": "left",
        "stages": [
          "서향 주행",
          "좌전륜 분리",
          "하부 노면 접촉"
        ],
        "caption": "교차로 주행 중 좌전륜 분리 후 차체 하부가 노면에 접촉",
        "geometryUnknown": [
          "차륜 분리 위치·진로",
          "차체 자세와 접촉점"
        ],
        "evidence": [
          "the front driver side wheel separated from the Waymo AV, resulting in the underside of the Waymo AV making contact with the pavement."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4643:cf2fdef9:63a3e637",
      "reportedRemediations": []
    },
    {
      "id": "30270-11007",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was parked at the curb facing northeast on [XXX].",
        "As the Waymo AV reversed to leave the curbside parking spot, the front passenger side of the Waymo AV made contact with the roadside curb."
      ],
      "facts": [
        "차량이 북동향으로 연석 옆에 주차돼 있었다.",
        "주차 공간에서 빠져나오려고 후진하던 중 오른쪽 앞부분이 연석에 접촉했다.",
        "ADS 작동 상태였고 차량 손상이 보고됐으며 원시 사전 속도는 1 mph다."
      ],
      "vehicleHypotheses": [
        "후진 시 앞부분이 옆으로 회전하는 궤적까지 연석 여유 계산에 포함했는가?",
        "연석 높이·차량 초기 자세의 추정 오차가 있었는가?"
      ],
      "environmentHypotheses": [
        "초기 주차 간격과 연석 형상이 후진 출차 공간을 얼마나 제한했는가?"
      ],
      "dataNeeded": [
        {
          "question": "후진 중 어느 차체 부분이 연석 쪽으로 이동했는가?",
          "material": "초기 주차 자세, 연석 3차원 형상, 조향별 차량 외곽 궤적과 접촉점 영상"
        },
        {
          "question": "시스템이 예상한 연석 간격은 얼마였는가?",
          "material": "근거리 센서 자료, 연석 지도·인지 결과, 위치 추정과 경로 후보 로그"
        },
        {
          "question": "접촉 전 멈추거나 기동을 바꿀 여유가 있었는가?",
          "material": "1 mph 전후 속도·기어·조향·제동 명령과 실제 응답, 주변 주차 차량 배치"
        }
      ],
      "improvements": {
        "vehicle": [
          "후진 출차에서 앞범퍼·바퀴의 바깥쪽 회전 범위를 포함한 연석 여유 검사를 강화할지 검토한다."
        ],
        "environment": [
          "연석 모서리·돌출부와 주차 공간 폭을 실측해 출차 가능 공간을 확인한다."
        ],
        "operation": [
          "낮은 속도에서도 출차 여유가 불확실하면 정지 후 경로를 다시 계산하는 기준을 검증한다."
        ]
      },
      "limits": "후진 사실과 오른쪽 앞 접촉만 확인되며 조향 방향·초기 이격·연석 높이가 없어 구체적인 궤적 오류를 확정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "reverse",
        "targetKind": "curb",
        "targetLabel": "도로변 연석",
        "relation": "unknown",
        "stages": [
          "연석 옆 주차",
          "후진 출차",
          "오른쪽 앞 접촉"
        ],
        "caption": "연석 옆 주차 공간에서 후진 중 오른쪽 앞부분 접촉",
        "geometryUnknown": [
          "초기 연석 이격",
          "후진 조향·연석 형상"
        ],
        "evidence": [
          "The Waymo AV was parked at the curb facing northeast on [XXX]."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4378:4f1e2ae3:dbe93379",
      "reportedRemediations": []
    },
    {
      "id": "30270-10497",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling eastbound on [XXX] in the left lane when the passenger side front tire made contact with the curb of the [XXX], [XXX] and [XXX] causing the tire to deflate."
      ],
      "facts": [
        "동향 왼쪽 차로 주행 중 오른쪽 앞 타이어가 연석에 접촉했다.",
        "접촉으로 타이어 공기가 빠지고 차량이 손상됐다고 보고됐다.",
        "접촉 당시 ADS가 작동했고 원시 사전 속도는 15 mph, 기동은 직진이다."
      ],
      "vehicleHypotheses": [
        "왼쪽 차로에서 오른쪽 앞 타이어와 연석 간 여유를 어떻게 추정했는가?",
        "접촉 전 경로 또는 횡방향 제어가 예상 궤적에서 벗어났는가?"
      ],
      "environmentHypotheses": [
        "비공개 처리된 연석의 실제 위치·형상과 차로 경계 관계는 무엇인가?"
      ],
      "dataNeeded": [
        {
          "question": "왼쪽 차로 주행과 오른쪽 연석 접촉이 어떤 배치에서 발생했는가?",
          "material": "비식별 처리 전 현장 도면, 연석·차로 경계 측량, 차량 궤적과 타이어 접촉 흔적"
        },
        {
          "question": "연석 인지와 횡제어는 어떤 간격을 예상했는가?",
          "material": "센서·지도 경계, 위치 추정 오차, 경로·조향 명령 및 응답 로그"
        },
        {
          "question": "공기압 저하가 접촉 뒤 발생했는가?",
          "material": "타이어 손상 사진·검사, 공기압·휠 속도 시간열, 접촉 직전후 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "실측 차로·연석 형상으로 오른쪽 바퀴 여유와 횡제어 오차를 재현 평가한다."
        ],
        "environment": [
          "연석 위치와 표시 상태를 확인해 지도·현장 경계의 차이를 점검한다."
        ],
        "operation": [
          "연석 접촉 또는 급격한 공기압 저하 후 안전 정차·타이어 점검 절차를 검증한다."
        ]
      },
      "limits": "연석 관련 지명이 가려져 도로의 특수 형상이나 차로 배치를 알 수 없으며 접촉 위치만으로 ADS 원인을 단정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "curb",
        "targetLabel": "연석",
        "relation": "unknown",
        "stages": [
          "동향 차로 주행",
          "오른쪽 앞 타이어 접촉",
          "타이어 공기압 저하"
        ],
        "caption": "동향 주행 중 오른쪽 앞 타이어가 연석에 닿아 공기가 빠짐",
        "geometryUnknown": [
          "연석과 차로의 상대 배치",
          "차량 횡위치·연석 높이"
        ],
        "evidence": [
          "The Waymo AV was traveling eastbound on [XXX] in the left lane when the passenger side front tire made contact with the curb of the [XXX], [XXX] and [XXX] causing the tire to deflate."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4370:b9c9cc5e:6d6992ce",
      "reportedRemediations": []
    },
    {
      "id": "30270-10274",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was stopped facing southeast on [XXX] in the leftmost lane behind a pickup truck towing an enclosed car carrier trailer that was stopped in-lane with its lift gate lowered.",
        "The AV began maneuvering to the right to pass the vehicle and the front left tire of the Waymo AV made contact with the rear right corner of the lowered lift gate."
      ],
      "facts": [
        "남동향 맨 왼쪽 차로에서 리프트 게이트를 내린 차량 운반 트레일러 뒤에 정지해 있었다.",
        "오른쪽으로 지나가려 움직이면서 자율차 좌전륜이 내려진 게이트의 오른쪽 뒤 모서리에 접촉했다.",
        "ADS 작동 중이었고 게이트 손상이 보고됐으며 원시 사전 속도는 4 mph다."
      ],
      "vehicleHypotheses": [
        "트레일러 본체와 별도로 낮게 펼쳐진 게이트의 범위를 인지했는가?",
        "오른쪽 통과 경로에서 좌전륜의 안쪽 여유를 충분히 계산했는가?"
      ],
      "environmentHypotheses": [
        "차로에 정지한 트레일러의 게이트 길이·표시와 실제 통과 폭은 어떠했는가? 정지 상태 자체가 과실을 입증하지는 않는다."
      ],
      "dataNeeded": [
        {
          "question": "게이트와 좌전륜의 궤적이 어디서 겹쳤는가?",
          "material": "게이트 높이·폭·경사·돌출 길이, 트레일러 자세, 차량 시간별 궤적"
        },
        {
          "question": "내려진 게이트를 독립 장애물로 모델링했는가?",
          "material": "근거리 센서 원시자료, 물체 외곽·높이 추정, 경로 충돌 검사 로그"
        },
        {
          "question": "오른쪽 통과 대신 대기할 판단 근거가 있었는가?",
          "material": "차로 교통 영상, 후보 경로·최소 여유·위험 비용, 조향·속도·제동 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "낮게 펼쳐진 리프트 게이트와 좌전륜 통과 궤적을 포함한 추월 여유 검사를 검증한다."
        ],
        "environment": [
          "게이트가 차지하는 공간의 가시성·경고 표시와 하역 위치를 확인한다."
        ],
        "operation": [
          "게이트 끝단이 불확실한 경우 통과보다 대기를 선택하는 기준을 점검한다."
        ]
      },
      "limits": "게이트 접촉은 명시됐지만 높이·돌출량·첫 인지 시점이 없어 인지 누락과 경로 여유 판단을 구분할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "right",
        "targetKind": "vehicle",
        "targetLabel": "내려진 트레일러 게이트",
        "relation": "ahead",
        "stages": [
          "트레일러 뒤 정지",
          "오른쪽 통과 시도",
          "좌전륜 게이트 접촉"
        ],
        "caption": "내려진 게이트를 오른쪽으로 지나려다 좌전륜 접촉",
        "geometryUnknown": [
          "게이트 돌출 길이·높이",
          "두 차량의 초기 간격"
        ],
        "evidence": [
          "The Waymo AV was stopped facing southeast on [XXX] in the leftmost lane behind a pickup truck towing an enclosed car carrier trailer that was stopped in-lane with its lift gate lowered."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4683:21b5a557:b3f909ef",
      "reportedRemediations": []
    },
    {
      "id": "30270-9873",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling north on [XXX] when the front of the Waymo AV made contact with a fallen utility line that was hanging across [XXX]."
      ],
      "facts": [
        "북향 주행 중 도로를 가로질러 늘어진 전선에 차량 앞부분이 접촉했다.",
        "접촉 당시 ADS가 작동했고 차량 손상이 보고됐다.",
        "원시 사전 속도는 9 mph이며 주간의 건조한 도로로 기록됐다."
      ],
      "vehicleHypotheses": [
        "가늘고 늘어진 선의 높이·연속 형태를 차량 통과 공간의 장애물로 인지했는가?",
        "접촉 전에 선을 인지했다면 정지 판단과 제동은 언제 이뤄졌는가?"
      ],
      "environmentHypotheses": [
        "전선이 늘어진 높이·발생 시점과 현장 통제 상태는 어떠했는가? 해당 상태만으로 관리 과실을 확정할 수 없다."
      ],
      "dataNeeded": [
        {
          "question": "차량 높이와 선의 처짐이 어디서 겹쳤는가?",
          "material": "전선 고정점·최저 높이·처짐 측량, 차량 전면 형상, 접근 영상"
        },
        {
          "question": "얇은 선을 어느 센서가 언제 검출했는가?",
          "material": "카메라·라이다 원시자료, 선형 물체 추적·높이 추정·자유공간 로그"
        },
        {
          "question": "정지 가능 거리와 통제 정보가 있었는가?",
          "material": "차량 속도·제동·경로 로그, 선 처짐 신고·차단 시간 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "낮게 늘어진 가는 선의 검출과 높이별 통과 불가 판단을 재현 시험한다."
        ],
        "environment": [
          "처진 전선 현장의 접근 차단·표시와 복구 전달 절차를 확인한다."
        ],
        "operation": [
          "전선 높이가 불확실한 구간에서 진입 중단·현장 확인 요청 기준을 검토한다."
        ]
      },
      "limits": "전선 높이·굵기·가시거리와 제동 기록이 없으며 전선의 전기적 상태나 인지 실패 여부도 확인되지 않는다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "도로를 가로지른 전선",
        "relation": "ahead",
        "stages": [
          "북향 주행",
          "늘어진 전선 접근",
          "차량 전면 접촉"
        ],
        "caption": "북향 주행 중 도로를 가로질러 늘어진 전선에 전면 접촉",
        "geometryUnknown": [
          "전선 최저 높이·처짐",
          "차량 접근 거리·접촉 높이"
        ],
        "evidence": [
          "The Waymo AV was traveling north on [XXX] when the front of the Waymo AV made contact with a fallen utility line that was hanging across [XXX]."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4218:9da87e01:b5c432f7",
      "reportedRemediations": []
    },
    {
      "id": "30413-9958",
      "narrativeVersion": "1",
      "evidence": [
        "The vehicle exited the sub-lot and rolled over a curb. The vehicle stopped at a stop sign at the exit of the main lot. As it proceeded to turn onto the main road, it rolled over another curb.",
        "Almost immediately after rolling the curb, the vehicle began to drift right in lane, rubbing the vehicle sidewall on a curb.",
        "It was discovered that the deployment of map files, which must remain compatible, was incomplete, leaving a mismatch in the system."
      ],
      "facts": [
        "실험 소프트웨어 시험 출발 후 소주차장 출구와 본도로 진입에서 각각 연석을 넘었다.",
        "이후 차로 오른쪽으로 흐르며 연석에 타이어 측면이 마찰했고 운전자가 개입했다. 수동 운전 중 뒤 오른쪽 타이어 측벽이 파손돼 저압 표시가 켜졌다.",
        "보고자는 지도 파일의 불완전 배포와 불일치로 위치 지도상의 차로·경계 거리를 잘못 추정해 연석 접촉이 발생했다고 설명했다. 원시 사전 속도는 7 mph다."
      ],
      "vehicleHypotheses": [
        "명시된 지도 불일치가 첫 번째와 두 번째 연석 접촉 및 우측 편위에 각각 어떻게 반영됐는가?",
        "지도 호환성 오류를 출발 전 또는 주행 중 탐지할 검사가 있었는가?"
      ],
      "environmentHypotheses": [
        "소주차장·본주차장 출구의 실제 연석 위치와 지도 좌표 차이는 얼마였는가? 원문은 현장 연석 결함을 원인으로 제시하지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "지도 조합은 어떤 차로 경계 오차를 만들었는가?",
          "material": "배포 파일 버전·해시·호환성 목록, 위치 지도 변환값, 실측 연석·차로 좌표"
        },
        {
          "question": "세 차례 접촉과 우측 편위의 제어 순서는 어떠했는가?",
          "material": "각 구간 차량 궤적·위치 추정·경로·조향 로그, 영상과 운전자 개입 시각"
        },
        {
          "question": "측벽 손상과 수동 운전 중 파손 사이 상태는 어떠했는가?",
          "material": "우후륜 검사 사진·공기압 시간열, 접촉 후 운행 거리·속도, 정비 분석"
        }
      ],
      "improvements": {
        "vehicle": [
          "지도 파일을 호환 세트 단위로 배포·검증하고 불일치 시 출발을 차단하는 절차를 시험한다."
        ],
        "environment": [
          "두 출구의 연석 실측값을 지도 좌표와 대조해 검증 기준점으로 사용한다."
        ],
        "operation": [
          "반복 연석 접촉 후에는 수동 계속 운전 전 타이어 측벽을 점검하는 절차를 보완한다."
        ]
      },
      "limits": "지도 불일치 원인은 보고자 설명으로 명시됐으나 구간별 좌표 오차와 손상 누적량이 없어 개별 접촉의 기여 정도는 계산할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "right",
        "targetKind": "curb",
        "targetLabel": "출구·차로 연석",
        "relation": "right",
        "stages": [
          "출구 연석 통과",
          "본도로 진입·우측 편위",
          "측벽 마찰 후 지연 파손"
        ],
        "caption": "지도 파일 불일치 보고: 출구 연석 접촉 뒤 우측 편위·타이어 손상",
        "geometryUnknown": [
          "두 출구 연석 좌표",
          "우측 편위량·차로 경계 거리"
        ],
        "evidence": [
          "The vehicle exited the sub-lot and rolled over a curb. The vehicle stopped at a stop sign at the exit of the main lot. As it proceeded to turn onto the main road, it rolled over another curb."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "5028:e4e68bea:c15d3700",
      "reportedRemediations": []
    },
    {
      "id": "30270-9806",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling westbound on [XXX] when the rear driver side wheel separated from the Waymo AV.",
        "The wheel rolled a short distance and then made contact with a passenger car and a motorcycle that were both parked at the curb on the south side of [XXX]."
      ],
      "facts": [
        "서향 주행 중 좌후륜이 차량에서 분리됐다.",
        "분리된 바퀴가 짧은 거리를 굴러 도로 남쪽 연석에 주차된 승용차와 오토바이에 접촉했다.",
        "자율차는 바퀴 분리로, 두 주차 차량은 분리된 바퀴 접촉으로 손상됐다고 보고됐다. ADS 작동 중이며 원시 사전 속도는 23 mph다."
      ],
      "vehicleHypotheses": [
        "좌후륜의 체결·허브·베어링 중 분리의 시작 원인은 무엇인가?",
        "분리 징후와 차량 제어 대응이 기록됐는가? 분리된 바퀴의 이동을 차량 경로 오류로 동일시할 수는 없다."
      ],
      "environmentHypotheses": [
        "분리 전 외부 충격이나 노면 변화가 있었는가? 주차 위치만으로 피해 차량의 기여를 판단할 근거는 없다."
      ],
      "dataNeeded": [
        {
          "question": "좌후륜은 왜 분리됐는가?",
          "material": "회수 부품 파손 분석, 체결 토크·정비 이력·부품 제조 이력"
        },
        {
          "question": "분리 바퀴가 두 차량에 어떤 순서·각도로 닿았는가?",
          "material": "현장 영상, 바퀴 이동 흔적, 주차 차량 위치·손상 높이와 노면 경사 측량"
        },
        {
          "question": "분리 전후 자율차는 어떻게 대응했는가?",
          "material": "휠 속도·진동·진단 신호, ADS 상태·조향·제동·차체 자세 로그"
        }
      ],
      "improvements": {
        "vehicle": [
          "좌후륜 분리 원인을 조사하고 이상 징후 감지·차체 안정화 대응을 검증한다."
        ],
        "environment": [
          "도로 경사와 분리 바퀴 이동 흔적을 보존해 2차 접촉 경로를 확인한다."
        ],
        "operation": [
          "부품·정비 공통성이 있는 차량의 추가 점검 범위를 원인 조사와 연계한다."
        ]
      },
      "limits": "기계적 분리는 명시됐지만 원인 부품·선행 충격과 바퀴의 정확한 2차 접촉 궤적은 알려지지 않았다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "wheel",
        "targetLabel": "분리된 좌후륜",
        "relation": "left",
        "stages": [
          "서향 주행",
          "좌후륜 분리",
          "주차 차량 두 대 접촉"
        ],
        "caption": "분리된 좌후륜이 굴러가 남쪽 연석의 승용차·오토바이에 접촉",
        "geometryUnknown": [
          "바퀴 이동 궤적·거리",
          "두 주차 차량의 배치"
        ],
        "evidence": [
          "The Waymo AV was traveling westbound on [XXX] when the rear driver side wheel separated from the Waymo AV."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4873:922bd8b4:585520",
      "reportedRemediations": []
    },
    {
      "id": "30270-9597",
      "narrativeVersion": "1",
      "evidence": [
        "As the Waymo AV turned left onto [XXX], the Waymo AV's undercarriage made contact with the raised pavement of the side walk where [XXX] meets [XXX].",
        "The test driver in the Waymo AV reported a moderate injury."
      ],
      "facts": [
        "남향 주행 뒤 왼쪽의 높아진 진입부로 좌회전했다.",
        "도로가 만나는 지점의 높아진 보도 포장면에 차체 하부가 접촉했다.",
        "ADS가 작동 중이고 운전석에 시험 운전자가 탑승했으며 이 운전자의 중등도 부상이 보고됐다. 원시 사전 속도는 8 mph다."
      ],
      "vehicleHypotheses": [
        "좌회전 시 높아진 보도 포장면의 단차와 하부 지상고를 어떻게 평가했는가?",
        "진입각·속도·차체 피칭이 하부 접촉에 기여했는가?"
      ],
      "environmentHypotheses": [
        "진입부와 보도 사이 높이 변화·허용 진입 경로·표시는 어떠했는가? 높은 포장면만으로 관리 과실은 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "어떤 높이 전환에서 하부가 닿았는가?",
          "material": "진입부·보도 종횡단 측량, 차량 하부 접촉 흔적, 조향 궤적·차량 적재와 지상고"
        },
        {
          "question": "통과 가능성 판단과 제어는 어떠했는가?",
          "material": "센서 노면 추정·자유공간·경로 후보, 속도·제동·서스펜션 자세 로그"
        },
        {
          "question": "시험 운전자 개입과 접촉 충격의 시간 관계는 무엇인가?",
          "material": "운전자 입력·ADS 전환 시각, 실내외 영상, 가속도·좌석 탑승 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "좌회전 보도 진입의 경사 전환과 적재별 하부 여유를 평가하고 접근 경로·속도 기준을 검증한다."
        ],
        "environment": [
          "보도와 진입부 단차 및 가시성을 실측해 완화·표시 필요성을 검토한다."
        ],
        "operation": [
          "시험 경로의 높은 진입부를 사전 확인하고 하부 여유 불확실 시 대기 기준을 마련한다."
        ]
      },
      "limits": "원문은 중등도 부상 보고를 포함하지만 부상 기전·접촉 충격량·진입부 치수를 제시하지 않아 인과 기여를 세분할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "높아진 보도 포장면",
        "relation": "under",
        "stages": [
          "남향 접근",
          "높은 진입부 좌회전",
          "하부 포장면 접촉"
        ],
        "caption": "좌회전 진입 중 높아진 보도 포장면에 차체 하부 접촉",
        "geometryUnknown": [
          "보도 단차·경사",
          "진입각·하부 접촉 위치"
        ],
        "evidence": [
          "As the Waymo AV turned left onto [XXX], the Waymo AV's undercarriage made contact with the raised pavement of the side walk where [XXX] meets [XXX]."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4636:195cb22:3df6e12e",
      "reportedRemediations": []
    },
    {
      "id": "30270-9566",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling north on [XXX] in the left lane of two lanes when it encountered a vacuum cleaner laying on its side in the roadway within its lane and across the lane line separating the two lanes.",
        "The Waymo AV applied braking and the front passenger side tire of the Waymo AV made contact with the vacuum cleaner."
      ],
      "facts": [
        "북향 두 차로 중 왼쪽 차로를 주행하며 차로 안과 경계선에 걸쳐 옆으로 누운 진공청소기를 만났다.",
        "제동을 적용한 뒤 오른쪽 앞 타이어가 청소기에 접촉했고 청소기 손상이 보고됐다.",
        "ADS 작동 중이었으며 원시 사전 속도는 24 mph, 조명 있는 야간 도로다."
      ],
      "vehicleHypotheses": [
        "청소기 외곽을 처음 검출한 거리와 제동 개시가 정지 여유에 어떤 영향을 줬는가?",
        "차로선에 걸친 낮은 물체의 폭을 경로 충돌 계산에 충분히 반영했는가?"
      ],
      "environmentHypotheses": [
        "청소기가 도로에 놓인 시점·가시거리·제거 또는 경고 상태는 어떠했는가?"
      ],
      "dataNeeded": [
        {
          "question": "청소기가 어느 범위까지 차로를 차지했는가?",
          "material": "청소기 크기·자세, 차로선과의 상대 위치, 우전륜 궤적·접촉 흔적"
        },
        {
          "question": "제동 이전 장애물을 언제 알아봤는가?",
          "material": "시간 동기화 센서 영상·물체 추적·위험도·경로 로그"
        },
        {
          "question": "정지·우회 대안은 가능한 상황이었는가?",
          "material": "차량 속도·브레이크 명령·실제 감속, 노면 마찰과 인접 차로 교통 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "야간에 옆으로 누운 생활 물체의 외곽 추정과 감지 후 정지 여유를 재현 평가한다."
        ],
        "environment": [
          "도로 낙하물 신고·현장 경고·회수 절차의 시간 자료를 확인한다."
        ],
        "operation": [
          "차로 경계를 걸친 낙하물에 대해 인접 교통을 포함한 정지·우회 선택 기준을 점검한다."
        ]
      },
      "limits": "제동 실행은 명시됐으나 첫 감지 거리·감속량·주변 교통이 없어 제동 지연 또는 우회 가능성을 단정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "옆으로 누운 청소기",
        "relation": "ahead",
        "stages": [
          "북향 접근",
          "청소기 접근·제동",
          "오른쪽 앞 타이어 접촉"
        ],
        "caption": "차로선에 걸친 청소기를 향해 제동한 뒤 오른쪽 앞 타이어 접촉",
        "geometryUnknown": [
          "청소기의 차로 점유 폭",
          "첫 인지 거리·차량 궤적"
        ],
        "evidence": [
          "The Waymo AV was traveling north on [XXX] in the left lane of two lanes when it encountered a vacuum cleaner laying on its side in the roadway within its lane and across the lane line separating the two lanes."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4610:da86c753:e184c063",
      "reportedRemediations": []
    },
    {
      "id": "30270-9569",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling eastbound on [XXX] in the right lane, and made contact with a dog lying motionless in the lane of travel."
      ],
      "facts": [
        "동향 오른쪽 차로를 주행하던 차량이 차로에 움직이지 않고 누워 있던 개에 접촉했다.",
        "접촉 당시 ADS가 작동했으며 원시 사전 속도는 30 mph, 조명 있는 야간 도로다."
      ],
      "vehicleHypotheses": [
        "움직이지 않는 낮은 동물 형상을 어떤 물체·주행 불가 영역으로 분류했는가?",
        "인지 이후 정지 또는 경로 변경 판단이 있었는가?"
      ],
      "environmentHypotheses": [
        "동물이 누워 있던 위치·조명 대비·접근 가시거리는 어떠했는가? 동물의 상태나 관리 주체는 원문에 없다."
      ],
      "dataNeeded": [
        {
          "question": "차량 경로와 동물의 점유 영역이 어떻게 겹쳤는가?",
          "material": "현장 영상, 동물의 크기·자세·차로 내 위치와 차량 궤적"
        },
        {
          "question": "낮은 정지 동물을 언제 탐지·분류했는가?",
          "material": "카메라·라이다 원시자료, 객체 분류·추적·주행 가능 영역 로그"
        },
        {
          "question": "접촉 전 대응 여유가 있었는가?",
          "material": "속도·제동·경로 후보 로그, 최초 가시거리와 주변 교통 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "야간의 정지한 낮은 동물에 대한 검출·통과 금지 판단과 감속 기준을 평가한다."
        ],
        "environment": [
          "현장 조명과 동물 발견 시 접근 경고·구조 연락 절차를 확인한다."
        ],
        "operation": [
          "정지한 동물도 경로 장애물로 취급하는 운영 대응과 현장 확인 기준을 검토한다."
        ]
      },
      "limits": "동물의 선행 상태·생사·접촉 결과와 제동 여부가 제시되지 않아 동물 피해를 이 접촉에 귀속하거나 센서 실패를 확정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "animal",
        "targetLabel": "움직이지 않는 개",
        "relation": "ahead",
        "stages": [
          "동향 오른쪽 차로 주행",
          "누워 있는 개 접근",
          "개와 접촉"
        ],
        "caption": "오른쪽 차로에 움직이지 않고 누운 개와 접촉",
        "geometryUnknown": [
          "동물의 크기·차로 위치",
          "접근 가시거리·접촉점"
        ],
        "evidence": [
          "The Waymo AV was traveling eastbound on [XXX] in the right lane, and made contact with a dog lying motionless in the lane of travel."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4132:69158259:3cb3c3e7",
      "reportedRemediations": []
    },
    {
      "id": "30270-9287",
      "narrativeVersion": "2",
      "evidence": [
        "The contact with the Waymo AV caused the crate to move into the adjacent right lane, which was occupied by a scooterist.",
        "The front tire of the scooter made contact with the crate and the scooter and scooterist fell."
      ],
      "facts": [
        "차량이 서향 중앙 차로에서 교차로를 통과하던 중 차로 내 플라스틱 상자에 오른쪽 앞부분이 접촉했다.",
        "접촉으로 상자가 인접 오른쪽 차로로 이동했고 그 차로의 스쿠터 앞 타이어가 상자에 닿아 스쿠터와 탑승자가 넘어졌다.",
        "ADS 작동 중이며 원시 사전 속도는 16 mph다. 보고서는 스쿠터 손상 가능성을 언급하지만 확정하지 않는다."
      ],
      "vehicleHypotheses": [
        "가벼운 상자를 통과 가능한 물체로 봤는지 또는 장애물로 인지했는지 확인할 수 있는가?",
        "접촉 시 인접 차로로 물체가 이동하는 2차 위험을 경로 판단에 반영했는가?"
      ],
      "environmentHypotheses": [
        "상자의 위치·크기·재질과 스쿠터의 인접 차로 접근이 첫 인지 시점에서 보였는가?"
      ],
      "dataNeeded": [
        {
          "question": "상자는 어떤 궤적으로 스쿠터 앞으로 이동했는가?",
          "material": "상자 치수·질량·접촉점, AV·스쿠터 궤적과 시간 동기화 영상"
        },
        {
          "question": "AV는 상자와 스쿠터를 각각 언제 인지했는가?",
          "material": "센서 원시자료, 두 물체 추적·예측·위험 비용·후보 경로 로그"
        },
        {
          "question": "상자 접촉을 피하거나 속도를 줄일 여유는 있었는가?",
          "material": "AV 속도·제동·조향 로그, 교차로 가용 공간과 주변 교통 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "경량 물체를 밀어낼 때 인접 차로 이용자에게 생기는 2차 충돌 위험을 검증 시나리오에 추가한다."
        ],
        "environment": [
          "교차로 내 이동 가능한 낙하물의 신속한 표시·제거 절차를 검토한다."
        ],
        "operation": [
          "2차 사고 가능성이 있는 물체 접촉 후 인접 이용자 상태와 현장 위험을 확인하는 대응을 점검한다."
        ]
      },
      "limits": "상자의 이동과 스쿠터 전도 순서는 명시됐으나 질량·속도·간격과 상해 자료가 없어 2차 접촉의 회피 가능성이나 피해 정도를 확정할 수 없다.",
      "scene": {
        "setting": "intersection",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "플라스틱 상자",
        "relation": "ahead",
        "stages": [
          "중앙 차로 상자 접촉",
          "상자가 오른쪽 차로 이동",
          "스쿠터 접촉·전도"
        ],
        "caption": "상자 접촉 뒤 상자가 오른쪽 차로로 이동해 스쿠터가 넘어짐",
        "geometryUnknown": [
          "상자 이동 각도·거리",
          "스쿠터와 상자의 초기 간격"
        ],
        "evidence": [
          "The Waymo AV was traveling westbound in the center lane on [XXX], crossing the intersection with [XXX] when the front passenger side of the Waymo AV made contact with a plastic crate that was in the roadway within the Waymo AV's lane of travel.",
          "The contact with the Waymo AV caused the crate to move into the adjacent right lane, which was occupied by a scooterist."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "5608:4414285f:39daeb9",
      "reportedRemediations": []
    },
    {
      "id": "30270-9177",
      "narrativeVersion": "1",
      "evidence": [
        "As it approached the intersection with [XXX], it made contact with a small dog that had apparently been previously struck by a preceding vehicle and was laying in the roadway."
      ],
      "facts": [
        "차량이 동향으로 교차로에 접근하던 중 도로에 누워 있던 작은 개와 접촉했다.",
        "보고자는 앞선 차량이 이미 개를 충격한 것으로 보인다고 서술하며 확정 사실로 단정하지 않는다.",
        "접촉 당시 ADS가 작동했고 원시 사전 속도는 31 mph, 주간 도로다."
      ],
      "vehicleHypotheses": [
        "선행 차량 뒤에서 낮게 누운 작은 동물을 처음 볼 수 있었던 시점은 언제인가?",
        "동물 분류·주행 불가 판단과 감속 또는 경로 변경 판단은 어떻게 이뤄졌는가?"
      ],
      "environmentHypotheses": [
        "선행 차량에 의한 가림과 동물의 차로 내 위치가 접근 가시거리를 제한했는가?"
      ],
      "dataNeeded": [
        {
          "question": "선행 차량과 개·AV의 위치 관계는 어떠했는가?",
          "material": "전방 영상, 선행 차량 간격·궤적, 개의 크기·자세·차로 내 위치"
        },
        {
          "question": "가림 해소 후 동물을 언제 인지했는가?",
          "material": "센서 원시자료, 객체 추적·분류·가림 모델과 주행 가능 영역 로그"
        },
        {
          "question": "가시거리 내 정지·회피 여유는 얼마였는가?",
          "material": "속도·제동·경로 후보 로그, 노면 마찰과 교차로 주변 교통 자료"
        }
      ],
      "improvements": {
        "vehicle": [
          "선행 차량 뒤에서 나타나는 작은 정지 동물에 대한 가림 해소 후 검출·감속 성능을 평가한다."
        ],
        "environment": [
          "동물 발견 뒤 접근 차량 경고와 현장 처리 절차를 확인한다."
        ],
        "operation": [
          "동물의 선행 충돌 여부가 불확실해도 추가 접촉을 줄일 대기·우회 기준을 점검한다."
        ]
      },
      "limits": "앞선 충격은 보고자의 추정이며 동물의 생사·선행 상해·본 접촉 결과가 없어 피해 원인을 분리하거나 ADS 인지 실패를 단정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "animal",
        "targetLabel": "도로에 누운 작은 개",
        "relation": "ahead",
        "stages": [
          "동향 교차로 접근",
          "누운 작은 개 접근",
          "개와 접촉"
        ],
        "caption": "교차로 접근 중 선행 충격을 받은 것으로 추정되는 작은 개와 접촉",
        "geometryUnknown": [
          "선행 차량 가림·간격",
          "개의 위치·최초 가시거리"
        ],
        "evidence": [
          "As it approached the intersection with [XXX], it made contact with a small dog that had apparently been previously struck by a preceding vehicle and was laying in the roadway."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4333:f1648add:4cd68181",
      "reportedRemediations": []
    },
    {
      "id": "30270-9169",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling east on [XXX] in the rightmost lane when it approached a fence that was down partially on the rightmost lane and sidewalk from an abutting construction site.",
        "The front of the Waymo AV came in contact with the fence."
      ],
      "facts": [
        "동향 맨 오른쪽 차로에서 인접 공사장 쪽 펜스가 차로와 보도에 일부 쓰러진 곳으로 접근했다.",
        "차량 전면이 펜스에 접촉했고 펜스 손상이 보고됐다.",
        "ADS 작동 중이며 원시 사전 속도는 12 mph다."
      ],
      "vehicleHypotheses": [
        "쓰러진 펜스가 차지하는 차로 폭과 높이를 어떻게 모델링했는가?",
        "정지 또는 남은 공간으로의 회피 판단이 있었는가?"
      ],
      "environmentHypotheses": [
        "공사장 펜스의 전도 시점·차로 침범 범위·경고 또는 통제 상태는 어떠했는가? 전도 사실만으로 관리 과실은 확정되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "펜스는 차로를 얼마나 가로막았는가?",
          "material": "펜스 높이·기울기·차로 침범 폭, 도로·보도 단면과 차량 궤적"
        },
        {
          "question": "펜스를 언제 장애물로 판단했는가?",
          "material": "센서·객체 외곽·자유공간·경로 계획·제동 로그"
        },
        {
          "question": "공사 정보나 현장 통제로 위험을 미리 알 수 있었는가?",
          "material": "전도 신고·순찰·차단 기록, 경고 표지 배치와 접근 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "쓰러진 가는 펜스의 실제 외곽과 잔여 통행 폭을 반영한 정지·우회 판단을 검증한다."
        ],
        "environment": [
          "펜스 고정·점검·전도 후 차로 통제 상태를 조사해 필요한 보완을 검토한다."
        ],
        "operation": [
          "공사 경계가 주행 공간을 침범하면 진행을 보류하는 기준을 점검한다."
        ]
      },
      "limits": "쓰러진 펜스의 침범은 확인되지만 고정 상태·전도 원인·발견 시간과 차량 제동 기록이 없어 양측 기여를 판단할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "barrier",
        "targetLabel": "차로에 쓰러진 펜스",
        "relation": "ahead",
        "stages": [
          "오른쪽 차로 접근",
          "쓰러진 펜스 접근",
          "차량 전면 접촉"
        ],
        "caption": "공사장 펜스가 차로·보도에 일부 쓰러진 곳에서 차량 전면 접촉",
        "geometryUnknown": [
          "펜스 차로 침범 폭",
          "전도 각도·가용 통행 폭"
        ],
        "evidence": [
          "The Waymo AV was traveling east on [XXX] in the rightmost lane when it approached a fence that was down partially on the rightmost lane and sidewalk from an abutting construction site."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4371:883c9e1a:f859f270",
      "reportedRemediations": []
    },
    {
      "id": "30270-8809",
      "narrativeVersion": "1",
      "evidence": [
        "At this section of [XXX] at this time, the roadway was under construction, there were no lane markings, and lane usage was defined with temporary lane control signage and traffic cones within the roadway.",
        "As the Waymo AV was completing the right turn, the front of the Waymo AV made contact with a road sign placed in the roadway between the right turning lane and center straight lane."
      ],
      "facts": [
        "공사 중인 도로는 차선 표시 없이 임시 표지와 콘으로 차로 용도를 구분하고 있었다.",
        "주차장에서 북향 도로로 우회전하던 차량이 회전을 마칠 때 우회전 차로와 중앙 직진 차로 사이의 표지에 전면 접촉했다.",
        "ADS 작동 중 차량 손상이 보고됐고 원시 사전 속도는 1 mph, 조명 있는 야간이다."
      ],
      "vehicleHypotheses": [
        "차선 없는 공사 구간에서 임시 표지·콘이 정의한 통로를 어떻게 추정했는가?",
        "우회전 전면 외곽 궤적과 표지 지지부의 여유를 계산했는가?"
      ],
      "environmentHypotheses": [
        "표지·콘 배치가 실제 우회전 통과 폭을 얼마나 남겼으며 야간 시인성은 어떠했는가? 배치의 적정성은 추가 확인이 필요하다."
      ],
      "dataNeeded": [
        {
          "question": "우회전 궤적과 표지의 점유 공간이 어디서 겹쳤는가?",
          "material": "출구·임시 차로·표지 지지부의 측량, 차량 궤적·전면 접촉점"
        },
        {
          "question": "임시 통로와 표지를 어떻게 인지했는가?",
          "material": "야간 센서 자료, 콘·표지 추적, 지도 대비 임시 경계·경로 로그"
        },
        {
          "question": "정지·재계획 판단은 언제 가능했는가?",
          "material": "속도·조향·제동 명령과 실제 응답, 공사 교통관리 배치도·변경 시간"
        }
      ],
      "improvements": {
        "vehicle": [
          "무차선 공사 구간의 임시 통로와 표지 지지부를 포함한 우회전 여유 검증을 보완한다."
        ],
        "environment": [
          "우회전 차로와 직진 차로 사이 표지 배치·반사성·가용 폭을 확인한다."
        ],
        "operation": [
          "공사 배치가 지도와 다르거나 경계가 불명확하면 저속 정지·재계획 기준을 적용할지 검토한다."
        ]
      },
      "limits": "표지 위치와 공사 조건은 명시됐지만 지지부 크기·회전 반경·인지 기록이 없어 표지 배치 문제와 차량 판단의 기여를 분리할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "right",
        "targetKind": "object",
        "targetLabel": "임시 차로 통제 표지",
        "relation": "ahead",
        "stages": [
          "주차장 출차",
          "공사 도로 우회전",
          "전면 표지 접촉"
        ],
        "caption": "차선 없는 공사 도로로 우회전하며 차로 사이 임시 표지에 접촉",
        "geometryUnknown": [
          "표지·콘 배치·통행 폭",
          "우회전 반경·표지 받침 크기"
        ],
        "evidence": [
          "At this section of [XXX] at this time, the roadway was under construction, there were no lane markings, and lane usage was defined with temporary lane control signage and traffic cones within the roadway."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4879:ceb69361:488d99bb",
      "reportedRemediations": []
    },
    {
      "id": "30413-8861",
      "narrativeVersion": "1",
      "evidence": [
        "As the vehicle navigated this transition of curvature, the May vehicle made contact with the curb, causing a flat tire.",
        "The May vehicle chose to maneuver at the curb due to perceived risk from a car in an adjacent lane, so May is increasing the allowed distance to the curb to mitigate how close the vehicles are allowed to get."
      ],
      "facts": [
        "차량은 제한속도와 같은 30 mph로 오른쪽 차로에서 완만한 우곡선이 좌곡선으로 바뀌는 구간을 통과하다 연석에 닿아 타이어가 손상됐다.",
        "본문은 주변에 차량·보행자·외부 장애 요인이 없었다고 설명하면서 뒤에서는 인접 차로 차량의 위험을 인지해 연석 쪽으로 기동했다고 설명한다. 두 서술은 자료 대조가 필요하다.",
        "보고자는 해당 구간 속도를 25 mph로 낮춰 시험 후 22 mph로 더 낮출 예정이며 연석 이격을 늘리는 조치를 설명했다."
      ],
      "vehicleHypotheses": [
        "인접 차로 차량 위험 판단이 실제 차량의 위치·운동과 일치했는가?",
        "곡률 전환에서 속도와 연석 이격 기준이 경로·횡제어에 어떤 영향을 줬는가?"
      ],
      "environmentHypotheses": [
        "실제 인접 교통과 연석 형상·도로 곡률은 어떠했는가? 본문상 주변 교통 서술의 불일치를 먼저 확인해야 한다."
      ],
      "dataNeeded": [
        {
          "question": "연석 쪽 기동의 계기가 된 차량은 실제로 어디에 있었는가?",
          "material": "전체 주변 영상, 객체 추적·위험 예측 로그, 보고서 작성 근거"
        },
        {
          "question": "곡률 전환에서 필요한 연석 여유는 얼마였는가?",
          "material": "도로 곡률·연석 측량, 차량 위치·속도·조향·계획 궤적 로그"
        },
        {
          "question": "25 mph 시험과 22 mph 계획의 검증 범위는 무엇인가?",
          "material": "변경 전후 제어·여유 설정, 반복 시험 조건·접촉 여부·최소 이격 자료"
        }
      ],
      "improvements": {
        "vehicle": [
          "곡률 전환에서 인접 차량 위험 비용과 연석 최소 이격의 우선순위를 재검증한다.",
          "보고된 감속·이격 조치의 효과를 다양한 교통·곡률 조건에서 확인한다."
        ],
        "environment": [
          "실측 연석과 차로 곡률을 지도·시험 구간 정의에 반영한다."
        ],
        "operation": [
          "보고된 감속 시험의 범위와 추가 22 mph 운영 계획의 승인·검증 근거를 보존한다."
        ]
      },
      "limits": "인지한 인접 차량과 주변에 차량이 없었다는 서술이 함께 있어 실제 외부 상황은 불명확하다. 특정 구간 감속 시험 결과가 전체 노선의 예방 효과를 보장하지 않는다.",
      "scene": {
        "setting": "road",
        "motion": "curve",
        "targetKind": "curb",
        "targetLabel": "곡률 전환부 연석",
        "relation": "unknown",
        "stages": [
          "30 mph 곡률 전환",
          "연석 쪽 기동",
          "연석 접촉·타이어 손상"
        ],
        "caption": "완만한 우곡선에서 좌곡선으로 바뀌는 구간에서 연석 접촉",
        "geometryUnknown": [
          "곡률·연석 이격",
          "인접 차량 실제 위치"
        ],
        "evidence": [
          "As the vehicle navigated this transition of curvature, the May vehicle made contact with the curb, causing a flat tire."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "5079:5807a0d9:4f4e0033",
      "reportedRemediations": []
    },
    {
      "id": "30270-8624",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was making a left turn around a cul-de-sac-style driveway at a low rate of speed when the front passenger side corner of the Waymo AV made contact with the corner of a garage stucco wall."
      ],
      "facts": [
        "막다른길 형태의 진입로를 낮은 속도로 좌회전하며 돌고 있었다.",
        "차량 오른쪽 앞 모서리가 차고 회벽의 모서리에 접촉해 차량과 벽이 손상됐다.",
        "ADS 작동 중이며 원시 사전 속도는 2 mph, 장소 항목은 주차장이다."
      ],
      "vehicleHypotheses": [
        "좌회전에서 차량 바깥쪽 앞 모서리의 회전 범위를 벽 모서리와 비교했는가?",
        "차고 벽의 돌출 모서리 위치 또는 자기 위치 추정 오차가 있었는가?"
      ],
      "environmentHypotheses": [
        "회차 공간의 실제 폭·차고 모서리 돌출량이 차량 회전 공간을 얼마나 제한했는가?"
      ],
      "dataNeeded": [
        {
          "question": "차량 모서리와 벽의 충돌 경계는 어디인가?",
          "material": "회차 진입로·차고 모서리 3차원 측량, 차량 외곽·시간별 회전 궤적"
        },
        {
          "question": "벽과 차량 위치를 얼마나 정확히 추정했는가?",
          "material": "근거리 센서 자료, 벽 외곽 모델·위치 추정·경로 충돌검사 로그"
        },
        {
          "question": "좌회전 계획과 실제 조향이 일치했는가?",
          "material": "조향·속도·제동 명령 및 응답, 대체 회차 경로 후보"
        }
      ],
      "improvements": {
        "vehicle": [
          "좁은 회차 공간에서 바깥쪽 앞 모서리의 전체 궤적을 적용해 최소 이격을 검증한다."
        ],
        "environment": [
          "차고 모서리와 회차 공간을 실측하고 가시성·보호 표시 필요성을 검토한다."
        ],
        "operation": [
          "회차 폭이 불확실하면 정지 후 다점 회전 또는 다른 경로를 검토하는 기준을 마련한다."
        ]
      },
      "limits": "저속 좌회전과 접촉 모서리는 확인되지만 회차 반경·벽 돌출량·제어 오차가 없어 구체적인 실패 지점을 단정할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "barrier",
        "targetLabel": "차고 벽 모서리",
        "relation": "unknown",
        "stages": [
          "회차 진입로 진입",
          "저속 좌회전",
          "오른쪽 앞 모서리 접촉"
        ],
        "caption": "회차형 진입로 좌회전 중 오른쪽 앞 모서리가 차고 벽에 접촉",
        "geometryUnknown": [
          "회차 공간 폭·반경",
          "벽 모서리와 차체 간격"
        ],
        "evidence": [
          "The Waymo AV was making a left turn around a cul-de-sac-style driveway at a low rate of speed when the front passenger side corner of the Waymo AV made contact with the corner of a garage stucco wall."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4404:2469f174:4009314c",
      "reportedRemediations": []
    },
    {
      "id": "30270-8483",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was stopped in an unpaved parking area alongside southbound [XXX] for a passenger pickup.",
        "the front passenger side tire drove over a small object embedded in the ground (which appears to be a metal base for a road sign that is no longer present)."
      ],
      "facts": [
        "남향 도로 옆 비포장 주차 공간에서 승객을 태운 뒤 도로 쪽으로 전진했다.",
        "오른쪽 앞 타이어가 땅에 박힌 작은 물체를 밟았고 펑크가 났다. 보고자는 사라진 도로표지의 금속 받침으로 보인다고 설명했다.",
        "ADS 작동 중이며 원시 사전 속도는 6 mph다."
      ],
      "vehicleHypotheses": [
        "흙에 박힌 낮은 물체를 타이어 손상 위험으로 분류했는가?",
        "승차 후 출발 경로에서 오른쪽 앞 바퀴가 밟는 영역을 검증했는가?"
      ],
      "environmentHypotheses": [
        "금속으로 추정되는 물체의 돌출 높이·날카로운 면·위치와 잔존 경위는 무엇인가? 물체 정체와 관리 책임은 미확인이다."
      ],
      "dataNeeded": [
        {
          "question": "타이어가 밟은 물체의 실제 형상은 무엇인가?",
          "material": "현장 물체 회수·치수·돌출 높이 사진, 토양 상태와 우전륜 궤적"
        },
        {
          "question": "작은 물체를 어떻게 인지·통과 판단했는가?",
          "material": "하향·근거리 센서 자료, 지면·장애물 분류, 출발 경로·조향 로그"
        },
        {
          "question": "타이어 손상과 물체 형상이 일치하는가?",
          "material": "타이어 관통·절상 검사, 공기압·휠 속도 시간열, 접촉 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "비포장 승차 지점에서 낮은 금속 돌출물과 바퀴 통과 영역의 충돌 검사를 검증한다."
        ],
        "environment": [
          "해당 지점의 매립 돌출물 정체를 확인하고 제거·표시 필요성을 검토한다."
        ],
        "operation": [
          "비포장 승하차 지점의 적합성 점검과 펑크 후 이동 중단 기준을 보완한다."
        ]
      },
      "limits": "금속 표지 받침이라는 설명은 추정이며 돌출 높이·센서 가시성·손상 형상이 없어 인지와 통과성 판단의 기여를 구분할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "땅에 박힌 작은 물체",
        "relation": "under",
        "stages": [
          "비포장 공간 승객 탑승",
          "도로 쪽 전진",
          "우전륜 물체 통과·펑크"
        ],
        "caption": "비포장 승차 지점 출발 중 땅에 박힌 물체를 우전륜이 밟음",
        "geometryUnknown": [
          "물체 높이·날카로운 면",
          "출발 경로와 우전륜 궤적"
        ],
        "evidence": [
          "The Waymo AV was stopped in an unpaved parking area alongside southbound [XXX] for a passenger pickup."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4803:805a4080:ed6dfdaa",
      "reportedRemediations": []
    },
    {
      "id": "30270-8356",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was entering a parking lot on [XXX] between [XXX] and [XXX] when the front right sensor made contact with a fence."
      ],
      "facts": [
        "차량이 주차장으로 들어가던 중 오른쪽 앞 센서가 펜스에 접촉했다.",
        "ADS 작동 상태에서 차량 손상이 보고됐으며 원시 사전 속도는 1 mph, 기동은 직진으로 기록됐다."
      ],
      "vehicleHypotheses": [
        "차량 본체 외에 오른쪽 앞 센서의 돌출 범위를 통과 여유에 포함했는가?",
        "펜스의 가는 구조와 센서 높이에서의 실제 경계를 정확히 추정했는가?"
      ],
      "environmentHypotheses": [
        "주차장 입구의 폭과 펜스 기울기·돌출부가 어느 높이에서 통과 공간을 제한했는가?"
      ],
      "dataNeeded": [
        {
          "question": "센서와 펜스의 겹침은 어느 높이에서 발생했는가?",
          "material": "센서 장착 외곽·높이, 입구와 펜스 3차원 측량, 차량 궤적"
        },
        {
          "question": "시스템 외곽 모델에 센서 돌출부가 반영됐는가?",
          "material": "차량 충돌 형상 모델, 펜스 인지·위치 추정·경로 검사 로그"
        },
        {
          "question": "1 mph 접근 중 정지 판단은 어떠했는가?",
          "material": "근거리 센서 영상, 속도·조향·제동 로그, 접촉 경보 시각"
        }
      ],
      "improvements": {
        "vehicle": [
          "주차장 진입 충돌 검사에 센서 돌출부와 펜스의 높이별 외곽을 포함해 재현한다."
        ],
        "environment": [
          "입구 폭·펜스 돌출·야간 가시성을 확인해 통과 여유와 표시를 검토한다."
        ],
        "operation": [
          "센서 접촉 뒤 교정·기능 확인을 마치기 전 운행 재개 기준을 점검한다."
        ]
      },
      "limits": "접촉 부품은 특정됐지만 펜스 위치·센서 돌출량·진입각이 없으므로 본체 기준 경로 오류 또는 센서 인지 누락을 확정할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "barrier",
        "targetLabel": "주차장 펜스",
        "relation": "unknown",
        "stages": [
          "주차장 접근",
          "입구 진입",
          "오른쪽 앞 센서 접촉"
        ],
        "caption": "주차장 진입 중 오른쪽 앞 센서가 펜스에 접촉",
        "geometryUnknown": [
          "입구 폭·펜스 위치",
          "센서 돌출량·접촉 높이"
        ],
        "evidence": [
          "The Waymo AV was entering a parking lot on [XXX] between [XXX] and [XXX] when the front right sensor made contact with a fence."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4267:4625b77:97802735",
      "reportedRemediations": []
    },
    {
      "id": "30270-8156",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was maneuvering out of a curbside parallel parking space on the south side of [XXX] when the passenger side front corner of the Waymo AV made contact with the driver side back corner of an SUV parked in front of the AV."
      ],
      "facts": [
        "도로 남쪽 연석의 평행주차 공간에서 빠져나오는 기동을 하고 있었다.",
        "오른쪽 앞 모서리가 앞에 주차된 SUV의 운전석 쪽 뒤 모서리에 접촉해 두 차량이 손상됐다.",
        "ADS 작동 중이며 원시 사전 속도는 2 mph, 조명 없는 야간이다."
      ],
      "vehicleHypotheses": [
        "출차 시 앞 SUV의 뒤 모서리와 자율차 앞 모서리의 회전 여유를 어떻게 계산했는가?",
        "어두운 조건에서 SUV 외곽·초기 차간 간격의 추정 오차가 있었는가?"
      ],
      "environmentHypotheses": [
        "평행주차 공간의 앞뒤 여유와 SUV의 주차 자세가 출차 공간을 얼마나 제한했는가?"
      ],
      "dataNeeded": [
        {
          "question": "두 모서리의 상대 궤적은 어떠했는가?",
          "material": "초기 주차 간격·차량 자세, SUV 치수, 출차 영상과 자율차 궤적"
        },
        {
          "question": "SUV 뒤 모서리 위치를 정확히 추정했는가?",
          "material": "야간 근거리 센서 자료, 물체 외곽·위치 불확실성·경로 검사 로그"
        },
        {
          "question": "기동 전환이나 정지 여유가 있었는가?",
          "material": "기어·속도·조향·제동 시간열, 출차 후보 경로와 뒤쪽 가용 공간"
        }
      ],
      "improvements": {
        "vehicle": [
          "평행주차 출차에서 앞 모서리 회전과 앞 차량 뒤 모서리의 최소 간격을 검증한다."
        ],
        "environment": [
          "승하차·주차 위치 선택 시 앞뒤 출차 여유를 확인할 수 있는 현장 기준을 검토한다."
        ],
        "operation": [
          "앞차 간격이 불확실한 출차는 정지 후 추가 관측·경로 재계산 기준을 적용할지 점검한다."
        ]
      },
      "limits": "출차 기동의 전후진·조향 순서와 최초 간격이 공개되지 않아 특정 방향의 회전 또는 주차 차량의 잘못을 추정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "unknown",
        "targetKind": "vehicle",
        "targetLabel": "앞에 주차된 SUV",
        "relation": "ahead",
        "stages": [
          "평행주차 상태",
          "주차 공간 출차",
          "앞 SUV 뒤 모서리 접촉"
        ],
        "caption": "평행주차 출차 중 앞 SUV의 뒤 모서리에 오른쪽 앞부분 접촉",
        "geometryUnknown": [
          "초기 앞뒤 간격",
          "전후진·조향 순서"
        ],
        "evidence": [
          "The Waymo AV was maneuvering out of a curbside parallel parking space on the south side of [XXX] when the passenger side front corner of the Waymo AV made contact with the driver side back corner of an SUV parked in front of the AV."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4356:be80c09f:f806de7b",
      "reportedRemediations": []
    },
    {
      "id": "30270-8145",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was turning left to exit a driveway at [XXX] when the front of the Waymo AV made contact with a gate reader box on the right side of the driveway."
      ],
      "facts": [
        "진입로에서 나가기 위해 좌회전하던 차량이 진입로 오른쪽 게이트 리더 박스에 전면 접촉했다.",
        "ADS 작동 중 차량과 리더 박스가 손상됐고 원시 사전 속도는 2 mph다."
      ],
      "vehicleHypotheses": [
        "좌회전 시작 위치와 차량 전면 회전 궤적을 오른쪽 박스의 돌출 범위와 비교했는가?",
        "리더 박스 본체·지지부를 지도 또는 센서 외곽 모델에 반영했는가?"
      ],
      "environmentHypotheses": [
        "출구 폭과 오른쪽 리더 박스의 배치·돌출 높이가 회전 공간을 얼마나 줄였는가?"
      ],
      "dataNeeded": [
        {
          "question": "좌회전 전면이 오른쪽 박스에 닿은 배치는 무엇인가?",
          "material": "진입로·박스 3차원 측량, 차량 초기 자세·전면 궤적·접촉 흔적"
        },
        {
          "question": "박스가 충돌 검사에 포함됐는가?",
          "material": "센서 원시자료, 박스 외곽·지도·차량 형상 모델, 경로 후보 로그"
        },
        {
          "question": "기동 시작점이나 정지 시점을 바꿀 여유가 있었는가?",
          "material": "조향·속도·제동 로그, 출구 가용 공간 및 주변 차량 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "좌회전 출차에서 반대쪽 고정물과 전면 외곽의 간격을 실제 박스 형상으로 검증한다."
        ],
        "environment": [
          "게이트 리더 박스의 출구 침범 범위·가시성·보호 표시 필요성을 확인한다."
        ],
        "operation": [
          "게이트 장비가 있는 출구의 출발 위치·회전 가능 공간을 경로 검증에 포함한다."
        ]
      },
      "limits": "박스가 오른쪽에 있다는 사실은 명시됐지만 박스 높이·차량 접근각·궤적이 없어 기동 계획과 인지 중 원인을 구분할 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "게이트 리더 박스",
        "relation": "right",
        "stages": [
          "진입로 출차 시작",
          "좌회전",
          "오른쪽 리더 박스 접촉"
        ],
        "caption": "진입로 좌회전 출차 중 오른쪽 게이트 리더 박스에 전면 접촉",
        "geometryUnknown": [
          "출구 폭·박스 돌출량",
          "출차 시작 자세·회전 궤적"
        ],
        "evidence": [
          "The Waymo AV was turning left to exit a driveway at [XXX] when the front of the Waymo AV made contact with a gate reader box on the right side of the driveway."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4288:4dc2c732:9146eb34",
      "reportedRemediations": []
    },
    {
      "id": "30270-7794",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was traveling north towards [XXX] down an alleyway east of [XXX] when the front of the Waymo AV made contact with a utility pole on the right side of the alleyway."
      ],
      "facts": [
        "차량이 골목길에서 북쪽으로 이동하던 중 오른쪽 전신주에 전면 접촉했다.",
        "ADS 작동 중 차량 손상이 보고됐고 원시 사전 속도는 8 mph다.",
        "원시 기동 항목은 주차 기동으로 분류되어 있으나 원문은 북향 골목길 이동을 설명한다."
      ],
      "vehicleHypotheses": [
        "오른쪽 전신주와 차량 전면의 통과 여유를 어떻게 계산했는가?",
        "골목길 주행·주차 기동 전환 과정에서 위치 추정이나 경로 폭 계산에 오차가 있었는가?"
      ],
      "environmentHypotheses": [
        "골목의 가용 폭·전신주 돌출 위치·다른 장애물 배치는 어떠했는가?"
      ],
      "dataNeeded": [
        {
          "question": "전신주와 전면의 상대 궤적은 무엇인가?",
          "material": "골목 폭·전신주 직경·위치 측량, 차량 시간별 위치·접촉점 영상"
        },
        {
          "question": "전신주를 어떤 위치와 크기로 인지했는가?",
          "material": "센서 원시자료, 기둥 외곽·위치 추정·경로 충돌 검사 로그"
        },
        {
          "question": "실제 기동은 직진 이동인가 주차 전환인가?",
          "material": "기어·조향·속도·제동·주차 상태 로그, 계획 경로와 전체 접근 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "좁은 골목의 기둥을 포함한 차량 전면 통과 여유와 실제 경로 추종 오차를 재현 평가한다."
        ],
        "environment": [
          "전신주의 통행 공간 침범 범위와 가시성·현장 보호 표시를 확인한다."
        ],
        "operation": [
          "골목 주차 경로 검증에 기둥 위치와 정지·재계획 기준을 포함한다."
        ]
      },
      "limits": "북향 이동과 오른쪽 전신주 접촉은 확인되나 직진·주차 전환의 세부 조향과 가용 폭이 없어 실제 경로를 확정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "unknown",
        "targetKind": "object",
        "targetLabel": "골목 오른쪽 전신주",
        "relation": "right",
        "stages": [
          "골목 북향 이동",
          "오른쪽 전신주 접근",
          "차량 전면 접촉"
        ],
        "caption": "북향 골목길 이동 중 오른쪽 전신주에 차량 전면 접촉",
        "geometryUnknown": [
          "골목 폭·전신주 위치",
          "주차 기동과 주행 궤적"
        ],
        "evidence": [
          "The Waymo AV was traveling north towards [XXX] down an alleyway east of [XXX] when the front of the Waymo AV made contact with a utility pole on the right side of the alleyway."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4356:11df761a:c6be13f4",
      "reportedRemediations": []
    },
    {
      "id": "30270-7534",
      "narrativeVersion": "1",
      "evidence": [
        "While making a tight left turn from southbound [XXX] onto northeastbound [XXX], the Waymo AV made contact with the driver side of a parked passenger car.",
        "At the time of the impact, the Waymo AVs Level 4 ADS was engaged in autonomous mode, and a test driver was present"
      ],
      "facts": [
        "Waymo 차량이 남향 도로에서 북동향 도로로 좁은 반경의 좌회전을 하던 중 주차 승용차의 운전석 쪽에 접촉했다.",
        "원시자료의 사고 전 속도는 2 mph이며, 접촉 당시 ADS가 작동하고 시험 운전자가 탑승해 있었다. 양 차량 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "좁은 반경의 좌회전의 회전 반경과 차체 전체 외곽 궤적에 주차차량 외곽이 충분히 반영됐는가?",
        "시험 운전자에게 간격 부족을 알릴 정보와 개입 시간이 있었는가?"
      ],
      "environmentHypotheses": [
        "주차차량 위치와 교차로 모서리 형상이 좌회전 통과 폭을 얼마나 제한했는가? 주차 위반이나 관리 과실은 원문으로 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "좌회전 중 어느 차체 부분의 궤적이 주차차량과 겹쳤는가?",
          "material": "교차로 및 주차차량 실측 좌표, 차량 폭·돌출부 치수, 조향각과 시간별 차량 자세"
        },
        {
          "question": "계획 경로의 예상 간격과 실제 간격이 언제 달라졌는가?",
          "material": "주차차량 인지 외곽, 예측 궤적, 계획 경로 및 경로 추종 오차 로그"
        },
        {
          "question": "저속 접근 중 제동 또는 운전자 개입 기회가 있었는가?",
          "material": "동기화 영상, 실제 속도·제동 명령, 경고 및 운전자 입력 시각"
        }
      ],
      "improvements": {
        "vehicle": [
          "좁은 반경의 좌회전에서 차체 전체 외곽과 주차차량의 최소 간격을 검증하고 간격 불확실 시 정지 조건을 시험한다."
        ],
        "environment": [
          "해당 교차로의 주차 위치와 회전 통과 폭을 실측해 주차 구획·시인성 보완 필요성을 검토한다."
        ],
        "operation": [
          "시험 운전자에게 좁은 좌회전 구간의 관찰·개입 기준을 적용한다."
        ]
      },
      "limits": "좁은 반경의 좌회전과 접촉은 보고됐지만 주차차량의 정확한 위치, 회전 반경, ADS 판단 및 운전자 개입 가능 시간은 공개되지 않았다.",
      "scene": {
        "setting": "intersection",
        "motion": "left",
        "targetKind": "vehicle",
        "targetLabel": "주차 승용차",
        "relation": "unknown",
        "stages": [
          "남향 접근",
          "좁은 반경의 좌회전",
          "주차차량 측면 접촉"
        ],
        "caption": "좁은 반경의 좌회전 중 주차 승용차의 운전석 쪽에 접촉",
        "geometryUnknown": [
          "주차차량의 교차로 내 위치",
          "실제 회전 반경",
          "접촉 직전 측면 간격"
        ],
        "evidence": [
          "While making a tight left turn from southbound [XXX] onto northeastbound [XXX], the Waymo AV made contact with the driver side of a parked passenger car."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4386:55aa080:85931e4c",
      "reportedRemediations": []
    },
    {
      "id": "30410-7276",
      "narrativeVersion": "2",
      "evidence": [
        "While moving from the right-most two turn lanes to the left-most turn lane, the front left wheel made contact with a median curb.",
        "The safety driver took control of the vehicle and brought it off the curb."
      ],
      "facts": [
        "Motional 차량이 ADS로 교차로에 접근하며 오른쪽 회전 차로 쪽에서 가장 왼쪽 회전 차로로 이동하던 중 좌전륜이 중앙분리대 연석에 접촉했다.",
        "사고 전 속도는 원시자료에 15 mph로 기재됐으며, 안전운전자가 제어를 넘겨받아 연석에서 내려왔다. 타이어의 가벼운 긁힘이 보고됐고 차량은 주행 가능했다."
      ],
      "vehicleHypotheses": [
        "좌측 차로 이동 계획이 중앙분리대 연석과 좌전륜의 실제 통과 궤적을 충분히 구분했는가?",
        "연석 접근 때 경로 추종 오차나 조향 명령 변화가 있었는가?"
      ],
      "environmentHypotheses": [
        "교차로 접근부의 차로 경계와 중앙분리대 시작 형상이 이동 가능한 공간을 어떻게 제한했는가?"
      ],
      "dataNeeded": [
        {
          "question": "차로 이동 경로와 중앙분리대 사이 실제 여유는 얼마였는가?",
          "material": "차로 경계·중앙분리대 실측, 차량 위치 궤적, 좌전륜 위치와 조향각"
        },
        {
          "question": "연석이 인지·지도·계획 경로에 언제 반영됐는가?",
          "material": "인지 경계, 지도 차로 모델, 경로 후보·선택 및 추종 오차 로그"
        },
        {
          "question": "운전자 인수 전후 차량 움직임과 손상은 어떻게 달라졌는가?",
          "material": "인수 시각, 운전자 조향·제동 입력, 차량 영상, 타이어 점검 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "중앙분리대가 있는 접근부에서 차로 이동 시 좌전륜 궤적과 연석 여유를 재현 시험한다."
        ],
        "environment": [
          "현장 차로 표시와 중앙분리대 선단의 식별 가능성을 점검한다."
        ],
        "operation": [
          "교차로 직전 여러 회전 차로를 이동하는 시험 구간의 운전자 감시·인수 기준을 검토한다."
        ]
      },
      "limits": "차로 이동과 좌전륜 접촉 순서는 확인되지만 가려진 지점 정보, 이동 거리, 연석 형상과 ADS 경로 선택 이유는 알 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "left",
        "targetKind": "curb",
        "targetLabel": "중앙분리대 연석",
        "relation": "left",
        "stages": [
          "교차로 접근",
          "좌측 차로 이동",
          "좌전륜 연석 접촉"
        ],
        "caption": "교차로 접근 중 좌측 차로 이동하다 중앙분리대 연석 접촉",
        "geometryUnknown": [
          "차로 이동의 시작·종료 위치",
          "중앙분리대 선단 형상",
          "좌전륜과 연석 사이 간격"
        ],
        "evidence": [
          "While moving from the right-most two turn lanes to the left-most turn lane, the front left wheel made contact with a median curb."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4140:25da4a21:44c8c8eb",
      "reportedRemediations": []
    },
    {
      "id": "30412-6395",
      "narrativeVersion": "4",
      "evidence": [
        "Shortly thereafter, the Nissan Sentra made contact with the pedestrian, deflecting the pedestrian in front of the AV.",
        "The AV braked aggressively but, shortly thereafter, made contact with the pedestrian.",
        "The AV then attempted to pull over out of traffic, pulling the individual forward, rather than remaining stationary."
      ],
      "facts": [
        "신호가 녹색으로 바뀐 뒤 AV와 좌측 Nissan이 진행했다. 원문은 보행자가 AV 차로를 통과한 뒤 Nissan 앞에 멈췄고, Nissan과 먼저 충돌해 AV 앞으로 이동했다고 보고한다.",
        "AV는 강하게 제동했으나 보행자와 접촉한 뒤 교통 흐름 밖으로 이동하려 하면서 보행자를 앞으로 끌었다. 보행자는 응급의료서비스로 이송됐다.",
        "Cruise는 충돌 후 AV 대응에 관해 2023년 11월 2일 자발적 리콜 보고서를 제출했다고 명시한다."
      ],
      "vehicleHypotheses": [
        "선행 차량 충돌 직후 보행자의 이동을 AV가 언제 추적했고 당시 정지 가능 거리는 얼마였는가?",
        "첫 접촉 후 보행자의 차량 주변·하부 존재와 후속 이동 위험을 어떤 상태로 판단했는가?"
      ],
      "environmentHypotheses": [
        "횡단보도·차로 배치와 Nissan의 가림이 보행자의 선행 충돌 및 이동을 관찰할 수 있는 시간에 어떤 영향을 줬는가?"
      ],
      "dataNeeded": [
        {
          "question": "선행 충돌부터 AV 접촉까지 보행자와 두 차량의 상대 위치는 어떠했는가?",
          "material": "동기화 외부 영상, 횡단보도 실측, 두 차량 궤적 및 보행자 이동 재구성"
        },
        {
          "question": "강한 제동의 개시 시점과 실제 감속은 충분히 확인되는가?",
          "material": "보행자 추적·예측 로그, 제동 명령·실제 감속, 접촉 감지 시각"
        },
        {
          "question": "충돌 후 정차 유지 대신 이동이 선택된 이유는 무엇인가?",
          "material": "충돌 분류와 후속 대응 상태 전이 로그, 차량 하부·주변 점유 판단, 당국 충돌 보고서 및 리콜 분석"
        }
      ],
      "improvements": {
        "vehicle": [
          "충돌 후 사람의 위치가 불확실할 때 정차 유지와 후속 이동 억제 조건을 재현 검증한다.",
          "다른 차량에 먼저 충돌한 보행자의 갑작스러운 경로 변화에 대한 추적·제동 대응을 시험한다."
        ],
        "environment": [
          "현장 가림과 횡단보도 접근 시야를 재구성해 관찰 조건 개선 가능성을 평가한다."
        ],
        "operation": [
          "충돌 후 사람 관련 상황을 확인하고 구조기관과 연계하는 정차·현장 보존 절차를 점검한다."
        ]
      },
      "limits": "선행 충돌, AV 접촉, 후속 끌림은 구분해 보고됐지만 각 단계의 부상 기여, 거리와 시간은 원문만으로 확정할 수 없다.",
      "scene": {
        "setting": "intersection",
        "motion": "straight",
        "targetKind": "pedestrian",
        "targetLabel": "보행자",
        "relation": "ahead",
        "stages": [
          "Nissan·보행자 선행 충돌",
          "AV 제동 후 접촉",
          "후속 이동 중 끌림"
        ],
        "caption": "선행 차량 충돌 뒤 보행자와 접촉하고 후속 이동 중 끌림",
        "geometryUnknown": [
          "보행자의 선행 충돌 후 이동 궤적",
          "AV 첫 접촉 위치",
          "후속 이동 거리"
        ],
        "evidence": [
          "A dark colored Nissan Sentra was also stopped in the adjacent lane to the left of the AV.",
          "Shortly thereafter, the Nissan Sentra made contact with the pedestrian, deflecting the pedestrian in front of the AV."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "6349:498cce7e:29ca73a6",
      "reportedRemediations": [
        {
          "summaryKo": "사고 후 ADS 대응에 관한 자발적 리콜 보고가 제출됐다고 기재했다.",
          "evidence": [
            "Cruise submitted a voluntary recall report to NHTSA relating to the AVs response after the collision"
          ]
        }
      ]
    },
    {
      "id": "30412-6597",
      "narrativeVersion": "1",
      "evidence": [
        "A Buick Verano traveling southbound on[XXX] in the adjacent lane began to pass the AV before veering into the AV's lane of travel and abruptly braking.",
        "After passing the intersection with [XXX], the Buick Verano abruptly braked for the sixth time. The AV braked in response but made contact with the rear of the Buick Verano."
      ],
      "facts": [
        "Buick이 인접 차로에서 AV를 지나 AV 차로로 들어온 뒤 급제동했고, 이후 전진과 급제동을 반복했다. AV는 매번 제동했다고 보고됐다.",
        "교차로 통과 후 여섯 번째 급제동에 AV가 반응했으나 Buick 후면과 접촉했다. 원시 사고 전 속도는 5 mph이며 AV 손상·부상은 보고되지 않았고 상대 운전자는 나중에 손상을 보고했다."
      ],
      "vehicleHypotheses": [
        "반복 급제동을 관찰한 뒤 AV가 추종 간격·재출발·경로 선택을 어떻게 조정했는가?",
        "여섯 번째 제동에서 인지·예측·제동 지연과 잔여 간격 중 무엇이 접촉에 기여했는가?"
      ],
      "environmentHypotheses": [
        "반복 제동 구간에서 대기하거나 다른 경로를 선택할 공간과 교통 여건이 있었는가? 상대 행동의 의도는 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "각 급제동 전후 두 차량의 간격과 상대 속도는 어떠했는가?",
          "material": "전체 여섯 차례의 동기화 영상, 두 차량 궤적·속도 및 차간거리 시계열"
        },
        {
          "question": "반복 상황이 추종 정책에 반영됐는가?",
          "material": "상대차 예측, 목표 차간거리, 재출발 판단 및 경로 대안 로그"
        },
        {
          "question": "마지막 급제동에서 실제 제동 반응은 언제 시작됐는가?",
          "material": "감속 인지 시각, 제동 명령·유압·실제 감속, 타이어·노면 상태"
        }
      ],
      "improvements": {
        "vehicle": [
          "반복되는 선행차 급제동에서 재출발 간격과 보수적 추종 전환 조건을 검증한다."
        ],
        "environment": [
          "해당 구간의 안전 대기·우회 가능 지점과 시야 조건을 확인한다."
        ],
        "operation": [
          "비정상적인 반복 주행 상호작용에 대한 운행 지원·안전 정지 기준을 점검한다."
        ]
      },
      "limits": "여섯 번의 급제동과 AV 대응은 보고됐지만 각 간격·감속률이 없고 상대 운전자의 의도나 마지막 접촉 회피 가능성은 확정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "vehicle",
        "targetLabel": "선행 Buick",
        "relation": "ahead",
        "stages": [
          "인접 차로에서 진입",
          "급제동 반복",
          "여섯 번째 제동 후 접촉"
        ],
        "caption": "진입한 Buick의 반복 급제동 뒤 여섯 번째 제동에서 후면 접촉",
        "geometryUnknown": [
          "차로 진입 직후 차간거리",
          "각 제동 사이 이동 거리",
          "마지막 제동 직전 간격"
        ],
        "evidence": [
          "After passing the intersection with [XXX], the Buick Verano abruptly braked for the sixth time. The AV braked in response but made contact with the rear of the Buick Verano."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4800:53f9ee16:9e236cbe",
      "reportedRemediations": []
    },
    {
      "id": "30412-6439",
      "narrativeVersion": "2",
      "evidence": [
        "was traveling northbound on [XXX] between [XXX] and [XXX] when the AV made contact with a small animal located in the middle of the AV's driving lane.",
        "This caused no damage to the AV."
      ],
      "facts": [
        "무인 자율모드로 북향 주행하던 Cruise AV가 주행 차로 가운데 있던 작은 동물과 접촉했다.",
        "원시자료의 사고 전 속도는 15 mph이고 하부 접촉이 표시돼 있다. AV 손상은 없었다고 보고됐으며 동물의 상태는 서술되지 않았다."
      ],
      "vehicleHypotheses": [
        "작은 동물을 처음 관찰할 수 있었던 시점과 실제 인지·제동 시점은 언제였는가?",
        "동물의 크기·움직임에 관한 불확실성이 통과 또는 정지 판단에 어떻게 반영됐는가?"
      ],
      "environmentHypotheses": [
        "야간 조명, 동물과 노면의 대비 또는 주변 가림이 가시 거리를 제한했는가? 동물이 언제 차로에 들어왔는지는 미확인이다."
      ],
      "dataNeeded": [
        {
          "question": "동물은 언제 어느 위치에서 AV 진행 경로에 놓였는가?",
          "material": "접촉 전 영상, 동물 위치·움직임 추적, 차량 궤적과 접촉 지점"
        },
        {
          "question": "동물이 시스템에서 어떻게 검출·분류됐는가?",
          "material": "원시 센서 자료, 객체 후보·분류 신뢰도, 점유 및 예측 로그"
        },
        {
          "question": "발견 가능한 거리에서 정지 또는 경로 변경 여지가 있었는가?",
          "material": "속도·제동 시계열, 계획 경로, 인접 공간·조도 측정"
        }
      ],
      "improvements": {
        "vehicle": [
          "야간 차로 중앙의 작은 동물에 대한 검출·점유·제동 연결을 크기와 움직임별로 시험한다."
        ],
        "environment": [
          "현장 조명과 동물 유입 경로를 확인해 적용 가능한 시야·진입 억제 대책을 검토한다."
        ],
        "operation": [
          "동물 접촉 뒤 차량 점검과 현장 확인에 필요한 기록 보존 절차를 적용한다."
        ]
      },
      "limits": "동물의 종류·크기·진입 시각 및 결과가 없으므로 센서 실패나 동물 피해 정도를 단정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "animal",
        "targetLabel": "작은 동물",
        "relation": "ahead",
        "stages": [
          "북향 주행",
          "차로 중앙의 동물",
          "동물 접촉"
        ],
        "caption": "북향 주행 중 차로 가운데 있던 작은 동물과 접촉",
        "geometryUnknown": [
          "동물의 크기와 자세",
          "최초 관찰 거리",
          "동물의 진입·이동 경로"
        ],
        "evidence": [
          "was traveling northbound on [XXX] between [XXX] and [XXX] when the AV made contact with a small animal located in the middle of the AV's driving lane."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "3686:914843a5:cc67e3d3",
      "reportedRemediations": []
    },
    {
      "id": "30412-6191",
      "narrativeVersion": "1",
      "evidence": [
        "As the AV was proceeding on [XXX], the AV made contact with an unoccupied red Honda that was parked on [XXX], damaging the front driver side bumper fascia of the AV.",
        "There were no injuries and the Cruise AV was towed from the incident."
      ],
      "facts": [
        "Cruise AV가 무인 자율모드로 동향 진행 중 사람이 타지 않은 주차 Honda와 접촉했다.",
        "사고 전 속도는 원시자료에 5 mph로 기재됐고 AV의 운전석 쪽 앞 범퍼 외장이 손상됐다. 부상은 없었고 AV는 견인됐다."
      ],
      "vehicleHypotheses": [
        "주차 Honda의 외곽과 AV 좌전방 외곽 사이의 간격이 경로 계획·추종 단계에서 어떻게 평가됐는가?",
        "접촉 전에 정차 판단을 할 만큼 주차차량 위치가 안정적으로 추정됐는가?"
      ],
      "environmentHypotheses": [
        "주차 위치와 남은 통행 폭, 야간 조명이 상대차 외곽 판단에 어떤 영향을 줬는가? 도로상 좌우 배치는 원문에 없다."
      ],
      "dataNeeded": [
        {
          "question": "주차차량과 AV의 실제 상대 배치는 어떠했는가?",
          "material": "현장 사진·도로 실측, Honda 자세와 외곽, AV 위치·조향 궤적"
        },
        {
          "question": "예상 통과 간격이 실제보다 크게 계산됐는가?",
          "material": "객체 외곽·위치 신뢰도, 계획 경로, 차량 외곽 모델과 경로 추종 오차"
        },
        {
          "question": "저속 접근 중 정지 명령 또는 제동이 있었는가?",
          "material": "접촉 전 영상, 속도·제동·접촉 감지 로그 및 범퍼 손상 사진"
        }
      ],
      "improvements": {
        "vehicle": [
          "저속 직진 통과 시 주차차량 외곽과 좌전방 차체의 불확실성을 포함한 간격 검증을 수행한다."
        ],
        "environment": [
          "사고 지점의 실제 주차 간격·통행 폭과 야간 식별 조건을 확인한다."
        ],
        "operation": [
          "주차차량 외곽이 불확실한 좁은 구간에서 대기·지원 요청 조건을 점검한다."
        ]
      },
      "limits": "진행 중 주차차량 접촉은 확인되지만 주차차량의 도로상 좌우, 남은 폭, 접촉 전 조향 여부는 공개되지 않았다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "vehicle",
        "targetLabel": "주차 Honda",
        "relation": "unknown",
        "stages": [
          "동향 진행",
          "주차 Honda 접근",
          "앞 범퍼 접촉"
        ],
        "caption": "동향 진행 중 주차 Honda와 접촉해 좌전방 범퍼 손상",
        "geometryUnknown": [
          "주차차량의 도로상 좌우 위치",
          "통행 가능 폭",
          "접촉 직전 차량 간격"
        ],
        "evidence": [
          "As the AV was proceeding on [XXX], the AV made contact with an unoccupied red Honda that was parked on [XXX], damaging the front driver side bumper fascia of the AV."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4049:e8cfd6a7:4b6a4833",
      "reportedRemediations": []
    },
    {
      "id": "30270-6133",
      "narrativeVersion": "1",
      "evidence": [
        "stopped to the left of the right turn slip lane on [XXX], with stopped traffic to the right.",
        "the Waymo AV started reversing to reroute and while doing so, a sensor on the right front of the Waymo AV made contact with the left rear side of an SUV in the right turn lane."
      ],
      "facts": [
        "Waymo AV는 동향 교통에 좌측으로 합류하려고 우회전 분리 차로의 왼쪽에 정차해 기다렸고, 오른쪽 차로에도 차량이 정차해 있었다.",
        "경로를 바꾸기 위해 후진을 시작하던 중 우전방 센서가 오른쪽 우회전 차로 SUV의 좌후면에 접촉했다. 원시 속도는 0 mph로 기재됐으나 경위에는 후진 시작이 명시된다."
      ],
      "vehicleHypotheses": [
        "후진 중 우전방 센서 돌출부의 이동 궤적과 옆 차로 SUV 사이 간격이 모델에 반영됐는가?",
        "정차 대기에서 후진으로 전환할 때 주변차량 점유 정보를 갱신했는가?"
      ],
      "environmentHypotheses": [
        "우회전 분리 차로와 합류 대기 위치의 배치가 후진 재경로에 필요한 측면 여유를 얼마나 남겼는가?"
      ],
      "dataNeeded": [
        {
          "question": "후진할 때 우전방 센서가 SUV 쪽으로 얼마나 이동했는가?",
          "material": "센서 돌출 치수, AV 조향·자세 궤적, SUV 정차 위치와 차로 경계 실측"
        },
        {
          "question": "SUV와 센서 돌출부가 계획 충돌 검사의 외곽에 포함됐는가?",
          "material": "차량 외곽 모델, SUV 인지 외곽, 후진 경로 후보와 최소 간격 로그"
        },
        {
          "question": "속도 0 mph 기록과 후진 서술의 시간 기준은 어떻게 대응하는가?",
          "material": "기어·휠속도·시간별 속도 원시자료, 접촉 시각, 동기화 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "후진 재경로에서 우전방 센서까지 포함한 차체 전체 궤적과 정차 차량 간격을 검증한다."
        ],
        "environment": [
          "해당 합류 대기 위치에서 후진 가능한 여유와 정차차량 배치를 확인한다."
        ],
        "operation": [
          "합류 대기가 길어져 후진으로 전환할 때 주변 공간 재확인과 지원 요청 기준을 점검한다."
        ]
      },
      "limits": "오른쪽 SUV와의 배치는 명확하지만 후진 조향각·이동 거리 및 0 mph 원시값의 측정 시점이 없어 접촉 운동을 완전히 재구성할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "reverse",
        "targetKind": "vehicle",
        "targetLabel": "우회전 차로 SUV",
        "relation": "right",
        "stages": [
          "좌측 합류 대기",
          "재경로 위해 후진",
          "우전방 센서 접촉"
        ],
        "caption": "합류 대기 후 후진하던 AV의 우전방 센서가 오른쪽 SUV에 접촉",
        "geometryUnknown": [
          "두 차량의 초기 측면 간격",
          "후진 조향각",
          "센서 돌출 길이"
        ],
        "evidence": [
          "stopped to the left of the right turn slip lane on [XXX], with stopped traffic to the right.",
          "a sensor on the right front of the Waymo AV made contact with the left rear side of an SUV in the right turn lane."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4673:4a6c8f86:6ecf7ac2",
      "reportedRemediations": []
    },
    {
      "id": "30412-6041",
      "narrativeVersion": "1",
      "evidence": [
        "The AV came to a complete stop for a double-parked semi-trailer truck on southbound [XXX] that was partially blocking the AV's lane of travel.",
        "As the AV began to reverse, the AV made contact with a dumpster bin, damaging the AV's rear passenger side wheel molding."
      ],
      "facts": [
        "북향 주행하던 Cruise AV는 반대방향 쪽 이중 주차 세미트레일러가 AV 차로 일부를 가로막아 완전히 정차했다.",
        "후진을 시작한 뒤 쓰레기 수거함과 접촉해 우후륜 몰딩이 손상됐다. 원시자료의 사고 전 속도는 2 mph이며 부상은 보고되지 않았다."
      ],
      "vehicleHypotheses": [
        "전방 트럭 때문에 정차한 뒤 후진 공간과 수거함의 외곽을 새로 검증했는가?",
        "우후륜 부근의 차체 궤적과 수거함 사이 간격이 후진 계획에 반영됐는가?"
      ],
      "environmentHypotheses": [
        "트럭의 차로 점유와 수거함 위치가 전진·후진에 남긴 공간은 얼마였는가? 각 배치의 적법성이나 관리 책임은 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "정차 위치에서 수거함까지 후진 가능한 공간은 얼마였는가?",
          "material": "트럭·수거함·AV 현장 좌표와 치수, 차량 후진 궤적 및 조향각"
        },
        {
          "question": "전진 중과 후진 전환 시 수거함 인지가 달라졌는가?",
          "material": "후방 센서 원자료, 수거함 객체·점유 로그, 후진 경로 및 충돌 검사 결과"
        },
        {
          "question": "후진 개시부터 접촉까지 정지할 기회가 있었는가?",
          "material": "동기화 영상, 기어·속도·제동 명령, 장애물 경고와 접촉 감지 시각"
        }
      ],
      "improvements": {
        "vehicle": [
          "전방 차단 후 후진 전환 시 후방 점유를 다시 확인하고 우후륜 주변 궤적까지 검사한다."
        ],
        "environment": [
          "이중 주차 트럭과 수거함이 동시에 점유한 구간의 통행·후진 여유를 확인한다."
        ],
        "operation": [
          "전후방 공간이 모두 제한된 상황에서 정차 유지·원격 지원 기준을 점검한다."
        ]
      },
      "limits": "전방 차단 뒤 후진 접촉이라는 순서는 확인되지만 수거함의 정확한 위치·크기와 후방 가림 여부는 알 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "reverse",
        "targetKind": "object",
        "targetLabel": "쓰레기 수거함",
        "relation": "behind",
        "stages": [
          "트럭 때문에 정차",
          "후진 시작",
          "수거함 접촉"
        ],
        "caption": "차로를 가린 트럭 앞에서 정차한 뒤 후진 중 수거함 접촉",
        "geometryUnknown": [
          "수거함의 후방·측면 위치",
          "트럭의 차로 점유 폭",
          "후진 시작 시 여유 거리"
        ],
        "evidence": [
          "As the AV began to reverse, the AV made contact with a dumpster bin, damaging the AV's rear passenger side wheel molding."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4037:6b34ce21:4af7cb29",
      "reportedRemediations": []
    },
    {
      "id": "30412-6037",
      "narrativeVersion": "1",
      "evidence": [
        "The AV made a left turn onto northbound [XXX] and, shortly after completing the turn, made contact with an unoccupied Toyota 4Runner that was parked on [XXX]",
        "damaging the front passenger side bumper fascia and front passenger side wheel molding of the AV."
      ],
      "facts": [
        "동향 주행하던 Cruise AV가 북향 도로로 좌회전을 마친 직후 사람이 타지 않은 주차 Toyota 4Runner와 접촉했다.",
        "사고 전 속도는 원시자료에 6 mph로 기재됐고 AV 우전방 범퍼 외장과 우전륜 몰딩이 손상됐다. 부상은 보고되지 않았다."
      ],
      "vehicleHypotheses": [
        "좌회전 종료 후 직진으로 전환하는 궤적과 주차차량 외곽 사이 간격이 충분히 유지됐는가?",
        "회전 중 가려졌던 주차차량의 외곽이 회전 완료 전에 안정적으로 갱신됐는가?"
      ],
      "environmentHypotheses": [
        "회전 출구와 주차차량 사이 가용 폭·시야는 어떠했는가? 주차차량의 정확한 도로상 위치는 원문에 없다."
      ],
      "dataNeeded": [
        {
          "question": "회전 종료와 접촉 사이 차량의 궤적은 어떠했는가?",
          "material": "교차로 출구·주차차량 좌표, 차량 위치·조향각 시계열, 접촉 전 영상"
        },
        {
          "question": "주차차량 외곽 추정과 계획 경로의 최소 간격은 얼마였는가?",
          "material": "객체 인지 외곽·불확실도, 계획 경로, 차체 외곽 모델과 추종 오차 로그"
        },
        {
          "question": "회전 완료 이후 감속·정지 판단이 있었는가?",
          "material": "실제 속도·제동 명령, 경로 상태 전환 시각, 범퍼·휠 몰딩 손상 사진"
        }
      ],
      "improvements": {
        "vehicle": [
          "좌회전 완료 직후의 직진 전환 구간까지 주차차량 외곽과 우전방 궤적의 여유를 검사한다."
        ],
        "environment": [
          "회전 출구 가까운 주차 위치와 시야·통행 폭을 실측해 개선 필요성을 검토한다."
        ],
        "operation": [
          "회전 출구의 주차차량을 포함한 경로 검증과 불확실 구간 저속 정지 기준을 점검한다."
        ]
      },
      "limits": "접촉은 좌회전을 마친 직후로 보고됐지만 회전 종료 위치, 주차차량의 좌우 위치 및 접촉 전 조향 변화는 미확인이다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "vehicle",
        "targetLabel": "주차 Toyota",
        "relation": "unknown",
        "stages": [
          "동향 접근",
          "북향 좌회전 완료",
          "주차차량 접촉"
        ],
        "caption": "좌회전을 마친 직후 주차 Toyota와 접촉해 우전방 손상",
        "geometryUnknown": [
          "회전 종료점과 접촉점 간 거리",
          "주차차량의 좌우 위치",
          "출구의 가용 통행 폭"
        ],
        "evidence": [
          "The AV made a left turn onto northbound [XXX] and, shortly after completing the turn, made contact with an unoccupied Toyota 4Runner that was parked on [XXX]"
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4173:cdde2515:631dbc79",
      "reportedRemediations": []
    },
    {
      "id": "30412-5782",
      "narrativeVersion": "1",
      "evidence": [
        "The Cruise AV approached a motorized articulating boom lift (\"ABL\"), which was stopped in the Cruise AV's lane of travel.",
        "As the Cruise AV began to maneuver around and to the left of the ABL, the Cruise AV made contact with the arm of the ABL, which was elevated above the roadway."
      ],
      "facts": [
        "동향 주행하던 Cruise AV가 자기 차로에 정차한 굴절식 붐 리프트를 만났고 왼쪽으로 돌아 지나가려 했다.",
        "도로 위로 올라와 있던 리프트 암과 접촉해 지붕 라이다 조립체가 손상됐다. 원시 사고 전 속도는 7 mph이며 부상은 보고되지 않았다."
      ],
      "vehicleHypotheses": [
        "리프트 본체의 우회 여유와 상부 암의 높이·돌출 범위를 별도로 모델링했는가?",
        "지붕 라이다까지 포함한 차량 높이와 좌측 우회 궤적을 3차원 충돌 검사에 반영했는가?"
      ],
      "environmentHypotheses": [
        "리프트 암이 통행 공간 위로 얼마나 돌출했고 운전자·시스템이 확인할 표시나 통제는 있었는가? 관리 과실 여부는 원문으로 알 수 없다."
      ],
      "dataNeeded": [
        {
          "question": "암과 지붕 라이다의 실제 높이·수평 겹침은 얼마였는가?",
          "material": "리프트 자세·암 높이 및 돌출 길이 실측, 라이다 최고점 치수, AV 우회 궤적"
        },
        {
          "question": "암이 객체 모델과 통과 가능 공간에 포함됐는가?",
          "material": "센서 원자료, 리프트 3차원 외곽, 높이 점유 지도 및 경로 충돌 검사 로그"
        },
        {
          "question": "좌측 우회 결정 시 더 낮은 속도나 정지가 검토됐는가?",
          "material": "경로 후보·비용, 속도·제동 로그, 현장 통행·작업 통제 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "상부 구조물이 본체 밖으로 뻗은 작업장비와 지붕 센서 외곽을 함께 반영한 3차원 우회 검증을 수행한다."
        ],
        "environment": [
          "리프트 암의 통행 공간 돌출과 작업구역 표시·통제 범위를 확인한다."
        ],
        "operation": [
          "상부 높이가 불확실한 작업장비 주변에서는 정지·우회 승인 기준을 적용한다."
        ]
      },
      "limits": "상부 암과 지붕 센서 접촉은 명확하지만 암의 정확한 높이·각도, 가림 및 현장 통제 상태는 공개되지 않았다.",
      "scene": {
        "setting": "road",
        "motion": "left",
        "targetKind": "object",
        "targetLabel": "고가 리프트 암",
        "relation": "above",
        "stages": [
          "정차 리프트 접근",
          "왼쪽 우회 시작",
          "상부 암과 지붕 접촉"
        ],
        "caption": "정차 리프트를 왼쪽으로 우회하다 상부 암과 지붕 라이다 접촉",
        "geometryUnknown": [
          "리프트 암 높이·각도",
          "암의 수평 돌출 범위",
          "AV 우회 궤적"
        ],
        "evidence": [
          "As the Cruise AV began to maneuver around and to the left of the ABL, the Cruise AV made contact with the arm of the ABL, which was elevated above the roadway."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4203:7b245541:98fb9e5d",
      "reportedRemediations": []
    },
    {
      "id": "30270-5758",
      "narrativeVersion": "1",
      "evidence": [
        "While traveling west on [XXX}, the Waymo AV was executing a pullover maneuver in autonomous mode and made contact with the left rear bumper of a parked vehicle.",
        "Both vehicles sustained damage."
      ],
      "facts": [
        "서향 주행하던 Waymo AV가 자율모드로 길가에 대는 기동을 하다가 주차차량의 좌후방 범퍼에 접촉했다.",
        "원시자료의 사고 전 속도는 6 mph이고 AV 우전방 접촉이 표시돼 있다. 양 차량 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "길가 정차 위치로 진입할 때 주차차량 좌후방 범퍼와 AV 우전방 외곽의 간격을 어떻게 계산했는가?",
        "선택한 정차 목표 위치나 진입 곡선이 주차차량 외곽 불확실성을 충분히 반영했는가?"
      ],
      "environmentHypotheses": [
        "선택한 정차 공간의 길이·폭과 기존 주차차량 배치가 진입 여유를 얼마나 남겼는가?"
      ],
      "dataNeeded": [
        {
          "question": "정차 기동의 목표점과 주차차량의 상대 위치는 어떠했는가?",
          "material": "주차 공간·차량 실측, 정차 목표점, AV 위치·조향 궤적"
        },
        {
          "question": "좌후방 범퍼가 객체 외곽과 진입 경로에 정확히 반영됐는가?",
          "material": "인지 외곽·불확실도, 정차 경로 후보, 차체 충돌 검사 및 추종 오차 로그"
        },
        {
          "question": "접근 중 간격 감소에 따른 제동이 있었는가?",
          "material": "동기화 영상, 실제 속도·제동 명령, 접촉 부위 사진"
        }
      ],
      "improvements": {
        "vehicle": [
          "길가 정차 진입 시 상대 범퍼 돌출과 AV 우전방 외곽을 포함해 목표 위치·진입 곡선의 여유를 검증한다."
        ],
        "environment": [
          "해당 정차 공간의 유효 길이·폭과 주차차량 배치를 확인한다."
        ],
        "operation": [
          "정차 공간이 충분하지 않거나 외곽 추정이 불확실할 때 다른 정차 위치를 선택하는 기준을 점검한다."
        ]
      },
      "limits": "길가 정차 기동은 확인되지만 조향 방향·정차 목표점·주차차량의 도로상 배치가 없어 좌우 이동을 확정하지 않는다.",
      "scene": {
        "setting": "road",
        "motion": "unknown",
        "targetKind": "vehicle",
        "targetLabel": "주차차량 좌후방 범퍼",
        "relation": "unknown",
        "stages": [
          "서향 주행",
          "길가 정차 기동",
          "주차차량 범퍼 접촉"
        ],
        "caption": "길가 정차 기동 중 주차차량의 좌후방 범퍼에 접촉",
        "geometryUnknown": [
          "정차 목표 위치",
          "기동의 조향 방향",
          "주차차량과 초기 간격"
        ],
        "evidence": [
          "While traveling west on [XXX}, the Waymo AV was executing a pullover maneuver in autonomous mode and made contact with the left rear bumper of a parked vehicle."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4243:a2dbb738:52a405b4",
      "reportedRemediations": []
    },
    {
      "id": "30412-5624",
      "narrativeVersion": "1",
      "evidence": [
        "the Cruise AV traveled over a pothole, which blew out the front driver side tire and caused the Cruise AV to veer into the adjacent parking lane.",
        "Shortly thereafter, the Cruise AV made contact with a parked Subaru Impreza"
      ],
      "facts": [
        "동향 주행 중 교차로에 접근하던 Cruise AV가 포트홀을 지나 좌전륜 타이어가 파열됐고, 인접 주차 차로로 벗어났다고 보고됐다.",
        "곧이어 주차 Subaru와 접촉했다. 원시 사고 전 속도는 15 mph이며 AV는 견인됐고 승객은 현장 의료평가를 받았지만 응급의료서비스로 이송되지는 않았다."
      ],
      "vehicleHypotheses": [
        "포트홀을 관찰·회피하거나 통과 속도를 조정할 시간과 공간이 있었는가?",
        "타이어 파열 이후 이상 감지와 조향·제동 제어가 차로 이탈을 얼마나 제한할 수 있었는가?"
      ],
      "environmentHypotheses": [
        "포트홀의 깊이·모서리와 인접 주차차량 배치가 충격 및 후속 접촉에 어떤 영향을 줬는가? 포트홀 존재만으로 관리 과실은 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "어떤 포트홀 형상과 바퀴 진입 조건에서 타이어가 손상됐는가?",
          "material": "포트홀 깊이·폭·모서리 실측, 바퀴 궤적, 속도·하중 및 타이어 파손 감정"
        },
        {
          "question": "포트홀 통과 전 인지와 경로 선택은 어떠했는가?",
          "material": "센서 원자료, 노면 인지·통과 가능성 평가, 경로 후보와 제동 로그"
        },
        {
          "question": "파열 후 주차차량 접촉까지 어떤 제어 여지가 있었는가?",
          "material": "타이어 압력·휠속도·요레이트·조향·제동 로그, AV 및 Subaru 상대 위치와 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "포트홀 통과 위험 판단과 타이어 급격한 압력 손실 후 안정화·정지 제어를 연결해 시험한다."
        ],
        "environment": [
          "포트홀 형상과 발견·보수 이력을 확인하고 현장 위험도에 따른 표시·보수 필요성을 평가한다."
        ],
        "operation": [
          "타이어 상태 점검과 포트홀 위험 구간의 경로 갱신·사고 후 부품 보존 절차를 점검한다."
        ]
      },
      "limits": "원문은 포트홀·타이어 파열·이탈·주차차량 접촉의 연결을 보고하지만 타이어 사전 상태, 포트홀 치수, 제어 반응과 개별 손상 기여는 미확인이다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "pothole",
        "targetLabel": "포트홀",
        "relation": "under",
        "stages": [
          "포트홀 통과",
          "좌전륜 파열·차로 이탈",
          "주차 Subaru 접촉"
        ],
        "caption": "포트홀 통과 뒤 좌전륜 파열과 차로 이탈, 주차차량 접촉이 보고됨",
        "geometryUnknown": [
          "포트홀 깊이·모서리 형상",
          "파열 뒤 이탈 궤적",
          "주차차량까지 거리"
        ],
        "evidence": [
          "the Cruise AV traveled over a pothole, which blew out the front driver side tire and caused the Cruise AV to veer into the adjacent parking lane."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4772:e4e0553:ca657d8d",
      "reportedRemediations": []
    },
    {
      "id": "30270-5318",
      "narrativeVersion": "1",
      "evidence": [
        "As the Waymo AV was leaving a parking lot to turn left onto [XXX], the front of the Waymo AV made contact with a chain that was connected between a parking lot road sign and a temporary pole.",
        "The road sign fell down due to tension on the chain."
      ],
      "facts": [
        "Waymo AV가 주차장에서 나와 좌회전하려던 중 주차장 표지판과 임시 기둥 사이에 연결된 체인에 전면이 접촉했다.",
        "체인에 걸린 장력으로 표지판이 넘어졌다. 접촉 당시 ADS가 작동했고 원시 사고 전 속도는 2 mph다."
      ],
      "vehicleHypotheses": [
        "표지판과 임시 기둥 사이의 얇은 체인이 실제 통행 차단물로 인지됐는가?",
        "좌회전 출구 경로의 전면 충돌 검사에 체인 높이와 처짐이 반영됐는가?"
      ],
      "environmentHypotheses": [
        "체인의 높이·대비·처짐과 야간 조명이 출구 폐쇄 여부의 식별에 어떤 영향을 줬는가? 설치 부적정 여부는 확인되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "체인은 차량 진행 공간을 어떤 높이와 각도로 가로막았는가?",
          "material": "체인 양 끝 좌표·높이·처짐, 표지판과 기둥 치수, AV 진출 궤적"
        },
        {
          "question": "체인과 지지물이 어떻게 인지되고 경로에 반영됐는가?",
          "material": "센서 원자료, 얇은 물체·점유 인지, 출구 지도 및 경로 충돌 검사 로그"
        },
        {
          "question": "출구 폐쇄 표시와 실제 접근·제동 반응은 어떠했는가?",
          "material": "현장 야간 영상·표지 사진, 속도·제동 시계열, 체인 설치·운영 기록"
        }
      ],
      "improvements": {
        "vehicle": [
          "체인처럼 가는 출구 차단물의 검출과 지지물 사이 연결 관계를 주차장 진출 계획에 반영해 시험한다."
        ],
        "environment": [
          "체인의 시인성, 출구 폐쇄 표시 및 지지물 고정 상태를 점검한다."
        ],
        "operation": [
          "주차장 출구 상태가 지도와 다르거나 차단 여부가 불확실할 때 정지·대체 출구 선택 기준을 마련한다."
        ]
      },
      "limits": "체인 접촉과 표지판 전도는 확인되지만 체인 높이·표시·가시 거리, 출구 이용 가능 상태 및 탐지 여부는 알 수 없다.",
      "scene": {
        "setting": "parking",
        "motion": "left",
        "targetKind": "barrier",
        "targetLabel": "표지판·기둥 사이 체인",
        "relation": "ahead",
        "stages": [
          "주차장 출구 접근",
          "좌회전 진출 중 체인 접촉",
          "장력으로 표지판 전도"
        ],
        "caption": "주차장 좌회전 진출 중 체인에 접촉해 연결된 표지판 전도",
        "geometryUnknown": [
          "체인 높이·처짐",
          "표지판과 기둥 간 거리",
          "AV 진출 각도"
        ],
        "evidence": [
          "the front of the Waymo AV made contact with a chain that was connected between a parking lot road sign and a temporary pole."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4338:617c49e5:deda6803",
      "reportedRemediations": []
    },
    {
      "id": "30412-5140",
      "narrativeVersion": "2",
      "evidence": [
        "At the same time, a San Francisco Municipal Railway (\"MUNI\") Bus stopped ahead of the Cruise AV.",
        "Shortly thereafter, the Cruise AV made contact with the rear bumper of the MUNI Bus"
      ],
      "facts": [
        "서향 주행하던 Cruise AV 앞에서 MUNI 버스가 정차했고, 얼마 뒤 AV가 버스 후면 범퍼에 접촉했다.",
        "원시 사고 전 속도는 10 mph이고 AV 전면 외장·펜더 손상과 견인이 보고됐다. 부상은 보고되지 않았다."
      ],
      "vehicleHypotheses": [
        "버스 정차를 추적한 시점, 목표 차간거리와 제동 개시가 실제 정지 거리에 어떻게 대응했는가?",
        "버스의 후면 외곽과 정지 상태가 인지·예측 단계에서 일관되게 유지됐는가?"
      ],
      "environmentHypotheses": [
        "버스 정차 위치, 전방 시야와 노면 상태는 AV가 사용할 수 있는 정지 거리에 어떤 영향을 줬는가? 급정차였는지는 서술되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "버스 정차 전후 차간거리와 상대 속도는 얼마였는가?",
          "material": "버스·AV 동기화 영상, 두 차량 궤적·속도, 버스 정차 위치"
        },
        {
          "question": "버스 정지 판단과 제동 명령은 언제 발생했는가?",
          "material": "객체 추적·예측 상태, 목표 차간거리, 제동 명령·실제 감속 시계열"
        },
        {
          "question": "차량 제동 성능과 노면 조건에 정지 거리 차이를 설명할 요소가 있었는가?",
          "material": "제동계·타이어 점검, 노면 상태, 차량 하중 및 접촉 부위 사진"
        }
      ],
      "improvements": {
        "vehicle": [
          "정차하는 대형 버스의 후면 외곽 추적과 추종 간격·제동 연결을 재현 검증한다."
        ],
        "environment": [
          "버스 정차 지점의 시야와 접근 공간을 확인해 필요한 표시·정차 운영 개선을 검토한다."
        ],
        "operation": [
          "실제 버스 정차 패턴을 운행 검증 시나리오에 반영한다."
        ]
      },
      "limits": "선행 버스 정차 후 접촉이라는 순서만으로 버스 감속률, AV 제동 지연·고장 또는 회피 가능성을 판단할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "vehicle",
        "targetLabel": "정차 MUNI 버스",
        "relation": "ahead",
        "stages": [
          "서향 주행",
          "전방 버스 정차",
          "버스 후면 접촉"
        ],
        "caption": "전방 MUNI 버스가 정차한 뒤 AV가 버스 후면 범퍼 접촉",
        "geometryUnknown": [
          "버스 정차 직전 차간거리",
          "버스 감속 거리",
          "AV 접촉 직전 정지 여유"
        ],
        "evidence": [
          "At the same time, a San Francisco Municipal Railway (\"MUNI\") Bus stopped ahead of the Cruise AV."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4156:2e0d8219:1eb2ea3f",
      "reportedRemediations": []
    },
    {
      "id": "30270-5081",
      "narrativeVersion": "1",
      "evidence": [
        "The Waymo AV was proceeding East on [XXX] through the intersection with [XXX] when the front of the Waymo AV made contact with cardboard debris.",
        "The Waymo AV sustained damage."
      ],
      "facts": [
        "Waymo AV가 ADS로 교차로를 동향 통과하던 중 전면이 골판지 잔해에 접촉했다.",
        "원시 사고 전 속도는 12 mph이고 어두우며 조명이 있는 조건으로 기재돼 있다. AV 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "골판지 잔해를 언제 인지했고 통과 가능한 물체로 판단했는가, 아니면 충분히 관찰하지 못했는가?",
        "잔해의 크기·형태 불확실성이 경로 및 제동 판단에 반영됐는가?"
      ],
      "environmentHypotheses": [
        "잔해는 언제 진로에 생겼고 당시 조명·노면 대비·주변 가림은 어떠했는가? 잔해 존재만으로 도로관리 과실을 판단할 수 없다."
      ],
      "dataNeeded": [
        {
          "question": "잔해의 실제 크기·위치와 차량 진행 경로는 어떠했는가?",
          "material": "현장 사진·잔해 회수 기록, 교차로 실측, AV 궤적과 접촉 높이"
        },
        {
          "question": "인지 누락과 통과 판단을 구별할 수 있는가?",
          "material": "센서 원자료, 객체 분류·점유 및 통과 가능성 로그, 경로 후보"
        },
        {
          "question": "발견 가능한 거리에서 감속 또는 경로 변경 여지가 있었는가?",
          "material": "접촉 전 영상, 속도·제동 시계열, 주변 차량과 가용 공간 자료"
        }
      ],
      "improvements": {
        "vehicle": [
          "형상이 불확실한 골판지 잔해의 점유·통과 가능성 판단과 제동 기준을 검증한다."
        ],
        "environment": [
          "교차로 잔해 발생·신고·제거 경위를 확인하고 해당 위험에 필요한 관리 대응을 검토한다."
        ],
        "operation": [
          "잔해 접촉 시 물체 사진과 손상 위치를 보존해 이후 판별·경로 검증에 활용한다."
        ]
      },
      "limits": "골판지라는 명칭 외에 내용물·크기·잔해 이동 여부가 없으므로 손상 메커니즘과 인지 또는 통과 판단 문제를 구분할 수 없다.",
      "scene": {
        "setting": "intersection",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "골판지 잔해",
        "relation": "ahead",
        "stages": [
          "동향 교차로 진입",
          "잔해 접근",
          "전면 접촉"
        ],
        "caption": "동향으로 교차로를 통과하던 AV 전면이 골판지 잔해에 접촉",
        "geometryUnknown": [
          "잔해의 크기·높이",
          "교차로 안의 정확한 위치",
          "잔해의 이동 여부"
        ],
        "evidence": [
          "The Waymo AV was proceeding East on [XXX] through the intersection with [XXX] when the front of the Waymo AV made contact with cardboard debris."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4233:ed02fcd0:101f4afa",
      "reportedRemediations": []
    },
    {
      "id": "30690-4793",
      "narrativeVersion": "1",
      "evidence": [
        "the Olli contacted the adjacent curb on the front right side, causing tie rod and cosmetic damage.",
        "The root cause of the curb contact was a communication error with the HD Map registration module.",
        "The autonomy system was attempting to correct this issue, but the vehicular steering system could not achieve the required turn radius."
      ],
      "facts": [
        "Olli 셔틀이 평소 노선을 운행하다 우전방으로 인접 연석에 접촉해 타이로드와 외관이 손상됐다. 원시 사고 전 속도는 9 mph이며 안전운영자 외 승객은 없었다.",
        "보고자는 HD 지도 정합 컴퓨터와 내비게이션 컴퓨터 사이 통신 오류를 원인으로 식별했고, 사고 당시 조향 보정도 맞지 않아 요구 회전 반경을 달성하지 못했다고 밝혔다.",
        "보고된 대응에는 부팅 통신 진단, 운행 중 통신 오류 시 제어된 정지, 고객과의 조향 재보정이 포함된다."
      ],
      "vehicleHypotheses": [
        "보고된 통신 오류가 위치 추정·경로 입력에 만든 변화와 조향 보정 오차의 기여를 각각 분리할 수 있는가?",
        "수정된 진단과 정지 로직이 통신 단절·지연·재연결 조건에서 실제로 동작하는가?"
      ],
      "environmentHypotheses": [
        "연석과 노선의 여유 폭이 오류 발생 후 허용 가능한 복구 공간을 얼마나 남겼는가? 원문은 노면 결함을 원인으로 지목하지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "위치 오차와 조향 오차가 실제 궤적을 어떻게 바꿨는가?",
          "material": "연석·노선 실측, 위치·자세 추정과 기준 궤적, 명령·실제 조향각 및 회전 반경"
        },
        {
          "question": "통신 오류의 발생·탐지·후속 제어 순서는 어떠했는가?",
          "material": "지도 정합·내비게이션 메시지와 타임스탬프, 오류 상태, 정지 명령 로그"
        },
        {
          "question": "조향 재보정과 소프트웨어 수정이 검증됐는가?",
          "material": "사전·사후 조향 보정치, 정비 기록, 부팅·운행 중 통신 장애 주입 시험 결과"
        }
      ],
      "improvements": {
        "vehicle": [
          "보고된 부팅 통신 진단과 운행 중 정지 조치를 통신 지연·단절 조건별로 검증한다.",
          "요구 조향과 실제 조향의 불일치를 감시하고 재보정 결과를 확인한다."
        ],
        "environment": [
          "해당 노선에서 연석 접근 여유와 안전 정지 공간을 확인한다."
        ],
        "operation": [
          "운영자의 조향 보정 점검 주기와 지원·정비 이력을 추적한다."
        ]
      },
      "limits": "통신 오류와 조향 보정 문제는 보고자가 명시했지만 각 문제의 정량 기여와 실제 연석 접근 궤적, 수정 효과는 원자료 검증이 필요하다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "curb",
        "targetLabel": "인접 연석",
        "relation": "unknown",
        "stages": [
          "평소 노선 운행",
          "우전방 연석 접촉",
          "통신·조향 문제 조사"
        ],
        "caption": "노선 운행 중 우전방 연석 접촉, 지도 통신·조향 보정 문제가 보고됨",
        "geometryUnknown": [
          "연석과 계획 노선 간격",
          "실제 위치 오차",
          "달성 가능한 회전 반경"
        ],
        "evidence": [
          "At 11:01 am, while running the normal route, the Olli contacted the adjacent curb on the front right side, causing tie rod and cosmetic damage."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "9372:2315a97:66d600eb",
      "reportedRemediations": [
        {
          "summaryKo": "기동 시 통신 자가진단, 운행 중 통신 이상 시 제어된 정지, 고객과의 조향 재보정을 보고했다.",
          "evidence": [
            "Implementing a self-diagnostic routine upon system boot",
            "the vehicle will come to a controlled stop in event of a communication problem.",
            "Working with the customer to recalibrate the steering"
          ]
        }
      ]
    },
    {
      "id": "30270-4363",
      "narrativeVersion": "2",
      "evidence": [
        "The Waymo AV was traveling southbound in a parking lot on [XXX] when it approached a parking lot barrier arm.",
        "The Waymo AV initially slowed for the arm but then proceeded forward, making contact with it and opening it."
      ],
      "facts": [
        "Waymo AV가 주차장에서 남향으로 차단봉에 접근했고 처음에는 감속했으나 다시 전진해 차단봉에 접촉하면서 열었다.",
        "접촉 당시 ADS가 작동했고 차량 손상·견인 사유가 보고됐다. 원시자료에는 사고 전 속도 11 mph, 젖은 노면, 우회전이 기재돼 있으나 경위는 접촉 직전 전진으로 서술한다."
      ],
      "vehicleHypotheses": [
        "차단봉 때문에 감속한 뒤 진행 가능하다고 판단하게 된 정보나 상태 변화는 무엇이었는가?",
        "차단봉의 개폐 상태·높이와 차량 외곽의 충돌 가능성을 어떻게 검증했는가?"
      ],
      "environmentHypotheses": [
        "차단봉의 작동 상태, 개방 신호와 야간·젖은 노면 조건이 접근 판단에 어떤 영향을 줬는가? 설비 고장은 보고되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "접촉 전 차단봉 위치와 AV 진입 궤적은 어떠했는가?",
          "material": "차단봉 높이·회전축·각도 시계열, AV 궤적, 주차장 통로 실측·영상"
        },
        {
          "question": "감속에서 재전진으로 바뀐 판단 근거는 무엇인가?",
          "material": "차단봉 인지·상태 추정, 경로 허용 판단, 계획 속도 및 제동·가속 로그"
        },
        {
          "question": "차단기 설비 동작과 차량 판단의 시간 관계는 어떠했는가?",
          "material": "차단기 센서·개폐 명령 기록, 신호 표시 영상, 원시 속도와 우회전 필드의 시간 기준"
        }
      ],
      "improvements": {
        "vehicle": [
          "차단봉 감속 후 재출발은 실제 통과 높이·개방 상태 확인과 연결해 검증한다."
        ],
        "environment": [
          "차단봉 작동·표시·야간 시인성과 주차장 통로의 배치를 점검한다."
        ],
        "operation": [
          "자동 차단기 상태를 확신할 수 없을 때 정지 유지·지원 요청 조건을 점검한다."
        ]
      },
      "limits": "감속 후 전진과 접촉 개방은 확인되지만 차단봉의 접촉 전 움직임·각도, 재전진 근거 및 원시 운동 필드와의 시간 관계는 불명확하다.",
      "scene": {
        "setting": "parking",
        "motion": "straight",
        "targetKind": "barrier",
        "targetLabel": "주차장 차단봉",
        "relation": "ahead",
        "stages": [
          "차단봉 접근·감속",
          "다시 전진",
          "접촉하며 차단봉 개방"
        ],
        "caption": "주차장 차단봉 앞에서 감속한 뒤 전진해 접촉하며 차단봉을 엶",
        "geometryUnknown": [
          "차단봉 접촉 전 각도·높이",
          "접근로의 회전 형상",
          "재전진 시 차단봉까지 거리"
        ],
        "evidence": [
          "The Waymo AV initially slowed for the arm but then proceeded forward, making contact with it and opening it."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4886:fff13664:35d03616",
      "reportedRemediations": []
    },
    {
      "id": "30413-3138",
      "narrativeVersion": "1",
      "evidence": [
        "The May vehicle passed too close to a parked vehicle, causing the May vehicle's passenger-side mirror to contact the parked vehicle's driver-side mirror.",
        "The May vehicle's ground mapping module had fallen significantly behind in its processing of lidar data.",
        "The second factor in the collision is that we were artificially constraining the vehicle to the right side of the road due to ambiguous and unpainted roadway."
      ],
      "facts": [
        "중앙선이 없는 주택가 도로의 오른쪽에 주차차량들이 있었고, May 차량이 너무 가까이 지나면서 우측 거울과 주차차량 운전석 쪽 거울이 접촉했다고 보고됐다.",
        "보고자는 지면 지도 처리 지연 때문에 실제 물체가 라이다 처리에서 걸러져 트럭·운전석·거울의 검출이 불안정했다고 밝혔다.",
        "오른쪽 주행을 강하게 제한한 설정도 요인으로 보고됐으며, 좌측 이동 허용 시뮬레이션과 소프트웨어 수정·운영자 교육 계획이 서술됐다. 원시 사고 전 속도는 11 mph다."
      ],
      "vehicleHypotheses": [
        "지면 지도 지연과 차로 제한이 거울 간격을 줄인 각각의 기여는 얼마나 되는가?",
        "보고된 수정이 상부 돌출물 검출의 연속성과 안전한 측방 경로 선택을 실제 조건에서도 유지하는가?"
      ],
      "environmentHypotheses": [
        "중앙선 없는 도로의 실제 가용 폭과 맞은편 교통이 좌측 여유 확보를 허용했는가? 노면 표시 부재만으로 관리 과실은 판단되지 않는다."
      ],
      "dataNeeded": [
        {
          "question": "거울을 포함한 통과 폭과 안전한 좌측 이동 여유는 얼마였는가?",
          "material": "도로·주차차량·거울 실측, AV 궤적, 맞은편 교통 영상"
        },
        {
          "question": "지연과 필터링이 검출 외곽을 어떻게 바꿨는가?",
          "material": "지면 지도 처리 지연·라이다 프레임, 객체 검출 이력, 거울 외곽·충돌 검사 로그"
        },
        {
          "question": "제한 완화와 지연 수정의 효과가 별도로 검증됐는가?",
          "material": "변경 전후 설정·버전, 두 요인을 분리한 재현 시험, 시뮬레이션 조건과 실차 결과"
        }
      ],
      "improvements": {
        "vehicle": [
          "지면 지도 지연 감시와 실제 물체 필터링 억제를 검증한다.",
          "중앙선 없는 도로에서 거울 돌출과 맞은편 교통을 함께 고려하도록 측방 제한을 시험한다."
        ],
        "environment": [
          "주차차량 거울을 포함한 유효 통행 폭과 도로 경계의 식별 가능성을 확인한다."
        ],
        "operation": [
          "수정 배포·검증 결과를 추적하고 돌출물 구간의 운영자 감시·인수 기준을 적용한다."
        ]
      },
      "limits": "처리 지연과 오른쪽 제한은 보고자의 분석이며, 거울 높이·실제 간격과 수정 완료·현장 효과는 이 보고만으로 확인되지 않는다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "vehicle",
        "targetLabel": "우측 주차차량 거울",
        "relation": "right",
        "stages": [
          "무중앙선 도로 주행",
          "우측 주차차량 근접 통과",
          "양 차량 거울 접촉"
        ],
        "caption": "중앙선 없는 도로의 우측 주차차량을 가까이 지나며 거울 접촉",
        "geometryUnknown": [
          "도로의 실제 가용 폭",
          "양 차량 거울 돌출 길이",
          "맞은편 교통과 좌측 이동 여유"
        ],
        "evidence": [
          "The May vehicle was traveling on an unpainted (no center line) residential road with vehicles parked along the right side of the road."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "6661:4c5eaddf:bf9bf6b3",
      "reportedRemediations": []
    },
    {
      "id": "30711-1759",
      "narrativeVersion": "3",
      "evidence": [
        "Rather the Pony.ai AV was traveling straight on [XXX] and crossed through an intersection with [XXX] before entering the segment of [XXX] on which it changed lanes and subsequently had a collision",
        "While performing the lane change, the Pony.ai AV came into contact with a center divider on [XXX]. and the traffic sign that was posted on the divider."
      ],
      "facts": [
        "최신 정정은 최초의 우회전 설명을 철회하고, Pony.ai AV가 직진으로 교차로를 통과한 뒤 좌측 차로 변경 중 사고가 났다고 명시한다.",
        "ADS 차로 변경 중 중앙분리대와 그 위 교통표지에 접촉해 전면·하부가 손상됐다. 원시 사고 전 속도는 35 mph이며 다른 차량과 부상은 없었다고 보고됐다."
      ],
      "vehicleHypotheses": [
        "교차로 통과 후 좌측 차로 변경 경로가 중앙분리대의 시작 위치와 실제 경계를 정확히 반영했는가?",
        "계획 경로와 실행 궤적 중 어느 단계에서 중앙분리대와 겹침이 생겼는가?"
      ],
      "environmentHypotheses": [
        "교차로 뒤 중앙분리대의 형상·표시·차로 연결이 식별에 어떤 영향을 줬는가? 표지 손상은 보고됐지만 시설 결함은 확인되지 않았다."
      ],
      "dataNeeded": [
        {
          "question": "직진 교차로 통과 뒤 차로 변경과 분리대 접촉 위치는 어디인가?",
          "material": "정정 경로 기준 현장 실측·영상, 중앙분리대·표지 좌표, 차량 궤적"
        },
        {
          "question": "분리대가 지도·인지·계획 경로에 일치하게 표현됐는가?",
          "material": "당시 지도 버전, 객체·도로 경계 인지, 차로 변경 경로 후보·충돌 검사 로그"
        },
        {
          "question": "35 mph 접근에서 조향·제동과 추종 오차는 어떠했는가?",
          "material": "속도·조향·요레이트·제동 시계열, 명령 대비 실행 궤적, 전면·하부 손상 사진"
        }
      ],
      "improvements": {
        "vehicle": [
          "교차로 통과 뒤 중앙분리대가 있는 구간의 차로 변경 경계·궤적 검증을 수행한다."
        ],
        "environment": [
          "중앙분리대 선단과 교차로 뒤 차로 연결의 표시·시인성을 확인한다."
        ],
        "operation": [
          "최신 정정 경로를 조사·재현 시험의 기준으로 통일하고 초기 우회전 설명을 재사용하지 않는다."
        ]
      },
      "limits": "v3 정정에 따라 진입 경로는 바로잡혔지만 차로 변경 시작점, 분리대 형상, 위치·제어 오차가 공개되지 않아 원인은 특정할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "left",
        "targetKind": "barrier",
        "targetLabel": "중앙분리대·교통표지",
        "relation": "left",
        "stages": [
          "직진 교차로 통과",
          "좌측 차로 변경",
          "분리대·표지 접촉"
        ],
        "caption": "정정된 경위는 직진 교차로 통과 후 좌측 차로 변경 중 분리대 접촉",
        "geometryUnknown": [
          "차로 변경 시작점",
          "중앙분리대 선단 형상",
          "접촉 전 횡방향 이동량"
        ],
        "evidence": [
          "the Pony.ai AV was traveling straight on [XXX] and crossed through an intersection with [XXX]",
          "the Pony.ai Autonomous Vehicle (\"Pony.ai AV\") performed a left lane change maneuver in autonomous mode (SAE L4)."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "8429:8f2f81a5:aba478c3",
      "reportedRemediations": []
    },
    {
      "id": "30270-1494",
      "narrativeVersion": "1",
      "evidence": [
        "at the north end of [XXX] (a dead-end road).",
        "While performing a multipoint turn in autonomous mode, the Waymo AV was reversing at approximately 2 MPH when it made contact with the rear tail light of an unoccupied parked passenger vehicle."
      ],
      "facts": [
        "막다른 도로 북쪽 끝에서 Waymo AV가 여러 번 전후진하는 회전을 수행하다 약 2 mph로 후진 중 빈 주차 승용차의 후미등에 접촉했다.",
        "시험 운전자가 탑승했고 ADS가 작동 중이었다. 주차차량 후미등 커버가 조금 깨지고 AV 뒤 범퍼에 경미한 손상이 보고됐다."
      ],
      "vehicleHypotheses": [
        "다점 회전의 후진 구간에서 주차차량 후미등 돌출과 AV 뒤 범퍼 궤적을 충분히 반영했는가?",
        "반복 기동으로 차량 자세가 바뀔 때 후방 공간과 정지 목표를 재검증했는가?"
      ],
      "environmentHypotheses": [
        "막다른 길 끝의 주차 배치와 회전 공간, 조명 없는 야간 조건이 후진 간격 확인에 어떤 영향을 줬는가?"
      ],
      "dataNeeded": [
        {
          "question": "다점 회전 각 단계에서 실제 여유 공간은 얼마였는가?",
          "material": "막다른 길·주차차량 실측, AV 전후진 궤적·조향각, 후미등 돌출 치수"
        },
        {
          "question": "후미등과 범퍼의 접촉 가능성이 계획에 나타났는가?",
          "material": "후방 센서 자료, 주차차량 외곽, 후진 경로·정지 목표 및 추종 오차 로그"
        },
        {
          "question": "ADS 또는 시험 운전자에게 정지할 시간이 있었는가?",
          "material": "야간 영상, 속도·제동·운전자 입력, 경고와 접촉 감지 시각"
        }
      ],
      "improvements": {
        "vehicle": [
          "다점 회전에서 매 후진 구간마다 후미등 등 돌출부를 포함한 후방 여유를 재검증한다."
        ],
        "environment": [
          "막다른 길 끝의 주차 배치와 회전 가능 공간·야간 조명 상태를 확인한다."
        ],
        "operation": [
          "좁은 막다른 길의 다점 회전에 대한 시험 운전자 감시와 정지 개입 기준을 점검한다."
        ]
      },
      "limits": "약 2 mph 후진과 후미등 접촉은 확인되지만 주차차량 방향·정확한 위치, 회전 단계 수와 운전자 관찰 가능성은 미확인이다.",
      "scene": {
        "setting": "road",
        "motion": "reverse",
        "targetKind": "vehicle",
        "targetLabel": "주차 승용차 후미등",
        "relation": "behind",
        "stages": [
          "막다른 길 다점 회전",
          "약 2 mph 후진",
          "주차차량 후미등 접촉"
        ],
        "caption": "막다른 길 다점 회전에서 약 2 mph 후진 중 주차차량 후미등 접촉",
        "geometryUnknown": [
          "막다른 길 끝 회전 공간",
          "주차차량의 방향·위치",
          "접촉 직전 후방 간격"
        ],
        "evidence": [
          "While performing a multipoint turn in autonomous mode, the Waymo AV was reversing at approximately 2 MPH when it made contact with the rear tail light of an unoccupied parked passenger vehicle."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "4979:828d9f2d:7bd1d7b",
      "reportedRemediations": []
    },
    {
      "id": "30590-1482",
      "narrativeVersion": "1",
      "evidence": [
        "Subject vehicle moved to the right of the lane to turn right onto West-bound [XXX], a two-lane road, and made contact with a curb at approximately 13-miles per hour.",
        "The safety driver was monitoring the behavior of a vehicle passing in the left lane for signs that it might enter subject vehicles path and did not see subject vehicle moving toward the curb in time to intervene and avoid contact."
      ],
      "facts": [
        "Apple 시험차가 ADS로 남향 도로에서 서향 도로로 우회전하려고 차로 오른쪽으로 이동하다 약 13 mph로 연석에 접촉했다.",
        "안전운전자는 왼쪽에서 지나가는 차량의 진로 진입 가능성을 관찰하느라 연석 접근을 제때 보지 못했다고 보고됐다. 사고 중 ADS를 해제하고 정차·점검한 뒤 수동으로 복귀했다.",
        "타이어·휠 손상은 없었지만 정렬 불량이 발생했고 부상은 보고되지 않았다."
      ],
      "vehicleHypotheses": [
        "우회전 준비의 측방 이동과 실제 회전 궤적이 연석 경계를 충분히 고려했는가?",
        "안전운전자가 다른 차량을 관찰하는 동안 연석 근접을 알리는 감시·경고 기능이 작동했는가?"
      ],
      "environmentHypotheses": [
        "우회전 모서리의 반경·연석 형상과 왼쪽 추월 차량의 위치가 필요한 주시와 여유 공간에 어떤 영향을 줬는가?"
      ],
      "dataNeeded": [
        {
          "question": "우측 이동부터 연석 접촉까지 바퀴 궤적은 어떠했는가?",
          "material": "교차로·연석 실측, 조향·차량 자세 궤적, 타이어·연석 사진과 정렬 보정 자료"
        },
        {
          "question": "ADS의 연석 인지·경로 계획과 실제 실행은 일치했는가?",
          "material": "연석 경계 인지, 계획 경로·최소 간격, 조향 명령·추종 오차 및 제동 로그"
        },
        {
          "question": "운전자 관찰과 ADS 해제의 시간 관계는 어떠했는가?",
          "material": "내외부 동기화 영상, 추월 차량 궤적, 경고·운전자 입력·해제 타임스탬프"
        }
      ],
      "improvements": {
        "vehicle": [
          "우회전 준비 단계부터 연석 여유와 실제 바퀴 궤적을 감시하고 경고·정지 조건을 검증한다."
        ],
        "environment": [
          "교차로 모서리 반경과 연석 식별 조건을 실측해 위험 구간을 확인한다."
        ],
        "operation": [
          "주변 차량 관찰과 차량 자체 경계 감시를 함께 수행할 안전운전자·운영자 역할 분담을 점검한다."
        ]
      },
      "limits": "운전자 주시 대상과 개입 지연은 원문에 있지만 ADS가 연석 쪽으로 이동한 기술적 이유와 경고 유무는 공개되지 않았다.",
      "scene": {
        "setting": "intersection",
        "motion": "right",
        "targetKind": "curb",
        "targetLabel": "우회전부 연석",
        "relation": "right",
        "stages": [
          "남향 접근",
          "우측 이동·우회전 준비",
          "약 13 mph 연석 접촉"
        ],
        "caption": "우회전 준비 중 약 13 mph로 연석 접촉, 운전자는 좌측 차량 관찰 중",
        "geometryUnknown": [
          "우회전 모서리 반경",
          "접촉 직전 연석 간격",
          "왼쪽 통과 차량의 상대 위치"
        ],
        "evidence": [
          "Subject vehicle moved to the right of the lane to turn right onto West-bound [XXX], a two-lane road, and made contact with a curb at approximately 13-miles per hour."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "5745:c57220c1:453aa629",
      "reportedRemediations": []
    },
    {
      "id": "30415-1317",
      "narrativeVersion": "1",
      "evidence": [
        "The shuttle made contact with the pallet prior to the attendant stopping the shuttle.",
        "According to Beep, the pallet height was just below that of the bottom most front LiDAR sensor.",
        "they did not take any photos of the pallet or UI events interface at the time of the incident."
      ],
      "facts": [
        "NAVYA 셔틀이 노선을 자율주행하다 도로의 팔레트에 접근했고, 승무원이 정지시키기 전에 팔레트와 접촉했다.",
        "Beep은 팔레트 높이가 가장 낮은 전방 라이다보다 조금 낮았다고 보고했다. 셔틀 그릴 하부에 가벼운 긁힘이 있었고 팔레트나 당시 UI 화면 사진은 남기지 않았다."
      ],
      "vehicleHypotheses": [
        "낮은 팔레트가 라이다 가시 범위 또는 다른 센서 조합에서 검출됐는가, 검출 후 통과 가능한 물체로 처리됐는가?",
        "승무원 정지 이전에 자동 제동을 시작할 거리와 시간이 있었는가?"
      ],
      "environmentHypotheses": [
        "팔레트의 실제 높이·재질·놓인 자세와 도로상 위치가 관찰에 어떤 영향을 줬는가? 팔레트 방치 주체나 관리 책임은 알 수 없다."
      ],
      "dataNeeded": [
        {
          "question": "팔레트와 최하단 라이다의 실제 높이·가시 관계는 어떠했는가?",
          "material": "가능한 팔레트 치수·형상 복원, 센서 장착 높이·시야각, 셔틀 접근 궤적"
        },
        {
          "question": "센서 검출과 주행 판단 중 어느 단계에서 대응이 이뤄지지 않았는가?",
          "material": "보존 여부를 확인할 센서 원자료, 객체·점유·통과 판단 및 제동 로그; 없으면 동등 형상 재현 시험"
        },
        {
          "question": "접촉과 승무원 정지 사이 시간 및 속도는 얼마였는가?",
          "material": "운영자 진술, 정지 입력·휠속도 기록, 그릴 하부 손상 사진과 가능한 외부 영상"
        }
      ],
      "improvements": {
        "vehicle": [
          "최하단 라이다보다 낮은 팔레트 형상을 사용해 센서 융합·점유 판단과 자동 정지 연결을 시험한다."
        ],
        "environment": [
          "노선 내 낮은 적재물의 발견·표시·제거 절차를 확인한다."
        ],
        "operation": [
          "접촉 즉시 물체 치수·사진·UI 및 시스템 로그를 보존하는 현장 기록 절차를 적용한다."
        ]
      },
      "limits": "팔레트가 라이다보다 낮았다는 보고는 있지만 사진·UI·추가 자료가 없어 실제 센서 사각, 인지 실패, 통과 판단 또는 개입 지연을 구분할 수 없다.",
      "scene": {
        "setting": "road",
        "motion": "straight",
        "targetKind": "object",
        "targetLabel": "낮은 팔레트",
        "relation": "ahead",
        "stages": [
          "노선상 팔레트 접근",
          "팔레트 접촉",
          "승무원 정지"
        ],
        "caption": "낮은 팔레트와 먼저 접촉한 뒤 승무원이 셔틀을 정지",
        "geometryUnknown": [
          "팔레트의 정확한 높이·폭",
          "최초 관찰 가능한 거리",
          "도로상 팔레트 자세·위치"
        ],
        "evidence": [
          "Shuttle was operating autonomously on route when it approached a pallet in the roadway.",
          "According to Beep, the pallet height was just below that of the bottom most front LiDAR sensor."
        ],
        "roadConfirmed": true,
        "waterFilled": false
      },
      "sourceFingerprint": "3894:66705ce8:337ce9a0",
      "reportedRemediations": []
    }
  ]
};
