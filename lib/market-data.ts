export const lastUpdated = "2026.06.16 15:25"

export type NewsItem = { title: string }

export const mainNews: NewsItem[] = [
  { title: "“삼성이 보스턴다이내믹스 주주로?”…한투證, IPO 시나리오 제시" },
  { title: "한국 버거킹 매각 3년 만에 재시동" },
  { title: "美 풍력발전 규제 해소 기대…씨에스윈드 30% 급등 [매경 자이언트]" },
  { title: "교보증권, 11호 종투사 진입 총력전…교보생명 지원 '관건'" },
  { title: "화물 운임 덕 봤는데…대한항공, 종전 호재에도 '고민'" },
  { title: "금감원, '스페이스X O주 배정' 미래에셋 검사 확대" },
]

export type IndexQuote = {
  name: string
  value: string
  change: string
  rate: string
  direction: "up" | "down"
}

export const indices: IndexQuote[] = [
  { name: "코스피", value: "8,718.16", change: "172.18", rate: "+2.01%", direction: "up" },
  { name: "코스닥", value: "1,019.43", change: "14.60", rate: "-1.41%", direction: "down" },
  { name: "코스피200", value: "1,389.89", change: "29.63", rate: "+2.18%", direction: "up" },
]

// Intraday sample points for the KOSPI chart (09:00 ~ 15:25)
export const kospiSeries: number[] = [
  8580, 8602, 8595, 8560, 8538, 8546, 8590, 8640, 8662, 8651, 8678, 8705, 8720,
  8742, 8758, 8731, 8709, 8716, 8688, 8702, 8695, 8711, 8724, 8718,
]

export const kospiAxis = {
  high: "8,774.42",
  mid1: "8,711.75",
  mid2: "8,649.08",
  mid3: "8,586.40",
  low: "8,523.73",
}

export const investorFlow = [
  { label: "개인", value: "-20,130", direction: "down" as const },
  { label: "외국인", value: "+13,806", direction: "up" as const },
  { label: "기관", value: "+6,845", direction: "up" as const },
]

export const breadth = { upLimit: 5, up: 514, flat: 33, down: 370, downLimit: 0 }

export type Stock = {
  name: string
  price: string
  change: string
  rate: string
  direction: "up" | "down"
}

export const topStocks: Stock[] = [
  { name: "KODEX 200선물인버…", price: "72", change: "2", rate: "-2.70%", direction: "down" },
  { name: "KODEX 인버스", price: "908", change: "21", rate: "-2.26%", direction: "down" },
  { name: "KODEX SK하이닉스단…", price: "29,055", change: "2,245", rate: "+8.37%", direction: "up" },
  { name: "KODEX 삼성전자단일…", price: "26,515", change: "830", rate: "+3.23%", direction: "up" },
  { name: "TIGER SK하이닉스단일…", price: "24,715", change: "1,765", rate: "+7.69%", direction: "up" },
  { name: "TIGER 200선물인버스…", price: "77", change: "3", rate: "-3.75%", direction: "down" },
  { name: "TIGER 삼성전자단일종…", price: "24,420", change: "745", rate: "+3.15%", direction: "up" },
  { name: "SOL SK하이닉스선물…", price: "10,930", change: "1,020", rate: "-8.54%", direction: "down" },
  { name: "대우건설", price: "27,450", change: "4,550", rate: "+19.87%", direction: "up" },
  { name: "TIGER 미국S&P500", price: "28,370", change: "150", rate: "+0.53%", direction: "up" },
  { name: "KODEX 코스닥150레…", price: "12,670", change: "750", rate: "-5.59%", direction: "down" },
  { name: "JW신약", price: "1,798", change: "23", rate: "+1.30%", direction: "up" },
  { name: "KODEX 미국S&P500", price: "25,865", change: "130", rate: "+0.51%", direction: "up" },
  { name: "티웨이홀딩스", price: "339", change: "23", rate: "-6.35%", direction: "down" },
  { name: "KODEX 2차전지산업레…", price: "1,764", change: "38", rate: "-2.11%", direction: "down" },
]

