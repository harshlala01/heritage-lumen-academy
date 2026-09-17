from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/enquiry', methods=['POST'])
def handle_enquiry():
    data = request.get_json() or request.form
    parent_name = data.get('parentName', '')
    student_name = data.get('studentName', '')
    email = data.get('parentEmail', '')
    phone = data.get('parentPhone', '')
    grade = data.get('gradeSelect', '')
    session = data.get('academicYear', '')
    message = data.get('enquiryMessage', '')
    
    # In a real app, save to database or send email notification
    return jsonify({
        'status': 'success',
        'message': f'Thank you {parent_name}, your enquiry for {student_name} (Grade: {grade}) has been received! Our admissions team will reach out at {email}.'
    })

@app.route('/api/newsletter', methods=['POST'])
def handle_newsletter():
    data = request.get_json() or request.form
    email = data.get('email', '')
    return jsonify({
        'status': 'success',
        'message': f'Subscription confirmed for {email}. Welcome to The Academy Gazette!'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)