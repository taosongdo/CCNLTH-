from django.contrib import admin
from .models import City, User, District, Experience, EducationLevel, Skill, JobPosting, Result, Phone, JobSearchCriteria, CV, Apply

# Register your models here.


class ResultInline(admin.TabularInline):
    model = Result
    fields = ('status','message')  # Chỉ hiển thị và chỉnh sửa trường 'status'
    extra = 1  # Không thêm hàng trống

class JobPostingAdmin(admin.ModelAdmin):
    list_display = ('job', 'employer', 'district', 'salary', 'quantity', 'job_type', 'get_result_status')

    def get_result_status(self, obj):
        # Kiểm tra nếu có liên kết với Result
        if hasattr(obj, 'result'):
            return obj.result.get_status_display()  # Hiển thị trạng thái Result (PASSED/FAILED)
        return "NO RESULT"  # Nếu không có, hiển thị thông báo

    get_result_status.short_description = "Result Status"  # Tiêu đề cột trong Admin
    inlines = [ResultInline]

admin.site.register(City)
admin.site.register(District)
admin.site.register(User)
admin.site.register(Experience)
admin.site.register(EducationLevel)
admin.site.register(Skill)
admin.site.register(JobPosting, JobPostingAdmin)
admin.site.register(Result)
admin.site.register(Phone)
admin.site.register(CV)
admin.site.register(JobSearchCriteria)
admin.site.register(Apply)