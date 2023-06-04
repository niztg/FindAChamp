#*! table.py v1.0 June 1 2023

import sqlite3


conn = sqlite3.connect("master.db")
cursor = conn.cursor()


cursor.execute("""
    CREATE TABLE IF NOT EXISTS account_info (
        account_name TEXT,
        password TEXT,
        email TEXT,
        id INTEGER,
        doc DATE,
        email_verified BOOLEAN
    )
""")


conn.commit()
conn.close()
