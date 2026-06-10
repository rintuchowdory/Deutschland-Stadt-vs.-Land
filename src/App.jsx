import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Vergleich from './pages/Vergleich.jsx'
import Index from './pages/Index.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vergleich" element={<Vergleich />} />
          <Route path="/index" element={<Index />} />
        </Routes>
      </main>
    </div>
  )
}
