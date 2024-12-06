# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.decorators import api_view
# from .models import Feedback
# from .serializers import FeedbackSerializer
# from .ml.preprocess import preprocess_feedback
# from .ml.sentiment import analyze_sentiment


# @api_view(['POST'])
# def submit_feedback(request):
#     if request.method == 'POST':
#         serializer = FeedbackSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# def get_feedback(request):
#     feedbacks = Feedback.objects.all()
#     serializer = FeedbackSerializer(feedbacks, many=True)
#     return Response(serializer.data)

from rest_framework import generics, permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Feedback
from .serializers import FeedbackSerializer
from .ml.preprocess import preprocess_feedback
from .ml.sentiment import analyze_sentiment
from .ml.topic_modeling import extract_topics_from_feedback
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token 

class FeedbackDeleteView(generics.DestroyAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]  # Only authenticated admins can delete

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=204)  # 204 No Content on successful delete

@api_view(['POST'])
def submit_feedback(request):
    if request.method == 'POST':
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            feedback = serializer.validated_data['feedback']
            processed_text = preprocess_feedback(feedback)
            sentiment = analyze_sentiment(feedback)
            feedback = serializer.instance
                      
            feedback.sentiment_score = sentiment['score']

            # Update the sentiment label in the database
            feedback.sentiment_label = sentiment['label']
            feedback.save()



            
            return Response({
                'feedback': serializer.data,
                'processed_text': processed_text,
                'sentiment_score': sentiment['score'],
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_feedback(request):
    feedbacks = Feedback.objects.all()
    serializer = FeedbackSerializer(feedbacks, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def analyze_feedback(request):
    feedback_text = request.data.get('feedback_text', '')

    processed_text = preprocess_feedback(feedback_text)

    sentiment = analyze_sentiment(feedback_text)

    return Response({
        'processed_text': processed_text,
        'sentiment_score': sentiment['score'],
    })

@api_view(['POST'])
def analyze_topics(request):
    feedback_list = request.data.get('feedback_text', [])

    # if not feedback_list or all(not text.strip() for text in feedback_list):
    #     return Response({"error": "Feedback list is empty or contains only whitespace."}, status=status.HTTP_400_BAD_REQUEST)
    
    topics = extract_topics_from_feedback(feedback_list)
    
    return Response(topics)


@api_view(['POST'])
def register_admin(request):
    if request.method == 'POST':
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        # Basic validation (you should add more robust validation)
        if not all([username, email, password]):
            return Response({'error': 'Please provide username, email, and password'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Hash the password for security
            hashed_password = make_password(password)

            # Create the user
            user = User.objects.create(
                username=username,
                email=email,
                password=hashed_password,
                is_staff=True,  # Make the user an admin
                is_superuser=True  # Grant all permissions (optional)
            )

            # You can optionally return a token here for immediate login

            return Response({'message': 'Admin registered successfully!'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def login_admin(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)