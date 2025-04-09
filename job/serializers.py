from job.models import CV, Result, User,JobPosting, Apply,ApplyStatus,City,District,Phone,Experience,EducationLevel,Skill,JobSearchCriteria,JobType,UserRole
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
    class Meta:
        model=Result
        fields=['id','message','status','admin']



  
class JobPostingSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['district'] = DistrictSerializer(instance.district).data
        data['employer'] = UserSerializer(instance.employer).data
        data['result'] =  ResultSerializer(instance.result).data if hasattr(instance,'result') else None
        return data
        
    class Meta:
        model=JobPosting
        fields=['id','employer','job','district','salary','quantity']

    
class JobPostingDetailSerializer(serializers.ModelSerializer):
    
    def to_representation(self, instance):
        details = JobPosting.objects.\
        select_related("apply").\
        values("id").\
        annotate(
            apply_counting=Count("apply"),
            pass_counting=Count("apply",Q(apply__apply_status=ApplyStatus.PASSED))
        ).\
        get(id=instance.id)
        data = super().to_representation(instance)
        data['apply_counting'] = details['apply_counting']
        data['pass_counting'] = details['pass_counting']
        data['district'] = DistrictSerializer(instance.district).data
        data['employer'] = UserSerializer(instance.employer).data
        data['result'] = ResultSerializer(instance.result).data if hasattr(instance, 'result') else None
        data['job_type_label'] = JobType(instance.job_type).label
        return data
    
    class Meta:
        model=JobPostingSerializer.Meta.model
        fields=JobPostingSerializer.Meta.fields+['description','requirements','job_type','address']



class ApplySerializer(serializers.ModelSerializer):
    class Meta:
        model=Apply
        fields=['id','cv','job', 'interviewing_date','expired_date','apply_status']
    

