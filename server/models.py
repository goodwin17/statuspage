from __main__ import app
from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy(app)


class CheckMethods(Enum):
    HTTP = "http"
    ICMP = "icmp"


class IncidentTypes(Enum):
    UP = "up"
    DOWN = "down"


class UserRoles(Enum):
    ADMIN = "admin"
    SUPERADMIN = "superadmin"


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
    name = db.Column(db.String, nullable=False)
    login = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    role = db.Column(db.Enum, nullable=False)


class Service(ExtendedModel):
    name = db.Column(db.String, unique=True, nullable=False)
    address = db.Column(db.String, unique=True, nullable=False)
    check_method = db.Column(db.Enum, nullable=False)
    check_interval = db.Column(db.Integer, nullable=False)
    monitoring_status = db.Column(db.Boolean, nullable=False)
    checks = db.relationship("Check", backref="service")
    incidents = db.relationship("Incident", backref="service")


class Check(ExtendedModel):
    service_id = db.Column(db.Integer, db.ForeignKey("service.id"))
    datetime = db.Column(db.String, nullable=False)
    result = db.Column(db.String) # JSON with status, code and response_time


class Incident(ExtendedModel):
    service_id = db.Column(db.Integer, db.ForeignKey("service.id"))
    type = db.Column(db.Enum, nullable=False)
    title = db.Column(db.String, nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)
    details = db.Column(db.String) # JSON with reason and code


class DailyUptime(ExtendedModel):
    service_id = db.Column(db.Integer, db.ForeignKey("service.id"))
    date = db.Column(db.Date, nullable=False)
    uptime = db.Column(db.Float, nullable=False)
