import { AppShell } from "@/components/dashboard/app-shell"
import { BitcoinBar } from "@/components/dashboard/bitcoin-bar"
import { BriefingBanner } from "@/components/dashboard/briefing-banner"
import { KeyIndicators } from "@/components/dashboard/key-indicators"
import { RankList } from "@/components/dashboard/rank-list"
import { UserMenu } from "@/components/dashboard/user-menu"
import { Watchlist } from "@/components/dashboard/watchlist"
import {
  domesticIndicators,
  lastUpdated,
  sectorTop,
  themeTop,
  usIndicators,
} from "@/lib/market-data"
import { createClient } from "@/lib/supabase/server"

export default async function Page() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 미들웨어가 비로그인 진입을 막아주지만, 타입 안전을 위해 fallback 처리
  const email = user?.email ?? ""

  // 닉네임이 있으면 우선 사용, 없으면 이메일 앞부분
  const { data: profile } = user
    ? await supabase.from("profiles").select("nickname").eq("id", user.id).single()
    : { data: null }
  const displayName = profile?.nickname || email.split("@")[0] || "Guest"

  return (
    <AppShell>
      <div className="px-5 py-7 md:px-8 lg:px-10">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white drop-shadow-md md:text-5xl">
              Good morning, {displayName} :)
            </h1>
            <p className="mt-1.5 text-sm text-white/80 text-pretty">
              오늘의 시장을 한눈에 확인하세요 · {lastUpdated} 기준
            </p>
          </div>
          <UserMenu email={email} />
        </header>

        <div className="flex flex-col gap-6">
          <BriefingBanner />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <KeyIndicators title="국내 시장" badge="장중" items={domesticIndicators} />
            <KeyIndicators title="미국 시장" badge="06.15 마감" items={usIndicators} />
          </div>

          <BitcoinBar />

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
