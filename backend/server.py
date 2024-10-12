from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import requests
import firebase_admin
from firebase_admin import db
from typing import Optional
import time
from blockchainfunctions import verify_signature, simulate_consensus, calculate_hash, proof_of_work, sign_transaction
import uuid
import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cred_obj = firebase_admin.credentials.Certificate(".\ecocoin-cb8e3-firebase-adminsdk-h4k1v-b597cfefaf.json")
default_app = firebase_admin.initialize_app(cred_obj, {
    'databaseURL': "https://ecocoin-cb8e3-default-rtdb.firebaseio.com/"
})

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/MCO2-Price")
async def getMCO2Price(date: str=Form()):
    #url = "https://api.coingecko.com/api/v3/coins/moss-carbon-credit"
    url = 'https://api.coingecko.com/api/v3/coins/moss-carbon-credit/market_chart'

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
    headers = {
        "accept": "application/json",
        "x-cg-demo-api-key": "CG-XzwEMefh3qjDwk1qJWeHh3iJ"
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

@app.post("/BCT-Price")
async def getBCTPrice(date: str=Form()):
    #url = "https://api.coingecko.com/api/v3/coins/toucan-protocol-base-carbon-tonne"
    url = 'https://api.coingecko.com/api/v3/coins/toucan-protocol-base-carbon-tonne/market_chart'

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
    headers = {
        "accept": "application/json",
        "x-cg-demo-api-key": "CG-XzwEMefh3qjDwk1qJWeHh3iJ"
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
    #url = "https://api.coingecko.com/api/v3/coins/toucan-protocol-nature-carbon-tonne"
    url = 'https://api.coingecko.com/api/v3/coins/toucan-protocol-nature-carbon-tonne/market_chart'

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
    headers = {
        "accept": "application/json",
        "x-cg-demo-api-key": "CG-XzwEMefh3qjDwk1qJWeHh3iJ"
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
            }
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
async def buyCarbonCredit(userName: str=Form(),token_name: str=Form(),amount: int = Form(), recipient_id: Optional[str] = Form(default=None)):

    ref = db.reference(f"users/{userName}")
    results = ref.get()
    transaction = {
        'sender': userName,
        'recipient': recipient_id or 'platform',
        'token': token_name,
        'amount': amount,
        'timstamp': time.time()
    }

    signature = sign_transaction(transaction, results["private_key"])
    transaction['signature'] = signature

    if not verify_signature(transaction, signature, results["public_key"]):
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

    if recipient == "platform":
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
        recipient_balance_ref = db.reference(f'users/{recipient}/balances/{token_name}')
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
async def sellCarbonCredit(userName: str=Form(),token_name: str=Form(),amount: int = Form()):
    
    transaction = {
        'sender': userName,
        'token_name': token_name,
        'amount': amount
    }

    signature = sign_transaction(transaction, userName["private_key"])
    transaction['signature'] = signature

    if not verify_signature(transaction, signature, userName["public_key"]):
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
    user_carbon_balance_ref = db.reference(f'users/userName/balances/{token_name}')
    user_carbon_balance = user_carbon_balance_ref.get() or 0
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
