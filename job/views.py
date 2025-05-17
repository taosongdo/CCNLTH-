from datetime import datetime,timedelta
from django.db.models import Count
from django.forms import ValidationError
from django.http import HttpResponse
from job.serializers import \
    ApplyChatSerializer,\
    ApplySerializer,  \
    ApplyDetailSerializer, \
    UserDetailSerializer, \
    JobPostingSerializer, \
    ResultSerializer, \
    CitySerializer,\
    DistrictSerializer, \
    JobPostingDetailSerializer,\
    PhoneSerializer,\
    CVDetailSerializer,\
    CVSerializer,\
    CVInformationSerializer,\
    EducationLevelSerializer,\
    EducationLevelDetailSerializer,\
    SkillSerializer,\
    SkillDetailSerializer,\
    JobSearchCriteriaDetailSerializer,\
    ExperienceSerializer,\
    ExperienceDetailSerializer,\
    JobSearchCriteriaSerializer, \
    ApplyDateAndMessageSerializer,\
    VideoCallRoomSerializer
from job.models import CV, Apply, ExpoPushToken, User, JobPosting, ResultStatus, UserRole,ApplyStatus,City,District,Skill,EducationLevel,Experience,Result,ApplyDateAndMessage, VideoCallRoom
from job.paginator import Paginator
from rest_framework.response import Response
from rest_framework import viewsets, generics, status, permissions
from rest_framework.decorators import action
from django.db.models import Q
from django.contrib.auth import authenticate
from oauth2_provider.views import TokenView
import json

from job.perms import IsApplicant,IsEmployer,IsAdmin, IsEmployerOwner, IsApplicantOwner, IsCVEmployerOrApplicantOwner, IsCVApplicantOwner, IsCVEmployerOwner
from job.expo_notification_configs import send_push_notification
from job.timer import set_up_alert

