# import nltk
# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize
# from nltk.stem import WordNetLemmatizer

# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('wordnet')

# def preprocess_feedback(feedback):
#     tokens = word_tokenize(feedback)
#     tokens = [word.lower() for word in tokens if word.isalnum()]
#     stop_words = set(stopwords.words('english'))
#     processed_feedback = []
    
#     if isinstance(feedback, str):
#             tokens = word_tokenize(feedback.lower()) 
#             tokens = [word for word in tokens if word.isalnum() and word not in stop_words]
#             processed_feedback.append(' '.join(tokens))

#     tokens = [word for word in tokens if word not in stop_words]
#     lemmatizer = WordNetLemmatizer()
#     tokens = [lemmatizer.lemmatize(word) for word in tokens]
#     return tokens


# import nltk
# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize
# from nltk.stem import WordNetLemmatizer

# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('wordnet')

# def preprocess_feedback(feedback):
#     stop_words = set(stopwords.words('english'))
#     processed_feedback = []

#     if isinstance(feedback, str):
#         tokens = word_tokenize(feedback.lower()) 
#         tokens = [word for word in tokens if word.isalnum() and word not in stop_words]
#         processed_feedback.append(' '.join(tokens))
#     else: # Assuming it's a list of strings
#         for text in feedback:
#             tokens = word_tokenize(text.lower())
#             tokens = [word for word in tokens if word.isalnum() and word not in stop_words]
#             processed_feedback.append(' '.join(tokens))

#     return processed_feedback

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

def preprocess_feedback(feedback):
    stop_words = set(stopwords.words('english'))
    processed_feedback = []
    tokens = [] # Initialize tokens here

    if isinstance(feedback, str):
        tokens = word_tokenize(feedback.lower()) 
        tokens = [word for word in tokens if word.isalnum() and word not in stop_words]
        if not tokens:  # Check if tokens is empty
            tokens.append("default_token")  # Add a placeholder token
        tokens.extend(tokens)
        # processed_feedback.append(' '.join(tokens))  # No need to join tokens
    else: # Assuming it's a list of strings
        for text in feedback:
            tokens = word_tokenize(text.lower())
            tokens = [word for word in tokens if word.isalnum() and word not in stop_words]
            if not tokens:
                tokens.append("default_token")
            tokens.extend(tokens)
            # processed_feedback.append(' '.join(tokens))  # No need to join tokens

    return tokens  # Return the tokens list



