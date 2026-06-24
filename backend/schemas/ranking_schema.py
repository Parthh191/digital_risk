from pydantic import BaseModel
from typing import List

class RankingEntry(BaseModel):
    rank: int
    user_id: str
    score: float
    total_volume: float
    transaction_count: int
    unique_days: int

class RankingResponse(BaseModel):
    rankings: List[RankingEntry]