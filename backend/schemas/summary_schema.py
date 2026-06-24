from pydantic import BaseModel

class SummaryResponse(BaseModel):
    user_id: str
    total_volume: float
    transaction_count: int
    unique_days: int
    credit_total: float
    debit_total: float