# 🏙️ Deutschland: Stadt vs. Land

**Haben Menschen auf dem Land die gleichen Chancen wie in der Stadt?**

Ein datenbasierter Atlas, der Infrastruktur, Versorgung und Lebensqualität zwischen deutschen Stadt- und Landregionen vergleicht.

🔗 **Live:** https://rintuchowdory.github.io/Deutschland-Stadt-vs.-Land/

---

## Features

- **Direkter Vergleich** — Stadt vs. Landregion in 6 Kategorien
- **Fairness-Score** — gewichteter Index (0–100) pro Region
- **Ranking** — alle Regionen sortiert nach Versorgungsqualität
- **Insights** — automatisch generierte Erkenntnisse pro Vergleich

## Kategorien

| Kategorie | Gewicht |
|---|---|
| 🚌 ÖPNV | 25% |
| 🏥 Ärzteversorgung | 25% |
| 🌐 Internet & 5G | 20% |
| 🏫 Bildung | 15% |
| 💼 Arbeit | 15% |

## Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Routing:** React Router v6
- **Charts:** Recharts
- **Deployment:** GitHub Pages via GitHub Actions

## Lokale Entwicklung

```bash
npm install
npm run dev
```

## Roadmap

- [ ] **Phase 2:** Echte Daten von Destatis, Bundesnetzagentur, OpenStreetMap
- [ ] **Phase 2:** FastAPI Backend + PostgreSQL
- [ ] **Phase 3:** Choropleth-Karte von Deutschland (alle Landkreise)
- [ ] **Phase 3:** Vollständiger Fairness-Index mit Z-Score-Normalisierung

## Datenquellen (geplant)

- [Destatis GENESIS](https://www-genesis.destatis.de/) — Bevölkerung, Arbeit, Einkommen
- [Bundesnetzagentur Breitbandatlas](https://gigabitgrundbuch.bund.de/) — Internet & 5G
- [OpenStreetMap Overpass API](https://overpass-api.de/) — Ärzte, Haltestellen

---

*Portfolio-Projekt von [Rintu Chowdory](https://github.com/rintuchowdory)*
