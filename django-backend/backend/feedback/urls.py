from django.urls import path
from feedback import views
from . import views

urlpatterns = [
    path('submit/', views.submit_feedback),
    path('feedback/', views.get_feedback),
    path('analyze-feedback/', views.analyze_feedback, name='analyze-feedback'),
]