// Previous-day US market close (06.15 현지 마감 기준)
export const usMarketDate = "06.15 (현지 마감)"

export type UsIndex = {
  name: string
  value: string
  change: string
  rate: string
  direction: "up" | "down"
}

export const usMarkets: UsIndex[] = [
  { name: "다우존스", value: "44,382.79", change: "327.74", rate: "+0.74%", direction: "up" },
  { name: "나스닥", value: "20,167.45", change: "138.51", rate: "-0.68%", direction: "down" },
  { name: "S&P 500", value: "6,045.26", change: "23.18", rate: "+0.38%", direction: "up" },
  { name: "필라델피아 반도체", value: "5,312.88", change: "94.05", rate: "-1.74%", direction: "down" },
]

// PRD 핵심 지표: 코스피/코스닥, 나스닥/S&P500, 원/달러 환율, 미국 10년물 금리
export type KeyIndicator = {
  name: string
  sub: string
  value: string
  change: string
  rate: string
  direction: "up" | "down"
}

export const keyIndicators: KeyIndicator[] = [
  { name: "코스피", sub: "KOSPI · 장중", value: "8,718.16", change: "172.18", rate: "+2.01%", direction: "up" },
  { name: "코스닥", sub: "KOSDAQ · 장중", value: "1,019.43", change: "14.60", rate: "-1.41%", direction: "down" },
  { name: "나스닥", sub: "NASDAQ · 06.15 마감", value: "20,167.45", change: "138.51", rate: "-0.68%", direction: "down" },
  { name: "S&P 500", sub: "06.15 마감", value: "6,045.26", change: "23.18", rate: "+0.38%", direction: "up" },
  { name: "원/달러 환율", sub: "USD/KRW · 하나은행", value: "1,514.20", change: "1.30", rate: "-0.09%", direction: "down" },
  { name: "미국 국채 10년물", sub: "US 10Y Treasury · 06.15", value: "4.38%", change: "0.04", rate: "+0.92%", direction: "up" },
]

// 국내 시장 그룹 (장중 기준)
export const domesticIndicators: KeyIndicator[] = [
  { name: "코스피", sub: "KOSPI · 장중", value: "8,718.16", change: "172.18", rate: "+2.01%", direction: "up" },
  { name: "코스닥", sub: "KOSDAQ · 장중", value: "1,019.43", change: "14.60", rate: "-1.41%", direction: "down" },
  { name: "코스피200", sub: "KOSPI200 · 장중", value: "1,389.89", change: "29.63", rate: "+2.18%", direction: "up" },
  { name: "원/달러 환율", sub: "USD/KRW · 하나은행", value: "1,514.20", change: "1.30", rate: "-0.09%", direction: "down" },
]

// 미국 시장 그룹 (06.15 현지 마감 기준)
export const usIndicators: KeyIndicator[] = [
  { name: "다우존스", sub: "DOW · 06.15 마감", value: "44,382.79", change: "327.74", rate: "+0.74%", direction: "up" },
  { name: "나스닥", sub: "NASDAQ · 06.15 마감", value: "20,167.45", change: "138.51", rate: "-0.68%", direction: "down" },
  { name: "S&P 500", sub: "S&P 500 · 06.15 마감", value: "6,045.26", change: "23.18", rate: "+0.38%", direction: "up" },
  { name: "미국 국채 10년물", sub: "US 10Y Treasury · 06.15", value: "4.38%", change: "0.04", rate: "+0.92%", direction: "up" },
]

// 비트코인 시세 (USD / KRW)
export const bitcoin = {
  usd: "$104,820",
  krw: "₩158,694,000",
  rate: "+2.74%",
  change: "$2,790",
  direction: "up" as const,
  sub: "BTC · 실시간",
}

