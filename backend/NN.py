from neuralprophet import NeuralProphet
import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
import os
import json
import requests 
import time

'''
def fetch_bct_hourly_data(days):
    # CoinGecko API endpoint for the BCT market chart data
    url = 'https://api.coingecko.com/api/v3/coins/toucan-protocol-base-carbon-tonne/market_chart'
    
    # We're restricted to 90 days of hourly data per request, so split requests
    data = {'prices': []}
    max_days_per_request = 90
    
    # Loop to fetch the data in batches of 90 days
    for i in range(0, days, max_days_per_request):
        current_days = min(max_days_per_request, days - i)
        params = {
            'vs_currency': 'usd',
            'days': current_days,
        }
        
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            chunk = response.json()
            data['prices'].extend(chunk['prices'])  # Append the 'prices' data
        else:
            print(f"Failed to fetch data for {current_days} days: {response.status_code}")
            return None
        
        # To respect API rate limits
        time.sleep(1)
    
    return data

def reformat_data(raw_data):
    reformatted_data = []
    
    # Loop through each price data point and reformat it
    for price_point in raw_data['prices']:
        reformatted_data.append({
            "timestamp": price_point[0],  # First item is the timestamp
            "price_usd": price_point[1]   # Second item is the price in USD
        })
    
    return reformatted_data

def save_data_as_json(data, file_name):
    file_path = os.path.join('.', file_name)
    with open(file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)
    print(f"Data saved to {file_path}")

# Fetch hourly data for the last 365 days
days = 365
data = fetch_bct_hourly_data(days)

# Reformat the data to the desired structure
if data:
    reformatted_data = reformat_data(data)

    # Save reformatted data as JSON
    save_data_as_json(reformatted_data, 'bct_hourly_data_365_days.json')
'''
file_path = os.path.join('.', 'bct_hourly_data_365_days.json')

with open(file_path, 'r') as file:
    file_contents = file.read()
    stocks = json.loads(file_contents)

df = pd.DataFrame(stocks)
print(df.head())

df = pd.json_normalize(df['prices'])
df = df.rename(columns={"timestamp": "ds", "price_usd": "y"})
df['ds'] = pd.to_datetime(df['ds'], unit='ms')
df = df.drop_duplicates(subset=['ds'])
df = df.set_index('ds')
df = df.resample('H').mean()
df = df.dropna()
df = df.reset_index()

model = NeuralProphet()
model.fit(df)

future = model.make_future_dataframe(df, periods = 365)
forecast = model.predict(future)
actual = model.predict(df)

<<<<<<< HEAD
plt.plot(forecast['ds'], forecast['yhat1'], label = 'Future Prediction')
plt.plot(actual['ds'], actual['yhat1'], label = 'Actual Prediction')
plt.plot(df['ds'], df['y'], label = 'Actual')
=======
plt.plot(forecast['ds'], forecast['y'], label = 'Future Prediction')
plt.plot(actual['ds'], actual['y'], label = 'Actual Prediction')
plt.plot(stocks['timestamp'], stocks['price_usd'], label = 'Actual')
>>>>>>> c8a862f0e3b3a9afa91028f0c90928cf8f58f017
plt.legend()
plt.show()
