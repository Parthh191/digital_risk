from sqlalchemy.ext.asyncio import AsyncSession
from repositories.user_repo import get_user_by_id
from repositories.transaction_repo import get_transactions_by_user
from repositories.stats_repo import get_stats_by_user
from schemas.summary_schema import SummaryResponse
from fastapi import HTTPException

async def get_user_summary(db: AsyncSession, user_id: str):
    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    stats = await get_stats_by_user(db, user_id)
    if not stats:
        raise HTTPException(status_code=404, detail="No stats found for user")

    transactions = await get_transactions_by_user(db, user_id)
    credit_total = sum(t.amount for t in transactions if t.type == "credit")
    debit_total = sum(t.amount for t in transactions if t.type == "debit")

    return SummaryResponse(
        user_id=user_id,
        total_volume=stats.total_volume,
        transaction_count=stats.transaction_count,
        unique_days=stats.unique_days,
        credit_total=credit_total,
        debit_total=debit_total
    )