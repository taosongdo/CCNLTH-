from rest_framework import permissions
from job.models import UserRole

class IsAdmin(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        return super().has_permission(request,view) and request.user.role == UserRole.ADMIN

class IsApplicant(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        return super().has_permission(request,view) and request.user.role == UserRole.APPLICANT

class IsEmployer(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        return super().has_permission(request,view) and request.user.role == UserRole.EMPLOYER
    

class IsApplicantOwner(IsApplicant):
    def has_object_permission(self, request, view, obj):
        return super().has_permission(request,view) and obj.applicant == request.user

class IsEmployerOwner(IsEmployer):
    def has_object_permission(self, request, view, obj):
        return super().has_permission(request,view) and obj.employer == request.user



