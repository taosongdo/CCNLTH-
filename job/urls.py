from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', views.UserViewSet, basename='user')
router.register('job-postings', views.JobPostingViewSet, basename='job-posting')
router.register('cvs',views.CVViewSet, basename='cv')  
router.register('applies', views.ApplyViewSet, basename='apply')
router.register('cities', views.CityViewSet, basename='city')
router.register('experiences', views.ExperienceViewSet, basename='experience')
router.register('education-levels', views.EducationLevelViewSet, basename='education-level')
router.register('skills', views.SkillViewSet, basename='skill')
router.register('results', views.ResultViewSet, basename='result')
router.register('applies-more-infos', views.ApplyMoreInfoViewSet, basename='applies-more-info')

urlpatterns = [
    path("o/token/", views.CustomTokenView.as_view(), name="custom-token"),
    path('',include(router.urls))
]
