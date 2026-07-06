export type AttributeIcon = 'purpose' | 'direction' | 'cost' | 'security' | 'receiver'

export type EquipmentNetworkGroup = 'short' | 'long' | 'satellite' | 'mandatory'

export type EquipmentAttribute = {
  icon: AttributeIcon
  label: string
  value: string
}

export type Equipment = {
  id: string
  name: string
  shortName: string
  analogy: string
  description: string
  networkGroup: EquipmentNetworkGroup
  attributes: EquipmentAttribute[]
}

export type CompareRow = {
  label: string
  ais: string
  satellite: string
  mandatory: string
}

export type JourneyStep = {
  id: number
  title: string
  subtitle: string
  description: string
  detail?: string
}

export type JourneyPath = {
  id: 'vhf' | 'hf' | 'satellite'
  label: string
  description: string
}

export type JourneyStepOverride = Pick<JourneyStep, 'title' | 'subtitle' | 'description' | 'detail'>

export const journeyPathStepOverrides: Record<
  JourneyPath['id'],
  Partial<Record<number, JourneyStepOverride>>
> = {
  vhf: {
    2: {
      title: '기지국 수신',
      subtitle: '해안·육상 기지국 포착',
      description:
        'VHF/AIS 전파를 해안 수신 기지국·AIS 수신망이 직접 포착합니다. 위성을 거치지 않으며, 연안 다수 기지국에서 신호가 동시에 수집됩니다.',
      detail: '한국 해안에는 AIS 지상 수신 네트워크가 구축되어 있고, V-Pass는 이동통신·전용 기지국으로 수신됩니다.',
    },
    3: {
      title: '운영국 집계',
      subtitle: '국가 관할 기관으로 데이터 수집',
      description:
        '기지국에서 수집된 데이터가 운영국(해양경찰·해양수산부·해상교통관제센터 등)으로 전달·집계됩니다. AIS 신호 충돌 분리·해독도 이 단계에서 수행됩니다.',
    },
    4: {
      title: '관제 서버',
      subtitle: '국가 관제 시스템 표출',
      description:
        '운영국 소속 관제 서버에 위치가 적재되어 해상 교통관제·어업 단속·출입항 관리 화면에 표출됩니다.',
    },
  },
  hf: {
    2: {
      title: '해안 무선국(기지국) 수신',
      subtitle: '전리층 반사 신호 포착',
      description:
        'HF/MF SSB 신호를 해안 무선국·기지국이 수신합니다. 위성 없이 지상 안테나만으로 수천 km 밖 선박과 통신합니다.',
      detail: 'GMDSS 해안 무선국이 조난 호출·안전 정보를 수신하고, 위치 정보가 포함된 경우 운영국으로 전달됩니다.',
    },
    3: {
      title: '운영국 집계',
      subtitle: '해경·교통관제 등으로 정보 전달',
      description:
        '기지국에서 접수된 통신·위치 정보가 운영국(해상구조조정센터·해경·관제 기관)으로 모입니다.',
    },
    4: {
      title: '관제 서버',
      subtitle: '조난·안전 정보 통합 관리',
      description:
        '운영국 관제 서버에 사건·위치 정보가 기록되고, 대응·의사결정에 활용됩니다.',
    },
  },
  satellite: {
    2: {
      title: '인공위성 중계',
      subtitle: 'LEO vs GEO 위성 포착',
      description:
        'LEO(Orbcomm/VMS) 또는 GEO(Inmarsat/LRIT/SSAS) 위성이 신호를 수신·중계합니다. 근거리·원거리망과 달리 반드시 위성을 경유합니다.',
      detail: 'LEO: 500~1,200km, 거의 실시간. GEO: 36,000km, 3기로 지구 커버, 수백 ms 지연.',
    },
    3: {
      title: '지상 게이트웨이 (Land Earth Station)',
      subtitle: '위성 신호 지상 수신',
      description:
        '위성이 내려보낸 신호를 지상 게이트웨이(거대 포물선 안테나)가 수신합니다. 암호화 데이터 복호화·검증 후 운영국으로 전달됩니다.',
    },
    4: {
      title: '관제 서버',
      subtitle: '기국·정부 DC에 위치 적재',
      description:
        'LRIT Data Centre, VMS 서버, 해경 SSAS 수신 센터 등 운영국 관제 서버에 위치가 표출됩니다.',
    },
  },
}

export type TimelineItem = {
  id: number
  title: string
  description: string
}

export type CaseStudy = {
  title: string
  context: string
  outcome: string
}

export type RegulatorySystem = {
  id: string
  name: string
  fullName: string
  analogy: string
  description: string
  features: string[]
}

export type ShipCategory = {
  id: string
  name: string
  examples: string
  regulatingBodies: string[]
  keyLaws: string[]
  surveillanceNotes: string
  mandatorySystems: string[]
}

export type LegalStatus = {
  id: string
  name: string
  definition: string
  analogy: string
  flagStateRole: string
  coastalStateRole: string
  portStateRole: string
  reportingObligations: string
}

export type RegulatoryPillar = {
  id: 'legal' | 'technical'
  title: string
  description: string
  items: string[]
}

export type TechNetworkTier = {
  id: 'short' | 'long' | 'satellite'
  tier: string
  range: string
  equipment: string[]
  analogy: string
  mechanism: string
  limitations: string
  legalLink: string
}

