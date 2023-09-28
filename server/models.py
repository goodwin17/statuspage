from __main__ import app
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False)
    login = db.Column(db.Text, unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    role = db.Column(db.Text, nullable=False)

class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    name = db.Column(db.Text, unique=True, nullable=False)
    address = db.Column(db.Text, unique=True, nullable=False)
    check_method = db.Column(db.Text, nullable=False)
    check_interval = db.Column(db.Integer, nullable=False)
    monitoring_status = db.Column(db.Integer, nullable=False)
    checks = db.relationship('Check', backref='service')
    incidents = db.relationship('Incident', backref='service')

class Check(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    datetime = db.Column(db.Text, nullable=False)
    result = db.Column(db.Text) # JSON with status and response_time

class Incident(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    reason = db.Column(db.Text)
    details = db.Column(db.Text)
    datetime = db.Column(db.Text, nullable=False)

# create tables if some tables don't exist
with app.app_context():
    db.create_all()
