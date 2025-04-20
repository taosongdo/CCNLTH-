from datetime import datetime, timedelta
import threading

from job.expo_notification_configs import send_push_notification
from job.models import ExpoPushToken

def my_task(user_id,job):
    expo_push_token = ExpoPushToken.objects.filter(user=user_id).first()
    if expo_push_token:
        send_push_notification(expo_push_token.value,"thông báo", f"15 phút nữa vào buổi phỏng vấn, ${job}")
    print("🕒 Task đã chạy vào:", datetime.now())

def set_up_alert(user_id, interviewing_date, job):
    target_time = datetime.strptime(interviewing_date, "%Y-%m-%dT%H:%M:%S.%fZ")
    delay = ((datetime.now() - target_time) - timedelta(minutes=15)).total_seconds()
    # delay = timedelta(seconds=20).total_seconds()
    threading.Timer(delay, my_task, args=[user_id,job]).start()
     