import type { KeyIndicator } from "@/lib/market-data"

export function KeyIndicators({
  title,
  badge,
  items,
}: {
  title: string
  badge: string
  items: KeyIndicator[]
}) {
  return (
    <section className="glass rounded-lg p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight text-card-foreground text-balance">{title}</h2>
        <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
          {badge}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((k) => {
          const tone = k.direction === "up" ? "text-up" : "text-down"
          const arrow = k.direction === "up" ? "▲" : "▼"
          return (
            <div
              key={k.name}
              className="glass-inset rounded-md p-4 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-bold text-card-foreground">{k.name}</span>
                <span className={`text-sm font-semibold ${tone}`}>{k.rate}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{k.sub}</p>
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <span className={`text-2xl font-bold tabular-nums ${tone}`}>{k.value}</span>
                <span className={`text-sm font-medium tabular-nums ${tone}`}>
                  {arrow} {k.change}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