class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserDetailSerializer

    
    def create(self, request, *args, **kwargs):
        data = request.data
        if data.get('password') == data.get('password_reenter'):
            user_serializer = UserDetailSerializer(data = data)
                
            user_serializer.is_valid(raise_exception=True)
            user = user_serializer.save()
            try:
                phone_number_1 = data['phone_number_1']
                phone_number_1_serializer = PhoneSerializer(data={
                    'user':user.id,
                    'value':phone_number_1
                })
                phone_number_1_serializer.is_valid(raise_exception=True)
            

                if 'phone_number_2' in data:
                    phone_number_2=data['phone_number_2']
                    phone_number_2_serializer = PhoneSerializer(data={
                        'user':user.id,
                        'value':phone_number_2
                    })
                    phone_number_2_serializer.is_valid(raise_exception=True)
                    phone_number_2 = phone_number_2_serializer.save()
                phone_number_1 = phone_number_1_serializer.save()
                return Response(UserDetailSerializer(user).data,status=status.HTTP_201_CREATED)
            except Exception as ex:
                if user:
                    user.delete()
                return Response({"message":f"{ex}"},status=status.HTTP_400_BAD_REQUEST)
        else:
             return Response({"message":"xác nhận và mật khẩu không giống nhau"},status=status.HTTP_400_BAD_REQUEST)
        
 
    
    @action(methods=['get','patch'],detail=False,url_path='current-user',permission_classes=[permissions.IsAuthenticated])
    def get_user(self,request):
        if request.method.__eq__('PATCH'):
            user = request.user
            for key in request.data:
                if key in ['username','avatar','note']:
                    setattr(user, key, request.data[key])
                elif key == 'password':
                    user.set_password(request.data[key])
                    user.save()
            return Response(UserDetailSerializer(user).data, status=status.HTTP_201_CREATED)
        else:
           return Response(UserDetailSerializer(request.user).data, status=status.HTTP_201_CREATED)
       

    @action(methods=['get'],detail=False,url_path='cv-information',permission_classes=[IsApplicant])
    def get_information(self, request):
        user = request.user
        return Response(CVInformationSerializer(user).data,status=status.HTTP_200_OK)

    @action(methods=['get','post','patch'],detail=False,url_path='job-search-criteria',permission_classes=[IsApplicant])
    def get_job_search_criteria(self,request):
        user = request.user
        if request.method.__eq__("POST"):
            job_search_criteria_serializer = JobSearchCriteriaSerializer(data={
                'applicant':user.id,
                'job': request.data.get("job"),
                'city': request.data.get("city"),
                'district': request.data.get("district"),
                'job_type': request.data.get("job_type")
            })
            job_search_criteria_serializer.is_valid(raise_exception=True)
            job_search_criteria = job_search_criteria_serializer.save()
            return Response(JobSearchCriteriaSerializer(job_search_criteria).data,status=status.HTTP_201_CREATED)
        elif request.method.__eq__("GET"):
            if hasattr(user,'jobsearchcriteria'):
                job_search_criteria = user.jobsearchcriteria  
                return Response(JobSearchCriteriaDetailSerializer(job_search_criteria).data,status=status.HTTP_200_OK)
            return Response({'message':"chưa có thông tin"}, status=status.HTTP_200_OK)
        else:
            if hasattr(user,'jobsearchcriteria'):
                job_search_criteria = user.jobsearchcriteria  
                job_search_criteria.district = District.objects.get(id=request.data.get('district'))
                job_search_criteria.job_type = request.data.get('job_type')
                job_search_criteria.job = request.data.get('job')
                job_search_criteria.save()
                return Response(JobSearchCriteriaDetailSerializer(job_search_criteria).data,status=status.HTTP_200_OK)
            return Response({'message':"chưa có thông tin"}, status=status.HTTP_200_OK)
            
    @action(methods=['get'],detail=False,url_path='education-levels',permission_classes=[IsApplicant])
    def get_education_level(self, request):
        user = request.user
        return Response(EducationLevelSerializer(user.educationlevel_set,many=True).data, status=status.HTTP_200_OK)
    
            
    
    @action(methods=['get'],detail=False,url_path='skills',permission_classes=[IsApplicant])
    def get_skills(self, request):
        user = request.user
        return Response(SkillSerializer(user.skill_set,many=True).data, status=status.HTTP_200_OK)
        
    @action(methods=['get'],detail=False,url_path='experiences',permission_classes=[IsApplicant])
    def get_experiences(self, request):
        user = request.user
        return Response(ExperienceSerializer(user.experience_set, many=True).data, status=status.HTTP_200_OK)
    
    @action(methods=['get'],detail=False,url_path='job-postings')
    def get_job_postings(self, request):
        queryset = JobPosting.objects.filter(active=True)
        query = queryset.exclude(result=None).filter(result__status=ResultStatus.PASSED)
        user = request.user

        
        
        if request.user.is_authenticated and request.user.role == UserRole.EMPLOYER:
            owner = request.query_params.get("owner")
            if owner:
                query = queryset.filter(employer=user.id)
            
        
        if request.user.is_authenticated and request.user.role == UserRole.ADMIN:
            query = queryset

        sort_by_date = request.query_params.get("sort_by_date")
        if sort_by_date:
            query = query.order_by("-created_date")
            
        sort_by_salary = request.query_params.get("sort_by_salary")
        if sort_by_salary:
            query = query.order_by("-salary")
            
        sort_by_popularity = request.query_params.get("sort_by_popularity")
        if sort_by_popularity:
            query = query.annotate(apply_count=Count("apply")).order_by("-apply_count")
        
        salary_max = request.query_params.get("salary_max")
        if salary_max:
            query = query.filter(salary__lt=float(salary_max))
            
        salary_min = request.query_params.get("salary_min")
        if salary_min:
            query = query.filter(salary__gt=float(salary_min))
        
        job_type = request.query_params.get("job_type")
        if job_type:
            query = query.filter(job_type=job_type)
        
        keyword = request.query_params.get("keyword")
        if keyword:
            query = query.filter(Q(job__icontains=keyword)|Q(description__icontains=keyword)|Q(requirements__icontains=keyword)|Q(district__name__icontains=keyword)|Q(district__city__name__icontains=keyword))
            
        paginator = Paginator()
        page = paginator.paginate_queryset(query, request)
        return paginator.get_paginated_response(JobPostingSerializer(page,many=True,context={'user_role': user.role if hasattr(user, 'role') else None}).data)
    
    @action(methods=['get'],detail=False,url_path='cvs')
    def get_cvs(self, request):
        cvs = CV.objects.filter(active=True).filter(applicant_id=request.user.id)
        return Response(CVSerializer(cvs,many=True).data, status=status.HTTP_200_OK)
    
    @action(methods=['get'],detail=False,url_path='chat')
    def get_chat(self, request):
        user = request.user 
        return Response(ApplyChatSerializer(user).data, status=status.HTTP_200_OK)
    
    
