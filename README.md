<<<<<<< HEAD
# LingoBridge 🌍

A Flask-based **Smart Language Translator** with support for 20+ languages, analytics dashboard, and translation history.

## Features

✨ **Multi-Language Support** - English, Hindi, Spanish, French, German, Japanese, Chinese, Arabic, and more  
📊 **Analytics Dashboard** - Track translation history and usage statistics  
🗂️ **Database Storage** - Keep records of all translations  
🎨 **Simple Web Interface** - Clean, easy-to-use UI

## Installation

**Requirements:** Python 3.8+

```bash
git clone https://github.com/yourusername/LingoBridge.git
cd LingoBridge
pip install -r requirements.txt
```

## Usage

```bash
python app.py
```

Open your browser and go to `http://localhost:5000`

## Project Structure

```
LingoBridge/
├── app.py                 # Main Flask application
├── init_db.py            # Database initialization
├── requirements.txt      # Python dependencies
├── templates/            # HTML files
├── static/               # CSS & JavaScript
└── instance/             # Database storage
```

## License

MIT License - see LICENSE file for details
Move into the project directory:

```bash
cd TransLingua
```

### Step 4: Create Virtual Environment (recommended)

```bash
python -m venv venv
```

Activate it:

**Windows**
```bash
venv\Scripts\activate
```

**Mac/Linux**
```bash
source venv/bin/activate
```

### Step 5: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 6: Database Setup
A sample SQLite database is already included in the `instance` folder.

If you want to recreate database manually:

```bash
python init_db.py
```

If you want sample records:

```bash
python sample_data.py
```

### Step 7: Run the Project

```bash
python app.py
```

### Step 8: Open in Browser
Visit:

```bash
http://127.0.0.1:5000/
```

Dashboard page:

```bash
http://127.0.0.1:5000/dashboard
```

---

## 8. How Database Works

The project uses SQLite database file:

```bash
instance/translingua.db
```

Table used:
- `translations`

Columns:
- `id`
- `source_text`
- `translated_text`
- `source_lang`
- `target_lang`
- `created_at`

---

## 9. Module Explanation

### app.py
Main Flask backend file. Handles routing, translation API, database work, and analytics.

### init_db.py
Creates the database and table.

### sample_data.py
Inserts sample translation rows.

### templates/index.html
Main UI of the translator.

### templates/dashboard.html
Simple analytics page.

### static/css/style.css
All styling for the project.

### static/js/main.js
Frontend logic for translation, speech, typing effect, theme toggle, etc.

### static/js/dashboard.js
Loads analytics data for dashboard.

---

## 10. Notes

- Voice input works best in Chrome browser.
- Translation uses online Google translation service through the Python library.
- If internet is not available, translation may fail and show error message.
- This is a student-level project, so some UI/layout parts are intentionally kept simple.

---

## 11. Author Note

This project is prepared in a final year student project style. The code is written in a realistic and readable way so that it is easy to understand, explain in viva, and modify later.
=======
# LingoBridge
AI-powered multi-language translator built using modern web technologies.
>>>>>>> eead1544779072d1fb6e3de8e75a015998fe25b1
