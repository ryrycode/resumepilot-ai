import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)


@app.route("/")
def home():
    return {"message": "ResumePilot AI backend is running"}


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email already registered"}), 409

    password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(email=email, password_hash=password_hash)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully", "email": email}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({"message": "Login successful", "access_token": access_token}), 200


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"message": f"Hello, {user.email}. This is protected data."}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)