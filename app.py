from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
import hashlib

app = Flask(__name__)

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///passwords.db"

db = SQLAlchemy(app)

# Database Model
class PasswordHistory(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    password_hash = db.Column(db.String(500), nullable=False)

# Create database
with app.app_context():
    db.create_all()

# Hash function
def hash_password(password):

    return hashlib.sha256(password.encode()).hexdigest()

@app.route("/", methods=["GET", "POST"])
def home():

    message = ""

    if request.method == "POST":

        password = request.form["password"]

        hashed_password = hash_password(password)

        # Check old passwords
        existing_password = PasswordHistory.query.filter_by(
            password_hash=hashed_password
        ).first()

        if existing_password:

            message = "❌ Password already used before."

        else:

            new_password = PasswordHistory(
                password_hash=hashed_password
            )

            db.session.add(new_password)

            db.session.commit()

            message = "✅ Password stored securely."

    return render_template(
        "index.html",
        message=message
    )

if __name__ == "__main__":
    app.run(debug=True)