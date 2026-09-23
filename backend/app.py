from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import jwt
import datetime
import pymysql
import os
import uuid
import json
from functools import wraps

# ---------- APP SETUP ----------
app = Flask(__name__)
app.config['SECRET_KEY'] = 'heritage_super_secret_key_2026'
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
CONTENT_SECTIONS = {'banners', 'facilities', 'faculty', 'gallery', 'activities'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

CORS(app)
bcrypt = Bcrypt(app)

# ---------- MYSQL CONFIG ----------
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '1234',              # XAMPP mein default empty hota hai
    'database': 'heritage_db',
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
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, password, role FROM users WHERE email=%s", (data['email'],))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user or not bcrypt.check_password_hash(user['password'], data['password']):
        return jsonify({'message': 'Invalid email or password'}), 401

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