"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, NewCenter
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

@api.route('/sign', methods = ['POST'])
def sign():
    body = request.get_json()
    User.create_user(body["username"], body["email"], body["password"])
    return jsonify({}), 200

@api.route('/login', methods = ['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return jsonify ({})

#  Register sport center
@api.route ('/newcenter', methods=['POST'])
def registerNewCenter():

    body=request.get_json()
    print(body)
    # newCenter= NewCenter(body["admin_user"], body["center_name"],body["address"]) 
    # newCenter.admin_user=body["admin_user"]
    # newCenter.center_name=body["center_name"]
    # newCenter.address=body["address"]
    # newCenter.password=body["password"]
    # newCenter.email=body["email"]
    # newCenter.phone=body["phone"]
    # newCenter.webpage=body["webpage"]
    # newCenter.image=body["image"]

    newCenter=NewCenter.createRegister(body)
    # newCenter= NewCenter(body["admin_user"], body["center_name"],body["address"]) 
   
    # print(newCenter.serialize())
    newCenter.save()
  
 
    return jsonify(newCenter.serialize()),200




