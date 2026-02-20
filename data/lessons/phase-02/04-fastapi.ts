import { Lesson } from '../../types';

export const fastapiLesson: Lesson = {
  id: 'p2-fastapi',
  phaseId: 'phase-02',
  title: 'FastAPI pour le serving de modèles ML',
  content: `
# FastAPI pour le serving de modèles ML

## Introduction

FastAPI est un framework web Python moderne et performant, idéal pour créer des APIs de serving de modèles ML. Il combine la rapidité d'exécution (comparable à Node.js et Go grâce à Starlette et Uvicorn), la validation automatique des données (via Pydantic), et une documentation interactive générée automatiquement. C'est devenu le choix privilégié pour exposer des modèles ML en production.

## Pourquoi FastAPI pour le ML ?

- **Performance** : basé sur ASGI (asynchrone), il gère efficacement de nombreuses requêtes concurrentes
- **Validation** : Pydantic valide automatiquement les entrées et sorties de l'API
- **Documentation** : Swagger UI et ReDoc sont générés automatiquement
- **Type hints** : le typage Python natif améliore la maintenabilité du code

## Créer une API de prédiction

### Structure du projet

\`\`\`
ml-api/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── models/
│   │   └── schemas.py
│   ├── services/
│   │   └── prediction.py
│   └── routers/
│       └── predict.py
├── artifacts/
│   └── model.pkl
├── requirements.txt
└── Dockerfile
\`\`\`

### Définition des schémas avec Pydantic

\`\`\`python
from pydantic import BaseModel, Field
from typing import List, Optional

class PredictionRequest(BaseModel):
    features: List[float] = Field(
        ...,
        min_length=4,
        max_length=4,
        description="Vecteur de caractéristiques du client"
    )
    model_version: Optional[str] = Field(
        default="latest",
        description="Version du modèle à utiliser"
    )

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "features": [5.1, 3.5, 1.4, 0.2],
                    "model_version": "v1.2"
                }
            ]
        }
    }

class PredictionResponse(BaseModel):
    prediction: int
    probability: float
    model_version: str
    latency_ms: float
\`\`\`

### Endpoint de prédiction

\`\`\`python
import time
import pickle
import numpy as np
from fastapi import FastAPI, HTTPException
from contextlib import asynccontextmanager

# Chargement du modèle au démarrage
ml_model = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup : charger le modèle
    with open("artifacts/model.pkl", "rb") as f:
        ml_model["model"] = pickle.load(f)
    ml_model["version"] = "v1.2"
    yield
    # Shutdown : libérer les ressources
    ml_model.clear()

app = FastAPI(
    title="ML Prediction API",
    description="API de prédiction pour la classification clients",
    version="1.0.0",
    lifespan=lifespan,
)

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    start_time = time.time()

    try:
        features = np.array(request.features).reshape(1, -1)
        prediction = ml_model["model"].predict(features)[0]
        probability = ml_model["model"].predict_proba(features).max()
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erreur de prédiction : {str(e)}"
        )

    latency = (time.time() - start_time) * 1000

    return PredictionResponse(
        prediction=int(prediction),
        probability=float(probability),
        model_version=ml_model["version"],
        latency_ms=round(latency, 2),
    )
\`\`\`

### Endpoints de santé et monitoring

\`\`\`python
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": "model" in ml_model,
        "version": ml_model.get("version", "unknown"),
    }

@app.get("/metrics")
async def metrics():
    return {
        "total_predictions": prediction_counter,
        "average_latency_ms": avg_latency,
        "model_version": ml_model.get("version"),
    }
\`\`\`

## Traitement asynchrone

FastAPI excelle dans la gestion des requêtes asynchrones, ce qui est crucial lorsque votre API doit gérer de la latence (appels à une base de données, chargement de modèles distants) :

\`\`\`python
import httpx

@app.post("/predict-ensemble")
async def predict_ensemble(request: PredictionRequest):
    async with httpx.AsyncClient() as client:
        # Appeler plusieurs modèles en parallèle
        tasks = [
            client.post("http://model-a:8001/predict", json=request.dict()),
            client.post("http://model-b:8002/predict", json=request.dict()),
        ]
        import asyncio
        responses = await asyncio.gather(*tasks)

    # Combiner les prédictions (voting)
    predictions = [r.json()["prediction"] for r in responses]
    final = max(set(predictions), key=predictions.count)
    return {"prediction": final, "method": "ensemble-voting"}
\`\`\`

## Middleware et sécurité

\`\`\`python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://mon-dashboard.com"],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

# Rate limiting avec slowapi
from slowapi import Limiter
limiter = Limiter(key_func=get_remote_address)

@app.post("/predict")
@limiter.limit("100/minute")
async def predict(request: PredictionRequest):
    ...
\`\`\`

## Déploiement avec Uvicorn

\`\`\`bash
# Développement
uvicorn app.main:app --reload --port 8000

# Production avec workers multiples
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4

# Ou avec Gunicorn comme process manager
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
\`\`\`
`,
  keyPoints: [
    'FastAPI offre des performances élevées grâce à son architecture asynchrone basée sur ASGI et Uvicorn',
    'Pydantic valide automatiquement les entrées et sorties, garantissant l\'intégrité des données envoyées au modèle',
    'Le lifespan permet de charger le modèle une seule fois au démarrage pour éviter la latence à chaque requête',
    'Les endpoints de santé (/health) et de métriques (/metrics) sont essentiels pour le monitoring en production',
    'Le traitement asynchrone permet de gérer efficacement les prédictions en ensemble et les appels concurrents',
  ],
  resources: [
    {
      title: 'FastAPI Documentation officielle',
      url: 'https://fastapi.tiangolo.com/',
      type: 'article',
    },
    {
      title: 'Deploying ML Models with FastAPI (Krish Naik)',
      url: 'https://www.youtube.com/watch?v=h5wLuVDr0oc',
      type: 'video',
    },
    {
      title: 'Full Stack Deep Learning - Deployment',
      url: 'https://fullstackdeeplearning.com/course/2022/lecture-6-deployment/',
      type: 'course',
    },
  ],
  estimatedMinutes: 25,
};
