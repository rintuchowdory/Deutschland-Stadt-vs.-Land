// Regionsdaten — MVP mit realistischen Beispielwerten
// Quellen werden in Phase 2 durch echte APIs ersetzt:
// Destatis GENESIS, Bundesnetzagentur Breitbandatlas, OSM Overpass

export const regions = [
  {
    id: "koeln",
    name: "Köln",
    type: "city",
    bundesland: "NRW",
    einwohner: 1084394,
    coords: [50.9333, 6.9500],
    metrics: {
      internet: { speed: 250, glasfaser: 92, coverage5g: 99 },
      oepnv:    { busseProTag: 480, bahnhöfe: 4, letzteAbfahrt: "02:00" },
      aerzte:   { hausaerztePro10k: 8.2, fachaeztePro10k: 19.8, kmZuKlinik: 1.2 },
      bildung:  { schulen: 312, unis: 6, bibliotheken: 18 },
      arbeit:   { arbeitslos: 8.1, avgGehalt: 3450, offeneStellen: 24800 },
      wohnen:   { mietePro_m2: 14.2, kaufPro_m2: 5800, avgWohnfläche: 68 },
    },
  },
  {
    id: "leverkusen",
    name: "Leverkusen",
    type: "city",
    bundesland: "NRW",
    einwohner: 167000,
    coords: [51.0459, 6.9942],
    metrics: {
      internet: { speed: 210, glasfaser: 78, coverage5g: 97 },
      oepnv:    { busseProTag: 310, bahnhöfe: 3, letzteAbfahrt: "01:30" },
      aerzte:   { hausaerztePro10k: 7.1, fachaeztePro10k: 15.2, kmZuKlinik: 2.1 },
      bildung:  { schulen: 48, unis: 1, bibliotheken: 4 },
      arbeit:   { arbeitslos: 7.4, avgGehalt: 3280, offeneStellen: 3100 },
      wohnen:   { mietePro_m2: 12.8, kaufPro_m2: 4600, avgWohnfläche: 71 },
    },
  },
  {
    id: "aachen",
    name: "Aachen",
    type: "city",
    bundesland: "NRW",
    einwohner: 249000,
    coords: [50.7753, 6.0839],
    metrics: {
      internet: { speed: 190, glasfaser: 70, coverage5g: 95 },
      oepnv:    { busseProTag: 350, bahnhöfe: 3, letzteAbfahrt: "01:00" },
      aerzte:   { hausaerztePro10k: 7.8, fachaeztePro10k: 17.1, kmZuKlinik: 1.8 },
      bildung:  { schulen: 87, unis: 3, bibliotheken: 6 },
      arbeit:   { arbeitslos: 9.2, avgGehalt: 3150, offeneStellen: 5200 },
      wohnen:   { mietePro_m2: 11.5, kaufPro_m2: 4100, avgWohnfläche: 74 },
    },
  },
  {
    id: "duesseldorf",
    name: "Düsseldorf",
    type: "city",
    bundesland: "NRW",
    einwohner: 645000,
    coords: [51.2217, 6.7762],
    metrics: {
      internet: { speed: 270, glasfaser: 95, coverage5g: 99 },
      oepnv:    { busseProTag: 520, bahnhöfe: 5, letzteAbfahrt: "02:30" },
      aerzte:   { hausaerztePro10k: 9.1, fachaeztePro10k: 22.4, kmZuKlinik: 0.8 },
      bildung:  { schulen: 198, unis: 4, bibliotheken: 12 },
      arbeit:   { arbeitslos: 7.8, avgGehalt: 3720, offeneStellen: 18400 },
      wohnen:   { mietePro_m2: 15.5, kaufPro_m2: 6200, avgWohnfläche: 65 },
    },
  },
  {
    id: "euskirchen",
    name: "Kreis Euskirchen",
    type: "land",
    bundesland: "NRW",
    einwohner: 200000,
    coords: [50.6590, 6.7879],
    metrics: {
      internet: { speed: 52, glasfaser: 28, coverage5g: 70 },
      oepnv:    { busseProTag: 14, bahnhöfe: 2, letzteAbfahrt: "20:00" },
      aerzte:   { hausaerztePro10k: 3.8, fachaeztePro10k: 5.1, kmZuKlinik: 18.4 },
      bildung:  { schulen: 22, unis: 0, bibliotheken: 3 },
      arbeit:   { arbeitslos: 4.2, avgGehalt: 2890, offeneStellen: 820 },
      wohnen:   { mietePro_m2: 7.2, kaufPro_m2: 2800, avgWohnfläche: 98 },
    },
  },
  {
    id: "heinsberg",
    name: "Kreis Heinsberg",
    type: "land",
    bundesland: "NRW",
    einwohner: 255000,
    coords: [51.0631, 6.0994],
    metrics: {
      internet: { speed: 75, glasfaser: 38, coverage5g: 78 },
      oepnv:    { busseProTag: 22, bahnhöfe: 1, letzteAbfahrt: "21:00" },
      aerzte:   { hausaerztePro10k: 4.9, fachaeztePro10k: 7.2, kmZuKlinik: 12.8 },
      bildung:  { schulen: 34, unis: 0, bibliotheken: 4 },
      arbeit:   { arbeitslos: 5.1, avgGehalt: 2780, offeneStellen: 1240 },
      wohnen:   { mietePro_m2: 7.8, kaufPro_m2: 2950, avgWohnfläche: 94 },
    },
  },
  {
    id: "oberbergisch",
    name: "Oberbergischer Kreis",
    type: "land",
    bundesland: "NRW",
    einwohner: 272000,
    coords: [51.0333, 7.5667],
    metrics: {
      internet: { speed: 68, glasfaser: 32, coverage5g: 74 },
      oepnv:    { busseProTag: 18, bahnhöfe: 2, letzteAbfahrt: "20:30" },
      aerzte:   { hausaerztePro10k: 4.5, fachaeztePro10k: 6.4, kmZuKlinik: 14.2 },
      bildung:  { schulen: 40, unis: 0, bibliotheken: 5 },
      arbeit:   { arbeitslos: 4.8, avgGehalt: 2920, offeneStellen: 1580 },
      wohnen:   { mietePro_m2: 8.1, kaufPro_m2: 3100, avgWohnfläche: 96 },
    },
  },
  {
    id: "vulkaneifel",
    name: "Vulkaneifel",
    type: "land",
    bundesland: "RLP",
    einwohner: 60000,
    coords: [50.1520, 6.7040],
    metrics: {
      internet: { speed: 38, glasfaser: 12, coverage5g: 55 },
      oepnv:    { busseProTag: 8, bahnhöfe: 1, letzteAbfahrt: "18:30" },
      aerzte:   { hausaerztePro10k: 2.9, fachaeztePro10k: 2.8, kmZuKlinik: 28.6 },
      bildung:  { schulen: 9, unis: 0, bibliotheken: 1 },
      arbeit:   { arbeitslos: 3.8, avgGehalt: 2640, offeneStellen: 180 },
      wohnen:   { mietePro_m2: 6.5, kaufPro_m2: 2100, avgWohnfläche: 108 },
    },
  },
]

