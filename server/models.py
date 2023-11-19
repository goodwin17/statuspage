from __main__ import app
from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy(app)


class ExtendedModel(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)

    @classmethod
    def get(cls, id):
        return db.query(cls).filter_by(id=id)

    @classmethod
    def create(cls, **columns):
        obj = None
        
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


class ExtendedEnum(Enum):
    @classmethod
    def has_value(cls, value):
        return value in cls._value2member_map_
    
    @classmethod
    def get(cls, value):
        return cls(value).name if cls.has_value(value) else None


class UserRole(ExtendedEnum):
    ADMIN = "admin"
    SUPERADMIN = "superadmin"


class UserStatus(ExtendedEnum):
    ACTIVE = "active"
    INACTIVE = "inactive"


class CheckMethod(ExtendedEnum):
    HTTP = "http"
    ICMP = "icmp"


class CheckStatus(ExtendedEnum):
    OK = "ok"
    ERROR = "error"
    TIMEOUT = "timeout"


class IncidentType(ExtendedEnum):
    UP = "up"
    DOWN = "down"
    START = "start"
    STOP = "stop"


class User(ExtendedModel):
    name = db.Column(db.String, nullable=False)
    login = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    role = db.Column(db.Enum(UserRole), nullable=False)
    status = db.Column(db.Enum(UserStatus), nullable=False, default=UserStatus.ACTIVE)


class Service(ExtendedModel):
    name = db.Column(db.String, unique=True, nullable=False)
    address = db.Column(db.String, unique=True, nullable=False)
    check_method = db.Column(db.Enum(CheckMethod), nullable=False)
    check_interval = db.Column(db.Integer, nullable=False)
    monitoring_status = db.Column(db.Boolean, nullable=False)
    checks = db.relationship("Check", backref="service")
    incidents = db.relationship("Incident", backref="service")


class Check(ExtendedModel):
    service_id = db.Column(db.Integer, db.ForeignKey("service.id"))
    method = db.Column(db.Enum(CheckMethod), nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Enum(CheckStatus), nullable=False)
    code = db.Column(db.Integer, default=None)
    response_time = db.Column(db.String)


class Incident(ExtendedModel):
    service_id = db.Column(db.Integer, db.ForeignKey("service.id"))
    type = db.Column(db.Enum(IncidentType), nullable=False)
    title = db.Column(db.String, nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)
    details = db.Column(db.String, default='') # JSON with reason and code


class DailyUptime(ExtendedModel):
    service_id = db.Column(db.Integer, db.ForeignKey("service.id"))
    date = db.Column(db.Date, nullable=False)
    # datetime = db.Column(db.DateTime, nullable=False)
    uptime = db.Column(db.Float, nullable=False)
