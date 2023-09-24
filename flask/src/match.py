from connection import setup
from firebase_admin import db


setup()

def check_if_liked(from_user, to_user):
    ref = db.reference(f"/likes/{to_user}/{from_user}")
    result = ref.get()
    return result

def like(from_user, to_user):
    ref = db.reference(f"/likes/{from_user}/{to_user}")
    ref.set("liked")
    return 


