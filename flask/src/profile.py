from firebase_admin import db
from src.connection import setup
from src.utils import profile_to_dict, profile_to_list

setup()

def all_profile():
    ref = db.reference("/profile/")
    all = ref.get()
    return all

def check_if_registered(address: str) -> dict:
    """
    Fetch from fire base see if user registered base on wallet address
    """
    ref = db.reference("/profile/")
    profile = ref.child(address).get()
    return profile

def register(user_data: dict) -> dict:
    """
    Register user in firebase
    key:
        address: String
        nfts: [String]
        username: String
        introductions: String
        labels: [String]
    """
    address = user_data['address']
    ref = db.reference(f"/profile/{address}")
    #transfer list to key pairs
    profile_to_dict(user_data)
    ref.set(user_data)
    #transfer key pairs to list
    new_profile = ref.get()
    return new_profile

def update_profile(user_data: dict) -> dict:
    address = user_data['address']
    ref = db.reference(f"/profile/")
    profile_obj = ref.child(address)
    #transfer list to key pairs
    user_data_dict = profile_to_dict(user_data)
    profile_obj.update(user_data_dict)
    new_profile = ref.child(address).get()
    return new_profile

def get_profile(address: str) -> dict:
    ref = db.reference("/profile/")
    profile = ref.child(address).get()
    return profile

def delete_profile(address: str) -> bool:
    ref = db.reference("/profile/")
    profile_obj = ref.child(address)
    profile_obj.delete()
    return True





