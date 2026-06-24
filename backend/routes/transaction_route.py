from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.transaction_schema import TransactionRequest, TransactionResponse
from services.transaction_service import process_transaction

router = APIRouter()

@router.post("/transaction", response_model=TransactionResponse)
async def create_transaction(payload: TransactionRequest, db: AsyncSession = Depends(get_db)):
    return await process_transaction(db, payload)