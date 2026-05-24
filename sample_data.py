import sqlite3
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, 'instance', 'translingua.db')

sample_rows = [
    ('Hello, how are you?', 'Hola, ¿cómo estás?', 'English', 'Spanish', '2026-05-20 10:15:00'),
    ('Good morning', 'Bonjour', 'English', 'French', '2026-05-20 12:10:00'),
    ('Namaste dosto', 'Hello friends', 'Hindi', 'English', '2026-05-21 09:00:00'),
    ('Welcome to our college project', 'Bienvenido a nuestro proyecto universitario', 'English', 'Spanish', '2026-05-21 14:25:00'),
    ('Machine learning is interesting', 'Maschinelles Lernen ist interessant', 'English', 'German', '2026-05-22 11:45:00')
]

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

for row in sample_rows:
    cur.execute(
        '''
        INSERT INTO translations (source_text, translated_text, source_lang, target_lang, created_at)
        VALUES (?, ?, ?, ?, ?)
        ''',
        row
    )

conn.commit()
conn.close()

print('Sample data inserted.')