// 즐겨찾는 종목/ETF 위젯
export type WatchItem = {
  name: string
  ticker: string
  price: string
  rate: string
  direction: "up" | "down"
}

export const watchlist: WatchItem[] = [
  { name: "삼성전자", ticker: "005930", price: "84,200", rate: "+3.23%", direction: "up" },
  { name: "SK하이닉스", ticker: "000660", price: "241,500", rate: "+7.69%", direction: "up" },
  { name: "TIGER 미국S&P500", ticker: "360750", price: "28,370", rate: "+0.53%", direction: "up" },
  { name: "KODEX 미국나스닥100", ticker: "379810", price: "23,140", rate: "-0.61%", direction: "down" },
  { name: "NVIDIA", ticker: "NVDA", price: "$132.40", rate: "-1.74%", direction: "down" },
]

export type RankGroup = {
  rank: number
  leader: { name: string; rate: string }
  members: { name: string; rate: string }[]
}

export const sectorTop: RankGroup[] = [
  {
    rank: 1,
    leader: { name: "우주항공과국방", rate: "+9.15%" },
    members: [
      { name: "LIG디펜스앤..", rate: "+19.29%" },
      { name: "RF시스템즈", rate: "+16.43%" },
    ],
  },
  {
    rank: 2,
    leader: { name: "에너지장비및서..", rate: "+9.02%" },
    members: [
      { name: "씨에스윈드", rate: "+29.83%" },
      { name: "SK오션플랜트", rate: "+26.04%" },
    ],
  },
  {
    rank: 3,
    leader: { name: "무역회사와판매..", rate: "+7.74%" },
    members: [
      { name: "포스코인터내..", rate: "+10.02%" },
      { name: "GS글로벌", rate: "+7.85%" },
    ],
  },
]

export const themeTop: RankGroup[] = [
  {
    rank: 1,
    leader: { name: "건설 대표주", rate: "+7.22%" },
    members: [
      { name: "대우건설", rate: "+19.87%" },
      { name: "DL이앤씨", rate: "+13.16%" },
    ],
  },
  {
    rank: 2,
    leader: { name: "풍력에너지", rate: "+6.21%" },
    members: [
      { name: "씨에스윈드", rate: "+29.83%" },
      { name: "씨에스베어..", rate: "+29.79%" },
    ],
  },
  {
    rank: 3,
    leader: { name: "생명보험", rate: "+4.70%" },
    members: [
      { name: "미래에셋생..", rate: "+12.57%" },
      { name: "한화생명", rate: "+5.71%" },
    ],
  },
]

export type RateRow = {
  label: string
  value: string
  change: string
  direction: "up" | "down" | "flat"
}

export const fxOfficial: RateRow[] = [
  { label: "미국 USD", value: "1,514.20", change: "1.30", direction: "down" },
  { label: "일본 JPY (100엔)", value: "944.75", change: "0.43", direction: "down" },
  { label: "유럽연합 EUR", value: "1,752.76", change: "3.40", direction: "down" },
  { label: "중국 CNY", value: "223.92", change: "0.30", direction: "down" },
]

export const fxGlobal: RateRow[] = [
  { label: "달러/일본 엔 (06.15)", value: "160.1300", change: "0.10", direction: "down" },
  { label: "유로/달러 (06.15)", value: "1.1607", change: "0.00", direction: "up" },
  { label: "파운드/달러 (06.15)", value: "1.3439", change: "0.00", direction: "up" },
  { label: "달러인덱스 (06.15)", value: "99.3700", change: "0.11", direction: "down" },
]

export const interestRates: RateRow[] = [
  { label: "CD(91일) (06.15)", value: "2.92", change: "0.00", direction: "flat" },
  { label: "콜금리 (06.15)", value: "2.54", change: "0.01", direction: "up" },
  { label: "국고채(3년) (06.15)", value: "3.74", change: "0.06", direction: "down" },
  { label: "회사채(3년) (06.15)", value: "4.37", change: "0.06", direction: "down" },
]
