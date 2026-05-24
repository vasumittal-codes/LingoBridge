# LingoBridge 🌍

LingoBridge ek Flask based language translator project hai jo multiple languages support karta hai. Is project ka main purpose ek simple translator banana hai jisme translation history aur basic analytics bhi mil jaye.

---

Features

- 20+ languages support (English, Hindi, French, Spanish, German, etc.)
- Basic analytics dashboard jisme total translations aur history dikhti hai
- SQLite database use hota hai translations save karne ke liye
- Simple web interface hai use karne ke liye easy
- Translation history dekh sakte ho

---

Requirements

- Python 3.8 ya uske upar
- pip installed hona chahiye

---

Installation

```bash
git clone https://github.com/yourusername/LingoBridge.git
cd LingoBridge
pip install -r requirements.txt
```

---

Run kaise kare

```bash
python app.py
```

Phir browser me open karo:

http://127.0.0.1:5000/

---

Project structure

LingoBridge/
- app.py -> main Flask file
- init_db.py -> database create karta hai
- sample_data.py -> sample data insert karta hai (optional)
- requirements.txt -> required packages
- templates/ -> HTML files
- static/ -> CSS aur JavaScript
- instance/ -> database file

---

Database info

Database file:
instance/translingua.db

Table name: translations

Columns:
- id
- source_text
- translated_text
- source_lang
- target_lang
- created_at

---

Modules explanation

app.py -> main backend jahan routing aur translation logic hai

init_db.py -> database create karta hai

sample_data.py -> test data add karta hai

templates folder -> UI pages (index aur dashboard)

static folder -> styling aur JS files

---

Dashboard

Dashboard me basic stats milte hain jaise:
- total translations
- recent history

URL:
http://127.0.0.1:5000/dashboard

---

Notes

- Internet required hai kyunki translation API online hai
- Chrome recommended hai voice input ke liye
- Project simple rakha gaya hai taaki easily samajh aaye aur viva me explain ho sake

---

Author

Ye project ek student ne banaya hai learning purpose ke liye. Code simple aur readable hai taaki easily modify aur explain ho sake.
