from flask_apscheduler import APScheduler
from models import db, Service, Check, DailyUptime
import datetime

daily_uptime_scheduler = APScheduler()


def get_daily_uptimes():
    yesterday = datetime.datetime.now() - datetime.timedelta(hours=24)
    services = db.session.query(Service).all()
    daily_checks_query = db.session.query(Check).filter(Check.datetime > yesterday)
    uptimes = {}

    for service in services:
        service_query = daily_checks_query.filter_by(id=service.id)
        total = service_query.count()
        ok = service_query.filter(Check.get_result()["status"] == "ok").count()
        uptimes[service.id] = (ok / total) * 100

    return uptimes


def register_daily_uptime():
    uptimes = get_daily_uptimes()

    for service_id in uptimes:
        try:
            daily_uptime = DailyUptime(
                foreign_key=service_id,
                date=datetime.date.today(),
                uptime=uptimes[service_id]
            )
            db.session.add(daily_uptime)
            db.session.commit()
        except:
            print("can not register daily uptime")


daily_uptime_scheduler.add_job('1', register_daily_uptime, trigger="cron", hour="0", minute="0")
