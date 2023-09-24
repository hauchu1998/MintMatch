from firebase_admin import credentials, initialize_app
from dotenv import load_dotenv
import os

load_dotenv()


def setup():
    cred_obj = credentials.Certificate(os.getenv("FIREBASE_CRED_PTH"))
    default_app = initialize_app(cred_obj, {
        'databaseURL': os.getenv("FIREBASE_API_KEY"),
        })
    return default_app