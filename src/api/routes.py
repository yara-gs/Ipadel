"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Friend,SportCenter,Court,Image,Profile,Post,Comment,Like,Booking,PreBooking,ForgotPasswordEmail
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
import random

from sqlalchemy import func
from aws import upload_file_to_s3
from datetime import datetime,date,timedelta
import datetime
import pytz 
from tzlocal import get_localzone # $ pip install tzlocal

# from sqlalchemy import create_engine

# engine = create_engine("sql://u:p@host/db", pool_size=10, max_overflow=20)



api = Blueprint('api', __name__)

# USER- LOGIN/SIGNUP CONFIGURATION

@api.route('/sign', methods = ['POST'])
def sign():
    body = request.get_json()
    url_image=""
    try:
        User.create_user(body["username"], body["email"], body["password"],url_image)
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


# Forgot Password
@api.route('/forgot-password', methods=['POST'])
def forgot_password():
    request_json = request.get_json()

    email = request_json["email"]

    if email is None:
        raise APIException("Email required")

    token = random.randint(10000000000000000,1999999999999000000000000)

    user = User.get_with_email(email)
    user.token = str(token)

    db.session.commit()

    forgot_password_email = ForgotPasswordEmail(email, token)
    url = forgot_password_email.send(str(token))

    return jsonify({url: url}), 200

@api.route('/reset-password', methods=['POST'])
def reset_password():
    request_json = request.get_json()
    email = request_json["email"]
    token = request_json["token"]
    password = request_json["password"]

    user = User.get_for_forgot(email, token)
    user.password = password
    user.token = None
    db.session.commit()

    return jsonify({}), 200


#USER
#POST USER-IMAGE
@api.route ('/user_image/<int:user_id>', methods=['PUT'])
def post_user_image(user_id):
    files=request.files
    user_id=user_id
    user=User.query.get(user_id)   
    try:
        url_image=upload_file_to_s3(files['image'], os.environ.get('S3_BUCKET_NAME'))
        print('URL',url_image)
        user.url_image=url_image
        user.save()

    except Exception as e:
        raise APIException("Fallo al importar imagenes")

  
    return jsonify(url_image),200


#GET ALL USERS

@api.route ('/users', methods=['GET'])
def getall_users():

    users=User.get_all()
    users_list = []

    for user in users:
        user_dict={
            "id":user.id,
            "username":user.username,
            "url_image":user.url_image,
        }   
        users_list.append(user_dict)

    return jsonify(users_list), 200


#GET FRIENDS BY USER ID

@api.route ('/friends/<int:user_id>', methods=['GET'])
def getfriends_byuserid(user_id):

    friends=Friend.items_by_user_id(user_id)
    friends_list = []

    for friend in friends:
        friends_list.append(friend.serialize())

    return jsonify(friends_list), 200


#CREATE FRIEND 

@api.route ('/createfriend', methods=['POST'])
def register_new_friend():

    body=request.get_json()
    new_friend=Friend.add_register(body)
    new_friend.save()

    return jsonify(new_friend.serialize()),200



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

# SPORTCENTER: Get all sports center by location
@api.route ('/sportcenters/<state>', methods=['GET'])
def get_centers_bycity(state):
    
    centers=SportCenter.items_by_state(state)
    centers_dict = []
    for center in centers:
        centers_dict.append(center.serialize(with_courts=False))
    
    return jsonify(centers_dict), 200


# SPORTCENTER: Get all sports by user
@api.route ('/sportcenters/<int:user_id>', methods=['GET'])
def get_centers_by_user_id(user_id):
    
    centers=SportCenter.items_by_user_id(user_id)
    centers_list = []
    for center in centers:
        centers_list.append(center.serialize(with_courts=False))
    
    return jsonify(centers_list), 200


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

    center=SportCenter.get_id(sportcenter_id)
    courts=center.courts
    courts_list = []
    capacity=0

    for court in courts:
        players=court.players
        courts_list.append(court.serialize())
        capacity=capacity+court.players

    center.capacity=capacity    
    center.save()
    
    return jsonify(courts_list), 200


#COURTS:  Crate new court
@api.route ('newcourt/', methods=['POST'])
def register_new_court():

    body=request.get_json()
    court=Court.add_register(body)
    court.save()

#se actualiza las cantidad de plazas del centro
    center=SportCenter.get_id(court.sportcenter_id)
    center.capacity=center.capacity+court.players
    center.save()
    
  
    return jsonify(court.serialize()),200



