from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.user_stats import UserStats

async def get_stats_by_user(db: AsyncSession, user_id: str):
    result = await db.execute(select(UserStats).where(UserStats.user_id == user_id))
    return result.scalar_one_or_none()

async def get_all_stats(db: AsyncSession):
    result = await db.execute(select(UserStats))
    return result.scalars().all()

async def upsert_stats(db: AsyncSession, user_id: str, amount: float, transaction_type: str, days: set):
    stats = await get_stats_by_user(db, user_id)
    if not stats:
        stats = UserStats(
            user_id=user_id,
            total_volume=amount if transaction_type == "credit" else -amount,
            transaction_count=1,
            unique_days=len(days)
        )
        db.add(stats)
    else:
        if transaction_type == "credit":
            stats.total_volume += amount
        else:
            stats.total_volume -= amount
        stats.transaction_count += 1
        stats.unique_days = len(days)
    await db.flush()
    return stats