# from nltk.sentiment import SentimentIntensityAnalyzer

# sia = SentimentIntensityAnalyzer()

# def analyze_sentiment(feedback):
#     score = sia.polarity_scores(feedback)
#     return score['compound']

# from transformers import pipeline

# # Load a pre-trained BERT model for sentiment analysis
# sentiment_pipeline = pipeline("sentiment-analysis")

# def analyze_sentiment(feedback_text):
#     # Perform sentiment analysis using the pre-trained BERT model
#     result = sentiment_pipeline(feedback_text)

#     # Return the label and score from BERT
#     sentiment_label = result[0]['label']  # 'POSITIVE' or 'NEGATIVE'
#     sentiment_score = result[0]['score']  # Confidence score for the sentiment

#     return {
#         'label': sentiment_label,
#         'score': sentiment_score
#     }


from nltk.sentiment import SentimentIntensityAnalyzer

sia = SentimentIntensityAnalyzer()

def analyze_sentiment(feedback_text):
    score = sia.polarity_scores(feedback_text)['compound']

    # Adjust thresholds for classification
    if score >= 0.5:
        sentiment = "POSITIVE"
    elif score <= -0.5:
        sentiment = "NEGATIVE"
    else:
        sentiment = "NEUTRAL"

    return {
        
        'score': score,
        'label': sentiment
    }
