from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import jwt
import datetime
import pymysql
import sys
import os
import uuid
import json
import re
from functools import wraps

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if sys.stderr and hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

# ---------- APP SETUP ----------
app = Flask(__name__)
app.config['SECRET_KEY'] = 'heritage_super_secret_key_2026'
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 20 * 1024 * 1024

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'pdf', 'doc', 'docx', 'txt'}
CONTENT_SECTIONS = {'banners', 'facilities', 'faculty', 'gallery', 'activities', 'notices', 'documents'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

CORS(app)
bcrypt = Bcrypt(app)

# ---------- MYSQL CONFIG ----------
DB_CONFIG = {
    'host': os.environ.get('DB_HOST', 'localhost'),
    'user': os.environ.get('DB_USER', 'root'),
    'password': os.environ.get('DB_PASSWORD', '1234'),              # XAMPP default is empty ('')
    'database': os.environ.get('DB_NAME', 'school'),
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}

def get_db():
    return pymysql.connect(**DB_CONFIG)

# ---------- DATABASE SETUP ----------
def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(20) DEFAULT 'student',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    # Enquiries table bhi banao
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS enquiries (
            id INT AUTO_INCREMENT PRIMARY KEY,
            parent_name VARCHAR(100) NOT NULL,
            student_name VARCHAR(100) NOT NULL,
            parent_email VARCHAR(100) NOT NULL,
            parent_phone VARCHAR(20) NOT NULL,
            grade VARCHAR(100) NOT NULL,
            academic_year VARCHAR(20) NOT NULL,
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS content (
            id INT AUTO_INCREMENT PRIMARY KEY,
            section VARCHAR(50) NOT NULL,
            title VARCHAR(255),
            subtitle TEXT,
            image_path VARCHAR(255),
            extra_data JSON,
            display_order INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()

    # Notices table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS notices (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            notice_date VARCHAR(50) NOT NULL,
            category VARCHAR(50) DEFAULT 'general',
            description TEXT,
            attachment_path VARCHAR(255),
            attachment_name VARCHAR(255),
            is_archived BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()

    # Events table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            event_date VARCHAR(50) NOT NULL,
            event_time VARCHAR(50),
            venue VARCHAR(255),
            description TEXT,
            is_archived BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()

    # Gallery Albums table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS gallery_albums (
            id INT AUTO_INCREMENT PRIMARY KEY,
            slug VARCHAR(100) UNIQUE NOT NULL,
            title VARCHAR(150) NOT NULL,
            description TEXT,
            cover_image VARCHAR(500),
            display_order INT DEFAULT 0
        )
    ''')
    conn.commit()

    # Gallery Items table (images & youtube video embeds)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS gallery_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            album_slug VARCHAR(100) NOT NULL,
            item_type VARCHAR(20) DEFAULT 'image',
            media_url TEXT NOT NULL,
            title VARCHAR(255),
            display_order INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()

    # Seed Default Gallery Albums if empty
    default_albums = [
        ('annual-function', 'Annual Function', 'Grand celebrations, student theatrical performances, awards, and yearly fest.', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop', 1),
        ('sports-day', 'Sports Day', 'Track and field athletics, house championships, drills, and medal ceremonies.', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop', 2),
        ('cultural-events', 'Cultural Events', 'Music, traditional dance, Rabindra Jayanti, independence day, and art exhibitions.', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop', 3),
        ('trips', 'Trips & Excursions', 'Educational field excursions, science park explorations, nature camps, and heritage walks.', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop', 4),
        ('celebrations', 'Celebrations', 'Teachers Day, Childrens Day, Saraswati Puja, and festive occasions at campus.', 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop', 5),
        ('campus', 'Campus & Infrastructure', 'Classrooms, high-tech science laboratories, smart halls, library, and sports arena.', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop', 6)
    ]
    for slug, title, desc, cover, order in default_albums:
        cursor.execute("SELECT id FROM gallery_albums WHERE slug=%s", (slug,))
        if not cursor.fetchone():
            cursor.execute(
                "INSERT INTO gallery_albums (slug, title, description, cover_image, display_order) VALUES (%s, %s, %s, %s, %s)",
                (slug, title, desc, cover, order)
            )
    conn.commit()

    # Site Settings (for Admissions, fee/book/uniform circulars, announcements)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS site_settings (
            setting_key VARCHAR(100) PRIMARY KEY,
            setting_value JSON NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()

    # Seed Default Content: Banners
    cursor.execute("SELECT COUNT(*) as cnt FROM content WHERE section='banners'")
    if cursor.fetchone()['cnt'] == 0:
        default_banners = [
            ('banners', 'Nurturing Minds, Cultivating Character', 'Affiliated to CBSE, New Delhi • Established on Unwavering Academic Rigor & Ethical Foundation', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop', 1),
            ('banners', 'State-of-the-Art Scientific & STEM Laboratories', 'Inspiring young innovators through experiential robotics, physics, chemistry, and smart digital classrooms', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1600&auto=format&fit=crop', 2),
            ('banners', 'Admissions Open for Academic Session 2026–2027', 'Welcoming scholars from Pre-Primary (Nursery) through Secondary Grade X under CBSE Curriculum', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop', 3)
        ]
        for sec, tit, sub, img, ordr in default_banners:
            cursor.execute(
                "INSERT INTO content (section, title, subtitle, image_path, display_order) VALUES (%s, %s, %s, %s, %s)",
                (sec, tit, sub, img, ordr)
            )

    # Seed Default Content: Facilities
    cursor.execute("SELECT COUNT(*) as cnt FROM content WHERE section='facilities'")
    if cursor.fetchone()['cnt'] == 0:
        default_facilities = [
            ('facilities', 'Smart Interactive Classrooms', 'Airy, ergonomically furnished spaces equipped with interactive 4K interactive boards and acoustic tuning.', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop', 1),
            ('facilities', 'Composite Science & STEM Wing', 'NABL-compliant Physics, Chemistry, and Biology laboratories equipped with computerized sensor probes.', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop', 2),
            ('facilities', 'Central Resource Library', 'Curated collection of 15,000+ volumes, international educational journals, and quiet reading quadrangles.', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop', 3),
            ('facilities', 'Computing & Artificial Intelligence Lab', 'High-speed gigabit fiber connected workstations featuring Python, Robotics, and foundational coding platforms.', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop', 4),
            ('facilities', 'Athletic Complex & Sports Arena', 'Full-size regulation basketball courts, cricket practice nets with automated bowling machines, and badminton courts.', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop', 5),
            ('facilities', 'Performing Arts & Auditorium', 'Acoustically engineered auditorium supporting theatrical productions, choir performances, and annual functions.', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop', 6)
        ]
        for sec, tit, sub, img, ordr in default_facilities:
            cursor.execute(
                "INSERT INTO content (section, title, subtitle, image_path, display_order) VALUES (%s, %s, %s, %s, %s)",
                (sec, tit, sub, img, ordr)
            )

    # Seed Default Content: Faculty
    cursor.execute("SELECT COUNT(*) as cnt FROM content WHERE section='faculty'")
    if cursor.fetchone()['cnt'] == 0:
        default_faculty = [
            ('faculty', 'Mithu Sinha Bhattacharya', 'Principal & Academic Leader (M.Sc, B.Ed • 18+ Years Pedagogy)', '/principal.png', 1),
            ('faculty', 'Dr. Subhash Chandra Ghosh', 'Dean of Academic Development & Senior Science Advisor (Ph.D Physics)', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop', 2),
            ('faculty', 'Anamika Roy Chowdhury', 'Head of Mathematics & STEM Instruction (M.Sc Mathematics, B.Ed)', 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=600&auto=format&fit=crop', 3),
            ('faculty', 'Debabrata Mukherjee', 'Head of Humanities & Social Sciences (M.A History, B.Ed)', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop', 4),
            ('faculty', 'Sreemoyee Dutta', 'Senior Educator — English Literature & Language (M.A English, B.Ed)', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop', 5),
            ('faculty', 'Arindam Banerjee', 'Director of Physical Education & Athletics (M.P.Ed, NIS Certified)', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', 6)
        ]
        for sec, tit, sub, img, ordr in default_faculty:
            cursor.execute(
                "INSERT INTO content (section, title, subtitle, image_path, display_order) VALUES (%s, %s, %s, %s, %s)",
                (sec, tit, sub, img, ordr)
            )

    # Seed Default Content: Activities
    cursor.execute("SELECT COUNT(*) as cnt FROM content WHERE section='activities'")
    if cursor.fetchone()['cnt'] == 0:
        default_activities = [
            ('activities', 'Robotics & STEM Innovation Society', 'Hands-on micro-controller programming, sensor mechanics, and state robotics olympiads.', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop', 1),
            ('activities', 'Athletics, Football & Cricket Academy', 'Structured coaching under certified instructors fostering team sportsmanship and stamina.', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop', 2),
            ('activities', 'Classical & Contemporary Performing Arts', 'Vocal Indian classical music, Rabindra Sangeet, and expressive theater workshops.', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop', 3),
            ('activities', 'Literary, Debating & Model UN Society', 'Bilingual rhetoric, competitive parliamentary debate leagues, and elocution forums.', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop', 4),
            ('activities', 'Visual Arts, Clay & Creative Craft', 'Watercolour painting, canvas sketching, sculpture, and thematic art exhibitions.', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop', 5),
            ('activities', 'Yoga, Karate & Physical Fitness Club', 'Discipline-based martial arts training, mindfulness meditation, and core physical agility.', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop', 6)
        ]
        for sec, tit, sub, img, ordr in default_activities:
            cursor.execute(
                "INSERT INTO content (section, title, subtitle, image_path, display_order) VALUES (%s, %s, %s, %s, %s)",
                (sec, tit, sub, img, ordr)
            )

    # Default notices, events, and gallery seeding disabled to respect admin deletions

    # Seed Default Site Settings
    default_settings = [
        ('admission_config', {
            'status': 'Open for 2026–2027',
            'startDate': '01/10/2025',
            'lastDate': '31/03/2026',
            'prospectusFee': '500',
            'headline': 'Admissions Open for Session 2026–2027 (Nursery to Class X)',
            'guidelines': 'Collect physical application packets from the Admissions Desk (Mon–Fri 10:30 AM to 3:00 PM). Complete verification and submit along with attested municipal birth certificate.',
            'feeNotice': 'Admission and monthly tuition fees are non-refundable as established under institutional guidelines.',
            'booklistUniformInfo': 'Uniform fabric and textbooks as per CBSE guidelines can be collected from the school store starting March 15th.'
        }),
        ('fee_structure', {
            'session': '2026-2027',
            'schoolName': 'HERITAGE DAY SCHOOL',
            'admissionFees': {
                'nursery': '5,000',
                'primary': '8,000',
                'middle': '10,000',
                'secondary': '10,000'
            },
            'monthlyFees': {
                'nursery': '1,500',
                'primary': '1,700',
                'middle': '1,900',
                'secondary': '2,100'
            },
            'refundable': 'Not Refundable'
        }),
        ('notice_categories', [
            {'id': 'admissions', 'label': 'Admissions'},
            {'id': 'recruitment', 'label': 'Recruitment'},
            {'id': 'academic', 'label': 'Academic'},
            {'id': 'examination', 'label': 'Examinations'},
            {'id': 'events', 'label': 'Events'},
            {'id': 'holidays', 'label': 'Holidays'},
            {'id': 'general', 'label': 'General'}
        ])
    ]
    for skey, sval in default_settings:
        cursor.execute("SELECT setting_key FROM site_settings WHERE setting_key=%s", (skey,))
        if not cursor.fetchone():
            cursor.execute(
                "INSERT INTO site_settings (setting_key, setting_value) VALUES (%s, %s)",
                (skey, json.dumps(sval))
            )

    conn.commit()

    # Default admin banao agar nahi hai
    cursor.execute("SELECT * FROM users WHERE role='admin'")
    if not cursor.fetchone():
        hashed = bcrypt.generate_password_hash('admin123').decode('utf-8')
        cursor.execute(
            "INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)",
            ('Super Admin', 'admin@heritage.com', hashed, 'admin')
        )
        conn.commit()
        print("✅ Default Admin Created in MySQL: admin@heritage.com / admin123")

    cursor.close()
    conn.close()

# ---------- TOKEN VERIFY DECORATOR ----------
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token missing!'}), 401
        try:
            token = token.split(" ")[1]
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            conn = get_db()
            cursor = conn.cursor()
            cursor.execute("SELECT id, name, email, role FROM users WHERE email=%s", (data['email'],))
            user = cursor.fetchone()
            cursor.close()
            conn.close()
            if not user:
                return jsonify({'message': 'User not found!'}), 401
            current_user = user
        except Exception as e:
            return jsonify({'message': 'Invalid token!', 'error': str(e)}), 401
        return f(current_user, *args, **kwargs)
    return decorated

# ---------- ROUTES ----------

@app.route('/')
def home():
    return jsonify({'message': 'Heritage Backend Running ✅'})

@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/admin/upload', methods=['POST'])
@token_required
def upload_content_image(current_user):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403

    section = request.form.get('section', '').strip().lower()
    uploaded_file = request.files.get('file')
    if section not in CONTENT_SECTIONS:
        return jsonify({'message': 'Invalid content section'}), 400
    if not uploaded_file or not uploaded_file.filename:
        return jsonify({'message': 'Image file is required'}), 400
    if not allowed_file(uploaded_file.filename):
        return jsonify({'message': 'Invalid image type'}), 400

    extension = secure_filename(uploaded_file.filename).rsplit('.', 1)[1].lower()
    filename = f'{uuid.uuid4().hex}.{extension}'
    section_folder = os.path.join(app.config['UPLOAD_FOLDER'], section)
    os.makedirs(section_folder, exist_ok=True)
    uploaded_file.save(os.path.join(section_folder, filename))
    path = f'/uploads/{section}/{filename}'
    return jsonify({'message': 'Image uploaded successfully', 'path': path, 'filename': filename}), 201

@app.route('/api/admin/content', methods=['POST'])
@token_required
def create_content(current_user):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    data = request.get_json(silent=True) or {}
    section = data.get('section', '').strip().lower()
    if section not in CONTENT_SECTIONS:
        return jsonify({'message': 'Invalid content section'}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO content (section, title, subtitle, image_path, extra_data, display_order)
        VALUES (%s, %s, %s, %s, %s, %s)
    ''', (
        section,
        data.get('title'),
        data.get('subtitle'),
        data.get('image_path'),
        json.dumps(data['extra_data']) if data.get('extra_data') is not None else None,
        data.get('display_order', 0)
    ))
    conn.commit()
    content_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return jsonify({'message': 'Content created successfully', 'id': content_id}), 201

@app.route('/api/content/<section>', methods=['GET'])
def get_content_by_section(section):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM content WHERE section=%s ORDER BY display_order, id', (section.lower(),))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(rows)

@app.route('/api/content', methods=['GET'])
def get_all_content():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM content ORDER BY section, display_order, id')
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(rows)

@app.route('/api/admin/content/<int:content_id>', methods=['DELETE'])
@token_required
def delete_content(current_user, content_id):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM content WHERE id=%s', (content_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Content deleted'})

