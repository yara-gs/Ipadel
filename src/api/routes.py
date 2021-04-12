"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, SportCenter,Court
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/sign', methods = ['POST'])
def sign():
    body = request.get_json()
    try:
        User.create_user(body["username"], body["email"], body["password"])
    except:
        raise APIException("Error al registrar el usuario", 401)

    return jsonify({}), 200

@api.route("/login", methods=["POST"])
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


#  Get all sports center & their courts
@api.route ('/sportcenters', methods=['GET'])
def get_centers():
    centers=SportCenter.query.all()
    centers_dict = []
    for center in centers:
        centers_dict.append(center.serialize(with_courts=True))
    
    return jsonify(centers_dict), 200


#  Get a sportCenter by Id
@api.route ('/sportcenters/<int:id>', methods=['GET'])
def get_sportcenter(id):

    center=SportCenter.getId(id)
    
    return jsonify(center.serialize(with_courts=True)), 200


# #Delete a court of a sport center
# @api.route ('/sportcenters/<int:id>/deletecourt/<int:id2>', methods=['GET'])
# def get_sportcenter(id,id2):

#     courts=SportCenter.getId(id).serialize(with_courts=True)["courts"]
#     court=0
#     for item in courts:
#         if item["id"]==id2:
#             court=item
#             db.session.delete(item)
#             db.session.commit()
    
#     return jsonify(court), 200










   



    body = request.get_json()
    username = body ["username"]
    password = body ["password"]

    User.log_user(username, password)

    if user is None:
        raise APIException("Usuario o contraseña incorrecta")

    access_token = create_access_token(identity=user.id)

    return jsonify({"access_token": access_token})

@api.route("/profile", methods=['GET'])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = User.get(current_user_id)
    return jsonify(user.serialize())
