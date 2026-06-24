from sqlalchemy.ext.asyncio import AsyncSession
from models.transaction import Transaction
from schemas.transaction_schema import TransactionRequest, TransactionResponse
from repositories.transaction_repo import get_transaction_by_idempotency_key, create_transaction, get_transactions_by_user
from repositories.user_repo import get_user_by_id
from repositories.stats_repo import upsert_stats
from fastapi import HTTPException
import uuid

async def process_transaction(db: AsyncSession, payload: TransactionRequest):
    existing = await get_transaction_by_idempotency_key(db, payload.idempotency_key)
    if existing:
        return TransactionResponse(
            id=existing.id,
            user_id=existing.user_id,
            amount=existing.amount,
            type=existing.type,
            idempotency_key=existing.idempotency_key,
            message="Duplicate request, transaction already processed"
        )

    user = await get_user_by_id(db, payload.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    transaction = Transaction(
        id=str(uuid.uuid4()),
        user_id=payload.user_id,
        amount=payload.amount,
        type=payload.type,
        idempotency_key=payload.idempotency_key
    )

    await create_transaction(db, transaction)

    all_transactions = await get_transactions_by_user(db, payload.user_id)
    unique_days = set(t.created_at.date() for t in all_transactions)

    await upsert_stats(db, payload.user_id, payload.amount, payload.type, unique_days)

    return TransactionResponse(
        id=transaction.id,
        user_id=transaction.user_id,
        amount=transaction.amount,
        type=transaction.type,
        idempotency_key=transaction.idempotency_key,
        message="Transaction created successfully"
    )