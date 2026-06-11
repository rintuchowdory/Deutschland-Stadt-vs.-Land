import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Vergleich from './pages/Vergleich.jsx'
import Karte from './pages/Karte.jsx'

export default function App() {
  return (
    <div className="min-h-screen" style={{background:'var(--paper)'}}>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vergleich" element={<Vergleich />} />
        <Route path="/karte"     element={<Karte />} />
      </Routes>
    </div>
  )
}