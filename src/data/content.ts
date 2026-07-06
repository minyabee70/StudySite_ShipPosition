export type AttributeIcon = 'purpose' | 'direction' | 'cost' | 'security' | 'receiver'

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
  attributes: EquipmentAttribute[]
}

export type CompareRow = {
  label: string
  ais: string
  satellite: string
}

export type JourneyStep = {
  id: number
  title: string
  subtitle: string
  description: string
  detail?: string
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

export const introContent = {
  hook: '지금 이 순간, 세계 바다에는 10만 척의 배가 운항 중입니다.',
  question: '당신의 나라는 이 배들의 위치를 얼마나 알고 있을까요?',
  subtitle: '선박의 위치는 어떻게 수집되는가?',
}

export const equipmentList: Equipment[] = [
  {
    id: 'ais',
    name: 'AIS 단말기 (Automatic Identification System)',
    shortName: 'AIS',
    analogy: '선박이 끊임없이 "나 여기 있어!"라고 외치는 것과 같습니다.',
    description:
      'VHF 대역 전파로 선박의 위치·속도·항로를 주변 모든 수신자에게 공개 방송합니다. 충돌 방지가 핵심 목적입니다.',
    attributes: [
      { icon: 'purpose', label: '목적', value: '충돌 방지·항로 공유' },
      { icon: 'direction', label: '통신 방향', value: '선박 → 사방 (브로드캐스트)' },
      { icon: 'cost', label: '비용', value: '낮음 (상대적으로 저렴)' },
      { icon: 'security', label: '보안성', value: '공개 (누구나 수신 가능)' },
      { icon: 'receiver', label: '수신자', value: '타 선박·해안국·위성' },
    ],
  },
  {
    id: 'satellite',
    name: '위성 통신 단말기 (Inmarsat, Orbcomm, Iridium)',
    shortName: '위성 단말기',
    analogy: '배가 위성에게만 속삭이는 비밀 전화와 같습니다.',
    description:
      '위성망을 통해 지정된 관제 센터에만 암호화된 위치 데이터를 전송합니다. 해운사·정부 기관의 비공개 추적에 사용됩니다.',
    attributes: [
      { icon: 'purpose', label: '목적', value: '원격 관제·비상 통신' },
      { icon: 'direction', label: '통신 방향', value: '선박 → 위성 → 지상국 (점대점)' },
      { icon: 'cost', label: '비용', value: '높음 (위성 이용료 발생)' },
      { icon: 'security', label: '보안성', value: '암호화 (제한적 수신)' },
      { icon: 'receiver', label: '수신자', value: '지정 관제 센터만' },
    ],
  },
  {
    id: 'vms-ssas',
    name: 'VMS / SSAS',
    shortName: 'VMS / SSAS',
    analogy: '국가가 배에 부착한 "끌 수 없는 위치 태그"와 같습니다.',
    description:
      '국가 규정에 따라 의무 설치되는 장비로, 정부 기관이 직접 수신·관리합니다. 선박이 원하지 않아도 위치가 수집됩니다.',
    attributes: [
      { icon: 'purpose', label: '목적', value: '어업 단속·해적 대응' },
      { icon: 'direction', label: '통신 방향', value: '선박 → 위성 → 정부 서버' },
      { icon: 'cost', label: '비용', value: '의무 설치 (국가 부담·선주 부담)' },
      { icon: 'security', label: '보안성', value: '강제·변조 불가' },
      { icon: 'receiver', label: '수신자', value: '해양수산부·해경·해군' },
    ],
  },
]

export const compareRows: CompareRow[] = [
  { label: '통신 방향', ais: '사방 브로드캐스트 (VHF)', satellite: '점대점 암호화 채널' },
  { label: '수신자', ais: '누구나 (공개)', satellite: '지정 관제 센터만' },
  { label: '보안 등급', ais: '낮음 (공개 신호)', satellite: '높음 (암호화)' },
  { label: '의무 여부', ais: '대형 선박 의무 (SOLAS)', satellite: '선택·업무용' },
  { label: '비용', ais: '저렴', satellite: '비쌈 (위성 이용료)' },
  { label: '주요 활용처', ais: '충돌 방지·해상 교통', satellite: '원양 관제·비상 통신' },
]

export const journeySteps: JourneyStep[] = [
  {
    id: 1,
    title: '선박 단말기',
    subtitle: '데이터 패키지 생성 & 전파 발사',
    description:
      'GPS 위성으로부터 위도·경도를 수신하고, 장비 고유 ID(MMSI 등)와 함께 데이터 패키지를 생성한 뒤 전파를 발사합니다.',
    detail:
      'AIS는 VHF 대역(약 162MHz)을, 위성 단말기는 L/Ku 밴드 전파를 사용합니다. 같은 위치 데이터라도 전송 경로가 완전히 다릅니다.',
  },
  {
    id: 2,
    title: '인공위성 포착',
    subtitle: 'LEO vs GEO 위성 중계',
    description:
      '저궤도(LEO) 또는 정지궤도(GEO) 위성이 신호를 수신하고 지상국으로 중계합니다.',
    detail:
      'LEO (고도 500~1,200km): 거의 실시간 전송, 지구 전체 커버하려면 위성 수십 기 필요. GEO (고도 36,000km): 3기로 지구 대부분 커버 가능, 수백 ms 지연 발생.',
  },
  {
    id: 3,
    title: '지상 수신국 (Gateway)',
    subtitle: '안테나 수신 & 신호 처리',
    description:
      '위성이 내려보낸 신호를 거대한 포물선 안테나가 수신합니다.',
    detail:
      'AIS: 동시에 수천 척이 쏜 신호가 섞이는 신호 충돌 현상을 디지털 알고리즘으로 분리·해독합니다. 위성 단말기: 암호화된 데이터를 복호화 및 검증합니다.',
  },
  {
    id: 4,
    title: '관제 서버 & 사용자',
    subtitle: '위치 표출 & 의사결정',
    description:
      '인터넷망을 통해 정부 관제 시스템 또는 해운사 대시보드에 위치가 표출됩니다. 운항 경로 분석, 어업 단속, 해적 대응 등에 활용됩니다.',
  },
]

export const darkVesselTimeline: TimelineItem[] = [
  {
    id: 1,
    title: 'AIS 신호 소실 감지',
    description:
      '관제 시스템이 특정 선박의 AIS 신호가 갑자기 사라진 것을 감지합니다. 의도적 전원 차단, 신호 변조, 또는 불법 운항이 의심됩니다.',
  },
  {
    id: 2,
    title: 'SAR 위성 탐지',
    description:
      '합성개구레이더(SAR) 위성이 야간·악천후에도 마이크로파로 선체를 탐지합니다. AIS 없이도 배의 실루엣을 포착할 수 있습니다.',
  },
  {
    id: 3,
    title: '광학 위성 교차 검증',
    description:
      'SAR로 포착된 위치에 광학 위성 이미지를 촬영하여 선박 존재를 교차 검증합니다. 오탐을 줄이고 증거를 확보합니다.',
  },
  {
    id: 4,
    title: '당국 통보 & 대응',
    description:
      '특정 위치에 선박 존재가 확인되면 해경·해군·어업 관리 당국에 통보됩니다. 2024년 홍해 사태 당시에도 유사한 다중 센서 융합 탐지가 활용되었습니다.',
  },
]

export const caseStudies: CaseStudy[] = [
  {
    title: '불법 조업 단속',
    context:
      '남대서양에서 AIS를 끄고 불법 어획을 시도한 외국어선이 VMS 신호와 SAR 위성 탐지를 통해 추적되었습니다.',
    outcome:
      '광학 위성으로 선박 확인 후 공해상에서 나포·검거. VMS 의무 장비와 위성 감시망의 실효성이 입증된 사례입니다.',
  },
  {
    title: '홍해 해적 대응 (2024)',
    context:
      '2024년 홍해 사태 당시 다수 선박이 해적 위협에 노출되었고, SSAS를 통해 구조 요청이 자동 송신된 사례가 보고되었습니다.',
    outcome:
      '선원이 직접 신호를 보내지 않아도 SSAS가 해경·해군에 비상 위치를 전달하여 신속한 대응이 가능했습니다.',
  },
]

export const regulatorySystems: RegulatorySystem[] = [
  {
    id: 'vms',
    name: 'VMS',
    fullName: '어선위치발신장치 (Vessel Monitoring System)',
    analogy: '국가가 원양어선에 부착한 끌 수 없는 GPS 태그입니다.',
    description:
      '해양수산부가 원양어선에 의무 탑재를 지시합니다. 임의 조작·전원 차단이 불가능하며, Orbcomm 등 위성망을 통해 정부 서버에 10분 단위로 위치를 보고합니다.',
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
      'IMO SOLAS 협약에 따라 국제 항해 선박에 의무 탑재됩니다. 해적 침입 시 외부에 노출되지 않고 Inmarsat을 통해 해경·해군에 비상 위치가 자동 송신됩니다.',
    features: [
      '국제 항해 선박 의무 (IMO SOLAS)',
      '해적 침입 시 자동 비상 송신',
      '외부 노출 없는 은밀한 알림',
      '2024 홍해 사태 등 실전 활용',
    ],
  },
]

export const surveillanceConclusion = {
  title: '3중 감시망으로 완성되는 해상 관제',
  layers: [
    { label: 'AIS', type: '공개', description: '누구나 수신 가능한 위치 방송' },
    { label: '위성 단말기', type: '비공개', description: '관제 센터만 수신하는 암호화 채널' },
    { label: 'VMS / SSAS', type: '강제', description: '국가가 직접 수집·관리하는 의무 장비' },
  ],
  summary:
    '선박 자신이 원하지 않아도 국가는 VMS·SSAS를 통해 위치를 수집할 수 있습니다. AIS(공개) + 위성 단말기(비공개) + VMS/SSAS(강제)가 겹쳐져 현대 해상 관제 체계가 완성됩니다.',
}

export const footerContent = {
  summary: [
    '선박 위치는 GPS 수신 후 AIS·위성·VMS/SSAS 등 다양한 경로로 전송됩니다.',
    'AIS는 공개 방송, 위성 단말기는 암호화 채널, VMS/SSAS는 국가 강제 수집입니다.',
    'AIS를 끈 불법 선박도 SAR·광학 위성으로 탐지할 수 있습니다.',
  ],
  references: [
    { label: 'IMO SOLAS 협약', url: 'https://www.imo.org/' },
    { label: '해양수산부 VMS 안내', url: 'https://www.mof.go.kr/' },
    { label: 'Inmarsat 해상 통신', url: 'https://www.inmarsat.com/' },
  ],
  credit: 'Maritime Tracking Guide — 해양 통신 교육용 인터랙티브 웹사이트',
}