// Fairness-Score berechnen (0-100)
export function calcFairnessScore(region) {
  const m = region.metrics
  const weights = {
    internet: 0.20,
    oepnv:    0.25,
    aerzte:   0.25,
    bildung:  0.15,
    arbeit:   0.15,
  }
  const scores = {
    internet: Math.min(m.internet.speed / 280, 1) * 0.5 + Math.min(m.internet.glasfaser / 100, 1) * 0.5,
    oepnv:    Math.min(m.oepnv.busseProTag / 540, 1) * 0.7 + Math.min(m.oepnv.bahnhöfe / 5, 1) * 0.3,
    aerzte:   Math.min(m.aerzte.hausaerztePro10k / 10, 1) * 0.5 + Math.min(m.aerzte.fachaeztePro10k / 25, 1) * 0.5,
    bildung:  Math.min(m.bildung.schulen / 320, 1) * 0.6 + Math.min(m.bildung.unis / 6, 1) * 0.4,
    arbeit:   Math.min(m.arbeit.avgGehalt / 3800, 1) * 0.6 + Math.min(m.arbeit.offeneStellen / 25000, 1) * 0.4,
  }
  const raw = Object.entries(weights).reduce((sum, [k, w]) => sum + scores[k] * w, 0)
  return Math.round(raw * 100)
}

export const cityRegions = regions.filter(r => r.type === 'city')
export const landRegions  = regions.filter(r => r.type === 'land')
