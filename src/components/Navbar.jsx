import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/',          label: 'Startseite' },
  { to: '/vergleich', label: 'Vergleich' },
  { to: '/index',     label: 'Fairness-Index' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded overflow-hidden flex">
            <div className="flex-1 bg-city" />
            <div className="flex-1 bg-land" />
          </div>
          <span className="font-medium text-sm text-zinc-100">
            Stadt <span className="text-zinc-500">vs.</span> Land
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                pathname === l.to
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
