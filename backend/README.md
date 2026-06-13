# Backend (Phase 2 Scaffold)

Minimaler FastAPI-Server mit den gleichen Daten wie das Frontend (`src/data/regions.js`).
Dient als Ausgangspunkt für Phase 2 — echte Datenquellen (Destatis, Bundesnetzagentur, OSM).

## Lokal starten

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Dann: http://localhost:8000/docs (Swagger UI)

## Endpoints

| Methode | Pfad | Beschreibung |
|---|---|---|
| GET | `/api/regions` | Alle Regionen (optional: `?type=city` oder `?type=land`) |
| GET | `/api/regions/{id}` | Einzelne Region inkl. Fairness-Score |
| GET | `/api/compare?city=X&land=Y` | Direkter Vergleich zweier Regionen |
| GET | `/api/fairness` | Ranking aller Regionen nach Score |
| GET | `/api/stats/overview` | Aggregierte Statistiken (Ø Stadt/Land) |

## Roadmap

- [ ] Destatis GENESIS API-Anbindung (Bevölkerung, Arbeit, Einkommen)
- [ ] Bundesnetzagentur Breitbandatlas (Internet/5G)
- [ ] OpenStreetMap Overpass (Ärzte, Haltestellen)
- [ ] PostgreSQL zum Cachen der Ergebnisse
- [ ] Docker + GitHub Actions Deploy
