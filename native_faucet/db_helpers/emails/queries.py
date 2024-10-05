import sqlite3
from contextlib import closing
from datetime import datetime

from native_faucet.settings import settings


def add_email(mail: str, ip_address: str, received_at: datetime) -> None:
    with sqlite3.connect(settings.database_file_path) as conn:
        with closing(conn.cursor()) as cursor:
            cursor.execute(
                (
                    'INSERT INTO emails (mail, ip_address, received_at)\n'
                    'VALUES (?, ?, ?)'
                ),
                (mail, ip_address, received_at),
            )
