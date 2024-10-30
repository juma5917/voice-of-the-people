from numpy import vectorize
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
from .preprocess import preprocess_feedback



def vectorize_feedback(feedback_list):
    vectorizer = CountVectorizer(max_df=0.9, min_df=2, stop_words='english')
    feedback_matrix = vectorizer.fit_transform(feedback_list)
    return feedback_matrix, vectorizer 


def apply_lda(feedback_matrix, n_topics=5, n_top_words=10):

    lda_model = LatentDirichletAllocation(n_components=n_topics, random_state=42)
    lda_model.fit(feedback_matrix)
    
    
    feature_names = vectorize.get_feature_names_out()
    
    topics = {}
    for topic_idx, topic in enumerate(lda_model.components_):
        topics[f"Topic {topic_idx+1}"] = [feature_names[i] for i in topic.argsort()[:-n_top_words - 1:-1]]
    
    return topics

def extract_topics_from_feedback(feedback_list, n_topics=5, n_top_words=10):
    processed_feedback = preprocess_feedback(feedback_list)
    
    feedback_matrix, vectorizer = vectorize_feedback(processed_feedback)
    
    topics = apply_lda(feedback_matrix, n_topics=n_topics, n_top_words=n_top_words)
    
    return topics