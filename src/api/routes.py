"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, SportCenter,Court
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
    newSportCenter=SportCenter.createRegister(body)
    newSportCenter.save()
  
    return jsonify(newSportCenter.serialize()),200


#  Register sport center
@api.route ('/sportcenters', methods=['GET'])
def get_centers():
    centers=SportCenter.query.all()
    centers_dict = []
    for center in centers:
        centers_dict.append(center.serialize())
    
    return jsonify(centers_dict), 200


#  Register sport center
@api.route ('/sportcenters/<int:id>', methods=['GET'])
def get_sportcenter(id):

    center=SportCenter.getId(id)
    courts=Court.query.all()

    courts_dict = []
    for court in courts:
        courts_dict.append(court.serialize())
    
   

    return jsonify(courts_dict), 200





   



