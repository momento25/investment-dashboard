import { ChevronRight } from "lucide-react"
import type { RankGroup } from "@/lib/market-data"

export function RankList({ title, groups }: { title: string; groups: RankGroup[] }) {
  return (
    <section className="glass flex flex-col rounded-lg p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight text-card-foreground">{title}</h2>
        <button
          type="button"
          className="flex items-center gap-0.5 text-xs text-muted-foreground transition-colors hover:text-brand"
        >
          더보기
          <ChevronRight className="size-3.5" />
        </button>
      </div>
      <div className="flex flex-col">
        {groups.map((g, i) => (
          <div
            key={g.rank}
            className={`flex items-center gap-3 py-3 ${
              i !== groups.length - 1 ? "border-b border-border/60" : ""
            }`}
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-brand text-xs font-bold text-primary-foreground">
              {g.rank}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-card-foreground">{g.leader.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {g.members[0].name} · {g.members[1].name}
              </p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-up">{g.leader.rate}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
