"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

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
