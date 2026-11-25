export default [
  {
    "id": "30270-14422",
    "members": [
      "30270-14422"
    ],
    "fingerprints": {
      "30270-14422": "daab60848c707453a9204b808d2204d0873e292f659e9947f44b43250e0e5414"
    },
    "decision": "include",
    "reason": "2026-11-25 사용자 복원 요청 · 최신 경위의 충돌 당시 ADS 작동 문구와 양쪽 행동·접촉부위 재대조. 사고 유형의 상충은 유지.",
    "method": "최신 v2 원문 재대조 · 사용자 요청에 따른 복원",
    "narrativeVersion": "2",
    "narrativeFingerprint": "daab60848c707453a9204b808d2204d0873e292f659e9947f44b43250e0e5414",
    "scenario": "06",
    "autoReview": {
      "scenario": {
        "id": "30270-14422",
        "status": "conflict",
        "code": null,
        "candidateCode": "06",
        "evidence": [
          "Other than a correction to the longitude field, the content of this report is unchanged for the original report submitted on April 14th, 2026 [Report ID 30270-14422-1]. \n\nOn March [XXX], 2026 at 10:10 PM PT a Waymo Autonomous Vehicle (\"Waymo AV\") operating in Santa Monica, California was in a collision involving an SUV on [XXX] near [XXX].\n\nThe Waymo AV was traveling northwestbound in the rightmost lane on [XXX] when it began to slow for a red light at the intersection with [XXX]. While the Waymo AV continued to slow, an SUV initially stopped facing northwest in the second from the right lane maneuvered to the right to change lanes and crossed the dashed white lane line into the Waymo AV's lane of travel, and the front right side of the SUV made contact with the left side of the Waymo AV.  At the time of the impact, the Waymo AV's Level 4 ADS was engaged in autonomous mode. Both vehicles sustained damage.\n\nWaymo is reporting this crash under Request No. 2 of Standing General Order 2021-01. Waymo may supplement or correct its reporting with additional information as it may become available."
        ],
        "reasonKo": "SUV 우측 차로변경 중 앞우측으로 SV 좌측 접촉이라는 서술과 CP Front Left가 반대다.",
        "svContact": [
          "Left"
        ],
        "cpContact": [
          "Front Left"
        ],
        "narrativeVersion": "2",
        "version": "2",
        "rawFingerprint": "daab60848c707453a9204b808d2204d0873e292f659e9947f44b43250e0e5414",
        "narrativeFingerprint": "daab60848c707453a9204b808d2204d0873e292f659e9947f44b43250e0e5414",
        "reviewMethod": "latest_version_full_narrative_contact_recheck"
      }
    },
    "restoration": {
      "date": "2026-11-25",
      "requestedByUser": true,
      "notLegalFault": true
    }
  },
  {
    "id": "30270-16293",
    "members": [
      "30270-16293"
    ],
    "fingerprints": {
      "30270-16293": "70159cc418e149b5b23a38a34185f398d1bf19e1128db8ca85ca67c5c97857ba"
    },
    "decision": "include",
    "reason": "2026-11-25 사용자 복원 요청 · 최신 경위의 충돌 당시 ADS 작동 문구와 양쪽 행동·접촉부위 재대조. 사고 유형의 상충은 유지.",
    "method": "최신 v2 원문 재대조 · 사용자 요청에 따른 복원",
    "narrativeVersion": "2",
    "narrativeFingerprint": "70159cc418e149b5b23a38a34185f398d1bf19e1128db8ca85ca67c5c97857ba",
    "scenario": "08",
    "autoReview": {
      "scenario": {
        "id": "30270-16293",
        "svContact": [
          "Rear"
        ],
        "cpContact": [
          "Front Right"
        ],
        "narrativeVersion": "2",
        "version": "2",
        "rawFingerprint": "70159cc418e149b5b23a38a34185f398d1bf19e1128db8ca85ca67c5c97857ba",
        "narrativeFingerprint": "70159cc418e149b5b23a38a34185f398d1bf19e1128db8ca85ca67c5c97857ba",
        "status": "confirmed",
        "code": "08",
        "candidateCode": "08",
        "evidence": [
          "On August [XXX], 2026 at 8:31 AM EDT, a Waymo Autonomous Vehicle (\"Waymo AV\") operating in Atlanta, Georgia was in a collision involving an SUV on [XXX] near [XXX].\n\nThe Waymo AV was traveling southwestbound on [XXX] when an SUV, traveling northwestbound in a parking garage on the south side of the roadway, exited the parking garage and initiated a left turn onto southwestbound [XXX], entering the Waymo AV's lane of travel. The SUV continued turning left and the front of the SUV made contact with the rear left side of the Waymo AV. At the time of the impact, the Waymo AV's Level 4 ADS was engaged in autonomous mode. Both vehicles sustained damage.\n\nWaymo is reporting this crash under Request No. 2 of Standing General Order 2021-01. Waymo may supplement or correct its reporting with additional information as it may become available."
        ],
        "reasonKo": "주차장 SUV가 도로로 출차하며 좌회전해 진행 SV 좌후방에 전방으로 닿았다. 노외에서 진입한 과정과 Entering Traffic이 일치한다. 접촉표기 SV Rear / CP Front Right가 이 과정과 일치한다.",
        "reviewMethod": "latest_version_full_narrative_contact_recheck"
      }
    },
    "restoration": {
      "date": "2026-11-25",
      "requestedByUser": true,
      "notLegalFault": true
    }
  }
];
