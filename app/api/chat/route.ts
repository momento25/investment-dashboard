import { streamText, convertToModelMessages, type UIMessage } from "ai"
import {
  keyIndicators,
  usMarkets,
  watchlist,
  investorFlow,
  sectorTop,
  themeTop,
  interestRates,
  lastUpdated,
} from "@/lib/market-data"

export const maxDuration = 30

function buildMarketContext() {
  const key = keyIndicators.map((i) => `${i.name} ${i.value} (${i.rate})`).join(", ")
  const us = usMarkets.map((i) => `${i.name} ${i.value} (${i.rate})`).join(", ")
  const flow = investorFlow.map((f) => `${f.label} ${f.value}억`).join(", ")
  const watch = watchlist.map((w) => `${w.name} ${w.price} (${w.rate})`).join(", ")
  const sectors = sectorTop.map((g) => `${g.leader.name} ${g.leader.rate}`).join(", ")
  const themes = themeTop.map((g) => `${g.leader.name} ${g.leader.rate}`).join(", ")
  const rates = interestRates.map((r) => `${r.label} ${r.value}`).join(", ")

  return `현재 시각: ${lastUpdated} (코스피/코스닥 장중, 미국 증시는 06.15 현지 마감)
핵심 지표: ${key}
미국 증시(전일 마감): ${us}
투자자 매매동향(순매수): ${flow}
관심 종목/ETF: ${watch}
업종 상위: ${sectors}
테마 상위: ${themes}
금리: ${rates}`
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4.6",
    system: `당신은 한국 주식 시장 대시보드에 내장된 친절한 금융 비서입니다.
아래 실시간 시장 데이터를 바탕으로 사용자의 질문에 한국어로 간결하고 명확하게 답하세요.
- 데이터에 근거해 사실만 전달하고, 확실하지 않은 내용은 추측이라고 밝히세요.
- 투자 권유나 매수/매도 단정은 피하고, 마지막에 투자 판단은 본인 책임이라는 점을 필요 시 짧게 덧붙이세요.
- 표나 목록이 도움이 되면 마크다운을 사용하세요.

[실시간 시장 데이터]
${buildMarketContext()}`,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
