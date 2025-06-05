from django.test import TestCase

# Create your tests here.
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from .models import Apply

@receiver(post_save, sender=Apply)
def notify_on_application(sender, instance, created, **kwargs):
    if created:
        # Gửi email đến người nộp đơn
        send_mail(
            subject="Application Received",
            message=f"Dear {instance.cv.applicant.first_name},\n\n"
                    f"Your application for {instance.job_posting.job} has been received. "
                    f"We will review your application and contact you shortly.\n\n"
                    f"Best regards,\n{instance.job_posting.employer.first_name}",
            from_email="no-reply@jobportal.com",
            recipient_list=[instance.cv.applicant.email],
        )

        # Gửi email đến nhà tuyển dụng
        send_mail(
            subject="New Application Received",
            message=f"Dear {instance.job_posting.employer.first_name},\n\n"
                    f"You have received a new application for {instance.job_posting.job}. "
                    f"Please review it on the app.\n\n"
                    f"Best regards,\nJob Team",
            from_email="no-reply@jobportal.com",
            recipient_list=[instance.job_posting.employer.email],
        )

@receiver(post_save, sender=Apply)
def notify_on_status_change(sender, instance, created, **kwargs):
    if not created:
        # Kiểm tra trạng thái mới
        status = instance.apply_status
        status_display = instance.get_apply_status_display()
        send_mail(
            subject="Application Status Update",
            message=f"Dear {instance.cv.applicant.first_name},\n\n"
                    f"Your application for {instance.job_posting.job} has been updated to '{status_display}'. "
                    f"Please check your account for more details.\n\n"
                    f"Best regards,\nJob Team",
            from_email="no-reply@jobportal.com",
            recipient_list=[instance.cv.applicant.email],
        )

from .models import ApplyDateAndMessage

@receiver(post_save, sender=ApplyDateAndMessage)
def notify_on_interview_schedule(sender, instance, created, **kwargs):
    if created:
        send_mail(
            subject="Interview Scheduled",
            message=f"Dear {instance.apply.cv.applicant.first_name},\n\n"
                    f"Your interview for {instance.apply.job_posting.job} has been scheduled on "
                    f"{instance.interviewing_date.strftime('%Y-%m-%d %H:%M')}.\n\n"
                    f"Message from employer: {instance.message}\n\n"
                    f"Best regards,\nJob Team",
            from_email="no-reply@jobportal.com",
            recipient_list=[instance.apply.cv.applicant.email],
        )
