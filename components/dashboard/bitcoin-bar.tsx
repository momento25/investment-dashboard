import { bitcoin } from "@/lib/market-data"

export function BitcoinBar() {
  const tone = bitcoin.direction === "up" ? "text-up" : "text-down"
  const arrow = bitcoin.direction === "up" ? "▲" : "▼"

  return (
    <section className="glass flex flex-col gap-4 rounded-lg p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-bold text-primary-foreground">
          B
        </span>
        <div>
          <p className="font-bold text-card-foreground">비트코인</p>
          <p className="text-xs text-muted-foreground">{bitcoin.sub}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-end sm:gap-3">
        <div className="glass-inset flex items-center justify-between gap-6 rounded-md px-4 py-3 sm:min-w-52">
          <span className="text-xs font-medium text-muted-foreground">달러 (USD)</span>
          <span className="text-lg font-bold tabular-nums text-card-foreground">{bitcoin.usd}</span>
        </div>
        <div className="glass-inset flex items-center justify-between gap-6 rounded-md px-4 py-3 sm:min-w-60">
          <span className="text-xs font-medium text-muted-foreground">원화 (KRW)</span>
          <span className="text-lg font-bold tabular-nums text-card-foreground">{bitcoin.krw}</span>
        </div>
        <div className="glass-inset flex items-center justify-center gap-2 rounded-md px-4 py-3">
          <span className={`text-sm font-semibold ${tone}`}>
            {arrow} {bitcoin.change}
          </span>
          <span className={`text-sm font-bold ${tone}`}>{bitcoin.rate}</span>
        </div>
      </div>
    </section>
  )
}