export type PolicyTier = {
  id: 'public' | 'private' | 'mandatory'
  tier: string
  equipment: string[]
  nature: string
  purpose: string
  legalBasis: string
  receivers: string
  caseExample: string
}

export type SurveillanceMatrixRow = {
  shipCategoryId: string
  shipCategory: string
  legalStatus: string
  mandatorySystems: string[]
  optionalSystems: string[]
  regulatingAuthority: string
}

export const introContent = {
  hook: '지금 이 순간, 세계 바다에는 10만 척의 배가 운항 중입니다.',
  question: '당신의 나라는 이 배들의 위치를 얼마나 알고 있을까요?',
  subtitle: '선박의 위치는 어떻게 수집되는가?',
  context: '선박마다 다른 법, 같은 바다 — 어선·상선·국적선·나용선마다 국가가 요구하는 관제 방식이 다릅니다.',
}

export const regulatoryPillars: RegulatoryPillar[] = [
  {
    id: 'legal',
    title: '법적 근거 / 관제 대상',
    description:
      '국가는 선박의 종류·법적 지위·항해 구역에 따라 "누구를, 어떤 법으로" 관제할지 결정합니다. 같은 바다 위에서도 어선과 상선, 국적선과 나용선은 적용 규정이 달라집니다.',
    items: [
      '선박 종류: 어선(연안/원양), 상선(화물·유조·여객), 공무선, 레저선, 군함',
      '법적 지위: 국적선, 나용선, 외국선, 무국적선 — 기국·연안국·항만국 관할',
      '국제 요구: IMO SOLAS Ch.V, ISPS Code, UNCLOS, LRIT·AIS·SSAS 의무 기준',
      '국가 요구: VMS(원양어선), V-Pass(연안어선), SSAS 수신체계, 항만당국 보고',
    ],
  },
  {
    id: 'technical',
    title: '물리적 / 기술적 구현',
    description:
      '법적 의무는 GPS/GNSS로 위치를 획득한 뒤 전송됩니다. 근거리·원거리망은 위성을 거치지 않고 기지국 → 운영국 → 관제 서버로 모이고, 위성망만 위성·지상 게이트웨이를 경유합니다.',
    items: [
      '위치 획득: GPS·GLONASS·Galileo 등 GNSS 수신',
      '근거리: 선박 → 기지국(해안 수신국) → 운영국 → 관제 서버',
      '원거리: 선박 → 해안 무선국(기지국) → 운영국 → 관제 서버',
      '위성: 선박 → 인공위성 → 지상 게이트웨이 → 운영국/관제 서버',
    ],
  },
]

export const shipCategories: ShipCategory[] = [
  {
    id: 'fishing',
    name: '어선',
    examples: '연안 어선, 원양 트롤선, 연승어선, 양식수송선',
    regulatingBodies: ['해양수산부', '해양경찰', '지방해양수산청'],
    keyLaws: ['수산업법', '어업자원관리법', '연안어업 관련 시행령'],
    surveillanceNotes:
      '연안 어선은 V-Pass로 출입항·위치 보고가 의무화되고, 원양 어선은 VMS로 10분 단위 위치가 해양수산부 서버에 전송됩니다. AIS는 대형 어선에도 적용될 수 있습니다.',
    mandatorySystems: ['V-Pass', 'VMS', 'AIS(일부)'],
  },
  {
    id: 'merchant',
    name: '상선',
    examples: '컨테이너선, 유조선, 벌크선, 여객선, RO-RO선',
    regulatingBodies: ['해양수산부', '해양경찰', '항만당국', 'IMO(기국)'],
    keyLaws: ['해운법', 'IMO SOLAS Ch.V', 'ISPS Code', 'LRIT 규정'],
    surveillanceNotes:
      '300GT 이상 국제항해 선박은 AIS·LRIT·SSAS가 의무입니다. 해운사는 추가로 위성 통신 단말기를 운항 관리에 사용합니다. 항만 입항 시 MTIS 등으로 위치·화물 정보를 보고합니다.',
    mandatorySystems: ['AIS', 'LRIT', 'SSAS', 'VHF/DSC'],
  },
  {
    id: 'government',
    name: '공무선',
    examples: '해경 순찰함, 해양경비정, 수산지도선, 등대보급선',
    regulatingBodies: ['해양경찰', '해양수산부', '각 부처'],
    keyLaws: ['해양경찰법', '수산업법(지도선)', '내부 운용 규정'],
    surveillanceNotes:
      '공무 목적 선박은 민간 선박과 다른 통신·추적 체계를 사용하며, 국가 안보·단속 업무에 최적화된 장비를 탑재합니다.',
    mandatorySystems: ['자체 관제망', 'AIS(일부)', 'VHF/DSC'],
  },
  {
    id: 'leisure',
    name: '레저선',
    examples: '요트, 레저낚시어선, 카약·소형 모터보트',
    regulatingBodies: ['해양경찰', '지방해양수산청', '해양안전본부'],
    keyLaws: ['해상안전법', '수상레저안전법', '소형선박 안전검사 규정'],
    surveillanceNotes:
      '톤수·항해 구역에 따라 AIS 의무 여부가 달라집니다. 소형 레저선은 VHF 휴대용만으로 충분한 경우가 많으나, 연안 사고 대응을 위해 점차 위치 보고 요구가 확대되고 있습니다.',
    mandatorySystems: ['VHF(일부)', 'AIS(대형)'],
  },
  {
    id: 'military',
    name: '군함',
    examples: '해군 전투함, 호위함, 잠수함, 군 보조함',
    regulatingBodies: ['국방부', '해군'],
    keyLaws: ['국제해양법(군함 면제 조항)', '군사 기밀 관련 법률'],
    surveillanceNotes:
      '군함은 일반적으로 AIS·LRIT 등 민간 관제 체계에서 면제되거나 제한적으로 운용됩니다. 민간 관제망과 별도의 군사 통신·추적 체계를 사용합니다.',
    mandatorySystems: ['군 전용 통신망'],
  },
]

