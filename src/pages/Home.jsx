import { Link } from 'react-router-dom'
import { regions, calcFairnessScore } from '../data/regions.js'

const stats = [
  { val: '4×', label: 'schnelleres Internet in der Stadt' },
  { val: '34×', label: 'mehr ÖPNV-Verbindungen' },
  { val: '3×', label: 'mehr Fachärzte pro Kopf' },
  { val: '7,7 €', label: 'weniger Miete pro m² auf dem Land' },
]

export default function Home() {
  const worst = [...regions]
    .sort((a, b) => calcFairnessScore(a) - calcFairnessScore(b))
    .slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero */}
      <div className="max-w-3xl mb-20">
        <div className="flex items-center gap-2 mb-6">
          <span className="badge-city">Stadtregion</span>
          <span className="text-zinc-600 text-sm">vs.</span>
          <span className="badge-land">Landregion</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-100 leading-tight mb-6">
          Haben Menschen auf dem Land
          <br />
          <span className="text-zinc-500">die gleichen Chancen?</span>
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-2xl">
          Dieser Atlas vergleicht Infrastruktur, Versorgung und Lebensqualität zwischen deutschen
          Stadt- und Landregionen — datenbasiert, ehrlich und konkret.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/vergleich"
            className="px-5 py-2.5 bg-zinc-100 text-zinc-900 text-sm font-medium rounded-lg hover:bg-white transition-colors"
          >
            Region vergleichen →
          </Link>
          <Link
            to="/index"
            className="px-5 py-2.5 border border-zinc-700 text-zinc-300 text-sm font-medium rounded-lg hover:border-zinc-500 hover:text-zinc-100 transition-colors"
          >
            Fairness-Index ansehen
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
        {stats.map((s, i) => (
          <div key={i} className="card text-center">
            <div className="text-2xl font-semibold text-zinc-100 mb-1">{s.val}</div>
            <div className="text-xs text-zinc-500 leading-snug">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Themenbereiche */}
      <div className="mb-20">
        <h2 className="text-lg font-medium text-zinc-200 mb-6">Was wir vergleichen</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: '🌐', title: 'Internet & 5G', desc: 'Glasfaser-Ausbau, Durchschnittsgeschwindigkeit und Mobilfunkabdeckung im Vergleich.' },
            { icon: '🚌', title: 'ÖPNV', desc: 'Busverbindungen pro Tag, Bahnhöfe und letzte Abendverbindung.' },
            { icon: '🏥', title: 'Ärzteversorgung', desc: 'Hausärzte und Fachärzte pro 10.000 Einwohner, Entfernung zur nächsten Klinik.' },
            { icon: '🏫', title: 'Bildung', desc: 'Schulen, Berufsschulen, Universitäten und Bibliotheken.' },
            { icon: '💼', title: 'Arbeit', desc: 'Arbeitslosenquote, Durchschnittsgehalt und offene Stellen.' },
            { icon: '🏠', title: 'Wohnen', desc: 'Durchschnittsmiete, Kaufpreise und durchschnittliche Wohnfläche.' },
          ].map((t, i) => (
            <div key={i} className="card hover:border-zinc-700 transition-colors">
              <div className="text-2xl mb-3">{t.icon}</div>
              <div className="text-sm font-medium text-zinc-200 mb-1.5">{t.title}</div>
              <div className="text-xs text-zinc-500 leading-relaxed">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Abgehängte Regionen */}
      <div>
        <h2 className="text-lg font-medium text-zinc-200 mb-1">Am stärksten unterversorgt</h2>
        <p className="text-sm text-zinc-500 mb-5">Regionen mit dem niedrigsten Fairness-Score im Datensatz</p>
        <div className="space-y-3">
          {worst.map(r => {
            const score = calcFairnessScore(r)
            return (
              <div key={r.id} className="card flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-zinc-200">{r.name}</div>
                  <div className="text-xs text-zinc-500">{r.bundesland} · {r.einwohner.toLocaleString('de-DE')} Einwohner</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-red-400">{score}</div>
                    <div className="text-xs text-zinc-600">/ 100</div>
                  </div>
                  <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: score + '%' }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
