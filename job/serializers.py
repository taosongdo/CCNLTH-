from job.models import CV, Result, User,JobPosting, Apply,ApplyStatus,City,District,Phone,Experience,EduactionLevel,Skill,JobSearchCriteria,JobType
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
    district = DistrictSerializer()
    def to_representation(self, instance):
        data  = super().to_representation(instance)
        data['job_type'] = JobType(instance.job_type).label
        return data
    class Meta:
        model=JobSearchCriteria
        fields=['applicant','job','city','district','job_type']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Experience
        fields=['id','applicant','job','company_name','description']

        
class EduactionLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model=EduactionLevel
        fields= ['id','applicant','school_name','certificate','mature','description']
    
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Skill
        fields=['id','applicant','value']
        
class UserSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['avatar'] = instance.avatar.url
        data['phones'] = PhoneSerializer(instance.phone_set.filter(active=True),many=True).data
        data['cvs'] = CVSerializer(instance.cv_set.filter(active=True),many=True).data
        return data
    
    def create(self, validated_data):
        data = validated_data
        user = User(**data)
        user.set_password(user.password)
        user.save()
        return user
        
    class Meta:
        model = User
        fields = ['id','first_name','last_name','username', 'password','email', 'avatar','role']
        extra_kwargs = {
            'password':{
                'write_only':True
            }
        }

class CVInformationSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['avatar'] = instance.avatar.url
        data['job_search_criteria'] = JobSearchCriteriaSerializer(instance.jobsearchcriteria).data
        data['phones'] = PhoneSerializer(instance.phone_set.filter(active=True),many=True).data
        data["education_levels"] = EduactionLevelSerializer(instance.eduactionlevel_set.filter(active=True),many=True).data
        data["skills"] = SkillSerializer(instance.skill_set.filter(active=True),many=True).data
        data["experiences"] = ExperienceSerializer(instance.experience_set.filter(active=True),many=True).data
        return data
    
    class Meta:
        model=UserSerializer.Meta.model
        fields=UserSerializer.Meta.fields
        extra_kwargs =UserSerializer.Meta.extra_kwargs
        
class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model=Result
        fields=['id','message','status']



  
class JobPostingSerializer(serializers.ModelSerializer):
    district = DistrictSerializer()
    city = CitySerializer()
    employer = UserSerializer()
    result=ResultSerializer()
    
    def to_representation(self, instance):
        details = JobPosting.objects.\
        select_related("apply").\
        values("id").\
        annotate(
            pass_counting=Count("apply",Q(apply__apply_status=ApplyStatus.PASSED))
        ).\
        get(id=instance.id)
        data = super().to_representation(instance)
        data['pass_counting'] = details['pass_counting']
        print("gg")
        return data
    class Meta:
        model=JobPosting
        fields=['id','employer','job','district','city','result','salary','quantity']

    
class JobPostingDetailSerializer(serializers.ModelSerializer):
    district = DistrictSerializer()
    city = CitySerializer()
    employer = UserSerializer()
    result=ResultSerializer()
    
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
        return data
    
    class Meta:
        model=JobPostingSerializer.Meta.model
        fields=JobPostingSerializer.Meta.fields+['descriptions','requirements','job_type']



class ApplySerializer(serializers.ModelSerializer):
    class Meta:
        model=Apply
        fields=['id','cv','job', 'interviewing_date','expired_date','apply_status']
    

