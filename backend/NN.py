from neuralprophet import NeuralProphet
import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt

import json



with open('backend\response_1728742642423.json', 'r') as file:
    stocks = json.loads(file)


stocks = json.parse('backend\response_1728742642423.json')

model = NeuralProphet()
model.fit(stocks)

future = model.make_future_dataframe(stocks, periods = 7)
forecast = model.predict(future)
actual = model.predict(stocks)

plt.plot(forecast['ds'], forecast['yhat1'], label = 'Future Prediction')
plt.plot(actual['ds'], actual['yhat1'], label = 'Actual Prediction')
plt.plot(stocks['timestamp'], stocks['price_usd'], label = 'Actual')
plt.legend()
plt.show()
