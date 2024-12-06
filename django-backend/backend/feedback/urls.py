from django.urls import path
from feedback import views
from . import views
from .views import FeedbackDeleteView

urlpatterns = [
    path('submit/', views.submit_feedback),
    path('feedback/', views.get_feedback),
    path('analyze-feedback/', views.analyze_feedback, name='analyze-feedback'),
    path('analyze-topics/', views.analyze_topics, name='analyze-topics'),
    path('register-admin/', views.register_admin, name='register-admin'),
    path('login-admin/', views.login_admin, name='login-admin'),
    path('api/feedback/<int:pk>/', FeedbackDeleteView.as_view(), name='feedback-delete'),
]


# By juma samwel u