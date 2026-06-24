from sqlalchemy.ext.asyncio import AsyncSession
from repositories.stats_repo import get_all_stats
from schemas.ranking_schema import RankingEntry, RankingResponse
from utils.ranking_calculator import calculate_score

async def get_rankings(db: AsyncSession):
    all_stats = await get_all_stats(db)

    if not all_stats:
        return RankingResponse(rankings=[])

    scored = []
    for stats in all_stats:
        score = calculate_score(stats.total_volume, stats.transaction_count, stats.unique_days)
        scored.append((stats, score))

    scored.sort(key=lambda x: x[1], reverse=True)

    rankings = []
    for index, (stats, score) in enumerate(scored):
        rankings.append(RankingEntry(
            rank=index + 1,
            user_id=stats.user_id,
            score=round(score, 4),
            total_volume=stats.total_volume,
            transaction_count=stats.transaction_count,
            unique_days=stats.unique_days
        ))

    return RankingResponse(rankings=rankings)