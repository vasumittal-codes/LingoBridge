import sqlite3
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
INSTANCE_DIR = os.path.join(BASE_DIR, 'instance')
DB_PATH = os.path.join(INSTANCE_DIR, 'translingua.db')

os.makedirs(INSTANCE_DIR, exist_ok=True)
conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

cur.execute('''
    CREATE TABLE IF NOT EXISTS translations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source_text TEXT NOT NULL,
        translated_text TEXT NOT NULL,
        source_lang TEXT,
        target_lang TEXT NOT NULL,
        created_at TEXT NOT NULL
    )
''')

conn.commit()
conn.close()

print('Database created successfully at:', DB_PATH)