export const legalStatuses: LegalStatus[] = [
  {
    id: 'flag',
    name: '국적선',
    definition: '한국 국기를 단고 한국 국적을 가진 선박입니다. 기국(Flag State)이 안전·보안·환경 기준의 1차 책임을 집니다.',
    analogy: '한국 주민등록증을 가진 국민처럼, 등록국가의 법과 보호를 받습니다.',
    flagStateRole: 'SOLAS·어업법 등 국적국 법률에 따른 의무 장비 부과, 선급 검사, 선원 자격 관리',
    coastalStateRole: '영해·EEZ 내에서 어업·해양오염·안전 규정 집행',
    portStateRole: '외국 항만 입항 시 해당 항만국 검사 대상',
    reportingObligations: 'VMS·V-Pass·LRIT·AIS 등 국적국 및 항해 구역에 따른 보고 의무',
  },
  {
    id: 'bareboat',
    name: '나용선',
    definition:
      '선체 소유자와 운항 책임자가 분리된 선박입니다. 등록국(국적)과 실질 운항국이 다를 수 있어 관제 책임이 복잡해집니다.',
    analogy: '집 주소(등록지)와 실제 거주지(운항지)가 다른 것처럼, 두 국가의 규제가 겹칠 수 있습니다.',
    flagStateRole: '선박 등록·국적 유지, LRIT·AIS 등 국제 의무 장비 기준 적용',
    coastalStateRole: '운항 해역이 속한 연안국의 어업·환경 규정 적용',
    portStateRole: '입항 항만국의 PSC(항만국 통제) 검사 대상',
    reportingObligations: '기국·운항국·항만국 각각의 보고 요구에 동시 대응 필요',
  },
  {
    id: 'foreign',
    name: '외국선',
    definition: '외국 국적을 가진 선박으로, 한국 연안·항만에서 운항하거나 입항하는 선박입니다.',
    analogy: '외국인 방문객처럼, 자국 법도 따르지만 방문국(연안국·항만국) 규정도 준수해야 합니다.',
    flagStateRole: '선박 국적국의 안전·보안 기준 적용 (기국 책임)',
    coastalStateRole: '한국 EEZ·영해 내 어업 금지 구역, 해양보호구역 준수 집행',
    portStateRole: '한국 항만 입항 시 MTIS 보고, PSC 검사, ISPS 보안 검증',
    reportingObligations: '입항 전 위치·화물 보고, LRIT은 기국으로, 연안 통과 시 AIS 감시',
  },
  {
    id: 'stateless',
    name: '무국적선',
    definition: '유효한 국적이 없거나 국적을 허위 표시한 선박입니다. 국제법상 가장 엄격한 관리·단속 대상입니다.',
    analogy: '신분증 없이 활동하는 것과 같아, 어떤 국가의 보호도 받지 못하고 모든 국가가 단속할 수 있습니다.',
    flagStateRole: '기국 책임 없음 — 선박 소유·운항자에게 직접 책임',
    coastalStateRole: '연안국이 영해 내 억류·검역·조사 권한 행사',
    portStateRole: '항만 입항 거부 또는 특별 검사',
    reportingObligations: '정상 보고 의무 이행 불가 → 불법조업·밀수·IUU 어업 주요 대상',
  },
]

export const surveillanceMatrix: SurveillanceMatrixRow[] = [
  {
    shipCategoryId: 'fishing',
    shipCategory: '원양 어선 (국적선)',
    legalStatus: '국적선',
    mandatorySystems: ['VMS', 'AIS(일부)'],
    optionalSystems: ['위성 통신 단말기'],
    regulatingAuthority: '해양수산부',
  },
  {
    shipCategoryId: 'fishing',
    shipCategory: '연안 어선 (국적선)',
    legalStatus: '국적선',
    mandatorySystems: ['V-Pass', 'VHF'],
    optionalSystems: ['AIS'],
    regulatingAuthority: '해양수산부·지방청',
  },
  {
    shipCategoryId: 'merchant',
    shipCategory: '국제항해 상선',
    legalStatus: '국적선/나용선',
    mandatorySystems: ['AIS', 'LRIT', 'SSAS', 'VHF/DSC'],
    optionalSystems: ['위성 통신 단말기', 'HF/SSB'],
    regulatingAuthority: '해양수산부·IMO',
  },
  {
    shipCategoryId: 'merchant',
    shipCategory: '외국 국적 상선 (입항)',
    legalStatus: '외국선',
    mandatorySystems: ['AIS', 'LRIT(기국 보고)'],
    optionalSystems: ['위성 통신 단말기'],
    regulatingAuthority: '항만당국·해양경찰',
  },
  {
    shipCategoryId: 'leisure',
    shipCategory: '레저선',
    legalStatus: '국적선',
    mandatorySystems: ['VHF(일부)'],
    optionalSystems: ['AIS'],
    regulatingAuthority: '해양경찰',
  },
]

