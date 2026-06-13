import { useState, useEffect, useRef } from 'react'

export default function CountUp({ value, duration = 800, style }) {
  const [display, setDisplay] = useState(0)
  const startRef = useRef(null)
  const fromRef = useRef(0)

  useEffect(() => {
    fromRef.current = display
    startRef.current = null
    let raf

    function step(ts) {
      if (!startRef.current) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = fromRef.current + (value - fromRef.current) * eased
      setDisplay(Math.round(current))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <span style={style}>{display}</span>
}
