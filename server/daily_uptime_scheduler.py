from flask_apscheduler import APScheduler
from models import db, Service, Check, DailyUptime, CheckStatus
from datetime import timedelta, date

daily_uptime_scheduler = APScheduler()


def get_daily_uptimes():
    print('inside of get_daily_uptimes')
    yesterday = date.now() - timedelta(hours=24)
    uptimes = {}
    from __main__ import app

    with app.app_context():
        services = db.session.query(Service).all()
        
        if services is None or len(services) == 0:
            return None
        
        daily_checks_query = db.session.query(Check).filter(Check.datetime > yesterday)

        for service in services:
            service_query = daily_checks_query.filter_by(service_id=service.id)
            print(service_query.all())
            total_count = service_query.count()
            print(service_query.count())

            if total_count == 0:
                return None
            
            ok_count = service_query.filter(Check.status == CheckStatus.OK).count()
            uptimes[service.id] = (ok_count / total_count) * 100

    return uptimes


def register_daily_uptime():
    uptimes = get_daily_uptimes()

    if uptimes is None or len(uptimes) == 0:
        return None

    from __main__ import app
    day = date.today() - timedelta(hours=24)

    with app.app_context():
        for service_id in uptimes.keys():
            try:
                daily_uptime = DailyUptime(
                    service_id=service_id,
                    date=day,
                    # datetime=now(),
                    uptime=uptimes[service_id]
                )
                db.session.add(daily_uptime)
                db.session.commit()
            except:
                print("can not register daily uptime")


daily_uptime_scheduler.add_job('1', register_daily_uptime, trigger="cron", hour="0", minute="0", second="1")
# daily_uptime_scheduler.add_job('1', register_daily_uptime, trigger="cron", second=5) # test
