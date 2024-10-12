import json, hashlib

def calculate_hash(data: dict) -> str:
    data_string = json.dumps(data, sort_keys=True).encode()
    return hashlib.sha256(data_string).hexdigest()

def proof_of_work(block_data: dict,difficulty: int = 4) -> (str, int):
    nonce = 0
    block_data_copy = block_data.copy()
    block_data_copy['nonce'] = nonce
    block_hash = calculate_hash(block_data_copy)
    target = '0' * difficulty

    while not block_hash.startswith(target):
        nonce += 1
        block_data_copy['nonce'] = nonce
        block_hash = calculate_hash(block_data_copy)

    return block_hash, nonce

def sign_transaction(transaction: dict, private_key: str) -> str:
    transaction_string = json.dumps(transaction, sort_keys=True)
    signature = calculate_hash({'transaction': transaction_string, 'private_key': private_key})
    return signature

def verify_signature(transaction: dict , signature: str, public_key: str) -> bool:
    transaction_string = json.dumps(transaction, sort_keys=True)
    expected_signature = calculate_hash({'transaction': transaction_string, 'public_key': public_key})
    return expected_signature == signature


def simulate_consensus(block_data: dict) -> bool:
    #would simulate an actual consensus function
    #for the sake of time and lack of actual financial data manipulation, we are just setting this to true
    return True
