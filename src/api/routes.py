"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, SportCenter,Court,Image,Profile,Post,Comment,Like,Booking
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
    body = request.get_json()
    username = body["username"]
    password = body["password"]

    user = User.get_with_login_credentials(username, password)
    if user is None:
        raise APIException("Usuario o contraseña incorrecta")

    access_token = create_access_token(identity=user.id)

    return jsonify({"access_token": access_token})

@api.route("/getuser", methods=['GET'])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = User.get(current_user_id)
    return jsonify(user.serialize())


# PROFILE

# POST NEW PROFILE
@api.route ('/profile', methods=['POST'])
def register_new_profile():

    body=request.get_json()
    new_profile=Profile.add_register(body)
    new_profile.save()
  
    return jsonify(new_profile.serialize()),200


# PROFILE: Get profile by user Id
@api.route ('/profile/<int:user_id>', methods=['GET'])
def get_profile(user_id):

    profile=Profile.item_by_user_id(user_id)

    return jsonify(profile.serialize()), 200


# PROFILE: update profile by id
@api.route ('/profileupdate/<int:profile_id>', methods=['PUT'])
def update_profile(profile_id):

    body=request.get_json()
    profile=Profile.get_id(profile_id)
    profile.body(body)    
    profile.save()

    return jsonify(profile.serialize()), 200


# POSTS
# NEW POST
@api.route ('/post', methods=['POST'])
def register_new_post():
    files=request.files
    user_id=request.form.get('user_id')
    text=request.form.get('text')
    print('USER_ID',user_id)
    print('TEXT',text)
   
    try:
        url_image=upload_file_to_s3(files['image'], os.environ.get('S3_BUCKET_NAME'))
        print('URL',url_image)
        new_post=Post(user_id=user_id,text=text,url_image=url_image)
        new_post.save()

    except Exception as e:
        raise APIException("Fallo al importar imagenes")

  
    return jsonify(new_post.serialize()),200

# POST: Get posts by user Id
@api.route ('/posts/<int:user_id>', methods=['GET'])
def get_posts(user_id):
    with_comments=True
    posts=Post.items_by_user_id(user_id)
    posts_list = []
    print(posts)
    for post in posts:
        posts_list.append(post.serialize(with_comments))
        print(posts_list)
    
    return jsonify(posts_list), 200


#POST:  Delete post by post_id
@api.route ('/postdelete/<int:post_id>', methods=['GET'])
def delete_post(post_id):

    post=Post.get_id(post_id)
    post.delete()    

    return jsonify({}), 200


# COMMENTS

# COMMENT: Get comments by user Id
@api.route ('/comments/<int:user_id>', methods=['GET'])
def get_comments(user_id):
    comments=Comment.items_by_user_id(user_id)
    comments_list = []

    for comment in comments:
        comments_list.append(comment.serialize())
    
    return jsonify(comments_list), 200

# COMMENT: Get comments by post Id
@api.route ('/comments_post/<int:post_id>', methods=['GET'])
def get_comments_post(post_id):
    comments=Comment.items_by_post_id(post_id)
    comments_list = []

    for comment in comments:
        comments_list.append(comment.serialize())
    
    return jsonify(comments_list), 200


# NEW COMMENT
@api.route ('/comment', methods=['POST'])
def register_new_comment():

    body=request.get_json()
    new_comment=Comment.add_register(body)
    new_comment.save()
  
    return jsonify(new_comment.serialize()),200




#COMMENT:  Delete comment by comment_id
@api.route ('/commentdelete/<int:comment_id>', methods=['GET'])
def delete_comment(comment_id):

    comment=Comment.get_id(comment_id)
    comment.delete()    

    return jsonify({}), 200


# LIKES


# LIKES: Get likes by user Id
@api.route ('/likes/<int:user_id>', methods=['GET'])
def get_likes(user_id):
    likes=Like.items_by_user_id(user_id)
    likes_list = []

    for like in likes:
        likes_list.append(like.serialize())
    
    return jsonify(likes_list), 200



# NEW LIKE
@api.route ('/like', methods=['POST'])
def register_new_like():

    body=request.get_json()
    new_like=Like.add_register(body)
    new_like.save()
  
    return jsonify(new_like.serialize()),200

# LIKE: Get Likes by post Id
@api.route ('/likes_post/<int:post_id>', methods=['GET'])
def get_likes_post(post_id):
    likes=Like.items_by_post_id(post_id)
    likes_list = []

    for like in likes:
        likes_list.append(like.serialize())
    
    return jsonify(likes_list), 200


#LIKE:  Delete like by like_id
@api.route ('/likedelete/<int:like_id>', methods=['GET'])
def delete_like(like_id):

    like=Like.get_id(like_id)
    like.delete()    

    return jsonify({}), 200








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

    courts=Court.items_by_sportcenter(sportcenter_id)
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


# SPORTCENTER: MOSTRAR LAS IMAGES DEL CENTRO
@api.route ('<int:sportcenter_id>/images', methods=['GET'])
def get_images(sportcenter_id):

    images=Image.items_by_sportcenter(sportcenter_id)
    images_list = []
    for image in images:
        images_list.append(image.serialize())

    return jsonify(images_list), 200



