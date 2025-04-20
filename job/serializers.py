from django.forms import ValidationError
from job.models import CV, Result, User,JobPosting, Apply,ApplyStatus,City,District,Phone,Experience,EducationLevel,Skill,JobSearchCriteria,JobType,UserRole,ResultStatus,ApplyDateAndMessage
from rest_framework import serializers
from django.db.models import Count, Q, F



    
class CVSerializer(serializers.ModelSerializer):
    class Meta:
        model=CV
        fields=['id','applicant','name']
        
class CVDetailSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['image'] = instance.image.url
        return data
    
    class Meta:
        model=CVSerializer.Meta.model
        fields=CVSerializer.Meta.fields +['image']
        
class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model=Phone
        fields=['id','value','user']

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model=City
        fields=['id','name']
        
class DistrictSerializer(serializers.ModelSerializer):
    city = CitySerializer()
    class Meta:
        model=District
        fields=['id','name','city']

class JobSearchCriteriaSerializer(serializers.ModelSerializer):
    class Meta:
        model=JobSearchCriteria
        fields=['applicant','job','district','job_type']

class JobSearchCriteriaDetailSerializer(serializers.ModelSerializer):
    district = DistrictSerializer()
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['job_type_label'] = JobType(instance.job_type).label
        return data
    
    class Meta:
        model=JobSearchCriteriaSerializer.Meta.model
        fields=['applicant','job','district','job_type']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Experience
        fields=['id','applicant','job','company_name']

class ExperienceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=ExperienceSerializer.Meta.model
        fields=ExperienceSerializer.Meta.fields+['description']

        
class EducationLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model=EducationLevel
        fields= ['id','applicant','school_name','mature']
        
class EducationLevelDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=EducationLevelSerializer.Meta.model
        fields= EducationLevelSerializer.Meta.fields + ['certificate','description']
        
    
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Skill
        fields=['id','applicant']

class SkillDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=SkillSerializer.Meta.model
        fields=SkillSerializer.Meta.fields + ['value']
        
class UserSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['avatar'] = instance.avatar.url
        return data
    class Meta:
        model = User
        fields = ['id','first_name','last_name','avatar']
        

class UserDetailSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['avatar'] = instance.avatar.url
        data['phones'] = PhoneSerializer(instance.phone_set.filter(active=True),many=True).data
        if instance.role == UserRole.APPLICANT:
            data['cvs'] = CVSerializer(instance.cv_set.filter(active=True),many=True).data
        return data
    
    def create(self, validated_data):
        data = validated_data
        user = User(**data)
        user.set_password(user.password)
        user.save()
        return user
    
    class Meta:
        model = UserSerializer.Meta.model
        fields = UserSerializer.Meta.fields + ['username', 'password','email', 'avatar','role']
        extra_kwargs = {
            'password':{
                'write_only':True
            }
        }

class CVInformationSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['avatar'] = instance.avatar.url
        data['phones'] = PhoneSerializer(instance.phone_set.filter(active=True),many=True).data
        data["education_levels"] = EducationLevelDetailSerializer(instance.educationlevel_set.filter(active=True),many=True).data
        data["skills"] = SkillDetailSerializer(instance.skill_set.filter(active=True),many=True).data
        data["experiences"] = ExperienceDetailSerializer(instance.experience_set.filter(active=True),many=True).data
        data['job_search_criteria'] = JobSearchCriteriaDetailSerializer(instance.jobsearchcriteria).data 
        return data
    
    class Meta:
        model=UserSerializer.Meta.model
        fields=UserSerializer.Meta.fields +['email']
        
class ResultSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['status_label'] = ResultStatus(instance.status).label
        return data
    
    class Meta:
        model=Result
        fields=['job_posting','message','status','admin']



  
class JobPostingSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        job_posting = JobPosting.objects.select_related('district', 'employer', 'result').get(id=instance.id)
        data['district'] = DistrictSerializer(job_posting.district).data
        data['employer'] = UserSerializer(job_posting.employer).data
        if self.context.get("user_role") == UserRole.EMPLOYER:
            data['result'] = ResultSerializer(job_posting.result).data if hasattr(instance, 'result') else None
        return data
        
    class Meta:
        model=JobPosting
        fields=['id','employer','job','district','salary','quantity']

class ApplyChatSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.role == 1:
            user_list = User.objects.select_related("cv__apply__job_posting__employer")\
            .filter(cv__apply__isnull=False)\
            .annotate(
                apply_id = F("cv__apply__id"),
                employer_id = F("cv__apply__job_posting__employer__id"),
                employer_first_name = F("cv__apply__job_posting__employer__first_name"),
                employer_last_name = F("cv__apply__job_posting__employer__last_name"),
                employer_avatar = F("cv__apply__job_posting__employer__avatar")
            )\
            .values(
                'apply_id',
                'employer_id',
                'employer_first_name',
                'employer_last_name',
                'employer_avatar'
            ).filter(id=instance.id)
            for user in user_list:
                user['employer_avatar'] = user['employer_avatar'].url
            data["chat_list"] = user_list
        else:
            user_list = User.objects.select_related("job_posting__apply__cv__applicant")\
            .filter(cv__apply__isnull=False) .annotate(
                apply_id = F("job_posting__apply__id"),
                applicant_id =F("job_posting__apply__cv__applicant__id"),
                applicant_first_name = F("job_posting__apply__cv__applicant__first_name"),
                applicant_last_name = F("job_posting__apply__cv__applicant__last_name"),
                applicant_avatar = F("job_posting__apply__cv__applicant__avatar"),
            ).values('apply_id','employer_id','applicant_first_name','applicant_last_name','applicant_avatar').\
            filter(id=instance.id)
            for user in user_list:
                user['applicant_avatar'] = user['applicant_avatar'].url
            data["chat_list"] = user_list        
        return data
    class Meta:
        model=User
        fields=['id']
        
class ApplySerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data =  super().to_representation(instance)
        data['apply_status_label'] = ApplyStatus(instance.apply_status).label
        cv = instance.cv
        data['cv_name'] = cv.name
        data['cv_id'] = cv.id 
        
        return data
    class Meta:
        model=Apply
        fields=['id','cv','job_posting','apply_status']

class ApplyDateAndMessageSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["apply_status"] = self.context["apply_status"]
        data["apply_status_label"] = ApplyStatus(self.context["apply_status"]).label
        return data
    
    class Meta:
        model= ApplyDateAndMessage
        fields=['apply','interviewing_date','message']
        
class ApplyDetailSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data =  super().to_representation(instance)
        data['apply_status_label'] = ApplyStatus(instance.apply_status).label
        data['cv'] = CVDetailSerializer(instance.cv).data
        more_info = instance.applydateandmessage if hasattr(instance, 'applydateandmessage') else None
        data['interviewing_date'] = more_info.interviewing_date if more_info else None 
        data['message'] = more_info.message if more_info else None 
        return data
    class Meta:
        model=ApplySerializer.Meta.model
        fields = ApplySerializer.Meta.fields
        
class JobPostingDetailSerializer(serializers.ModelSerializer):
    
    def to_representation(self, instance):
        details = JobPosting.objects.\
        prefetch_related("apply").\
        values("id").\
        annotate(
            seen_counting=Count("apply",Q(apply__apply_status__in=[ApplyStatus.PASSED,ApplyStatus.FAILED,ApplyStatus.INTERVIEWING,ApplyStatus.SEEN])),
            reply_counting=Count("apply",Q(apply__apply_status__in=[ApplyStatus.PASSED,ApplyStatus.FAILED,ApplyStatus.INTERVIEWING])),
            apply_counting=Count("apply"),
            pass_counting=Count("apply", Q(apply__apply_status=ApplyStatus.PASSED))
        ).\
        get(id=instance.id)
        data = super().to_representation(instance)
        data['seen_counting'] = details['seen_counting']
        data['pass_counting'] = details['pass_counting']
        data['reply_rate'] = details['reply_counting']/details['apply_counting'] if details['apply_counting'] else 0
        
        job_posting = JobPosting.objects.select_related('district', 'employer', 'result').get(id=instance.id)
        data['district'] = DistrictSerializer(job_posting.district).data
        data['employer'] = UserSerializer(job_posting.employer).data
       
     
        if self.context.get("user_role") == UserRole.APPLICANT:
            apply = Apply.objects.select_related('job_posting','cv').filter(job_posting__id=instance.id).filter(cv__applicant_id=self.context.get("applicant_id"))
            data['apply'] = ApplySerializer(apply[0]).data if len(apply) else None
            
        elif self.context.get("user_role") == UserRole.EMPLOYER:
            data['result'] = ResultSerializer(job_posting.result).data if hasattr(job_posting, 'result') else None
            
        data['job_type_label'] = JobType(instance.job_type).label
        return data
    def create(self, validated_data):
        return super().create(validated_data)
    class Meta:
        model=JobPostingSerializer.Meta.model
        fields=JobPostingSerializer.Meta.fields+['description','requirements','job_type','address']



    

