from django.urls import path
from feedback import views

urlpatterns = [
    path('submit/', views.submit_feedback),
    path('feedback/', views.get_feedback),
]
