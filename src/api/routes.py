"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, SportCenter,Court,Image
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

from aws import upload_file_to_s3

api = Blueprint('api', __name__)

# USER- LOGIN/SIGNUP CONFIGURATION

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



@api.route("/profile", methods=['GET'])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = User.get(current_user_id)
    return jsonify(user.serialize())


# SPORT CENTER REGISTRATION

# SPORTCENTER: REGISTER SPORT NEW SPORTCENTER
@api.route ('/newcenter', methods=['POST'])
def register_new_center():

    body=request.get_json()
    new_sportcenter=SportCenter.add_register(body)
    new_sportcenter.save()
  
    return jsonify(new_sportcenter.serialize()),200


# SPORTCENTER: Get all sports center & without courts
@api.route ('/sportcenters/', methods=['GET'])
def get_centers():
    centers=SportCenter.get_all()
    centers_dict = []
    for center in centers:
        centers_dict.append(center.serialize(with_courts=False))
    
    return jsonify(centers_dict), 200


# SPORTCENTER: Get a sportCenter by Id
@api.route ('/sportcenters/<int:id>', methods=['GET'])
def get_sportcenter(id):

    # param={'with_courts':1}
    # with_courts=requests.get("https://3001-coffee-gayal-05rp2wqg.ws-eu03.gitpod.io/sportcenters/<int:id>", params=param)
    with_courts="1" #PASAR POR PARAMETRO DESDE EL FETCH
    if with_courts=="1":
        with_courts=True
    else:
        with_courts=False

    center=SportCenter.get_id(id)
    return jsonify(center.serialize(with_courts=with_courts)), 200


# COURTS

# COURTS: Get all courts from a sportCenter
@api.route ('<int:sportcenter_id>/courts/', methods=['GET'])
def get_courts(sportcenter_id):

    courts=Court.courts_by_sportcenter(sportcenter_id)
    courts_list = []
    for court in courts:
        courts_list.append(court.serialize())

    return jsonify(courts_list), 200


#COURTS:  Crate new court
@api.route ('newcourt/', methods=['POST'])
def register_new_court():

    body=request.get_json()
    court=Court.add_register(body)
    court.save()
  
    return jsonify(court.serialize()),200



#COURTS:  Update court by id
@api.route ('/courtupdate/<int:court_id>', methods=['PUT'])
def update_court(court_id):

    body=request.get_json()
    court=Court.get_id(court_id)
    court.body(body)    
    court.save()

    return jsonify(court.serialize()), 200


#COURTS:  Delete court by id
@api.route ('/courtdelete/<int:court_id>', methods=['GET'])
def delete_court(court_id):

    court=Court.get_id(court_id)
    court.delete()    

    return jsonify(court.serialize()), 200


# SPORT CENTER IMAGES

# SPORTCENTER: UPLOAD IMAGES
@api.route ('/upload-images', methods=['POST'])
def upload_images():

    files=request.files
    sportcenter_id=request.form.get('sportcenter_id')
    images_list=[]
    for key in files:
        file=files[key]
        try:
            url_image=upload_file_to_s3(file, os.environ.get('S3_BUCKET_NAME'))
            image=Image(url_image=url_image,sportcenter_id=sportcenter_id)
            image.save()
            images_list.append(image.serialize())

        except Exception as e:
            raise APIException("Fallo al importar imagenes")


    return jsonify(images_list),200





