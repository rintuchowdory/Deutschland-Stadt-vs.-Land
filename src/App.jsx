import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Vergleich from './pages/Vergleich.jsx'
import Karte from './pages/Karte.jsx'
import Methodik from './pages/Methodik.jsx'
import Finden from './pages/Finden.jsx'

export default function App() {
  return (
    <div className="min-h-screen" style={{background:'var(--paper)',display:'flex',flexDirection:'column'}}>
      <Navbar />
      <div style={{flex:1}}>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vergleich" element={<Vergleich />} />
          <Route path="/karte"     element={<Karte />} />
          <Route path="/methodik"  element={<Methodik />} />
          <Route path="/finden"    element={<Finden />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
