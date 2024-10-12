from neuralprophet import NeuralProphet
import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
import os
import json

file_path = os.path.join('.', 'response_1728742642423.json')

with open(file_path, 'r') as file:
    file_contents = file.read()
    stocks = json.loads(file_contents)

df = pd.DataFrame(stocks)
print(df.head())

df = pd.json_normalize(df['prices'])
df = df.rename(columns={"timestamp": "ds", "price_usd": "y"})
df['ds'] = pd.to_datetime(df['ds'], unit='ms')


model = NeuralProphet()
model.fit(df)

future = model.make_future_dataframe(stocks, periods = 7)
forecast = model.predict(future)
actual = model.predict(stocks)

plt.plot(forecast['ds'], forecast['y'], label = 'Future Prediction')
plt.plot(actual['ds'], actual['y'], label = 'Actual Prediction')
plt.plot(stocks['timestamp'], stocks['price_usd'], label = 'Actual')
plt.legend()
plt.show()
