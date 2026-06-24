from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.summary_schema import SummaryResponse
from services.summary_service import get_user_summary

router = APIRouter()

@router.get("/summary/{user_id}", response_model=SummaryResponse)
async def user_summary(user_id: str, db: AsyncSession = Depends(get_db)):
    return await get_user_summary(db, user_id)