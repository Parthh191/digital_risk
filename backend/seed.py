import asyncio
from database.connection import engine
from sqlalchemy import text

async def seed():
    async with engine.begin() as conn:
        await conn.execute(text("""
            INSERT INTO users (id, name, email, created_at) VALUES
            ('user1', 'Alice Johnson', 'alice@example.com', NOW()),
            ('user2', 'Bob Smith', 'bob@example.com', NOW()),
            ('user3', 'Charlie Brown', 'charlie@example.com', NOW()),
            ('user4', 'Diana Prince', 'diana@example.com', NOW()),
            ('user5', 'Ethan Hunt', 'ethan@example.com', NOW())
            ON CONFLICT (id) DO NOTHING
        """))
        print("Users seeded successfully")

asyncio.run(seed())