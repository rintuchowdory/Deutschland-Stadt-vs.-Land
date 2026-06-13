// Generiert ein 1200x630 PNG-Vergleichsbild (Social-Share-Format) via Canvas

export function generateShareImage({ cityName, landName, cityScore, landScore }) {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 630
  const ctx = canvas.getContext('2d')

  // Hintergrund
  ctx.fillStyle = '#F5F3EE'
  ctx.fillRect(0, 0, 1200, 630)

  // Rahmen
  ctx.strokeStyle = '#E8E4DC'
  ctx.lineWidth = 2
  ctx.strokeRect(40, 40, 1120, 550)

  // Eyebrow
  ctx.fillStyle = '#9A9489'
  ctx.font = '600 18px "IBM Plex Mono", monospace'
  ctx.textAlign = 'left'
  ctx.fillText('LEBENSQUALITÄTS-ATLAS DEUTSCHLAND', 80, 110)

  // Title
  ctx.fillStyle = '#0D0D0D'
  ctx.font = '500 56px "Cormorant Garamond", Georgia, serif'
  ctx.fillText(`${cityName} vs. ${landName}`, 80, 190)

  // Scores
  const gap = cityScore - landScore
  const gapText = gap > 0 ? `Stadt führt um ${gap} Punkte` : `Gefälle: ${Math.abs(gap)} Punkte`

  // City circle
  drawScoreCircle(ctx, 280, 400, 110, cityScore, '#1A3A6B', cityName)
  // Land circle
  drawScoreCircle(ctx, 920, 400, 110, landScore, '#1D6B4A', landName)

  // VS
  ctx.fillStyle = '#9A9489'
  ctx.font = '500 36px "Cormorant Garamond", Georgia, serif'
  ctx.textAlign = 'center'
  ctx.fillText('vs.', 600, 410)

  // Gap badge
  ctx.fillStyle = gap > 40 ? '#B53A2F' : gap > 20 ? '#C47A1A' : '#1D6B4A'
  ctx.font = '500 22px "IBM Plex Sans", sans-serif'
  ctx.fillText(gapText, 600, 480)

  // Footer
  ctx.fillStyle = '#9A9489'
  ctx.font = '400 16px "IBM Plex Mono", monospace'
  ctx.textAlign = 'left'
  ctx.fillText('rintuchowdory.github.io/Deutschland-Stadt-vs.-Land', 80, 550)

  return canvas
}

function drawScoreCircle(ctx, cx, cy, r, score, color, label) {
  // Background ring
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.strokeStyle = '#E8E4DC'
  ctx.lineWidth = 14
  ctx.stroke()

  // Progress ring
  const startAngle = -Math.PI / 2
  const endAngle = startAngle + (score / 100) * Math.PI * 2
  ctx.beginPath()
  ctx.arc(cx, cy, r, startAngle, endAngle)
  ctx.strokeStyle = color
  ctx.lineWidth = 14
  ctx.lineCap = 'round'
  ctx.stroke()

  // Score text
  ctx.fillStyle = color
  ctx.font = '500 64px "Cormorant Garamond", Georgia, serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(score, cx, cy)

  // Label
  ctx.fillStyle = '#0D0D0D'
  ctx.font = '600 22px "IBM Plex Sans", sans-serif'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(label, cx, cy + r + 40)
}

export function downloadCanvas(canvas, filename) {
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}