#COURTS:  Update court by id
@api.route ('/courtupdate/<int:court_id>', methods=['PUT'])
def update_court(court_id):

    body=request.get_json()
    court=Court.get_id(court_id)

    center=SportCenter.get_id(court.sportcenter_id)
    center.capacity=center.capacity-court.players+body["players"]

    court.body(body)    
    court.save()  
    #se actualiza las cantidad de plazas del centro
    center.save()

    return jsonify(court.serialize()), 200


#COURTS:  Delete court by id
@api.route ('/courtdelete/<int:court_id>', methods=['GET'])
def delete_court(court_id):

    court=Court.get_id(court_id)
    court.delete()  

    #se actualiza las cantidad de plazas del centro
    center=SportCenter.get_id(court.sportcenter_id)
    center.capacity=center.capacity-court.players
    center.save()

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



# PREBOOKING-OBTENER RESERVAS GIMNASIOS POR DIA
@api.route ('getprebookings/<int:sportcenter_id>/<date>', methods=['GET'])
def get_prebooking(sportcenter_id,date):


    prebookings= db.session.query(func.sum(PreBooking.players).label("sum_players"),PreBooking.time_start).filter(PreBooking.sportcenter_id==sportcenter_id).filter(PreBooking.date==date).group_by(PreBooking.time_start).all()
    prebooking_list=[]
    prebooking_dict={}
    for prebooking in prebookings:
        time=prebooking.time_start
        hour = time.strftime('%H')
        minutes = time.strftime('%M')
        time=hour + ":" + minutes
        prebooking_dict={
            "time_start":str(time),
            "prebooking_players":prebooking.sum_players
        }   
        prebooking_list.append(prebooking_dict)

    return jsonify(prebooking_list), 200



# PREBOOKING: OBTENER TODAS LAS RESERVAS POR USUARIO
@api.route ('prebookings_user/<int:user_id>', methods=['GET'])
def get_prebookings_by_user_id(user_id):

    utc_date = datetime.datetime.now()
    local_date=utc_date+datetime.timedelta(hours=2)
    # local_date = datetime.datetime.now(pytz.timezone('Europe/Paris')) 

    prebookings=PreBooking.query.filter_by(user_id=user_id).all()
  
    prebooking_list = []
    for prebooking in prebookings:
        date=prebooking.datetime
        if date>=local_date:
            center_name=SportCenter.get_id(prebooking.sportcenter_id).center_name
           
            prebooking_dict={
            "id":prebooking.id,
            "datetime":str(prebooking.datetime),
            "players":prebooking.players,
            "user_id":prebooking.user_id,
            "sportcenter_id":prebooking.sportcenter_id,
            "center_name":center_name,
            "isConfirm":prebooking.isConfirm,
            "court_name":prebooking.court_name,
            }   
            prebooking_list.append(prebooking_dict)

    return jsonify(prebooking_list), 200
    


