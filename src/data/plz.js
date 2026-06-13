// Vereinfachte PLZ→Region-Zuordnung (1. Ziffer der Postleitzahl)
// Phase 2: echte PLZ-Datenbank via OpenStreetMap/Destatis

export const plzMap = {
  '0': { city: 'dresden',     land: 'elbe-elster', label: 'Sachsen / Ostdeutschland' },
  '1': { city: 'berlin',      land: 'uckermark',   label: 'Berlin / Brandenburg' },
  '2': { city: 'hamburg',     land: 'wittmund',    label: 'Hamburg / Norddeutschland' },
  '3': { city: 'hamburg',     land: 'altmark',     label: 'Niedersachsen / Sachsen-Anhalt' },
  '4': { city: 'duesseldorf', land: 'heinsberg',   label: 'NRW (Ruhrgebiet)' },
  '5': { city: 'koeln',       land: 'euskirchen',  label: 'NRW (Rheinland)' },
  '6': { city: 'frankfurt',   land: 'vulkaneifel', label: 'Hessen / Rheinland-Pfalz' },
  '7': { city: 'stuttgart',   land: 'freyung',     label: 'Baden-Württemberg' },
  '8': { city: 'muenchen',    land: 'freyung',     label: 'Bayern (Süd)' },
  '9': { city: 'muenchen',    land: 'freyung',     label: 'Bayern (Nord)' },
}

export function findRegionByPLZ(plz) {
  const digit = String(plz).trim()[0]
  return plzMap[digit] || null
}
