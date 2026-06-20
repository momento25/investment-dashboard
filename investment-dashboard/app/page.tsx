import { AppShell } from "@/components/dashboard/app-shell"
import { BriefingBanner } from "@/components/dashboard/briefing-banner"
import { KeyIndicators } from "@/components/dashboard/key-indicators"
import { BitcoinBar } from "@/components/dashboard/bitcoin-bar"
import { Watchlist } from "@/components/dashboard/watchlist"
import { RankList } from "@/components/dashboard/rank-list"
import { domesticIndicators, usIndicators, sectorTop, themeTop, lastUpdated } from "@/lib/market-data"

export default function Page() {
  return (
    <AppShell>
      <div className="px-5 py-7 md:px-8 lg:px-10">
        {/* Good morning greeting (stock3) */}
        <header className="mb-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white drop-shadow-md md:text-5xl">
            Good morning, Glory :)
          </h1>
          <p className="mt-1.5 text-sm text-white/80 text-pretty">
            오늘의 시장을 한눈에 확인하세요 · {lastUpdated} 기준
          </p>
        </header>

        <div className="flex flex-col gap-6">
          {/* Today briefing, right under the greeting */}
          <BriefingBanner />

          {/* Domestic vs US markets */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <KeyIndicators title="국내 시장" badge="장중" items={domesticIndicators} />
            <KeyIndicators title="미국 시장" badge="06.15 마감" items={usIndicators} />
          </div>

          {/* Bitcoin price (USD / KRW), full-width bar */}
          <BitcoinBar />

          {/* Bento: watchlist + hot sectors / themes */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Watchlist />
            <RankList title="업종 상위" groups={sectorTop} />
            <RankList title="테마 상위" groups={themeTop} />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
