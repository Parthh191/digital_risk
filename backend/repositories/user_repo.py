from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.user import User

async def get_user_by_id(db: AsyncSession, user_id: str):
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()

async def create_user(db: AsyncSession, user: User):
    db.add(user)
    await db.flush()
    return user