from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.transaction import Transaction

async def get_transaction_by_idempotency_key(db: AsyncSession, key: str):
    result = await db.execute(select(Transaction).where(Transaction.idempotency_key == key))
    return result.scalar_one_or_none()

async def get_transactions_by_user(db: AsyncSession, user_id: str):
    result = await db.execute(select(Transaction).where(Transaction.user_id == user_id))
    return result.scalars().all()

async def create_transaction(db: AsyncSession, transaction: Transaction):
    db.add(transaction)
    await db.flush()
    return transaction