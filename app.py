from flask import Flask, render_template, request, jsonify
import sqlite3
from deep_translator import GoogleTranslator
from datetime import datetime
import os

app = Flask(__name__)
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, 'instance', 'translingua.db')

# simple language list for dropdowns
LANGUAGES = {
    'auto': 'Auto Detect',
    'en': 'English',
    'hi': 'Hindi',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'ar': 'Arabic',
    'zh-CN': 'Chinese (Simplified)',
    'bn': 'Bengali',
    'ta': 'Tamil',
    'te': 'Telugu',
    'mr': 'Marathi',
    'gu': 'Gujarati',
    'kn': 'Kannada',
    'ml': 'Malayalam',
    'pa': 'Punjabi'
}


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db_if_needed():
    os.makedirs(os.path.join(BASE_DIR, 'instance'), exist_ok=True)
    conn = get_db_connection()
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


@app.route('/')
def home():
    return render_template('index.html', languages=LANGUAGES)


@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    text = (data.get('text') or '').strip()
    source_lang = data.get('source_lang', 'auto')
    target_lang = data.get('target_lang', 'en')

    if not text:
        return jsonify({'success': False, 'message': 'Please enter some text first.'}), 400

    if source_lang == target_lang and source_lang != 'auto':
        return jsonify({'success': False, 'message': 'Source and target languages are same.'}), 400

    try:
        # using google translate service through deep-translator
        translator = GoogleTranslator(source=source_lang, target=target_lang)
        translated = translator.translate(text)

        detected_name = LANGUAGES.get(source_lang, source_lang)
        if source_lang == 'auto':
            detected_name = 'Auto Detect'

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            '''
            INSERT INTO translations (source_text, translated_text, source_lang, target_lang, created_at)
            VALUES (?, ?, ?, ?, ?)
            ''',
            (text, translated, detected_name, LANGUAGES.get(target_lang, target_lang), datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
        )
        conn.commit()
        conn.close()

        return jsonify({
            'success': True,
            'translated_text': translated,
            'source_lang_name': detected_name,
            'target_lang_name': LANGUAGES.get(target_lang, target_lang)
        })

    except Exception:
        # keeping message simple for student project
        return jsonify({
            'success': False,
            'message': 'Translation failed. Please check internet connection or try another language.'
        }), 500


@app.route('/recent-translations')
def recent_translations():
    conn = get_db_connection()
    rows = conn.execute(
        'SELECT * FROM translations ORDER BY id DESC LIMIT 6'
    ).fetchall()
    conn.close()

    data = []
    for row in rows:
        data.append({
            'id': row['id'],
            'source_text': row['source_text'],
            'translated_text': row['translated_text'],
            'source_lang': row['source_lang'],
            'target_lang': row['target_lang'],
            'created_at': row['created_at']
        })
    return jsonify(data)


@app.route('/analytics')
def analytics():
    conn = get_db_connection()

    total = conn.execute('SELECT COUNT(*) as count FROM translations').fetchone()['count']

    lang_row = conn.execute(
        '''
        SELECT target_lang, COUNT(*) as lang_count
        FROM translations
        GROUP BY target_lang
        ORDER BY lang_count DESC
        LIMIT 1
        '''
    ).fetchone()

    recent_rows = conn.execute(
        'SELECT source_lang, target_lang, created_at FROM translations ORDER BY id DESC LIMIT 5'
    ).fetchall()

    conn.close()

    activity = []
    for row in recent_rows:
        activity.append({
            'source_lang': row['source_lang'],
            'target_lang': row['target_lang'],
            'created_at': row['created_at']
        })

    return jsonify({
        'total_translations': total,
        'most_used_language': lang_row['target_lang'] if lang_row else 'No data',
        'recent_activity': activity
    })


if __name__ == '__main__':
    init_db_if_needed()
    app.run(debug=True)