# PREBOOKING: POST UNA PRERESERVA
@api.route ('prebooking/<int:sportcenter_id>', methods=['POST'])
def prebooking(sportcenter_id):

    #se comprueba capacidad del centro
    center_capacity=SportCenter.get_id(sportcenter_id).capacity

    
    #Se recibe la nueva prereserva
    body=request.get_json()
    prebooking_post=PreBooking.add_register(body)
    prebooking_players=prebooking_post.players
    datetime=prebooking_post.datetime

    #comprobar que pistas esta libre para esa hora
    courts=Court.query.filter_by(sportcenter_id=sportcenter_id).all()
    court_id_available=0
    court_name=""
    for court in courts:

        court_bookings=Booking.query.filter_by(datetime=datetime).filter_by(court_id=court.id).first()
        if(court_bookings):
            print("pista reservarda ",court.id)
        else: 
            court_id_available=court.id
            court_name=court.court_name
            print("pista libre",court.id)
            break

   
    #Se comprueba el numero de preservas que hay para 1persona/2 y 3 personas todavia sin confirmar
    prebookings= db.session.query(func.count(PreBooking.id).label("rows"),PreBooking.players.label("players")).filter(PreBooking.sportcenter_id==sportcenter_id).filter(PreBooking.datetime==datetime).filter(PreBooking.isConfirm==False).group_by(PreBooking.players).all()
  
    prebooking_1p_rows=0
    prebooking_2p_rows=0
    prebooking_3p_rows=0

    for prebooking in prebookings:
   #Preserva 1personas
        if prebooking.players==1:
            prebookings_1player=prebooking
            prebooking_1p_rows=prebooking.rows
    #Preserva 2personas
        if prebooking.players==2:
            prebookings_2player=prebooking
            prebooking_2p_rows=prebooking.rows
    #Preserva 3personas
        if prebooking.players==3:
            prebookings_3player=prebooking
            prebooking_3p_rows=prebooking.rows

    #GESTION RESERVA 1 PERSONA 
    if prebooking_post.players==1:  
        
        #Primero se comprueba si hay alguna preserva 3p para combinar con la de 1
        if prebooking_3p_rows>0:
            # print("adios")
            
            getbook_3p=PreBooking.query.filter_by(sportcenter_id=sportcenter_id).filter_by(datetime=datetime).filter_by(players=3).filter_by(isConfirm=False).first()
            booking= Booking.add_register(datetime,court_id_available)
            booking=Booking.query.order_by(Booking.id.desc()).first()
            #se genera la nueva preserva y se confirma
            prebooking_post.booking_id=booking.id
            prebooking_post.isConfirm=True
            prebooking_post.court_name=court_name
            prebooking_post.save()
            #se actualiza el estado de la reserva que ya existia a confirmado
            getbook_3p.booking_id=booking.id
            getbook_3p.isConfirm=True
            getbook_3p.court_name=court_name
            getbook_3p.save()

        
        elif (prebooking_2p_rows>0 and prebooking_1p_rows>0):

            getbook_2p=PreBooking.query.filter_by(sportcenter_id=sportcenter_id).filter_by(datetime=datetime).filter_by(players=2).filter_by(isConfirm=False).first()
            getbook_1p=PreBooking.query.filter_by(sportcenter_id=sportcenter_id).filter_by(datetime=datetime).filter_by(players=1).filter_by(isConfirm=False).first()

            booking=Booking.add_register(datetime,court_id_available)
            booking=Booking.query.order_by(Booking.id.desc()).first()
            #se genera la nueva preserva y se confirma
            prebooking_post.booking_id=booking.id
            prebooking_post.isConfirm=True
            prebooking_post.court_name=court_name
            prebooking_post.save()
            #se actualiza el estado de la reserva que ya existia a confirmado
            getbook_2p.booking_id=booking.id
            getbook_2p.isConfirm=True
            getbook_2p.court_name=court_name
            getbook_2p.save()
            getbook_1p.booking_id=booking.id
            getbook_1p.isConfirm=True
            getbook_1p.court_name=court_name
            getbook_1p.save()

        elif prebooking_1p_rows>=3:

            booking=Booking.add_register(datetime,court_id_available)
            booking=Booking.query.order_by(Booking.id.desc()).first()

            #se genera la nueva preserva y se confirma
            prebooking_post.booking_id=booking.id
            prebooking_post.isConfirm=True
            prebooking_post.court_name=court_name
            prebooking_post.save()

            getbook_1p_1=PreBooking.query.filter_by(sportcenter_id=sportcenter_id).filter_by(datetime=datetime).filter_by(players=1).filter_by(isConfirm=False).first()
            getbook_1p_1.booking_id=booking.id
            getbook_1p_1.isConfirm=True
            getbook_1p_1.court_name=court_name
            getbook_1p_1.save()

            getbook_1p_2=PreBooking.query.filter_by(sportcenter_id=sportcenter_id).filter_by(datetime=datetime).filter_by(players=1).filter_by(isConfirm=False).first()
            getbook_1p_2.booking_id=booking.id
            getbook_1p_2.isConfirm=True
            getbook_1p_2.court_name=court_name
            getbook_1p_2.save()

            getbook_1p_3=PreBooking.query.filter_by(sportcenter_id=sportcenter_id).filter_by(datetime=datetime).filter_by(players=1).filter_by(isConfirm=False).first()
            getbook_1p_3.booking_id=booking.id
            getbook_1p_3.isConfirm=True
            getbook_1p_3.court_name=court_name
            getbook_1p_3.save()
        #Si la preserva no se puede combinar con otras preservas se guarda en prebookings con status "Sin confirmar"
        else:

            #se genera la nueva preserva y se confirma
            prebooking_post.isConfirm=False
            prebooking_post.save()


    #GESTION RESERVA 2PERSONAS 
    if prebooking_post.players==2:  
        
        if prebooking_2p_rows>0:

            getbook_2p=PreBooking.query.filter_by(sportcenter_id=sportcenter_id).filter_by(datetime=datetime).filter_by(players=2).filter_by(isConfirm=False).first()
            
            booking=Booking.add_register(datetime,court_id_available)
            booking=Booking.query.order_by(Booking.id.desc()).first()
            #se genera la nueva preserva y se confirma
            prebooking_post.booking_id=booking.id
            prebooking_post.isConfirm=True
            prebooking_post.court_name=court_name
            prebooking_post.save()
            #se actualiza el estado de la reserva que ya existia a confirmado
            getbook_2p.booking_id=booking.id
            getbook_2p.isConfirm=True
            getbook_2p.court_name=court_name
            getbook_2p.save()
           

        elif prebooking_1p_rows>=2:

            booking=Booking.add_register(datetime,court_id_available)
            booking=Booking.query.order_by(Booking.id.desc()).first()

            #se genera la nueva preserva y se confirma
            prebooking_post.booking_id=booking.id
            prebooking_post.isConfirm=True
            prebooking_post.court_name=court_name
            prebooking_post.save()

            getbook_1p_1=PreBooking.query.filter_by(sportcenter_id=sportcenter_id).filter_by(datetime=datetime).filter_by(players=1).filter_by(isConfirm=False).first()
            getbook_1p_1.booking_id=booking.id
            getbook_1p_1.isConfirm=True
            getbook_1p_1.court_name=court_name
            getbook_1p_1.save()

            getbook_1p_2=PreBooking.query.filter_by(sportcenter_id=sportcenter_id).filter_by(datetime=datetime).filter_by(players=1).filter_by(isConfirm=False).first()
            getbook_1p_2.booking_id=booking.id
            getbook_1p_2.isConfirm=True
            getbook_1p_2.court_name=court_name
            getbook_1p_2.save()
        #Si la preserva no se puede combinar con otras preservas se guarda en prebookings con status "Sin confirmar"
        else:

            #se genera la nueva preserva y se confirma
            prebooking_post.isConfirm=False
            prebooking_post.save()

 #GESTION RESERVA 3PERSONAS 
    if prebooking_post.players==3:  
        
        if prebooking_1p_rows>0:

            getbook_1p=PreBooking.query.filter_by(sportcenter_id=sportcenter_id).filter_by(datetime=datetime).filter_by(players=1).filter_by(isConfirm=False).first()
            
            booking=Booking.add_register(datetime,court_id_available)
            booking=Booking.query.order_by(Booking.id.desc()).first()
            #se genera la nueva preserva y se confirma
            prebooking_post.booking_id=booking.id
            prebooking_post.isConfirm=True
            prebooking_post.court_name=court_name
            prebooking_post.save()
            #se actualiza el estado de la reserva que ya existia a confirmado
            getbook_1p.booking_id=booking.id
            getbook_1p.isConfirm=True
            getbook_1p.court_name=court_name
            getbook_1p.save()
        #Si la preserva no se puede combinar con otras preservas se guarda en prebookings con status "Sin confirmar"       
        else:
            #se genera la nueva preserva y se confirma
            prebooking_post.isConfirm=False
            prebooking_post.save()
    
    #GESTION RESERVA 3PERSONAS 
    if prebooking_post.players==4:      
        booking=Booking.add_register(datetime,court_id_available)
        booking=Booking.query.order_by(Booking.id.desc()).first()
        #se genera la nueva preserva y se confirma
        prebooking_post.booking_id=booking.id
        prebooking_post.isConfirm=True
        prebooking_post.court_name=court_name
        prebooking_post.save()
    

    return jsonify(prebooking_post.isConfirm), 200



# PREBOOKING: OBTENER TODAS LAS RESERVAS POR USUARIO
@api.route ('bookingCourt', methods=['GET'])
def get_bookingcourt():

    courts=Court.query.filer_by(sportcenter_id=sportcenter_id).all()
    
    date_time_str = "2021-05-18 14:00:00"
    datetime_obj = datetime.datetime.strptime(date_time_str, '%Y-%m-%d %H:%M:%S')
    print(datetime_obj)

    for court in courts:

        bookings=Booking.query.filter_by(datetime=datetime_obj).filter_by(court_id=court.id).first()
        if(bookings):
            print("pista reservarda ",court.id)
        else: 
            print("pista libre",court.id)
            break


    
    return jsonify({}), 200