class EducationLevelViewSet(viewsets.ViewSet,generics.CreateAPIView,generics.RetrieveAPIView,generics.UpdateAPIView,generics.DestroyAPIView):
    queryset = EducationLevel.objects.filter(active=True)
    serializer_class = EducationLevelDetailSerializer
    permission_classes = [IsApplicantOwner, IsApplicant]
    def create(self, request, *args, **kwargs):
        user = request.user
        education_level_count = EducationLevel.objects.filter(applicant= user.id).count()
        if education_level_count < 5:
            education_level_serializer = EducationLevelSerializer(data={
                'applicant': user.id,
                'school_name': request.data.get('school_name'),
                'certificate': request.data.get('certificate'),
                'mature': request.data.get('mature'),
                'description': request.data.get('description')
            })
            education_level_serializer.is_valid(raise_exception=True)
            education_level = education_level_serializer.save()
            return Response(EducationLevelDetailSerializer(education_level).data, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':"đã đạt tới hạn mức (5)"},status=status.HTTP_400_BAD_REQUEST)
    
class SkillViewSet(viewsets.ViewSet,generics.CreateAPIView,generics.RetrieveAPIView,generics.UpdateAPIView,generics.DestroyAPIView):
    queryset = Skill.objects.filter(active=True)
    serializer_class = SkillDetailSerializer
    permission_classes = [IsApplicantOwner, IsApplicant]
    def create(self, request, *args, **kwargs):
        user = request.user
        skill_count = Skill.objects.filter(applicant=user.id).count()
        
        if skill_count < 5:
            skill_serializer = SkillDetailSerializer(data={
                'applicant': user.id,
                'value': request.data.get('value')
            })
            skill_serializer.is_valid(raise_exception=True)
            skill = skill_serializer.save()
            return Response(SkillDetailSerializer(skill).data, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'đã đạt tới số lượng tối đa (5)'}, status=status.HTTP_400_BAD_REQUEST)
    
class ExperienceViewSet(viewsets.ViewSet,generics.CreateAPIView,generics.RetrieveAPIView,generics.UpdateAPIView,generics.DestroyAPIView):
    queryset = Experience.objects.filter(active=True)
    serializer_class = ExperienceDetailSerializer
    permission_classes = [IsApplicantOwner,IsApplicant]
    def create(self, request, *args, **kwargs):
        user = request.user
        experience_count = Experience.objects.filter(applicant= user.id).count()
        if experience_count < 5:
            experience_serializer = ExperienceDetailSerializer(data={
                'applicant': user.id,
                'job': request.data.get('job'),
                'company_name': request.data.get('company_name'),
                'description': request.data.get('description')
            })
            experience_serializer.is_valid(raise_exception=True)
            experience = experience_serializer.save()
            return Response(ExperienceDetailSerializer(experience).data, status=status.HTTP_201_CREATED)
        else:
            return Response({"message":"đã đạt tới hạn mức"},status=status.HTTP_400_BAD_REQUEST)
    
    