export const techNetworkTiers: TechNetworkTier[] = [
  {
    id: 'short',
    tier: '근거리망 (Short-Range)',
    range: '수십 km 이내',
    equipment: ['AIS', 'V-Pass', 'VHF/DSC', '레이더'],
    analogy: '마을 안에서 들리는 확성기 방송과 같습니다. 가까운 거리에서만 효과적입니다.',
    mechanism:
      'VHF 대역 전파가 직선 전파되어 해안·육상 기지국(수신국)이 포착합니다. 위성을 거치지 않고 기지국에서 운영국(관할 국가 기관)으로 데이터가 모인 뒤 관제 서버에 적재됩니다. AIS·V-Pass·VHF/DSC가 대표적입니다.',
    limitations:
      '지평선 제한(안테나 높이에 따라 20~50km), 신호 혼잡(AIS 충돌), 레이더는 능동 탐지(선박이 자발적으로 위치를 보내지 않음)',
    legalLink: 'SOLAS Reg.19(AIS), 한국 연안어선 V-Pass 의무, GMDSS VHF 요건',
  },
  {
    id: 'long',
    tier: '원거리망 (Long-Range)',
    range: '수천 km 이상',
    equipment: ['HF/MF SSB'],
    analogy: '전 세계 바다에서 들리는 장거리 무전기와 같습니다. 하늘(전리층)을 거울 삼아 신호를 반사합니다.',
    mechanism:
      'HF(3~30MHz)·MF 대역 SSB 무선이 전리층을 반사해 수천 km 전달됩니다. 해안 무선국·기지국이 수신한 뒤 운영국(해경·해상교통관제 등)으로 전달되고, 관제 서버에 통합됩니다. 위성 경유 없이 지상망만 사용합니다.',
    limitations:
      '전리층 상태에 따른 주야간 전파 특성 변화, 자동 위치 보고보다 음성·텍스트 통신 중심, 안테나·조작 기술 필요',
    legalLink: 'SOLAS Ch.IV (GMDSS), ITU 무선 규정, A1~A4 해역별 장비 요건',
  },
  {
    id: 'satellite',
    tier: '위성망 (Satellite)',
    range: '전 지구적',
    equipment: ['LRIT', 'VMS', 'SSAS', '위성 통신 단말기'],
    analogy: '우주에 있는 중계탑에게만 속삭이거나, 정해진 관제소에만 일기를 보내는 것과 같습니다.',
    mechanism:
      'LEO·GEO 인공위성이 중계하는 유일한 경로입니다. 선박 → 위성 → 지상 게이트웨이(Land Earth Station)를 거쳐 운영국·관제 서버로 전달됩니다. LRIT·VMS·SSAS·상용 위성 단말기가 이 경로를 사용합니다.',
    limitations: '위성 이용료 비용, 날씨·지형에 따른 신호 약화(일부), 안테나 방향 유지 필요(GEO)',
    legalLink: 'SOLAS(LRIT·SSAS), 수산업법(VMS), ISPS Code(SSAS)',
  },
]

export const policyTiers: PolicyTier[] = [
  {
    id: 'public',
    tier: '공개 관제 (Public)',
    equipment: ['AIS'],
    nature: '누구나 수신 가능한 공개 방송 (Broadcast)',
    purpose: '선박 간 충돌 예방, 해상 교통 상황 인식',
    legalBasis: 'IMO SOLAS Regulation 19 — 300GT 이상 국제항해 선박, 여객선 등 의무',
    receivers: '타 선박, 해안 기지국, AIS 지상 수신망 (보조: 위성 AIS)',
    caseExample: '싱가포르 해협에서 AIS 데이터로 실시간 해상 교통량을 공개하는 MarineTraffic 같은 서비스',
  },
  {
    id: 'private',
    tier: '비공개/업무 관제',
    equipment: ['위성 통신 단말기'],
    nature: '지정된 당사자만 수신 (Point-to-Point, 암호화)',
    purpose: '해운사 운항 관리, 선박-육상 간 업무 통신, 연료·항로 최적화',
    legalBasis: '선주·운항사 자율 도입, 용선계약(Charter Party) 요구 조건',
    receivers: '해운사 관제 센터, 선주 지정 수신국만',
    caseExample: '원양 컨테이너선이 Inmarsat FleetBroadband로 본사에 일일 운항 보고서를 전송',
  },
  {
    id: 'mandatory',
    tier: '강제 관제 (Mandatory)',
    equipment: ['LRIT', 'VMS', 'SSAS', 'V-Pass'],
    nature: '국가/국제기구가 법적으로 강제 수집 — 선박이 원치 않아도 보고',
    purpose: '해상 보안, 조난 대응, 불법 어업 단속, 출입항 관리',
    legalBasis: 'LRIT(SOLAS), VMS(수산업법), SSAS(ISPS Code), V-Pass(연안어업 규정)',
    receivers: '기국 관제 기관, 해양수산부, 해양경찰, 해군',
    caseExample: '2024년 홍해 사태 시 SSAS 자동 송신, EU waters LRIT 기반 선박 추적',
  },
]

