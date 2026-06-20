import { kospiSeries, kospiAxis } from "@/lib/market-data"

const W = 460
const H = 200

function buildPaths() {
  const min = Math.min(...kospiSeries)
  const max = Math.max(...kospiSeries)
  const span = max - min || 1
  const stepX = W / (kospiSeries.length - 1)

  const points = kospiSeries.map((v, i) => {
    const x = i * stepX
    const y = H - ((v - min) / span) * (H - 16) - 8
    return [x, y] as const
  })

  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
  const area = `${line} L${W},${H} L0,${H} Z`
  return { line, area }
}

export function KospiChart() {
  const { line, area } = buildPaths()
  const gridLabels = [kospiAxis.high, kospiAxis.mid1, kospiAxis.mid2, kospiAxis.mid3, kospiAxis.low]

  return (
    <div className="relative">
      <div className="flex">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-44 w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label="코스피 일중 추이 차트"
        >
          <defs>
            <linearGradient id="kospiFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--up)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--up)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.18, 0.42, 0.66, 0.9].map((p) => (
            <line key={p} x1="0" y1={H * p} x2={W} y2={H * p} stroke="var(--border)" strokeWidth="1" />
          ))}
          <path d={area} fill="url(#kospiFill)" />
          <path d={line} fill="none" stroke="var(--up)" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
        <div className="flex w-14 shrink-0 flex-col justify-between py-1 pl-1 text-right text-[11px] text-muted-foreground">
          {gridLabels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>
      <div className="mt-1 flex justify-between pr-14 text-[11px] text-muted-foreground">
        <span>10:00</span>
        <span>12:00</span>
        <span>14:00</span>
      </div>
    </div>
  )
}
