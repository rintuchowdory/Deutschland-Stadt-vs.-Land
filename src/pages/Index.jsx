import { useMemo } from 'react'
import { regions, calcFairnessScore } from '../data/regions.js'

function ScoreColor({ score }) {
  if (score >= 70) return <span className="text-emerald-400">{score}</span>
  if (score >= 45) return <span className="text-yellow-400">{score}</span>
  return <span className="text-red-400">{score}</span>
}

function ScoreBadge({ score }) {
  if (score >= 70) return <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">🟢 Gut versorgt</span>
  if (score >= 45) return <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400">🟡 Durchschnitt</span>
  return <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400">🔴 Abgehängt</span>
}

export default function Index() {
  const ranked = useMemo(() =>
    regions
      .map(r => ({ ...r, score: calcFairnessScore(r) }))
      .sort((a, b) => b.score - a.score),
    []
  )

  const cityAvg = Math.round(ranked.filter(r => r.type === 'city').reduce((s, r) => s + r.score, 0) / ranked.filter(r => r.type === 'city').length)
  const landAvg = Math.round(ranked.filter(r => r.type === 'land').reduce((s, r) => s + r.score, 0) / ranked.filter(r => r.type === 'land').length)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-zinc-100 mb-2">Deutschland Fairness-Index</h1>
        <p className="text-zinc-500 text-sm max-w-xl">
          Jede Region erhält einen Score von 0–100, berechnet aus Internet, ÖPNV, Ärzteversorgung,
          Bildung und Arbeit. Gewichtet und normalisiert.
        </p>
      </div>

      {/* Summary */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="card text-center">
          <div className="text-xs text-zinc-500 mb-1">Ø Stadt-Score</div>
          <div className="text-3xl font-semibold text-blue-400">{cityAvg}</div>
          <div className="text-xs text-zinc-600 mt-1">von 100</div>
        </div>
        <div className="card text-center">
          <div className="text-xs text-zinc-500 mb-1">Gefälle</div>
          <div className="text-3xl font-semibold text-zinc-100">{cityAvg - landAvg}</div>
          <div className="text-xs text-zinc-600 mt-1">Punkte Unterschied</div>
        </div>
        <div className="card text-center">
          <div className="text-xs text-zinc-500 mb-1">Ø Land-Score</div>
          <div className="text-3xl font-semibold text-emerald-400">{landAvg}</div>
          <div className="text-xs text-zinc-600 mt-1">von 100</div>
        </div>
      </div>

      {/* Legende */}
      <div className="flex flex-wrap gap-3 mb-6 text-xs">
        <span className="flex items-center gap-1.5 text-zinc-400"><span className="w-3 h-3 rounded-sm bg-emerald-500/20 border border-emerald-500/40 inline-block" /> Score ≥ 70 — Gut versorgt</span>
        <span className="flex items-center gap-1.5 text-zinc-400"><span className="w-3 h-3 rounded-sm bg-yellow-500/20 border border-yellow-500/40 inline-block" /> Score 45–69 — Durchschnitt</span>
        <span className="flex items-center gap-1.5 text-zinc-400"><span className="w-3 h-3 rounded-sm bg-red-500/20 border border-red-500/40 inline-block" /> Score &lt; 45 — Abgehängt</span>
      </div>

      {/* Ranking */}
      <div className="space-y-2">
        {ranked.map((r, i) => (
          <div key={r.id} className="card flex items-center gap-4 hover:border-zinc-700 transition-colors">
            <div className="w-7 text-center text-sm font-mono text-zinc-600">#{i + 1}</div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-zinc-200">{r.name}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                  r.type === 'city'
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'bg-emerald-500/10 text-emerald-400'
                }`}>{r.type === 'city' ? 'Stadt' : 'Land'}</span>
              </div>
              <div className="text-xs text-zinc-600">{r.bundesland} · {r.einwohner.toLocaleString('de-DE')} Einwohner</div>
            </div>

            <div className="flex items-center gap-4">
              <ScoreBadge score={r.score} />
              <div className="w-28 h-1.5 bg-zinc-800 rounded-full overflow-hidden hidden sm:block">
                <div
                  className={`h-full rounded-full ${r.score >= 70 ? 'bg-emerald-500' : r.score >= 45 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: r.score + '%' }}
                />
              </div>
              <div className="text-xl font-semibold w-10 text-right">
                <ScoreColor score={r.score} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-4 border border-zinc-800 rounded-lg text-xs text-zinc-600 leading-relaxed">
        <strong className="text-zinc-500">Gewichtung:</strong> ÖPNV 25% · Ärzteversorgung 25% · Internet 20% · Bildung 15% · Arbeit 15%.
        Alle Werte normalisiert auf 0–1 und dann gewichtet zusammengefasst.
        Daten: Beispielwerte (MVP). Phase 2 integriert echte Daten von Destatis, Bundesnetzagentur und OpenStreetMap.
      </div>
    </div>
  )
}
