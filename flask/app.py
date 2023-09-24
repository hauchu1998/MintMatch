from src import profile
from flask import Flask, request
from flask_restful import Resource, Api
from flask_restful import reqparse
from flask_cors import CORS
from match import match


app = Flask(__name__)
CORS(app)
api = Api(app)

profileParser = reqparse.RequestParser()
profileParser.add_argument('address', type=str)
profileParser.add_argument('nfts', type=dict, action='append')
profileParser.add_argument('username', type=str)
profileParser.add_argument('introduction', type=str)
profileParser.add_argument('labels', type=str, action="append")

testParser = reqparse.RequestParser()
testParser.add_argument('test', type=str, action='append')



class Profile(Resource):

    def get(self, address):
        user_profile = profile.check_if_registered(address)
        if not user_profile:
            return {"profile": None}, 404
        else:
            return {"profile": user_profile}, 200

    def post(self, address):
        user_data = profileParser.parse_args()
        user_profile = profile.register(user_data)
        return {"profile": user_profile}, 200
        
    def put(self, address):
        user_data = profileParser.parse_args()
        user_profile = profile.update_profile(user_data)
        return {"profile": user_profile}, 200

    def delete(self, address):
        profile.delete_profile(address)
        return {"profile": None}, 200

class Profile_all(Resource):
    def get(self):
        profiles = profile.all_profile()
        return {"profiles": profiles}, 200

class Stack(Resource):
    def get(self, address):
        stack = match.get_stack(address)
        return {"stack": stack}, 200


    

api.add_resource(Profile, "/profile/<string:address>", endpoint="profile")
api.add_resource(Profile_all, "/profile/all", endpoint="all_profile")
api.add_resource(Stack, "/stack/<string:address>", endpoint="address")


if __name__ == '__main__':
    app.run(debug=True, port=5002)