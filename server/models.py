from __main__ import app
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)


class ExtendedModel(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)

    @classmethod
    def create(cls, **columns):
        try:
            obj = cls(columns)
            db.session.add(obj)
            db.session.commit()
        except Exception as e:
            raise e
        
        return obj
    
    def update(self, **columns):
        try:
            for key, value in columns.items():
                setattr(self, key, value)
            
            db.session.commit()
        except Exception as e:
            raise e

        return self


class User(ExtendedModel):
    name = db.Column(db.Text, nullable=False)
    login = db.Column(db.Text, unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    role = db.Column(db.Text, nullable=False)


class Service(ExtendedModel):
    name = db.Column(db.Text, unique=True, nullable=False)
    address = db.Column(db.Text, unique=True, nullable=False)
    check_method = db.Column(db.Text, nullable=False)
    check_interval = db.Column(db.Integer, nullable=False)
    monitoring_status = db.Column(db.Integer, nullable=False)
    checks = db.relationship("Check", backref="service")
    incidents = db.relationship("Incident", backref="service")


class Check(ExtendedModel):
    service_id = db.Column(db.Integer, db.ForeignKey("service.id"))
    datetime = db.Column(db.Text, nullable=False)
    result = db.Column(db.Text) # JSON with status, code and response_time


class Incident(ExtendedModel):
    service_id = db.Column(db.Integer, db.ForeignKey("service.id"))
    type = db.Column(db.Text, nullable=False)
    title = db.Column(db.Text, nullable=False)
    datetime = db.Column(db.Text, nullable=False)
    details = db.Column(db.Text) # JSON with reason and code
