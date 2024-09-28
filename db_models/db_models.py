from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class BaseDbModel(DeclarativeBase):
    pk: Mapped[Integer] = mapped_column(Integer, primary_key=True, autoincrement=True)


class Email(BaseDbModel):
    __tablename__ = 'emails'
    ip_address: Mapped[String] = mapped_column(String, nullable=True)
    received_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True))
    mail: Mapped[String] = mapped_column(String, nullable=True)


class Event(BaseDbModel):
    __tablename__ = 'events'
    ip_address: Mapped[String] = mapped_column(String, nullable=True)
    received_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True))
    event_name = Mapped[String] = mapped_column(String, nullable=True)
