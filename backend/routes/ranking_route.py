from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.ranking_schema import RankingResponse
from services.ranking_service import get_rankings

router = APIRouter()

@router.get("/ranking", response_model=RankingResponse)
async def ranking(db: AsyncSession = Depends(get_db)):
    return await get_rankings(db)