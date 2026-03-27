import sqlite3
import json
from datetime import datetime

def init_db():
    conn = sqlite3.connect('pashumitra.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS cases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            farmer_name TEXT,
            phone TEXT,
            district TEXT,
            animal TEXT,
            symptoms TEXT,
            language TEXT,
            severity TEXT,
            diagnosis TEXT,
            first_aid TEXT,
            vet_advice TEXT,
            summary TEXT,
            created_at TEXT
        )
    ''')
    conn.commit()
    conn.close()

def save_case(data: dict):
    conn = sqlite3.connect('pashumitra.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO cases (farmer_name, phone, district, animal, symptoms, language, severity, diagnosis, first_aid, vet_advice, summary, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data.get('farmer_name', 'Unknown'),
        data.get('phone', ''),
        data.get('district', ''),
        data['animal'],
        data['symptoms'],
        data['language'],
        data['severity'],
        data['diagnosis'],
        json.dumps(data['firstAid']),
        data['vetAdvice'],
        data['summary'],
        datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    ))
    conn.commit()
    conn.close()

def get_all_cases():
    conn = sqlite3.connect('pashumitra.db')
    c = conn.cursor()
    c.execute('SELECT * FROM cases ORDER BY created_at DESC')
    rows = c.fetchall()
    conn.close()
    cases = []
    for row in rows:
        cases.append({
            'id': row[0],
            'farmer_name': row[1],
            'phone': row[2],
            'district': row[3],
            'animal': row[4],
            'symptoms': row[5],
            'language': row[6],
            'severity': row[7],
            'diagnosis': row[8],
            'firstAid': json.loads(row[9]),
            'vetAdvice': row[10],
            'summary': row[11],
            'created_at': row[12]
        })
    return cases