# URL Routes for Jobs API

from django.urls import path
from . import views

urlpatterns = [
    path('submit_job', views.submit_job, name='submit_job'),
    path('job/<str:job_id>/status', views.job_status, name='job_status'),
]
