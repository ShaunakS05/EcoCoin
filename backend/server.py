from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import requests
import firebase_admin
from firebase_admin import db, storage
from typing import Optional
import time
from blockchainfunctions import verify_signature, simulate_consensus, calculate_hash, proof_of_work, sign_transaction
import uuid
import datetime
import threading
from contextlib import asynccontextmanager
import os



cred_obj = firebase_admin.credentials.Certificate(".\_nyanKeys.json")
default_app = firebase_admin.initialize_app(cred_obj, {
    'storageBucket': "ecocoin-cb8e3.appspot.com",
    'databaseURL': "https://ecocoin-cb8e3-default-rtdb.firebaseio.com/"
})

def monitor_fundraising_events():
    ref = db.reference("Fundraising Events")
    while True:
        try:
            all_events = ref.get()
            if all_events:
                for event_name, event_data in all_events.items():
                    if 'CurrentCoins' in event_data and 'TargetCoins' in event_data:
                        target_coins = event_data['TargetCoins']
                        current_coins = event_data['CurrentCoins']
                        percentage_complete = (current_coins / target_coins) * 100 if target_coins > 0 else 0
                        ref.child(event_name).update({"PercentageComplete": percentage_complete})
            time.sleep(5)
        
        except Exception as e:
            print(f"Error in monitoring fundraising events: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    monitoring_thread = threading.Thread(target=monitor_fundraising_events, daemon=True)
    monitoring_thread.start()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/MCO2-Price")
async def getMCO2Price(date: str=Form()):
    #
    url = 'https://api.coingecko.com/api/v3/coins/moss-carbon-credit/market_chart'

    if date == "real-time":
        url = "https://api.coingecko.com/api/v3/coins/moss-carbon-credit"

        headers = {
            "accept": "application/json",
            "x-cg-demo-api-key": "CG-XzwEMefh3qjDwk1qJWeHh3iJ"
            }
        
        response = requests.get(url, headers=headers)
        response = response.json()

        return response["market_data"]["current_price"]["usd"]
    else:
        if date == "1-Month":
            days = 30
        elif date == "1-week":
            days = 7
        elif date == "3-Month":
            days = 90
        elif date == "6-Month":
            days = 180
        elif date == "1-yr":
            days = 365
        else:
            days = 1

        params = {
            'vs_currency': 'usd',
            'days': days
        }
        
        
        response = requests.get(url, params=params)
        print(response)
        data = response.json()

        prices = data.get('prices', [])
        formatted_prices = []
        for price_entry in prices:
            timestamp_ms = price_entry[0]
            date = datetime.datetime.fromtimestamp(timestamp_ms / 1000, datetime.timezone.utc)
            date_str = date.strftime('%Y-%m-%d %H:%M:%S')

            price_usd = price_entry[1]
            formatted_prices.append({"date": date_str, 'open': price_usd})
        #response = requests.get(url, headers=headers)
        #response = response.json()
        return {'prices': formatted_prices}

@app.post("/BCT-Price")
async def getBCTPrice(date: str=Form()):
    #  url = "https://api.coingecko.com/api/v3/coins/toucan-protocol-base-carbon-tonne"
    url = 'https://api.coingecko.com/api/v3/coins/toucan-protocol-base-carbon-tonne/market_chart'
    
    if date == "real-time":
        url = "https://api.coingecko.com/api/v3/coins/toucan-protocol-base-carbon-tonne"

        headers = {
            "accept": "application/json",
            "x-cg-demo-api-key": "CG-XzwEMefh3qjDwk1qJWeHh3iJ"
            }
        
        response = requests.get(url, headers=headers)
        response = response.json()

        return response["market_data"]["current_price"]["usd"]
    else:
        if date == "1-Month":
            days = 30
        elif date == "1-week":
            days = 7
        elif date == "3-Month":
            days = 90
        elif date == "6-Month":
            days = 180
        elif date == "1-yr":
            days = 365
        else:
            days = 1

        params = {
            'vs_currency': 'usd',
            'days': days
        }
        
        
        response = requests.get(url, params=params)
        data = response.json()

        prices = data.get('prices', [])
        formatted_prices = []
        for price_entry in prices:
            timestamp_ms = price_entry[0]
            date = datetime.datetime.fromtimestamp(timestamp_ms / 1000, datetime.timezone.utc)
            date_str = date.strftime('%Y-%m-%d %H:%M:%S')

            price_usd = price_entry[1]
            formatted_prices.append({"date": date_str, 'open': price_usd})
        #response = requests.get(url, headers=headers)
        #response = response.json()
        return {'prices': formatted_prices}

@app.post("/NCT-Price")
async def getNCTPrice(date: str=Form()):
    url = 'https://api.coingecko.com/api/v3/coins/toucan-protocol-nature-carbon-tonne/market_chart'

    if date == "real-time":
        url = "https://api.coingecko.com/api/v3/coins/toucan-protocol-nature-carbon-tonne"

        headers = {
            "accept": "application/json",
            "x-cg-demo-api-key": "CG-XzwEMefh3qjDwk1qJWeHh3iJ"
            }
        
        response = requests.get(url, headers=headers)
        response = response.json()

        return response["market_data"]["current_price"]["usd"]
    else:
        if date == "1-Month":
            days = 30
        elif date == "1-week":
            days = 7
        elif date == "3-Month":
            days = 90
        elif date == "6-Month":
            days = 180
        elif date == "1-yr":
            days = 365
        else:
            days = 1

        params = {
            'vs_currency': 'usd',
            'days': days
        }
        
        
        response = requests.get(url, params=params)
        data = response.json()

        prices = data.get('prices', [])
        formatted_prices = []
        for price_entry in prices:
            timestamp_ms = price_entry[0]
            date = datetime.datetime.fromtimestamp(timestamp_ms / 1000, datetime.timezone.utc)
            date_str = date.strftime('%Y-%m-%d %H:%M:%S')

            price_usd = price_entry[1]
            formatted_prices.append({"date": date_str, 'open': price_usd})
        #response = requests.get(url, headers=headers)
        #response = response.json()
        return {'prices': formatted_prices}

@app.post("/create-new-user")
async def createNewUser(userName: str=Form(), password: str=Form(), firstName: str=Form(), lastName: str=Form()):
    userName = userName.replace(".", ",")
    ref = db.reference("users")
    user_ref = ref.child(userName)
    if user_ref.get() is not None:
        return {"Error": "Username already exists"}
    private_key = str(uuid.uuid4())
    public_key = calculate_hash({"private_key": private_key})

    user_ref.set({
            "Password": password,
            "First Name": firstName,
            "Last Name": lastName,
            "private_key": private_key,
            "public_key": public_key,
            "balances": {
                "BCT": 0,
                "NCT": 0,
                "MCO2": 0
            },
            "Stakes": {}
    })
    return None

@app.post("/verify-user")
async def verifyUser(userName: str=Form(), password: str=Form()):
    userName = userName.replace(".", ",")
    ref = db.reference(f"users/{userName}")
    results = ref.get()
    if results:
        if results["Password"] == password:
            return {"firstName": results["First Name"], "lastName": results["Last Name"]}
        else:
            return JSONResponse(content={"success": False, "message": "Invalid password"}, status_code=400)
    else:
        return JSONResponse(content={"success": False, "message": "User not found"}, status_code=404)

@app.post("/buy-carbon-credit")
async def buyCarbonCredit(userName: str=Form(),token_name: str=Form(), amount: int = Form(), recipient_id: Optional[str] = Form(default=None)):
    if token_name == "Carbon":
        token_name = "MCO2"
    elif token_name == "Methane":
        token_name = "BCT"
    else:
        token_name = "NCT"
    userName = userName.replace(".", ",")
    ref = db.reference(f"users/{userName}")
    results = ref.get()
    transaction = {
        'sender': userName,
        'recipient': recipient_id or 'platform',
        'token': token_name,
        'amount': amount,
        'timestamp': time.time()
    }

    signature = sign_transaction(transaction, results["private_key"])
    transaction['signature'] = signature

    if not verify_signature(transaction, signature, results["private_key"]):
        return {'error': 'Invalid transaction signature.'}
    
    transaction_hash = calculate_hash(transaction)
    transaction['hash'] = transaction_hash

    blockchain_ref = db.reference('blockchain')
    blockchain = blockchain_ref.get()
    if blockchain is None:
        previous_hash = '0' * 64
        index = 0
    else:
        last_block = blockchain[-1]
        previous_hash = last_block['hash']
        index = last_block['index'] + 1

    block_data = {
        'index': index,
        'transactions': [transaction],
        'previous_hash': previous_hash,
        'timestamp': time.time()
    }

    block_hash, nonce = proof_of_work(block_data, difficulty=4)
    block_data['nonce'] = nonce
    block_data['hash'] = block_hash

    if not simulate_consensus(block_data):
        return {'error': 'Consensus not reached. Block not added.'}
    
    if blockchain is None:
        blockchain = [block_data]
    else:
        blockchain.append(block_data)
    blockchain_ref.set(blockchain)

    if transaction['recipient'] == "platform":
        sender_balance_ref = db.reference(f'users/{userName}/balances/{token_name}')
        sender_balance = sender_balance_ref.get() or 0
        sender_new_balance = sender_balance + amount
        sender_balance_ref.set(sender_new_balance)
    else:
        sender_balance_ref = db.reference(f'users/{userName}/balances/{token_name}')
        sender_balance = sender_balance_ref.get() or 0
        sender_new_balance = sender_balance - amount
        sender_balance_ref.set(sender_new_balance)

        recipient = recipient_id or 'platform'
        recipient_balance_ref = db.reference(f'Fundraising Events/{recipient}/CurrentCoins')
        recipient_balance = recipient_balance_ref.get() or 0
        recipient_new_balance = recipient_balance + amount
        recipient_balance_ref.set(recipient_new_balance)

    return {
        'message': f'Transaction added to block {index}.',
        'block_hash': block_hash,
        'nonce': nonce,
        'transaction_hash': transaction_hash,
        'time': time.time()
    }

@app.post("/sell-carbon-credit")
async def sellCarbonCredit(userName: str=Form(),token_name: str=Form(),amount: int=Form()):
    if token_name == "Carbon":
        token_name = "MCO2"
    elif token_name == "Methane":
        token_name = "BCT"
    else:
        token_name = "NCT"
    userName = userName.replace(".", ",")
    ref = db.reference(f"users/{userName}")
    results = ref.get()
    transaction = {
        'sender': userName,
        'token_name': token_name,
        'amount': amount
    }

    signature = sign_transaction(transaction, results["private_key"])
    transaction['signature'] = signature

    if not verify_signature(transaction, signature, results["private_key"]):
        return {'error': 'Invalid transaction signature'}
    
    transaction_hash = calculate_hash(transaction)
    transaction['hash'] = transaction_hash

    blockchain_ref = db.reference('blockchain')
    blockchain = blockchain_ref.get()
    if blockchain is None:
        previous_hash = '0' * 64
        index = 0
    else:
        last_block = blockchain[-1]
        previous_hash = last_block['hash']
        index = last_block['index'] + 1

    # Create the new block
    block_data = {
        'index': index,
        'transactions': [transaction],
        'previous_hash': previous_hash,
        'timestamp': time.time()
    }

    # Perform Proof of Work
    block_hash, nonce = proof_of_work(block_data, difficulty=4)
    block_data['nonce'] = nonce
    block_data['hash'] = block_hash

    # Simulate Consensus
    if not simulate_consensus(block_data):
        return {'error': 'Consensus not reached. Block not added.'}

    # Add the new block to the blockchain
    if blockchain is None:
        blockchain = [block_data]
    else:
        blockchain.append(block_data)
    blockchain_ref.set(blockchain)

    # Update balances
    # Decrease user's carbon credit balance
    user_carbon_balance_ref = db.reference(f'users/{userName}/balances/{token_name}')
    user_carbon_balance = user_carbon_balance_ref.get() or 0
    print(user_carbon_balance)
    print(amount)
    if user_carbon_balance < amount:
        return {'error': 'Insufficient carbon credits to sell.'}
    user_carbon_balance_ref.set(user_carbon_balance - amount)
    return {
        'message': f'Transaction added to block {index}.',
        'block_hash': block_hash,
        'nonce': nonce,
        'transaction_hash': transaction_hash,
        'time': time.time()
    }


@app.post("/create-new-volunteering-event")
async def createNewVolunteeringEvent(eventName: str=Form(), description: str=Form(), typeOfCoin: str=Form(), compensation: int=Form(), location: str=Form(), dateTime: str=Form()):
    eventName = eventName.replace("/", ",")
    ref = db.reference("Volunteering Events")
    user_ref = ref.child(eventName)

    user_ref.set({
            "Description": description,
            "Compensation": compensation,
            "Location": location,
            "Date&Time": dateTime,
            "typeOfCoin": typeOfCoin
    })
    return None


@app.post("/create-new-fundraising-event")
async def createNewFundraisingEvent(EventName: str=Form(), Description: str=Form(), CurrentCoins: int=Form(), TargetCoins: int=Form(),TypeOfCoins: str=Form(), EndDate: str=Form()):
    EventName = EventName.replace("/", ",")
    ref = db.reference("Fundraising Events")
    user_ref = ref.child(EventName)

    user_ref.set({
            "Description": Description,
            "TypeofCoin": TypeOfCoins,
            "CurrentCoins": CurrentCoins,
            "TargetCoins": TargetCoins,
            "PercentageComplete": (CurrentCoins/TargetCoins) * 100,
            "EndDate": EndDate
    })
    return None

@app.post("/create-new-stake")
async def createNewStake(eventName: str=Form(), description: str=Form(),startDate: str=Form(),endDate: str=Form(), returnValue: float=Form(), lengthOfTime: int=Form(), typeOfCoin: str=Form()):
    ref = db.reference("Stakes")
    stake_ref = ref.child(eventName)

    stake_ref.set({
        "Description": description,
        "StartDate": startDate,
        "EndDate": endDate,
        "ReturnOnInvestment": returnValue,
        "LengthOfTime": lengthOfTime,
        "TypeOfCoin": typeOfCoin

    })
    return None

@app.post("/invest-in-stake")
async def investInStake(EventName: str=Form(), token_name: str=Form(), userName: str=Form(), amount: int=Form()):
    if token_name == "Carbon" or token_name == "CEC":
        token_name = "MCO2"
    elif token_name == "Methane" or token_name == "MEC":
        token_name = "BCT"
    else:
        token_name = "NCT"
    userName = userName.replace(".", ",")
    ref = db.reference(f"users/{userName}")
    results = ref.get()
    transaction = {
        'sender': userName,
        'token_name': token_name,
        'amount': amount
    }

    signature = sign_transaction(transaction, results["private_key"])
    transaction['signature'] = signature

    if not verify_signature(transaction, signature, results["private_key"]):
        return {'error': 'Invalid transaction signature'}
    
    transaction_hash = calculate_hash(transaction)
    transaction['hash'] = transaction_hash

    blockchain_ref = db.reference('blockchain')
    blockchain = blockchain_ref.get()
    if blockchain is None:
        previous_hash = '0' * 64
        index = 0
    else:
        last_block = blockchain[-1]
        previous_hash = last_block['hash']
        index = last_block['index'] + 1

    # Create the new block
    block_data = {
        'index': index,
        'transactions': [transaction],
        'previous_hash': previous_hash,
        'timestamp': time.time()
    }

    # Perform Proof of Work
    block_hash, nonce = proof_of_work(block_data, difficulty=4)
    block_data['nonce'] = nonce
    block_data['hash'] = block_hash

    # Simulate Consensus
    if not simulate_consensus(block_data):
        return {'error': 'Consensus not reached. Block not added.'}

    # Add the new block to the blockchain
    if blockchain is None:
        blockchain = [block_data]
    else:
        blockchain.append(block_data)
    blockchain_ref.set(blockchain)

    # Update balances
    # Decrease user's carbon credit balance
    user_carbon_balance_ref = db.reference(f'users/{userName}/balances/{token_name}')
    user_carbon_balance = user_carbon_balance_ref.get() or 0
    print(user_carbon_balance)
    print(amount)
    if user_carbon_balance < amount:
        return {'error': 'Insufficient carbon credits to sell.'}
    user_carbon_balance_ref.set(user_carbon_balance - amount)

    ref = db.reference(f"Stakes/{EventName}")
    results = ref.get()

    new_stake = {
        EventName: {
            "amount": amount,
            "date": time.time(),
            "token": token_name,
            "ROI": results["Return on Investment"]
        }
    }
    
    ref = db.reference(f"users/{userName}")
    ref.child("Stakes").update(new_stake)

    return {
        'message': f'Transaction added to block {index}.',
        'block_hash': block_hash,
        'nonce': nonce,
        'transaction_hash': transaction_hash,
        'time': time.time()
    }

@app.post("/return-all-events")
async def returnAllEvents(EventName: str=Form()):
    ref = db.reference(EventName)
    allEvents_ref = ref.get()
    return allEvents_ref

@app.get("/return-news-articles")
async def returnNewsArticles():
    service_url = 'https://www.googleapis.com/customsearch/v1'
    params = {
        'key': "AIzaSyA_gQsnmeeoFJi7lhJ_eY70ukNd2m22Cf0",
        'cx': "80bfac6f04cd64375",
        'q': "emission allowances",
        'num': 4
    }

    response = requests.get(service_url, params=params)
    results = response.json()
    articles = []
    for item in results.get('items', []):
        title = item.get('title')
        snippet = item.get('snippet')
        link = item.get('link')
        articles.append({
            'title': title,
            'snippet': snippet,
            'link': link
        })
    
    return articles

@app.post("/balance")
def returnBalance(userName: str=Form()):
    userName = userName.replace(".",",")
    user_ref = db.reference(f"users/{userName}/balances")
    return user_ref.get()

@app.get('/startImage')
def returnStartImage():
    bucket = storage.bucket()
    blob = bucket.blob('images/startUpImage')
    blob.upload_from_filename("./boston-common (1).jpg")
    blob.make_public()
    image_url = blob.public_url
    ref = db.reference('Startup_Images')
    event_ref = ref.child("Startup")
    event_ref.update({
        "ImageURL": image_url
    })

    return {"ImageURL": image_url}