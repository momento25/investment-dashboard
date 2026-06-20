"use client"

import useSWR from "swr"
import { Sparkles } from "lucide-react"
import { lastUpdated } from "@/lib/market-data"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function BriefingBanner() {
  const { data, isLoading } = useSWR<{ briefing: string }>("/api/briefing", fetcher, {
    revalidateOnFocus: false,
  })

  return (
    <section className="glass rounded-lg p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-primary-foreground">
          <Sparkles className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-brand">오늘의 현황 브리핑</h2>
            <span className="text-xs text-muted-foreground">{lastUpdated} 기준</span>
          </div>
          {isLoading || !data ? (
            <div className="mt-2 space-y-2" aria-hidden>
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
            </div>
          ) : (
            <p className="mt-1.5 text-sm leading-relaxed text-card-foreground text-pretty">{data.briefing}</p>
          )}
        </div>
      </div>
    </section>
  )
}
