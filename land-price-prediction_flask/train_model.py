# train_model.py
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
import re
import pickle

# Load and inspect the dataset
data = pd.read_csv('Land_Prices_Colombo_Cleaned.csv')

# Convert non-numeric values to numeric
def convert_to_numeric(value):
    value = str(value)
    value = re.sub(r'[^\d.]', '', value)
    return pd.to_numeric(value, errors='coerce')

# Apply conversion to the appropriate columns
numeric_columns = [
    'Land_size(Perches)', 'Distance from fort', 'min_dist_govtschools_b', 
    'min_dist_uni', 'min_dist_nearest_express', 'min_dist_nearest_railway', 
    'min_dist_nearest_bank', 'min_dist_nearest_Govt_Hospital', 
    'min_dist_nearest_Supermarket', 'min_dist_nearest_Fuel_station'
]

for column in numeric_columns:
    data[column] = data[column].apply(convert_to_numeric)

# Encode categorical variables
label_encoders = {}
categorical_columns = ['Address', 'Price_Scale', 'Land_type']

for column in categorical_columns:
    label_encoders[column] = LabelEncoder()
    data[column] = label_encoders[column].fit_transform(data[column])

# Define features and target variable
X = data.drop(columns=['Mentioned Price(Rs)'])
y = data['Mentioned Price(Rs)']

# Split the data
x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor(random_state=42)
model.fit(x_train, y_train)

# Save the trained model
with open('land_price_model.pkl', 'wb') as file:
    pickle.dump(model, file)

# Save the label encoders for categorical columns
with open('label_encoders.pkl', 'wb') as file:
    pickle.dump(label_encoders, file)

print("Model and label encoders saved successfully.")
