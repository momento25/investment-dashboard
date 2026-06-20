import { generateText } from "ai"
import {
  domesticIndicators,
  usIndicators,
  investorFlow,
  sectorTop,
  themeTop,
  lastUpdated,
} from "@/lib/market-data"

export const maxDuration = 30

function buildContext() {
  const dom = domesticIndicators.map((i) => `${i.name} ${i.value} (${i.rate})`).join(", ")
  const us = usIndicators.map((i) => `${i.name} ${i.value} (${i.rate})`).join(", ")
  const flow = investorFlow.map((f) => `${f.label} ${f.value}억`).join(", ")
  const sectors = sectorTop.map((g) => `${g.leader.name} ${g.leader.rate}`).join(", ")
  const themes = themeTop.map((g) => `${g.leader.name} ${g.leader.rate}`).join(", ")
  return `기준 시각: ${lastUpdated}
국내(장중): ${dom}
미국(06.15 마감): ${us}
투자자 순매수: ${flow}
업종 상위: ${sectors}
테마 상위: ${themes}`
}

export async function GET() {
  const fallback =
    "코스피가 외국인·기관 동반 순매수에 힘입어 2% 넘게 오르며 8,700선을 회복했습니다. 반면 코스닥은 약세를 보였고, 간밤 미국 증시는 나스닥이 소폭 조정받는 등 혼조세로 마감했습니다. 우주항공·방산과 건설·풍력 테마가 강세를 주도하고 있습니다."

  try {
    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4.6",
      system:
        "당신은 한국 주식 시장 비서입니다. 주어진 데이터로 오늘의 시장 현황을 2~3문장, 한 단락으로 간결하게 한국어로 브리핑하세요. 투자 권유는 하지 말고 사실 위주로 요약하세요. 인사말이나 머리말 없이 본문만 작성하세요.",
      prompt: `다음 데이터를 바탕으로 오늘의 시장 현황을 브리핑해줘.\n\n${buildContext()}`,
    })
    return Response.json({ briefing: text.trim() || fallback })
  } catch {
    return Response.json({ briefing: fallback })
  }
}