class JobPostingViewSet(viewsets.ViewSet, generics.CreateAPIView,generics.RetrieveAPIView,generics.UpdateAPIView,generics.DestroyAPIView):
    queryset = JobPosting.objects.filter(active=True)
    serializer_class = JobPostingDetailSerializer

    def get_permissions(self):
        if self.action == 'retrieve':
            return [permissions.IsAuthenticated()]
        return [IsEmployerOwner()]
    
    def retrieve(self, request, *args, **kwargs):
        user = request.user
        job_posting = self.get_object()
        return Response(JobPostingDetailSerializer(job_posting,context={"applicant_id":user.id,'user_role':user.role}).data,status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        job_posting_serializer = JobPostingDetailSerializer(data={
            'employer':request.user.id,
            'job': request.data.get('job'),
            'district': request.data.get('district'),
            'description': request.data.get('description'),
            'requirements': request.data.get('requirements'),
            'salary':request.data.get('salary'),
            'job_type': request.data.get('job_type'),
            'quantity': request.data.get('quantity'),
            'address': request.data.get('address')
        })
        job_posting_serializer.is_valid(raise_exception=True)
        job_posting = job_posting_serializer.save()
        return Response(JobPostingDetailSerializer(job_posting).data,status=status.HTTP_201_CREATED)
    
        
    def update(self, request, *args, **kwargs):
        job_posting =  self.get_object()
        for key in request.data:
            if key in ['job','district ','descriptions','requirements','salary','job_type','quantity']:
                setattr(job_posting, key, request.data[key])
                if hasattr(job_posting,'result'):
                    job_posting.result.delete()
        return super().update(request, *args, **kwargs)
       
    def destroy(self, request, *args, **kwargs):
        job_posting =  self.get_object()
        if job_posting.apply_set.filter(active=True).exists():
            return Response({'message':'không thể xóa vì đã có người apply'}, status=status.HTTP_400_BAD_REQUEST)
        return super().destroy(request, *args, **kwargs)
    
        
    @action(methods=['get'], detail=True,url_path='applies')
    def set_apply(self,request,pk):
        applies = self.get_object().apply_set     
        return Response(ApplySerializer(applies, many=True).data,status=status.HTTP_200_OK)
    
    

class ResultViewSet(viewsets.ViewSet,generics.CreateAPIView):
    queryset = Result.objects.filter(active=True)
    serializer_class = ResultSerializer()
    permission_classes = [IsAdmin]

    def create(self, request, *args, **kwargs):
        result_serializer = ResultSerializer(data={
            "message": request.data.get("message"),
            "status": request.data.get("status"),
            "admin": request.user.id,
            "job_posting": request.data.get("job_posting"),
        })
        result_serializer.is_valid(raise_exception=True)
        result = result_serializer.save()
        return Response(ResultSerializer(result).data, status=status.HTTP_201_CREATED)
  

class CVViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView,generics.RetrieveAPIView):
    queryset = CV.objects.filter(active=True)
    serializer_class = CVDetailSerializer
    pagination_class = Paginator
    
    def get_permissions(self):
        if self.action == 'retrieve':
            return [permissions.IsAuthenticated()]
        return [IsApplicantOwner()]
    
    def create(self, request, *args, **kwargs):
        user = request.user
        cv_count = self.queryset.filter(applicant=user.id).count()
        if cv_count < 10:
            cv_detail_serializer = CVDetailSerializer(data={
                "name":request.data.get("name"),
                "applicant":request.user.id,
                "image":request.data.get("image")
            })
            cv_detail_serializer.is_valid(raise_exception=True)
            cv = cv_detail_serializer.save()
            return Response(CVDetailSerializer(cv).data, status=status.HTTP_201_CREATED)
        else:
            return Response({"message":"đã đạt tối đa số lượng cv"}, status=status.HTTP_400_BAD_REQUEST)