export const multiClassificationExample = {
  title: '같은 배가 여러 분류에 동시에 속할 수 있습니다',
  ship: '대형 원양 어선 (국적선)',
  systems: ['AIS (공개)', 'VMS (강제)', '위성 단말기 (비공개)', 'VHF/DSC (근거리)'],
  explanation:
    '한 척의 원양 어선은 AIS로 주변에 위치를 공개하면서, VMS로 해양수산부에 10분마다 강제 보고하고, 해운사/어업회사 관리용 위성 단말기로 별도 운항 데이터를 전송합니다. 법적 의무와 업무 목적이 다른 통신망을 동시에 사용하는 것입니다.',
}

export const equipmentList: Equipment[] = [
  {
    id: 'ais',
    name: 'AIS 단말기 (Automatic Identification System)',
    shortName: 'AIS',
    networkGroup: 'short',
    analogy: '선박이 끊임없이 "나 여기 있어!"라고 외치는 것과 같습니다.',
    description:
      'VHF 대역(162MHz) 전파로 선박의 위치·속도·항로·선명을 주변 모든 수신자에게 2~10초 간격으로 공개 방송합니다. Class A(대형선)와 Class B(소형선)로 구분됩니다.',
    attributes: [
      { icon: 'purpose', label: '목적', value: '충돌 방지·항로 공유' },
      { icon: 'direction', label: '통신 방향', value: '선박 → 사방 (브로드캐스트)' },
      { icon: 'cost', label: '비용', value: '낮음 (상대적으로 저렴)' },
      { icon: 'security', label: '보안성', value: '공개 (누구나 수신 가능)' },
      { icon: 'receiver', label: '수신자', value: '타 선박·해안 기지국' },
    ],
  },
  {
    id: 'vpass',
    name: 'V-Pass (Vessel Pass System)',
    shortName: 'V-Pass',
    networkGroup: 'mandatory',
    analogy: '연안 어선 전용 국가 감시 태그와 같습니다. 출항하면 자동으로 나라에 알립니다.',
    description:
      '한국 연안어선에 의무 부착되는 위치발신장치로, 출입항 시간·위치를 해양수산부에 보고합니다. 임의 전원 차단이 어렵도록 설계되었습니다.',
    attributes: [
      { icon: 'purpose', label: '목적', value: '연안어업 관리·불법어업 단속' },
      { icon: 'direction', label: '통신 방향', value: '선박 → 지상 기지국 (VHF/셀룰러)' },
      { icon: 'cost', label: '비용', value: '의무 설치 (정부 지원 있음)' },
      { icon: 'security', label: '보안성', value: '강제·국가 직접 수신' },
      { icon: 'receiver', label: '수신자', value: '해양수산부·지방청' },
    ],
  },
  {
    id: 'vhf',
    name: 'VHF/DSC (Very High Frequency / Digital Selective Calling)',
    shortName: 'VHF/DSC',
    networkGroup: 'short',
    analogy: '바다 위 무전기입니다. 가까운 배와 해경에 직접 말을 걸 수 있습니다.',
    description:
      'VHF CH16(156.8MHz)을 통한 음성 통화와 DSC를 통한 디지털 조난·선택 호출. GMDSS의 핵심이며, 위치 자동 보고보다는 조난 신고·선박 간 통신에 사용됩니다.',
    attributes: [
      { icon: 'purpose', label: '목적', value: '조난 신고·선박 간 음성 통신' },
      { icon: 'direction', label: '통신 방향', value: '선박 ↔ 선박/해안국 (양방향)' },
      { icon: 'cost', label: '비용', value: '낮음' },
      { icon: 'security', label: '보안성', value: '공개 (VHF는 누구나 청취 가능)' },
      { icon: 'receiver', label: '수신자', value: '주변 선박·해안국·해경' },
    ],
  },
  {
    id: 'hf',
    name: 'HF/MF SSB (Single Side Band Radio)',
    shortName: 'HF/SSB',
    networkGroup: 'long',
    analogy: '전 세계 바다에서 들리는 장거리 무전입니다. 전리층을 거쳐 먼 곳까지 닿습니다.',
    description:
      'HF(3~30MHz)·MF 대역 SSB 무선으로 수천 km 거리 통신이 가능합니다. GMDSS A3·A4 해역에서 필수이며, 자동 위치 보고보다 음성·NBDP 텍스트 조난 통신에 주로 사용됩니다.',
    attributes: [
      { icon: 'purpose', label: '목적', value: '원거리 조난 통신 (GMDSS)' },
      { icon: 'direction', label: '통신 방향', value: '선박 ↔ 해안국 (양방향)' },
      { icon: 'cost', label: '비용', value: '중간 (장비·안테나 비용)' },
      { icon: 'security', label: '보안성', value: '공개 (주파수 공유)' },
      { icon: 'receiver', label: '수신자', value: '해안 무선국·다른 선박' },
    ],
  },
  {
    id: 'satellite',
    name: '위성 통신 단말기 (Inmarsat, Iridium)',
    shortName: '위성 단말기',
    networkGroup: 'satellite',
    analogy: '배가 위성에게만 속삭이는 비밀 전화와 같습니다.',
    description:
      'GEO(Inmarsat) 또는 LEO(Iridium) 위성망을 통해 지정된 관제 센터에만 암호화된 데이터를 전송합니다. FleetBroadband, Fleet One 등 상용 서비스가 있습니다.',
    attributes: [
      { icon: 'purpose', label: '목적', value: '원격 관제·비상 통신·업무' },
      { icon: 'direction', label: '통신 방향', value: '선박 → 위성 → 지상국 (점대점)' },
      { icon: 'cost', label: '비용', value: '높음 (위성 이용료 발생)' },
      { icon: 'security', label: '보안성', value: '암호화 (제한적 수신)' },
      { icon: 'receiver', label: '수신자', value: '지정 관제 센터만' },
    ],
  },
  {
    id: 'lrit',
    name: 'LRIT (Long Range Identification and Tracking)',
    shortName: 'LRIT',
    networkGroup: 'mandatory',
    analogy: '국적국에게만 보고하는 위성 위치 일기와 같습니다. 6시간마다 자동 제출됩니다.',
    description:
      'SOLAS에 따라 300GT 이상 국제항해 선박이 의무 탑재합니다. Inmarsat-C 등 GEO 위성으로 6시간 간격 위치를 기국(Flag State)에 보고하며, 연안국도 협정에 따라 접근 가능합니다.',
    attributes: [
      { icon: 'purpose', label: '목적', value: '장거리 선박 식별·추적' },
      { icon: 'direction', label: '통신 방향', value: '선박 → 위성 → 기국 DC (Data Centre)' },
      { icon: 'cost', label: '비용', value: '의무 (선주 부담)' },
      { icon: 'security', label: '보안성', value: '국가 기관만 접근' },
      { icon: 'receiver', label: '수신자', value: '기국·협정 연안국' },
    ],
  },
  {
    id: 'vms',
    name: 'VMS (Vessel Monitoring System)',
    shortName: 'VMS',
    networkGroup: 'mandatory',
    analogy: '국가가 원양어선에 부착한 끌 수 없는 GPS 태그입니다.',
    description:
      '해양수산부가 원양어선에 의무 탑재를 지시합니다. Orbcomm 등 LEO 위성망으로 10분 단위 위치를 정부 서버에 전송하며, 전원 차단·변조가 불가능합니다.',
    attributes: [
      { icon: 'purpose', label: '목적', value: '불법어업 단속·어업 관리' },
      { icon: 'direction', label: '통신 방향', value: '선박 → LEO 위성 → 정부 서버' },
      { icon: 'cost', label: '비용', value: '의무 (정부·선주 분담)' },
      { icon: 'security', label: '보안성', value: '강제·변조 불가' },
      { icon: 'receiver', label: '수신자', value: '해양수산부' },
    ],
  },
  {
    id: 'ssas',
    name: 'SSAS (Ship Security Alert System)',
    shortName: 'SSAS',
    networkGroup: 'mandatory',
    analogy: '해적이 몰래 누를 수 없는 배의 비상 벨입니다.',
    description:
      'ISPS Code에 따라 국제 항해 선박에 의무 탑재됩니다. 해적 침입 시 승무원이 은밀하게 작동하면 Inmarsat으로 기국 해경·해군에 비상 위치가 자동 송신됩니다.',
    attributes: [
      { icon: 'purpose', label: '목적', value: '해적·테러 대응' },
      { icon: 'direction', label: '통신 방향', value: '선박 → GEO 위성 → 해경/해군' },
      { icon: 'cost', label: '비용', value: '의무 (SOLAS/ISPS)' },
      { icon: 'security', label: '보안성', value: '은밀 송신 (외부 표시 없음)' },
      { icon: 'receiver', label: '수신자', value: '기국 해경·해군·SSO' },
    ],
  },
]

