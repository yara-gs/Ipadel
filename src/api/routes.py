"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
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

    newCenter=NewCenter()
    newCenter=NewCenter.body(request.get_json())
    newCenter.save()
    return jsonify ({}), 200


