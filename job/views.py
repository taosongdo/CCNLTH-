from datetime import datetime,timedelta

from django.http import HttpResponse
from job.serializers import \
    ApplySerializer,  \
    UserSerializer, \
    JobPostingSerializer, \
    ResultSerializer, \
    CitySerializer,\
    DistrictSerializer, \
    JobPostingDetailSerializer,\
    PhoneSerializer,\
    CVDetailSerializer,\
    CVInformationSerializer,\
    EduactionLevelSerializer,\
    SkillSerializer,\
    ExperienceSerializer,\
    JobSearchCriteriaSerializer
from job.models import CV, Apply, User, JobPosting, ResultStatus, UserRole,ApplyStatus,City,District,Skill,EduactionLevel,Experience,JobSearchCriteria
from job.paginator import Paginator
from rest_framework.response import Response
from rest_framework import viewsets, generics, status, permissions
from rest_framework.decorators import action
from django.db.models import Q
from django.contrib.auth import authenticate
from oauth2_provider.views import TokenView
import json

from job.perms import IsApplicant,IsEmployer,IsAdmin, IsOwner

class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action == 'list':
            return [IsAdmin()]
        elif self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    def create(self, request, *args, **kwargs):
        data = request.data
        user_serializer = UserSerializer(data=data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        
        phone_number_1 = data['phone_number_1']
        phone_number_1_serializer = PhoneSerializer(data={
            'user':user.id,
            'phone':phone_number_1
        })
        phone_number_1_serializer.is_valid(raise_exception=True)
        phone_number_1 = phone_number_1_serializer.save()

        if 'phone_number_2' in data:
            phone_number_2=data['phone_number_2']
            phone_number_2_serializer = PhoneSerializer(data={
                'user':user.id,
                'phone':phone_number_2
            })
            phone_number_2_serializer.is_valid(raise_exception=True)
            phone_number_2 = phone_number_2_serializer.save()
        return Response(UserSerializer(user).data,status=status.HTTP_201_CREATED)
    
 
    
    @action(methods=['get','patch'],detail=False,url_path='current-user')
    def get_user(self,request):
        if request.method.__eq__('PATCH'):
            user = request.user
            for key in request.data:
                if key in ['username','avatar','note']:
                    setattr(user, key, request.data[key])
                elif key == 'password':
                    user.set_password(request.data[key])
                    user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        else:
           return Response(UserSerializer(request.user).data, status=status.HTTP_201_CREATED)
       

    @action(methods=['get'],detail=False,url_path='cv-information')
    def get_information(self, request):
        user = request.user
        return Response(CVInformationSerializer(user).data,status=status.HTTP_200_OK)

    @action(methods=['get','post','patch'],detail=False,url_path='job-search-criteria')
    def get_job_search_criteria(self,request):
        user = request.user
        if request.action.__eq__("POST"):
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
        elif request.action.__eq__("GET"):
            if hasattr(user,'jobsearchcriteria'):
                job_search_criteria = user.jobsearchcriteria
                return Response(JobSearchCriteriaSerializer(job_search_criteria).data,status=status.HTTP_200_OK)
            return Response({'message':"chưa có thông tin"}, status=status.HTTP_200_OK)
            
        

class EducationLevelViewSet(viewsets.ViewSet,generics.CreateAPIView,generics.ListAPIView,generics.UpdateAPIView):
    queryset = EduactionLevel.objects.filter(active=True)
    serializer_class = EduactionLevelSerializer
    permission_classes = [IsOwner, IsApplicant]
    
    def create(self, request, *args, **kwargs):
        user = request.user
        education_level_serializer = EduactionLevelSerializer(data={
            "applicant": user.id, 
            "school_name": request.data.get("school_name"),
            "certificate": request.data.get("certificate"),
            "mature": request.data.get("mature"),
            "description": request.data.get("description")
        })
        education_level_serializer.is_valid(raise_exception=True)
        education_level = education_level_serializer.save()
        return Response(EduactionLevelSerializer(education_level).data, status=status.HTTP_201_CREATED)
    
    def get_queryset(self):
        return super().get_queryset()
    
    def get_queryset(self):
        user = self.request.user
        education_level_list = self.queryset.filter(applicant = user.id)
        return education_level_list
    
    
class SkillViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView):
    queryset = Skill.objects.filter(active=True)
    serializer_class = SkillSerializer
    permission_classes = [IsOwner, IsApplicant]
    
    def create(self, request, *args, **kwargs):
        user = request.user
        skill_serializer = SkillSerializer(data={
            "applicant": user.id,
            "value": user
        })
        skill_serializer.is_valid(raise_exception=True)
        skill = skill_serializer.save()
        return Response(SkillSerializer(skill).data, status=status.HTTP_201_CREATED)
    
    def get_queryset(self):
        user = self.request.user
        skill_list = self.queryset.filter(applicant = user.id)
        return skill_list
    
class ExperienceViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView, generics.UpdateAPIView,generics.DestroyAPIView):
    queryset = Experience.objects.filter(active=True)
    serializer_class = ExperienceSerializer
    permission_classes = [IsOwner,IsApplicant]
    
    def create(self, request, *args, **kwargs):
        user = request.user
        experience_count = self.queryset.filter(applicant=user.id).count()
        if experience_count<5:
            experience_serializer = ExperienceSerializer(data={
                "applicant": user.id,
                "job": request.data.get("job"),
                "company_name": request.data.get("company_name"),
                "description": request.data.get("description")
            })
            experience_serializer.is_valid(raise_exception=True)
            experience = experience_serializer.save()
            return Response(ExperienceSerializer(experience).data, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'đã quá số lượng kinh nghiệm cho phép'}, status=status.HTTP_400_BAD_REQUEST)
    
    def get_queryset(self):
        user = self.request.user
        experience_list = self.queryset.filter(applicant = user.id)
        return experience_list
    
    
class JobPostingViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView,generics.UpdateAPIView):
    queryset = JobPosting.objects.filter(active=True)
    serializer_class = JobPostingSerializer
    def get_permissions(self):
        if self.action == 'create':
            return [IsEmployer()]
        return [permissions.AllowAny()]
    
    def create(self, request, *args, **kwargs):
        try:
            job_posting_serializer = JobPostingSerializer(data={
                'id_employer':request.user.id,
                'id_job': request.data.get('id_job'),
                'id_district': request.data.get('id_district'),
                'id_city': request.data.get('id_city'),
                'descriptions': request.data.get('descriptions'),
                'requirements': request.data.get('requirements'),
                'salary':request.data.get('salary'),
                'job_type': request.data.get('job_type'),
                'quantity': request.data.get('quantity')
            })
            job_posting_serializer.is_valid(raise_exception=True)
            job_posting = job_posting_serializer.save()
            return Response(JobPostingSerializer(job_posting).data,status=status.HTTP_201_CREATED)
        except Exception as ex:
            return Response({"message":f"{str(ex)}"},status=status.HTTP_400_BAD_REQUEST)
        
    def get_queryset(self):
        query = self.queryset.exclude(result=None)
        user = self.request.user

        if self.request.user.is_authenticated and self.request.user.role == UserRole.EMPLOYER:
            owner = self.request.query_params.get("owner")
            if owner:
                query = self.queryset.filter(id_employer=user.id)
        
        if self.request.user.is_authenticated and self.request.user.role == UserRole.ADMIN:
            query = self.queryset

        salary_max = self.request.query_params.get("salary_max")
        if salary_max:
            query = query.filter(salary__lt=float(salary_max))
            
        salary_min = self.request.query_params.get("salary_min")
        if salary_min:
            query = query.filter(salary__gt=float(salary_min))
        
        job_type = self.request.query_params.get("job_type")
        if job_type:
            query = query.filter(job_type=job_type)
        
        name = self.request.query_params.get("name")
        if name:
            query = query.filter(name__icontains=name)
            
        return query
        
    def update(self, request, *args, **kwargs):
        active = request.data.get("active")
        if self.get_object().apply_set.filter(active=True).exists() and active == None:
            return Response({'message':'không thể xóa vì đã có người apply'}, status=status.HTTP_400_BAD_REQUEST)
        elif active != None:
            self.get_object().apply_set.filter(active=True).update(apply_status=ApplyStatus.CANCEL)
        return super().update(request, *args, **kwargs)
        
    
    @action(methods=['post'], detail=True, url_path='results')
    def set_result(self, request, pk):
        try:
            result_serializer = ResultSerializer(data={
                "message": request.data.get("message"),
                "status": request.data.get("status"),
                "id": pk
            })
            result_serializer.is_valid(raise_exception=True)
            result = result_serializer.save()
            return Response(ResultSerializer(result).data, status=status.HTTP_201_CREATED)
        except Exception as ex:
            return Response({"message":f"{str(ex)}"}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=['get','post'], detail=True,url_path='applies')
    def set_apply_post(self, request, pk):
        try:
            if request.user.role == UserRole.APPLICANT and request.method.__eq__('POST'):
                job = self.get_object()
                if not hasattr(job,'result') or job.result.status == ResultStatus.FAILED:
                    return Response({"message": "công việc này hiện tại chưa hợp lệ"},status=status.HTTP_409_CONFLICT)
                
                apply_check = job.result.filter(
                    id_cv = request.data.get('id_cv'),
                    id_job = pk,
                    apply_status__in=[ApplyStatus.SENT,ApplyStatus.INTERVIEWING]).exists()
                
                if apply_check:
                    return Response({"message": "đã ứng tuyển và trong quá trình xét tuyển "},status=status.HTTP_409_CONFLICT)

                apply = Apply.objects.create(
                    id_cv = CV.objects.get(id=request.data.get('id_cv')),
                    id_job = self.get_object(),
                    expired_date = datetime.now() + timedelta(days=33) 
                )
                return Response(ApplySerializer(apply).data,status=status.HTTP_201_CREATED)
            else:
                applies = self.get_object().apply_set
                return Response(ApplySerializer(applies, many=True).data, status=status.HTTP_200_OK)
        except Exception as ex:
            return Response({"message":f"{ex}"},status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=['get'],detail=True,url_path='current-job-posting')
    def set_detail(self,request,pk):
        jobPosting = self.get_object()
        return Response(JobPostingDetailSerializer(jobPosting).data, status=status.HTTP_200_OK)
    
class CVViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.ListAPIView, generics.UpdateAPIView, generics.DestroyAPIView,generics.RetrieveAPIView):
    queryset = CV.objects.filter(active=True)
    serializer_class = CVDetailSerializer
    pagination_class = Paginator
    permission_classes = [IsApplicant, IsOwner]
    
    def get_queryset(self):
        query = self.queryset
        user = self.request.user
        query = query.filter(applicant=user.id)
        return query
    
    def create(self, request, *args, **kwargs):
        try:
            cv_detail_serializer = CVDetailSerializer(data={
                "name":request.data.get("name"),
                "applicant":request.user.id,
                "image":request.data.get("image")
            })
            cv_detail_serializer.is_valid(raise_exception=True)
            cv = cv_detail_serializer.save()
            return Response(CVDetailSerializer(cv).data, status=status.HTTP_201_CREATED)
        except Exception as ex:
            return Response({'message':f'{ex}'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=['get'], detail=True,url_path='applies')
    def set_apply(self,request,pk):
        applies = self.get_object().apply_set
        return Response(ApplySerializer(applies).data,status=status.HTTP_200_OK)

class ApplyViewSet(viewsets.ViewSet, generics.UpdateAPIView,generics.DestroyAPIView):
    queryset = Apply.objects.filter(active=True)
    serializer_class = ApplySerializer
    def get_permissions(self):
        if self.action.__eq__("PUT") or self.action.__eq__("PATCH"):
            return [IsEmployer()]
        return [IsApplicant()]
    
    def update(self, request, *args, **kwargs):
        apply_status = request.data.get("apply_status")
        apply =self.get_object()
        if apply_status != None:
            apply.apply_status = apply_status
            apply.save()
        return Response(ApplySerializer(apply).data, status=status.HTTP_201_CREATED)
    
    
    def destroy(self, request, *args, **kwargs):
        apply = self.get_object()
        if apply.apply_status == ApplyStatus.SENT:
            self.perform_destroy(apply)
            return Response({"message":"đã xóa thành công"},status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"message":"không thể xóa vì đã được nhà tuyển dụng đã chấp nhận"}, status=status.HTTP_409_CONFLICT)

class CityViewSet(viewsets.ViewSet,generics.ListAPIView):
    queryset=City.objects.filter(active=True)
    serializer_class=CitySerializer
    pagination_class=Paginator
    
    @action(methods=['get'], detail=True, url_path='districts')
    def get_district(self,request,pk):
        districts = District.objects.filter(city=pk)
        
        page = self.paginate_queryset(districts)
        if page is not None:
            return self.get_paginated_response(DistrictSerializer(page, many=True).data)
        return Response(DistrictSerializer(districts,many=True).data, status=status.HTTP_200_OK)

class CustomTokenView(TokenView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        data = json.loads(response.content) 
        user = authenticate(username=request.POST.get("username"),password=request.POST.get("password"))
        if user == None:
            return response
        data['role'] = user.role
        data = json.dumps(data)
        response = HttpResponse(content=data, status=201)
        return response 




    
    
    

    