export const equipmentGroupLabels: Record<EquipmentNetworkGroup, string> = {
  short: '근거리망',
  long: '원거리망',
  satellite: '위성망',
  mandatory: '강제 관제',
}

export const compareRows: CompareRow[] = [
  { label: '통신 방향', ais: '사방 브로드캐스트 (VHF)', satellite: '점대점 암호화 채널', mandatory: '국가 지정 서버로만' },
  { label: '수신자', ais: '누구나 (공개)', satellite: '지정 관제 센터만', mandatory: '기국·해양수산부·해경' },
  { label: '보안 등급', ais: '낮음 (공개 신호)', satellite: '높음 (암호화)', mandatory: '최고 (법적 강제·은밀)' },
  { label: '의무 여부', ais: '대형 선박 의무 (SOLAS)', satellite: '선택·업무용', mandatory: '법적 의무 (국가별 상이)' },
  { label: '비용', ais: '저렴', satellite: '비쌈 (위성 이용료)', mandatory: '의무 부담 (선주·국가)' },
  { label: '주요 활용처', ais: '충돌 방지·해상 교통', satellite: '원양 관제·비상 통신', mandatory: '어업단속·해적대응·LRIT' },
]

export const journeyPaths: JourneyPath[] = [
  {
    id: 'vhf',
    label: '근거리 (VHF/AIS)',
    description:
      '위성 없이 해안·육상 기지국이 직접 수신 → 운영국으로 집계 → 관제 서버. AIS·V-Pass·VHF/DSC 경로입니다.',
  },
  {
    id: 'hf',
    label: '원거리 (HF/SSB)',
    description:
      '위성 없이 해안 무선국(기지국)이 HF/MF 신호 수신 → 운영국(해경·구조조정) → 관제 서버. GMDSS 경로입니다.',
  },
  {
    id: 'satellite',
    label: '위성 (LEO/GEO)',
    description:
      '선박 → 인공위성 → 지상 게이트웨이 → 운영국/관제 서버. LRIT·VMS·SSAS·상용 위성 단말기만 이 경로를 사용합니다.',
  },
]

