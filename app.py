from flask import Flask, render_template, request, redirect, url_for
from flask_mail import Mail, Message
import os

app = Flask(__name__)

# Configuring the Flask application
app.config['SECRET_KEY'] = 'your_secret_key'  # Secret key for sessions
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Example for Gmail SMTP
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'your-email-password'  # Replace with your email password

mail = Mail(app)

# Route for the Home page
@app.route('/')
def index():
    return render_template('index2.0.html')

# Route for the About page
@app.route('/about')
def about():
    return render_template('about2.0.html')

# Route for the Contact page
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        # Sending the email notification
        msg = Message('New Contact Form Submission', 
                      sender='your-email@gmail.com',  # Sender's email
                      recipients=['info@gourmetexpress.com'])  # Receiver's email
        msg.body = f"Name: {name}\nEmail: {email}\nMessage: {message}"

        try:
            mail.send(msg)
            return redirect(url_for('thank_you'))  # Redirect to a thank-you page after submission
        except Exception as e:
            return f"Error: {str(e)}"
    return render_template('contact2.0.html')

# Route for the Thank You page (after form submission)
@app.route('/thank-you')
def thank_you():
    return render_template('thank_you.html')

if __name__ == '__main__':
    app.run(debug=True)
