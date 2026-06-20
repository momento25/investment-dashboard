import { Star, ChevronRight } from "lucide-react"
import { watchlist } from "@/lib/market-data"

export function Watchlist() {
  return (
    <section className="glass flex flex-col rounded-lg p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight text-card-foreground">관심 종목</h2>
        <button
          type="button"
          className="flex items-center gap-0.5 text-xs text-muted-foreground transition-colors hover:text-brand"
        >
          더보기
          <ChevronRight className="size-3.5" />
        </button>
      </div>
      <div className="flex flex-col">
        {watchlist.map((w, i) => {
          const tone = w.direction === "up" ? "text-up" : "text-down"
          return (
            <div
              key={w.ticker}
              className={`flex items-center gap-3 py-3 ${
                i !== watchlist.length - 1 ? "border-b border-border/60" : ""
              }`}
            >
              <Star className="size-4 shrink-0 fill-brand text-brand" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-card-foreground">{w.name}</p>
                <p className="text-xs text-muted-foreground">{w.ticker}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold tabular-nums text-card-foreground">{w.price}</p>
                <p className={`text-sm font-medium tabular-nums ${tone}`}>{w.rate}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
