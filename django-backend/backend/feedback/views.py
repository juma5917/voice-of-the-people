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

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Feedback
from .serializers import FeedbackSerializer
from .ml.preprocess import preprocess_feedback
from .ml.sentiment import analyze_sentiment


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
            feedback.save()
            feedback.sentiment_label = sentiment['label']
            feedback.save()



            
            return Response({
                'feedback': serializer.data,
                'processed_text': processed_text,
                'sentiment_score': sentiment['score']
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_feedback(request):
    feedbacks = Feedback.objects.all()
    serializer = FeedbackSerializer(feedbacks, many=True)
    return Response(serializer.data)


# Add the new analyze_feedback view
@api_view(['POST'])
def analyze_feedback(request):
    feedback_text = request.data.get('feedback_text', '')

    # Preprocess the feedback
    processed_text = preprocess_feedback(feedback_text)

    # Analyze the sentiment
    sentiment = analyze_sentiment(feedback_text)

    # Return processed text and sentiment analysis results
    return Response({
        'processed_text': processed_text,
        'sentiment_score': sentiment['score'],
    })
