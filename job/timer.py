from datetime import datetime, timedelta
import threading

from job.expo_notification_configs import send_push_notification
from job.models import Apply, ExpoPushToken
from django.db.models import F

def my_task(apply_id):
    expo_push_token_list = Apply.objects.annotate(
        applicant_token = F("cv__applicant__expopushtoken__value"),
        employer_token = F("job_posting__employer__expopushtoken__value"),
        job = F("job_posting__job")
    ).values(
        "applicant_token",
        "employer_token",
        "job"
    ).get(id=apply_id)
    
    if expo_push_token_list["applicant_token"]:
        send_push_notification(expo_push_token_list["applicant_token"],"thông báo", f"15 phút nữa vào buổi phỏng vấn, {expo_push_token_list["job"]}")
    if expo_push_token_list["employer_token"]:
        send_push_notification(expo_push_token_list["employer_token"],"thông báo", f"15 phút nữa vào buổi phỏng vấn, {expo_push_token_list["job"]}")
    print("🕒 Task đã chạy vào:", datetime.now())

def set_up_alert(apply_id, interviewing_date):
    target_time = datetime.strptime(interviewing_date, "%Y-%m-%dT%H:%M:%S.%fZ")
    # delay = ((datetime.now() - target_time) - timedelta(minutes=15)).total_seconds()
    delay = timedelta(seconds=20).total_seconds()
    threading.Timer(delay, my_task, args=[apply_id]).start()
     