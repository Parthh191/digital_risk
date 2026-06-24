from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import transaction_route, summary_route, ranking_route
from database.connection import engine
from models.user import Base as UserBase
from models.transaction import Base as TransactionBase
from models.user_stats import Base as StatsBase

app = FastAPI(title="Digital Risk API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(UserBase.metadata.create_all)
        await conn.run_sync(TransactionBase.metadata.create_all)
        await conn.run_sync(StatsBase.metadata.create_all)

app.include_router(transaction_route.router)
app.include_router(summary_route.router)
app.include_router(ranking_route.router)

@app.get("/")
async def root():
    return {"message": "Digital Risk API is running"}