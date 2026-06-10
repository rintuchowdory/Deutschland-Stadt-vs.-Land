export default function MetricCard({ icon, title, cityVal, landVal, cityRaw, landRaw, max, cityName, landName }) {
  const cityPct = Math.min(Math.round((cityRaw / max) * 100), 100)
  const landPct = Math.min(Math.round((landRaw / max) * 100), 100)

  return (
    <div className="card">
      <div className="text-lg mb-1">{icon}</div>
      <div className="text-xs text-zinc-500 mb-3">{title}</div>

      <div className="space-y-2.5">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-blue-400">{cityName}</span>
            <span className="text-sm font-medium text-blue-400">{cityVal}</span>
          </div>
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-city rounded-full transition-all duration-500" style={{ width: cityPct + '%' }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-emerald-400">{landName}</span>
            <span className="text-sm font-medium text-emerald-400">{landVal}</span>
          </div>
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-land rounded-full transition-all duration-500" style={{ width: landPct + '%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
