from pydantic import BaseModel, field_validator
from typing import Literal

class TransactionRequest(BaseModel):
    user_id: str
    amount: float
    type: Literal["credit", "debit"]
    idempotency_key: str

    @field_validator("amount")
    def amount_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError("Amount must be greater than zero")
        return v

    @field_validator("user_id", "idempotency_key")
    def must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError("Field cannot be empty")
        return v

class TransactionResponse(BaseModel):
    id: str
    user_id: str
    amount: float
    type: str
    idempotency_key: str
    message: str