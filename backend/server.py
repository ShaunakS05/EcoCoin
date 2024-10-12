from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import requests
import firebase_admin
from firebase_admin import db

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

@app.get("/MCO2-Price")
async def getMCO2Price():
    url = "https://api.coingecko.com/api/v3/coins/moss-carbon-credit"

    headers = {
        "accept": "application/json",
        "x-cg-demo-api-key": "CG-XzwEMefh3qjDwk1qJWeHh3iJ"
        }
    response = requests.get(url, headers=headers)
    response = response.json()
    return response["market_data"]["current_price"]["usd"]

@app.get("/BCT-Price")
async def getBCTPrice():
    url = "https://api.coingecko.com/api/v3/coins/toucan-protocol-base-carbon-tonne"

    headers = {
        "accept": "application/json",
        "x-cg-demo-api-key": "CG-XzwEMefh3qjDwk1qJWeHh3iJ"
        }
    response = requests.get(url, headers=headers)
    response = response.json()
    return response["market_data"]["current_price"]["usd"]

@app.get("/NCT-Price")
async def getNCTPrice():
    url = "https://api.coingecko.com/api/v3/coins/toucan-protocol-nature-carbon-tonne"

    headers = {
        "accept": "application/json",
        "x-cg-demo-api-key": "CG-XzwEMefh3qjDwk1qJWeHh3iJ"
        }
    response = requests.get(url, headers=headers)
    response = response.json()
    return response["market_data"]["current_price"]["usd"]

@app.post("/create-new-user")
async def createNewUser(userName: str=Form(), password: str=Form(), firstName: str=Form(), lastName: str=Form()):
    userName = userName.replace(".", ",")
    ref = db.reference("users")
    user_ref = ref.child(userName)
    if user_ref.get() is not None:
        return {"Error": "Username already exists"}
    user_ref.set({
        userName:
        {
            "Password": password,
            "Coins": 0,
            "First Name": firstName,
            "Last Name": lastName
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