export const journeySteps: JourneyStep[] = [
  {
    id: 1,
    title: '선박 단말기',
    subtitle: '데이터 패키지 생성 & 전파 발사',
    description:
      'GNSS(GPS 등) 위성으로부터 위도·경도를 수신하고, 장비 고유 ID(MMSI·IMO 번호 등)와 함께 데이터 패키지를 생성한 뒤 전파를 발사합니다.',
    detail:
      '근거리: AIS는 VHF(162MHz), V-Pass는 VHF/셀룰러. 원거리: HF/MF SSB(3~30MHz). 위성: L/Ku/C 밴드. 같은 위치 데이터라도 전송 경로·수신자·법적 성격이 완전히 다릅니다.',
  },
  {
    id: 2,
    title: '중간 수신·전달',
    subtitle: '기지국 또는 위성 경유',
    description:
      '근거리·원거리망은 기지국(해안 수신국·무선국)을 거치고, 위성망만 인공위성을 경유합니다. 이 단계에서 전송 매체가 결정됩니다.',
    detail:
      '근거리/원거리: 선박 → 기지국 → 운영국. 위성: 선박 → 위성 → 지상 게이트웨이. 경로별 상세는 위 탭을 선택해 확인하세요.',
  },
  {
    id: 3,
    title: '운영국 / 지상 게이트웨이',
    subtitle: '국가 관할 기관 또는 위성 지상국',
    description:
      '기지국·게이트웨이에서 넘어온 데이터가 운영국(관할 정부 기관)으로 집계됩니다. 신호 분리·해독·검증이 이 단계에서 이루어집니다.',
  },
  {
    id: 4,
    title: '관제 서버 & 사용자',
    subtitle: '위치 표출 & 의사결정',
    description:
      '인터넷망을 통해 정부 관제 시스템(VMS·LRIT DC·해경 상황실) 또는 해운사 대시보드에 위치가 표출됩니다. 어업 단속, 해적 대응, 운항 최적화 등에 활용됩니다.',
  },
]

export const darkVesselIntro =
  '법적 의무 장비(AIS·VMS·LRIT·V-Pass)를 의도적으로 끄거나 변조하는 것은 대부분 국가에서 불법입니다. "Dark Vessel(숨은 배)" 탐지는 이러한 신호 소실을 1차 단서로 삼아 다중 센서로 교차 검증합니다.'

export const darkVesselTimeline: TimelineItem[] = [
  {
    id: 1,
    title: 'AIS/VMS 신호 소실 감지',
    description:
      '관제 시스템이 AIS·VMS·LRIT 신호가 갑자기 사라지거나 비정상 패턴을 보이는 것을 감지합니다. 의도적 전원 차단, 신호 변조, 스푸핑이 의심되며, 이는 불법조업·제재 회피·밀수의 전형적 징후입니다.',
  },
  {
    id: 2,
    title: 'SAR 위성 탐지',
    description:
      '합성개구레이더(SAR) 위성이 야간·악천후에도 마이크로파로 선체를 탐지합니다. AIS 없이도 배의 실루엣·항적을 포착할 수 있으며, Sentinel-1·Capella 등 상용·공공 위성이 활용됩니다.',
  },
  {
    id: 3,
    title: '광학 위성 교차 검증',
    description:
      'SAR로 포착된 위치에 고해상도 광학 위성 이미지를 촬영하여 선박 존재·선종을 교차 검증합니다. 오탐을 줄이고 법적 증거를 확보합니다.',
  },
  {
    id: 4,
    title: '당국 통보 & 대응',
    description:
      '선박 존재가 확인되면 해경·해군·어업 관리 당국에 통보됩니다. EU는 LRIT·AIS·위성 AIS 융합으로 IUUF 어업 단속에, 한국은 VMS·V-Pass·AIS 통합 관제로 불법어업을 추적합니다.',
  },
]

export const caseStudies: CaseStudy[] = [
  {
    title: '불법 조업 단속',
    context:
      '남대서양에서 AIS를 끄고 불법 어획을 시도한 외국어선이 VMS 신호 소실과 SAR 위성 탐지를 통해 추적되었습니다.',
    outcome:
      '광학 위성으로 선박 확인 후 공해상에서 나포·검거. VMS 의무 장비 우회 시도가 불법임이 입증된 사례입니다.',
  },
  {
    title: '홍해 해적 대응 (2024)',
    context:
      '2024년 홍해 사태 당시 다수 선박이 해적 위협에 노출되었고, SSAS를 통해 구조 요청이 자동 송신된 사례가 보고되었습니다.',
    outcome:
      '선원이 직접 신호를 보내지 않아도 SSAS가 해경·해군에 비상 위치를 전달하여 신속한 대응이 가능했습니다.',
  },
  {
    title: 'EU LRIT 기반 선박 추적',
    context:
      'EU 회원국은 LRIT Data Centre를 통해 자국 국적 선박뿐 아니라 협정에 따른 외국 선박의 위치에도 접근할 수 있습니다.',
    outcome:
      '지중해·대서양에서 LRIT·AIS·위성 AIS를 융합하여 불법 어업·제재 회피 선박을 식별하는 데 활용됩니다.',
  },
]

