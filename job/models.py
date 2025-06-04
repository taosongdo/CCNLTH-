from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField
from django.conf import settings
from django.core.validators import MinLengthValidator

class BaseModel(models.Model):
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class UserRole(models.IntegerChoices):
    APPLICANT = 1
    EMPLOYER = 2
    ADMIN = 3
    
    
class City(BaseModel):
    name = models.CharField(max_length=30)

class District(BaseModel):
    name = models.CharField(max_length=30)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    
class User(AbstractUser):
    avatar = CloudinaryField()
    role = models.IntegerField(choices=UserRole.choices,default=UserRole.APPLICANT)
    gender = models.BooleanField(default=True)
    email = models.EmailField(unique=True, blank=False, null=False)
    first_name = models.CharField(max_length=150, blank=False, null=False)
    last_name = models.CharField(max_length=150, blank=False, null=False)

class JobType(models.IntegerChoices):
    FULL_TIME = 1
    PART_TIME = 2
    CONSTRACT = 3
    INTERNSHIP = 4
    FREELANCE = 5
    TEMPORARY = 6
    REMOTE_WORK = 7
    ORDER = 8


class JobSearchCriteria(BaseModel):
    applicant = models.OneToOneField(User,primary_key=True,on_delete=models.CASCADE)
    job = models.CharField(max_length=30)
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    job_type = models.IntegerField(choices=JobType.choices, default=JobType.FULL_TIME)
    
class Experience(BaseModel):
    applicant = models.ForeignKey(User,on_delete=models.CASCADE)
    job = models.CharField(max_length=30)
    company_name = models.CharField(max_length=40)
    description = models.TextField(max_length=40)

class EducationLevel(BaseModel):
    applicant = models.ForeignKey(User,on_delete=models.CASCADE)
    school_name = models.CharField(max_length=30)
    certificate = models.CharField(max_length=30)
    mature = models.CharField(max_length=30)
    description = models.TextField()
    
class Skill(BaseModel):
    applicant = models.ForeignKey(User,on_delete=models.CASCADE)
    value=models.CharField(max_length=100,default=None)
    
class Phone(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    value = models.CharField(
        max_length=10,
        unique=True,
        validators=[MinLengthValidator(10)]
    )
    
class ResultStatus(models.IntegerChoices):
    PASSED = 1,"PASSED"
    FAILED = 2,"FAILED"




class JobPosting(BaseModel):
    employer = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.CharField(max_length=30)
    district = models.ForeignKey(District, on_delete=models.CASCADE,null=False,blank=False)
    description = models.TextField(null=True,blank=True)
    requirements = models.TextField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    job_type = models.IntegerField(choices=JobType.choices, default=JobType.FULL_TIME)
    quantity = models.IntegerField()
    address = models.CharField(max_length=60)
    

class Result(BaseModel):
    job_posting = models.OneToOneField(JobPosting, primary_key=True, on_delete=models.CASCADE)
    admin = models.ForeignKey(User, on_delete=models.CASCADE,related_name="admin_jobs",null=True)
    message = models.CharField(max_length=20)
    status = models.IntegerField(choices=ResultStatus.choices, default=ResultStatus.PASSED)

class CV(BaseModel):
    applicant = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=40)
    image = CloudinaryField()

class ApplyStatus(models.IntegerChoices):
    SENT = 1
    SEEN = 2
    INTERVIEWING = 3
    PASSED = 4
    FAILED = 5
    
class Apply(BaseModel):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE)
    job_posting = models.ForeignKey(JobPosting, on_delete=models.CASCADE)
    apply_status = models.IntegerField(choices=ApplyStatus.choices, default=ApplyStatus.SENT)

class ApplyDateAndMessage(BaseModel):
    apply = models.OneToOneField(Apply, primary_key=True,on_delete = models.CASCADE)
    message = models.TextField()
    interviewing_date = models.DateTimeField(null=True,blank=True)

class ExpoPushToken(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    value = models.CharField(max_length=100)

    
    