# 1. REGISTER
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email=%s", (data['email'],))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({'message': 'Email already exists'}), 400

    hashed = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    cursor.execute(
        "INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)",
        (data['name'], data['email'], hashed, data.get('role', 'student'))
    )
    conn.commit()
    user_id = cursor.lastrowid
    cursor.close()
    conn.close()

    return jsonify({'message': 'User created!', 'user_id': user_id}), 201

# 2. LOGIN
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json(silent=True) or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '').strip()

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, password, role FROM users WHERE LOWER(TRIM(email))=%s", (email,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid email or password. Please check your credentials.'}), 401

    user_data = {
        'id': user['id'],
        'name': user['name'],
        'email': user['email'],
        'role': user['role']
    }

    token = jwt.encode({
        'email': user_data['email'],
        'role': user_data['role'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({'token': token, 'user': user_data}), 200

# 3. GET CURRENT USER
@app.route('/api/auth/me', methods=['GET'])
@token_required
def get_me(current_user):
    return jsonify(current_user)

# 4. ADMIN - Get all users
@app.route('/api/admin/users', methods=['GET'])
@token_required
def get_all_users(current_user):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, role FROM users")
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(users)
# ---------- ENQUIRY ROUTES ----------

# 5. SUBMIT ENQUIRY 
@app.route('/api/enquiries', methods=['POST'])
def create_enquiry():
    data = request.get_json()
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO enquiries 
            (parent_name, student_name, parent_email, parent_phone, grade, academic_year, message)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        ''', (
            data.get('parentName'),
            data.get('studentName'),
            data.get('parentEmail'),
            data.get('parentPhone'),
            data.get('gradeSelect'),
            data.get('academicYear'),
            data.get('enquiryMessage', '')
        ))
        conn.commit()
        enquiry_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return jsonify({'message': 'Enquiry submitted!', 'id': enquiry_id}), 201
    except Exception as e:
        return jsonify({'message': 'Error', 'error': str(e)}), 500

# 6. GET ALL ENQUIRIES 
@app.route('/api/admin/enquiries', methods=['GET'])
@token_required
def get_all_enquiries(current_user):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM enquiries ORDER BY created_at DESC")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

   
    for row in rows:
        if row.get('created_at'):
            row['created_at'] = str(row['created_at'])
    return jsonify(rows)

# 7. DELETE ENQUIRY 
@app.route('/api/admin/enquiries/<int:enquiry_id>', methods=['DELETE'])
@token_required
def delete_enquiry(current_user, enquiry_id):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM enquiries WHERE id=%s", (enquiry_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Enquiry deleted'})

# ---------- MULTI-FORMAT UPLOAD (PDF, DOCS, IMAGES) ----------
@app.route('/api/admin/upload-file', methods=['POST'])
@token_required
def upload_file(current_user):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403

    folder = request.form.get('folder', 'documents').strip().lower()
    uploaded_file = request.files.get('file')
    if not uploaded_file or not uploaded_file.filename:
        return jsonify({'message': 'File is required'}), 400
    if not allowed_file(uploaded_file.filename):
        return jsonify({'message': 'File type not allowed (allowed: PDF, DOC, DOCX, TXT, PNG, JPG, WEBP)'}), 400

    orig_name = secure_filename(uploaded_file.filename)
    extension = orig_name.rsplit('.', 1)[1].lower() if '.' in orig_name else 'bin'
    unique_name = f'{uuid.uuid4().hex}_{orig_name}'
    folder_path = os.path.join(app.config['UPLOAD_FOLDER'], folder)
    os.makedirs(folder_path, exist_ok=True)
    file_path = os.path.join(folder_path, unique_name)
    uploaded_file.save(file_path)

    return jsonify({
        'message': 'File uploaded successfully',
        'path': f'/uploads/{folder}/{unique_name}',
        'filename': orig_name,
        'size': os.path.getsize(file_path)
    }), 201

# ---------- NOTICES MANAGEMENT ----------
@app.route('/api/notices', methods=['GET'])
def get_public_notices():
    include_archived = request.args.get('include_archived', 'false').lower() == 'true'
    conn = get_db()
    cursor = conn.cursor()
    if include_archived:
        cursor.execute("SELECT * FROM notices ORDER BY id DESC")
    else:
        cursor.execute("SELECT * FROM notices WHERE is_archived = FALSE ORDER BY id DESC")
    rows = cursor.fetchall()
    for r in rows:
        if r.get('created_at'):
            r['created_at'] = str(r['created_at'])
    cursor.close()
    conn.close()
    return jsonify(rows)

@app.route('/api/admin/notices', methods=['POST'])
@token_required
def create_notice(current_user):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    data = request.get_json() or {}
    title = data.get('title', '').strip()
    if not title:
        return jsonify({'message': 'Notice title is required'}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO notices (title, notice_date, category, description, attachment_path, attachment_name, is_archived)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    ''', (
        title,
        data.get('notice_date') or datetime.date.today().strftime('%d/%m/%Y'),
        data.get('category', 'general'),
        data.get('description', ''),
        data.get('attachment_path'),
        data.get('attachment_name'),
        bool(data.get('is_archived', False))
    ))
    conn.commit()
    nid = cursor.lastrowid
    cursor.close()
    conn.close()
    return jsonify({'message': 'Notice created successfully', 'id': nid}), 201

@app.route('/api/admin/notices/<int:notice_id>', methods=['PUT'])
@token_required
def update_notice(current_user, notice_id):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    data = request.get_json() or {}
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE notices 
        SET title = COALESCE(%s, title),
            notice_date = COALESCE(%s, notice_date),
            category = COALESCE(%s, category),
            description = COALESCE(%s, description),
            attachment_path = COALESCE(%s, attachment_path),
            attachment_name = COALESCE(%s, attachment_name),
            is_archived = COALESCE(%s, is_archived)
        WHERE id = %s
    ''', (
        data.get('title'),
        data.get('notice_date'),
        data.get('category'),
        data.get('description'),
        data.get('attachment_path'),
        data.get('attachment_name'),
        data.get('is_archived'),
        notice_id
    ))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Notice updated successfully'})

@app.route('/api/admin/notices/<int:notice_id>', methods=['DELETE'])
@token_required
def delete_notice(current_user, notice_id):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM notices WHERE id = %s", (notice_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Notice deleted successfully'})

# ---------- EVENTS MANAGEMENT ----------
@app.route('/api/events', methods=['GET'])
def get_public_events():
    include_archived = request.args.get('include_archived', 'false').lower() == 'true'
    conn = get_db()
    cursor = conn.cursor()
    if include_archived:
        cursor.execute("SELECT * FROM events ORDER BY id DESC")
    else:
        cursor.execute("SELECT * FROM events WHERE is_archived = FALSE ORDER BY id DESC")
    rows = cursor.fetchall()
    for r in rows:
        if r.get('created_at'):
            r['created_at'] = str(r['created_at'])
    cursor.close()
    conn.close()
    return jsonify(rows)

@app.route('/api/admin/events', methods=['POST'])
@token_required
def create_event(current_user):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    data = request.get_json() or {}
    title = data.get('title', '').strip()
    if not title:
        return jsonify({'message': 'Event title is required'}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO events (title, event_date, event_time, venue, description, is_archived)
        VALUES (%s, %s, %s, %s, %s, %s)
    ''', (
        title,
        data.get('event_date') or datetime.date.today().strftime('%d/%m/%Y'),
        data.get('event_time', ''),
        data.get('venue', 'School Campus'),
        data.get('description', ''),
        bool(data.get('is_archived', False))
    ))
    conn.commit()
    eid = cursor.lastrowid
    cursor.close()
    conn.close()
    return jsonify({'message': 'Event created successfully', 'id': eid}), 201

@app.route('/api/admin/events/<int:event_id>', methods=['PUT'])
@token_required
def update_event(current_user, event_id):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    data = request.get_json() or {}
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE events 
        SET title = COALESCE(%s, title),
            event_date = COALESCE(%s, event_date),
            event_time = COALESCE(%s, event_time),
            venue = COALESCE(%s, venue),
            description = COALESCE(%s, description),
            is_archived = COALESCE(%s, is_archived)
        WHERE id = %s
    ''', (
        data.get('title'),
        data.get('event_date'),
        data.get('event_time'),
        data.get('venue'),
        data.get('description'),
        data.get('is_archived'),
        event_id
    ))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Event updated successfully'})

@app.route('/api/admin/events/<int:event_id>', methods=['DELETE'])
@token_required
def delete_event(current_user, event_id):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM events WHERE id = %s", (event_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Event deleted successfully'})

# ---------- ALBUM-BASED GALLERY MANAGEMENT ----------
@app.route('/api/gallery/albums', methods=['GET'])
def get_gallery_albums():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM gallery_albums ORDER BY display_order ASC, id ASC")
    albums = cursor.fetchall()
    for alb in albums:
        cursor.execute("SELECT COUNT(*) as total FROM gallery_items WHERE album_slug = %s", (alb['slug'],))
        cnt = cursor.fetchone()
        alb['item_count'] = cnt['total'] if cnt else 0
        cursor.execute("SELECT media_url FROM gallery_items WHERE album_slug = %s AND item_type = 'image' ORDER BY display_order ASC, id DESC LIMIT 1", (alb['slug'],))
        first_img = cursor.fetchone()
        alb['cover_image'] = first_img['media_url'] if first_img else None
    cursor.close()
    conn.close()
    return jsonify(albums)

@app.route('/api/admin/gallery/albums', methods=['POST'])
@token_required
def create_gallery_album(current_user):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    data = request.get_json() or {}
    title = data.get('title', '').strip()
    description = data.get('description', '').strip()

    if not title:
        return jsonify({'message': 'Album category title is required'}), 400

    slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    if not slug:
        slug = f'album-{uuid.uuid4().hex[:6]}'

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM gallery_albums WHERE slug = %s", (slug,))
    if cursor.fetchone():
        slug = f"{slug}-{uuid.uuid4().hex[:4]}"

    cursor.execute("SELECT COALESCE(MAX(display_order), 0) + 1 AS next_order FROM gallery_albums")
    next_order = cursor.fetchone()['next_order']

    cursor.execute(
        "INSERT INTO gallery_albums (slug, title, description, display_order) VALUES (%s, %s, %s, %s)",
        (slug, title, description, next_order)
    )
    conn.commit()
    album_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return jsonify({'message': 'Category album created successfully', 'id': album_id, 'slug': slug, 'title': title}), 201

@app.route('/api/admin/gallery/albums/<int:album_id>', methods=['PUT'])
@token_required
def update_gallery_album(current_user, album_id):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    data = request.get_json() or {}
    title = data.get('title', '').strip()
    description = data.get('description', '').strip()

    if not title:
        return jsonify({'message': 'Album category title is required'}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE gallery_albums SET title = %s, description = %s WHERE id = %s", (title, description, album_id))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Category album updated successfully'})

@app.route('/api/admin/gallery/albums/<int:album_id>', methods=['DELETE'])
@token_required
def delete_gallery_album(current_user, album_id):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT slug FROM gallery_albums WHERE id = %s", (album_id,))
    album = cursor.fetchone()
    if not album:
        cursor.close()
        conn.close()
        return jsonify({'message': 'Album not found'}), 404

    slug = album['slug']
    cursor.execute("DELETE FROM gallery_items WHERE album_slug = %s", (slug,))
    cursor.execute("DELETE FROM gallery_albums WHERE id = %s", (album_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Category album and all its photos deleted successfully'})

@app.route('/api/gallery/items/<album_slug>', methods=['GET'])
def get_gallery_items(album_slug):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM gallery_items WHERE album_slug = %s ORDER BY display_order ASC, id ASC", (album_slug,))
    items = cursor.fetchall()
    for item in items:
        if item.get('created_at'):
            item['created_at'] = str(item['created_at'])
    cursor.close()
    conn.close()
    return jsonify(items)

@app.route('/api/gallery/all', methods=['GET'])
def get_all_gallery_items():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT gi.*, ga.title as album_title 
        FROM gallery_items gi 
        LEFT JOIN gallery_albums ga ON gi.album_slug = ga.slug 
        ORDER BY gi.id DESC
    """)
    rows = cursor.fetchall()
    for item in rows:
        if item.get('created_at'):
            item['created_at'] = str(item['created_at'])
    cursor.close()
    conn.close()
    return jsonify(rows)

@app.route('/api/admin/gallery/items', methods=['POST'])
@token_required
def create_gallery_item(current_user):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    data = request.get_json() or {}
    album_slug = data.get('album_slug', '').strip()
    media_url = data.get('media_url', '').strip()
    item_type = data.get('item_type', 'image')

    if not album_slug or not media_url:
        return jsonify({'message': 'Album and media URL / file are required'}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT MAX(display_order) as max_ord FROM gallery_items WHERE album_slug = %s", (album_slug,))
    res = cursor.fetchone()
    next_order = (res['max_ord'] or 0) + 1 if res else 1

    cursor.execute('''
        INSERT INTO gallery_items (album_slug, item_type, media_url, title, display_order)
        VALUES (%s, %s, %s, %s, %s)
    ''', (
        album_slug,
        item_type,
        media_url,
        data.get('title', ''),
        next_order
    ))
    conn.commit()
    item_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return jsonify({'message': 'Item added to gallery successfully', 'id': item_id}), 201

@app.route('/api/admin/gallery/items/<int:item_id>/reorder', methods=['PUT'])
@token_required
def reorder_gallery_item(current_user, item_id):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    data = request.get_json() or {}
    direction = data.get('direction', 'up')

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, album_slug, display_order FROM gallery_items WHERE id = %s", (item_id,))
    item = cursor.fetchone()
    if not item:
        cursor.close()
        conn.close()
        return jsonify({'message': 'Item not found'}), 404

    album_slug = item['album_slug']
    curr_order = item['display_order']

    if direction == 'up':
        cursor.execute('''
            SELECT id, display_order FROM gallery_items 
            WHERE album_slug = %s AND display_order < %s 
            ORDER BY display_order DESC LIMIT 1
        ''', (album_slug, curr_order))
        swap_item = cursor.fetchone()
    else:
        cursor.execute('''
            SELECT id, display_order FROM gallery_items 
            WHERE album_slug = %s AND display_order > %s 
            ORDER BY display_order ASC LIMIT 1
        ''', (album_slug, curr_order))
        swap_item = cursor.fetchone()

    if swap_item:
        cursor.execute("UPDATE gallery_items SET display_order = %s WHERE id = %s", (swap_item['display_order'], item['id']))
        cursor.execute("UPDATE gallery_items SET display_order = %s WHERE id = %s", (curr_order, swap_item['id']))
        conn.commit()

    cursor.close()
    conn.close()
    return jsonify({'message': 'Order updated successfully'})

@app.route('/api/admin/gallery/items/<int:item_id>', methods=['DELETE'])
@token_required
def delete_gallery_item(current_user, item_id):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM gallery_items WHERE id = %s", (item_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Gallery item removed successfully'})

# ---------- SITE SETTINGS (ADMISSIONS, DATES, FEES, BOOKLIST, UNIFORM) ----------
@app.route('/api/settings/<key>', methods=['GET'])
def get_site_setting(key):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT setting_value FROM site_settings WHERE setting_key = %s", (key,))
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    if row and row.get('setting_value'):
        val = row['setting_value']
        if isinstance(val, str):
            try:
                val = json.loads(val)
            except Exception:
                pass
        return jsonify(val)
    return jsonify({})

@app.route('/api/admin/settings/<key>', methods=['POST'])
@token_required
def save_site_setting(current_user, key):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    data = request.get_json()
    if data is None:
        data = {}
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO site_settings (setting_key, setting_value)
        VALUES (%s, %s)
        ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)
    ''', (key, json.dumps(data)))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Settings saved successfully', 'key': key})

