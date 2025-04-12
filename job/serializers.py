from job.models import CV, Result, User,JobPosting, Apply,ApplyStatus,City,District,Phone,Experience,EducationLevel,Skill,JobSearchCriteria,JobType,UserRole,ResultStatus
from rest_framework import serializers
from django.db.models import Count, Q



    
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

class ApplySerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data =  super().to_representation(instance)
        data['apply_status_label'] = ApplyStatus(instance.apply_status).label
        data['cv'] = CVSerializer(instance.cv).data
        return data
    class Meta:
        model=Apply
        fields=['id','cv','job_posting' ,'interviewing_date','apply_status']
        
class JobPostingDetailSerializer(serializers.ModelSerializer):
    
    def to_representation(self, instance):
        details = JobPosting.objects.\
        prefetch_related("apply").\
        values("id").\
        annotate(
            seen_counting=Count("apply",Q(apply__apply_status__in=[ApplyStatus.PASSED,ApplyStatus.FAILED,ApplyStatus.INTERVIEWING,ApplyStatus.CANCEL,ApplyStatus.SEEN])),
            reply_counting=Count("apply",Q(apply__apply_status__in=[ApplyStatus.PASSED,ApplyStatus.FAILED,ApplyStatus.INTERVIEWING,ApplyStatus.CANCEL])),
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




    