export const regulatorySystems: RegulatorySystem[] = [
  {
    id: 'vms',
    name: 'VMS',
    fullName: '어선위치발신장치 (Vessel Monitoring System)',
    analogy: '국가가 원양어선에 부착한 끌 수 없는 GPS 태그입니다.',
    description:
      '해양수산부가 원양어선에 의무 탑재를 지시합니다. Orbcomm 등 LEO 위성망을 통해 정부 서버에 10분 단위로 위치를 보고하며, 임의 조작·전원 차단이 불가능합니다.',
    features: [
      '원양어선 의무 탑재 (해양수산부)',
      '10분 단위 자동 위치 보고',
      '전원 차단·변조 방지 설계',
      '불법 조업 단속에 활용',
    ],
  },
  {
    id: 'ssas',
    name: 'SSAS',
    fullName: '선박보안경보장치 (Ship Security Alert System)',
    analogy: '해적이 몰래 누를 수 없는 배의 비상 벨입니다.',
    description:
      'IMO SOLAS·ISPS Code에 따라 국제 항해 선박에 의무 탑재됩니다. 해적 침입 시 Inmarsat GEO 위성으로 해경·해군에 비상 위치가 자동 송신됩니다.',
    features: [
      '국제 항해 선박 의무 (IMO SOLAS/ISPS)',
      '해적 침입 시 자동 비상 송신',
      '외부 노출 없는 은밀한 알림',
      '2024 홍해 사태 등 실전 활용',
    ],
  },
  {
    id: 'lrit',
    name: 'LRIT',
    fullName: '장거리 식별추적시스템 (Long Range Identification and Tracking)',
    analogy: '국적국에게만 보고하는 6시간 간격 위성 위치 일기입니다.',
    description:
      'SOLAS Regulation V/19-1에 따라 300GT 이상 국제항해 화물선·여객선 등에 의무 탑재됩니다. 기국(Flag State) Data Centre로 6시간마다 위치가 보고되며, 연안국도 협정에 따라 접근 가능합니다.',
    features: [
      '300GT+ 국제항해 선박 의무',
      '6시간 간격 자동 위치 보고',
      '기국 DC 중심, 연안국 협정 접근',
      'EU·미국 등 광역 해역 관제에 활용',
    ],
  },
  {
    id: 'vpass',
    name: 'V-Pass',
    fullName: '어선출입항보고시스템 (Vessel Pass System)',
    analogy: '연안 어선이 출항할 때마다 국가에 자동으로 알리는 출입국 스탬프입니다.',
    description:
      '한국 연안어선에 의무 부착되며, 출입항 시간·위치를 해양수산부에 실시간 보고합니다. 불법어업·무허가 출항 단속에 핵심 역할을 합니다.',
    features: [
      '연안어선 의무 (해양수산부)',
      '출입항·위치 실시간 보고',
      'VHF/이동통신 기반 근거리망',
      '연안 불법어업 단속',
    ],
  },
]

export const surveillanceConclusion = {
  title: '다층 관제망으로 완성되는 해상 국가 관제',
  layers: [
    { label: 'AIS', type: '공개', description: '누구나 수신 가능한 위치 방송 (근거리)' },
    { label: '위성 단말기', type: '비공개', description: '관제 센터만 수신하는 암호화 채널' },
    { label: 'LRIT·VMS·SSAS·V-Pass', type: '강제', description: '국가가 법적으로 강제 수집' },
    { label: 'HF/SSB', type: '원거리', description: 'GMDSS 조난 통신 (음성·텍스트)' },
    { label: '위성 AIS·SAR', type: '수동', description: '국가·민간 위성으로 수동 탐지' },
  ],
  summary:
    '국가 관제는 단일 장비가 아닌 다층 망의 조합입니다. 공개(AIS) + 비공개(위성단말기) + 강제(LRIT·VMS·SSAS·V-Pass) + 원거리(HF/GMDSS) + 수동탐지(위성 AIS·SAR)가 겹쳐져, 선박 종류·법적 지위·항해 구역에 따라 다른 관제 체계가 적용됩니다.',
}

export const footerContent = {
  summary: [
    '국가 관제는 [법적 근거]와 [기술적 구현] 두 축으로 이해해야 합니다 — 선박 종류·법적 지위에 따라 의무 장비가 달라집니다.',
    '통신망은 근거리·원거리(기지국→운영국→관제서버)와 위성(위성→지상국→관제서버)으로 구분됩니다.',
    '운영 목적에 따라 공개 관제(AIS), 비공개 관제(위성단말기), 강제 관제(LRIT·VMS·SSAS·V-Pass)로 나뉩니다.',
    '한 척의 선박이 여러 분류·장비를 동시에 사용할 수 있으며, 이것이 현대 해상 관제의 복잡성입니다.',
    '의무 장비를 끈 불법 선박(Dark Vessel)은 SAR·광학 위성으로 교차 탐지됩니다.',
  ],
  references: [
    { label: 'IMO SOLAS 협약', url: 'https://www.imo.org/' },
    { label: '해양수산부', url: 'https://www.mof.go.kr/' },
    { label: 'Inmarsat 해상 통신', url: 'https://www.inmarsat.com/' },
    { label: 'IMO LRIT 안내', url: 'https://www.imo.org/' },
  ],
  credit: 'Maritime Tracking Guide — 해양 통신 교육용 인터랙티브 웹사이트',
}