class ApplyViewSet(viewsets.ViewSet,generics.RetrieveAPIView,generics.CreateAPIView ,generics.UpdateAPIView,generics.DestroyAPIView):
    queryset = Apply.objects.filter(active=True)
    serializer_class = ApplyDetailSerializer
    def get_permissions(self):
        if self.action.__eq__("retrieve"):
            return [IsCVEmployerOrApplicantOwner()]
        elif self.action.__eq__("partial_update"):
            return [IsCVEmployerOwner()]
        return [IsCVApplicantOwner()]
    
    def update(self, request, *args, **kwargs):
        apply_status = request.data.get("apply_status")
        apply = self.get_object()
        apply.apply_status = apply_status
        apply.save()
        return Response(ApplyDetailSerializer(apply).data, status=status.HTTP_201_CREATED)
    
    def create(self, request, *args, **kwargs):
        apply_serializer = ApplyDetailSerializer(data={
            'cv': request.data.get("cv"),
            'job_posting': request.data.get("job_posting"),
            'message': request.data.get("message")
        })
        apply_serializer.is_valid(raise_exception=True)
        apply = apply_serializer.save()
        return Response(ApplyDetailSerializer(apply).data, status=status.HTTP_201_CREATED)
    
    
    def destroy(self, request, *args, **kwargs):
        apply = self.get_object()
        if apply.apply_status in [ApplyStatus.SENT, ApplyStatus.SEEN, ApplyStatus.FAILED]:
            self.perform_destroy(apply)
            return Response(status=status.HTTP_200_OK)
        return Response({"message":"không thể xóa vì đã được nhà tuyển dụng đã chấp nhận"}, status=status.HTTP_400_BAD_REQUEST)
    
class VideoCallRoomViewSet(viewsets.ViewSet,generics.CreateAPIView):
    queryset= VideoCallRoom.objects.filter(active=True)
    serializer_class = VideoCallRoomSerializer
    def create(self, request, *args, **kwargs):
        apply_id = request.data.get("apply_id")
        url = request.data.get("url")
        video_call_url = VideoCallRoom.objects.get_or_create(apply_id=apply_id,url=url)
        return Response(VideoCallRoomSerializer(video_call_url).data, status=status.HTTP_201_CREATED)

class ApplyMoreInfoViewSet(viewsets.ViewSet,generics.CreateAPIView):
    queryset = ApplyDateAndMessage.objects.filter(active=True)
    serializer_class = ApplyDateAndMessageSerializer
    permission_classes=[IsCVEmployerOwner]
    
    def create(self, request, *args, **kwargs):
        user = request.user
        apply_data_and_message_serializer = ApplyDateAndMessageSerializer(data=request.data)
        apply_data_and_message_serializer.is_valid(raise_exception=True)
        
      
        apply_status = request.data.get("apply_status")
        apply = Apply.objects.filter(active=True, id=request.data.get("apply"))
        apply.update(apply_status=apply_status)
        apply_data_and_message = apply_data_and_message_serializer.save()
        if request.data.get("interviewing_date"):
            set_up_alert(apply[0].id, request.data.get("interviewing_date"))
        return Response(ApplyDateAndMessageSerializer(apply_data_and_message,context={"apply_status":apply_status}).data,status=status.HTTP_201_CREATED)

    
class CityViewSet(viewsets.ViewSet,generics.ListAPIView):
    queryset=City.objects.filter(active=True)
    serializer_class=CitySerializer
    pagination_class=Paginator
    
    def get_queryset(self):
        cities = self.queryset
        keyword = self.request.query_params.get("keyword")
        if keyword:
            cities = self.queryset.filter(name__icontains=keyword)
        return cities
    
    @action(methods=['get'], detail=True, url_path='districts')
    def get_district(self,request,pk):
        districts = District.objects.filter(city=pk)
        keyword = request.query_params.get('keyword')
        if keyword:
            districts = districts.filter(name__icontains=keyword)
        page = self.paginate_queryset(districts)
        if page is not None:
            return self.get_paginated_response(DistrictSerializer(page, many=True).data)
        return Response(DistrictSerializer(districts,many=True).data, status=status.HTTP_200_OK)

class CustomTokenView(TokenView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        data = json.loads(response.content) 
        user = authenticate(username=request.POST.get("username"),password=request.POST.get("password"))
        expo_push_token = ExpoPushToken.objects.get_or_create(value=request.POST.get("expo_token"),user=user)
        if expo_push_token:
            send_push_notification(expo_push_token[0].value,"thông báo","đã đăng nhập")
        if user == None:
            return response
        data['role'] = user.role
        data = json.dumps(data)
        response = HttpResponse(content=data, status=201)
        return response 




    
    
    

    