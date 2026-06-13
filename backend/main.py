"""
Deutschland Stadt vs. Land — FastAPI Backend (Phase 2 Scaffold)

Aktuell: Beispieldaten (identisch zu src/data/regions.js)
Geplant: Destatis GENESIS, Bundesnetzagentur Breitbandatlas, OpenStreetMap Overpass

Lokal starten:
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000

Endpoints:
    GET /api/regions                 — alle Regionen
    GET /api/regions/{id}            — eine Region
    GET /api/compare?city=&land=     — Vergleich zweier Regionen
    GET /api/fairness                — Ranking aller Regionen
    GET /api/stats/overview          — Aggregierte Statistiken
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from data import REGIONS, calc_fairness_score

app = FastAPI(
    title="Deutschland Stadt vs. Land API",
    description="Lebensqualitäts-Atlas — Vergleich von Stadt- und Landregionen",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


def enrich(region: dict) -> dict:
    score = calc_fairness_score(region)
    return {**region, "fairness": score}


@app.get("/api/regions")
def get_regions(type: Optional[str] = Query(None, pattern="^(city|land)$")):
    regions = REGIONS
    if type:
        regions = [r for r in regions if r["type"] == type]
    return [enrich(r) for r in regions]


@app.get("/api/regions/{region_id}")
def get_region(region_id: str):
    region = next((r for r in REGIONS if r["id"] == region_id), None)
    if not region:
        raise HTTPException(status_code=404, detail=f"Region '{region_id}' not found")
    return enrich(region)


@app.get("/api/compare")
def compare(city: str, land: str):
    city_region = next((r for r in REGIONS if r["id"] == city), None)
    land_region = next((r for r in REGIONS if r["id"] == land), None)
    if not city_region or not land_region:
        raise HTTPException(status_code=404, detail="Region nicht gefunden")

    city_score = calc_fairness_score(city_region)
    land_score = calc_fairness_score(land_region)

    return {
        "city": enrich(city_region),
        "land": enrich(land_region),
        "gap": city_score["total"] - land_score["total"],
    }


@app.get("/api/fairness")
def fairness_ranking():
    scored = [
        {"id": r["id"], "name": r["name"], "type": r["type"], "bundesland": r["bundesland"],
         **calc_fairness_score(r)}
        for r in REGIONS
    ]
    return sorted(scored, key=lambda x: x["total"], reverse=True)


@app.get("/api/stats/overview")
def stats_overview():
    cities = [r for r in REGIONS if r["type"] == "city"]
    lands = [r for r in REGIONS if r["type"] == "land"]
    city_avg = round(sum(calc_fairness_score(r)["total"] for r in cities) / len(cities))
    land_avg = round(sum(calc_fairness_score(r)["total"] for r in lands) / len(lands))
    return {
        "total_regions": len(REGIONS),
        "city_count": len(cities),
        "land_count": len(lands),
        "city_avg_score": city_avg,
        "land_avg_score": land_avg,
        "gap": city_avg - land_avg,
    }


@app.get("/")
def root():
    return {
        "name": "Deutschland Stadt vs. Land API",
        "version": "0.1.0",
        "endpoints": ["/api/regions", "/api/regions/{id}", "/api/compare", "/api/fairness", "/api/stats/overview"],
        "docs": "/docs",
    }
