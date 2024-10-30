# train_model.py

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pickle

# Load your data into pandas
df = pd.read_csv('C://Users/Administrator/Desktop/government_predictor/citizen_feedback_dataset.csv')

# Features and target variable
X = df[['county','subcounty','ward', 'age', 'gender', 'occupation' ,'education_level', 'service_satisfaction_score']]
y = df['feedback_category']

# Encode categorical variables (sub_county, gender, etc.)
X = pd.get_dummies(X)

# Split into training and test data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model using Logistic Regression
model = LogisticRegression()
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")

# Save the trained model using pickle
with open('trained_model.pkl', 'wb') as file:
    pickle.dump(model, file)

print("Model trained and saved!")
