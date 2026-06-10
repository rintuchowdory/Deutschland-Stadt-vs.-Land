export default function ScoreRing({ score, label, color }) {
  const radius = 36
  const circ = 2 * Math.PI * radius
  const dash = (score / 100) * circ

  const colorMap = {
    city: '#378ADD',
    land: '#1D9E75',
  }
  const stroke = colorMap[color] || '#888'

  const badge =
    score >= 70 ? { text: 'Gut versorgt', cls: 'text-emerald-400 bg-emerald-500/10' }
    : score >= 45 ? { text: 'Mittel',      cls: 'text-yellow-400 bg-yellow-500/10' }
    :               { text: 'Unterversorgt', cls: 'text-red-400 bg-red-500/10' }

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={radius} fill="none" stroke="#27272a" strokeWidth="8" />
        <circle
          cx="48" cy="48" r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 48 48)"
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
        <text x="48" y="52" textAnchor="middle" fontSize="20" fontWeight="500" fill={stroke} fontFamily="Inter,sans-serif">
          {score}
        </text>
      </svg>
      <div className="text-center">
        <div className="text-sm font-medium text-zinc-200">{label}</div>
        <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${badge.cls}`}>{badge.text}</span>
      </div>
    </div>
  )
}