# ---------- OVERVIEW METRICS / STATS ----------
@app.route('/api/admin/stats', methods=['GET'])
@token_required
def get_admin_stats(current_user):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) as cnt FROM enquiries")
    enquiries_cnt = cursor.fetchone()['cnt']

    cursor.execute("SELECT COUNT(*) as cnt FROM notices WHERE is_archived = FALSE")
    notices_cnt = cursor.fetchone()['cnt']

    cursor.execute("SELECT COUNT(*) as cnt FROM events WHERE is_archived = FALSE")
    events_cnt = cursor.fetchone()['cnt']

    cursor.execute("SELECT COUNT(*) as cnt FROM gallery_items")
    gallery_cnt = cursor.fetchone()['cnt']

    cursor.execute("SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 5")
    recent_enquiries = cursor.fetchall()
    for e in recent_enquiries:
        if e.get('created_at'):
            e['created_at'] = str(e['created_at'])

    cursor.close()
    conn.close()
    return jsonify({
        'total_enquiries': enquiries_cnt,
        'active_notices': notices_cnt,
        'upcoming_events': events_cnt,
        'gallery_items': gallery_cnt,
        'recent_enquiries': recent_enquiries
    })
# ---------- RUN ----------
if __name__ == '__main__':
    try:
        init_db()
        print("✅ MySQL Connected Successfully!")
    except Exception as e:
        print(f"❌ MySQL Connection Error: {e}")
        print("👉 Check karo: XAMPP MySQL chalu hai? Database 'heritage_db' bana hai?")
        exit(1)

    app.run(debug=True, port=5000)