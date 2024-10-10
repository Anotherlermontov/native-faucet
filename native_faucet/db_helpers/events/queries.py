import sqlite3
from contextlib import closing
from datetime import datetime

from native_faucet.settings import settings


def add_event(event_name: str, ip_address: str, received_at: datetime) -> None:
    with sqlite3.connect(settings.database_file_path) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute(
                (
                    'INSERT INTO events (event_name, ip_address, received_at)\n'
                    'VALUES (?, ?, ?)'
                ),
                (event_name, ip_address, received_at),
            )
