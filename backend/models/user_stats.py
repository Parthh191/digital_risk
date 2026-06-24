from sqlalchemy import Column, String, Float, Integer, DateTime
from datetime import datetime
from models.user import Base

class UserStats(Base):
    __tablename__ = "user_stats"

    user_id = Column(String, primary_key=True)
    total_volume = Column(Float, default=0.0)
    transaction_count = Column(Integer, default=0)
    unique_days = Column(Integer, default=0)
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)