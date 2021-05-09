from flask_sqlalchemy import SQLAlchemy



db = SQLAlchemy()


class BaseModel():
    #get all data of a table
    @classmethod
    def get_all(cls):
        return cls.query.all()
    
    #get data by id
    @classmethod
    def get_id(cls,id):
        return cls.query.get(id)


class UserId():
    @classmethod
    def items_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()

    @classmethod
    def item_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).one_or_none()
    

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    # relacion one to many con tabla User (un usuario puede tener muchos centros)
    sportcenters=db.relationship("SportCenter",back_populates="user")
    profile=db.relationship("Profile",back_populates="user")
    posts=db.relationship("Post",back_populates="user")
    comments=db.relationship("Comment",back_populates="user")
    likes=db.relationship("Like",back_populates="user")
  



    def __init__(self,username, email, password, is_active=True): 
        if username == '' or email == '' or password == '':
            raise Exception("Usuario, Email y Contraseña requerida")
        self.username = username
        self.email = email
        self.password = password
        self.is_active = is_active

    @classmethod
    def create_user(cls, username, email, password):
        user= cls(username, email, password)
        
        db.session.add(user)
        db.session.commit()

    @classmethod
    def get_with_login_credentials(cls, username, password):
        return cls.query.filter_by(username=username).filter_by(password=password).one_or_none()

    @classmethod
    def get(cls, id):
        return cls.query.get(id)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
        }



#PROFILE MI RED
class Profile(db.Model,BaseModel,UserId):
    __tablename__ = 'profile'

    id=db.Column(db.Integer, primary_key=True)
    birth=db.Column(db.String(120), unique=False, nullable=True)
    country=db.Column(db.String(120),unique=False, nullable=True)
    city=db.Column(db.String(120),unique=False, nullable=True)
   

    # relacion one to many con tabla User (un usuario puede tener muchos centros)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'))
    user=db.relationship("User",back_populates="profile")


     #metodo de instancia %r lo sustituty por %self.id
    def __repr__(self):
        return '<Profile %r>' % self.id
    
     #metodo de instancia que obliga a que haya datos siempre que se llama       
    def __init__(self,user_id,birth,country,city):
        self.user_id=user_id
        self.birth=birth
        self.country=country
        self.city=city

    #metodo de instancia serializa el diccionario
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "country": self.country,
            "city": self.city,
        }

    @classmethod
    def add_register(cls, request_json):
        
        register=cls(request_json["user_id"],request_json["birth"],request_json["country"],request_json["city"])
        register.body(request_json)
        return register
    
    #get body
    def body(self, request_json):
        self.user_id=request_json["user_id"]
        self.birth=request_json["birth"]
        self.country=request_json["country"]
        self.city=request_json["city"]
        
    # save data in the database
    def save(self):
        db.session.add(self)
        return db.session.commit()




# #PROFILE MI RED
# #POSTS

class Post(db.Model,BaseModel,UserId):
    __tablename__ = 'post'

    id=db.Column(db.Integer, primary_key=True)
    text=db.Column(db.String(120), unique=False, nullable=True)
    url_image=db.Column(db.String(120), unique=False, nullable=False)
  
    # relacion one to many con tabla User (un usuario puede tener muchos centros)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'))
    user=db.relationship("User",back_populates="posts")

    #relacion many to one con tabla User (un post puede tener muchos comments)
    comments=db.relationship("Comment",back_populates="post")
    likes=db.relationship("Like",back_populates="post")


     #metodo de instancia %r lo sustituty por %self.id
    def __repr__(self):
        return '<Post %r>' % self.id
    
    #metodo de instancia que obliga a que haya datos siempre que se llama       
    def __init__(self,user_id,text,url_image):
        self.user_id=user_id
        self.text=text
        self.url_image=url_image

    #metodo de instancia serializa el diccionario
    def serialize(self,with_comments=True):
        post_serialize={
            "id": self.id,
            "text": self.text,
            "url_image": self.url_image
        }

        if with_comments:
            comments_dict = []
            comments=self.comments
            for comment in comments:
                comments_dict .append(comment.serialize())
            post_serialize["comments"] =comments_dict

        # if with_likes:
        #     likes_dict = []
        #     likes=self.likes
        #     for like in likes:
        #         likes_dict .append(like.serialize())
        #     post_serialize["likes"] =likes_dict

        return post_serialize

    @classmethod
    def add_register(cls, request_json):
        
        register=cls(request_json["user_id"],request_json["text"],request_json["url_image"])
        register.body(request_json)
        return register
    
    #get body
    def body(self, request_json):
        self.user_id=request_json["user_id"]
        self.text=request_json["text"]
        self.url_image=request_json["url_image"]
       
        
    # save data in the database
    def save(self):
        db.session.add(self)
        return db.session.commit()
    

    # delete data in the database
    def delete(self):
        db.session.delete(self)
        return db.session.commit()


#PROFILE MI RED
#POSTS
#COMMENTS
class Comment(db.Model,BaseModel,UserId):
    __tablename__ = 'comment'

    id=db.Column(db.Integer, primary_key=True)
    text=db.Column(db.String(120), unique=False, nullable=True)


   # relacion one to many con tabla User(un user puede tener muchos comentarios)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'))
    user=db.relationship("User",back_populates="comments")
    # relacion one to many con tabla Post(un post puede tener muchos comentarios)
    post_id=db.Column(db.Integer,db.ForeignKey('post.id'))
    post=db.relationship("Post",back_populates="comments")

    #metodo de instancia %r lo sustituty por %self.id
    def __repr__(self):
        return '<Comment %r>' % self.id

     #metodo de instancia que obliga a que haya datos siempre que se llama       
    def __init__(self,user_id,post_id,text):
        self.user_id=user_id
        self.post_id=post_id
        self.text=text

    #metodo de instancia serializa el diccionario
    def serialize(self):
        return {
            "id": self.id,
            "user_id":self.user_id,
            "post_id": self.post_id,
            "text": self.text,     
        }
    
    @classmethod
    def add_register(cls, request_json):
        
        register=cls(request_json["user_id"],request_json["post_id"],request_json["text"])
        register.body(request_json)
        return register
    
    #get body
    def body(self, request_json):
        self.user_id=request_json["user_id"]
        self.post_id=request_json["post_id"]
        self.text=request_json["text"]
      
    # save data in the database
    def save(self):
        db.session.add(self)
        return db.session.commit()
    
    # delete data in the database
    def delete(self):
        db.session.delete(self)
        return db.session.commit()

    @classmethod
    def items_by_post_id(cls, post_id):
        return cls.query.filter_by(post_id=post_id).all()
        



#PROFILE MI RED
#POSTS
#LIKES
class Like(db.Model,BaseModel,UserId):
    __tablename__ = 'like'

    id=db.Column(db.Integer, primary_key=True)
    user_like=db.Column(db.String(120), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    # relacion one to many con tabla User(un user puede tener muchos comentarios)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'))
    user=db.relationship("User",back_populates="likes")
    # relacion one to many con tabla Post(un post puede tener muchos comentarios)
    post_id=db.Column(db.Integer,db.ForeignKey('post.id'))
    post=db.relationship("Post",back_populates="likes")

    #metodo de instancia %r lo sustituty por %self.id
    def __repr__(self):
        return '<Like %r>' % self.id

    #metodo de instancia serializa el diccionario
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "is_active":self.is_active,
            "user_like": self.user_like,
        }
    
    @classmethod
    def add_register(cls, request_json):
        
        register=cls(request_json["user_id"],request_json["post_id"],request_json["is_active"],request_json["user_like"])
        register.body(request_json)
        return register
    
    #get body
    def body(self, request_json):
        self.user_id=request_json["user_id"]
        self.post_id=request_json["post_id"]
        self.is_active=request_json["is_active"]
        self.user_like=request_json["user_like"]
      
    # save data in the database
    def save(self):
        db.session.add(self)
        return db.session.commit()
    
    # delete data in the database
    def delete(self):
        db.session.delete(self)
        return db.session.commit()

    @classmethod
    def items_by_post_id(cls, post_id):
        return cls.query.filter_by(post_id=post_id).all()




    

# REGISTER NEW SPORTS CENTER
class SportCenter(db.Model,BaseModel,UserId):
    __tablename__ = 'sportcenter'

    id=db.Column(db.Integer, primary_key=True)
    center_name=db.Column(db.String(120), unique=True, nullable=False)
    nif=db.Column(db.String(120), unique=True, nullable=False)
    phone=db.Column(db.Integer, unique=True, nullable=False)
    webpage=db.Column(db.String(120), unique=False, nullable=False)
    address=db.Column(db.String(120),unique=False, nullable=False)
    state=db.Column(db.String(120),unique=False, nullable=True)
    city=db.Column(db.String(120),unique=False, nullable=True)
    cp=db.Column(db.String(120), unique=False, nullable=True)
    opening_time=db.Column(db.Integer, unique=False, nullable=True)
    closing_time=db.Column(db.Integer, unique=False, nullable=True)
    capacity=db.Column(db.Integer, unique=False, nullable=False)

    # relacion one to many con tabla User (un usuario puede tener muchos centros)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'))
    user=db.relationship("User",back_populates="sportcenters")

    #relacion many to one ( muchas pistas/imagenes para un solo centro)
    courts=db.relationship("Court",back_populates="sportcenter")
    images=db.relationship("Image",back_populates="sportcenter")
    prebookings=db.relationship("PreBooking",back_populates="sportcenter")

     #metodo de instancia %r lo sustituty por %self.id
    def __repr__(self):
        return '<SportCenter %r>' % self.id

    #metodo de instancia serializa el diccionario
    def serialize(self,with_courts=False):
        sportcenter_serialized ={
            "id": self.id,
            "center_name": self.center_name,
            "nif": self.nif,
            "address": self.address,
            "state": self.state,
            "city": self.city,
            "cp": self.cp,
            "phone": self.phone,
            "webpage": self.webpage,
            "opening_time": self.opening_time,
            "closing_time": self.closing_time,
            "capacity": self.capacity,
        }

        if with_courts:
            courts_dict = []
            courts=self.courts
            for court in courts:
                courts_dict .append(court.serialize())
            sportcenter_serialized["courts"] =courts_dict

        return sportcenter_serialized

    #metodo de instancia que obliga a que haya datos siempre que se llama       
    def __init__(self,user_id,center_name,nif,address,state,city,cp,opening_time,closing_time,capacity):
        self.user_id=user_id
        self.center_name=center_name
        self.nif=nif
        self.address=address
        self.state=state
        self.city=city
        self.cp=cp
        self.opening_time,
        self.closing_time,
        self.capacity,

    #create register
    @classmethod
    def add_register(cls, request_json):
        
        register=cls(request_json["user_id"],request_json["center_name"],request_json["nif"],request_json["state"],request_json["address"],request_json["city"],request_json["cp"],request_json["opening_time"], request_json["closing_time"],request_json["capacity"])
        
        register.body(request_json)
        return register
    
    #get body
    def body(self, request_json):
        self.user_id=request_json["user_id"]
        self.center_name=request_json["center_name"]
        self.nif=request_json["nif"]
        self.address=request_json["address"]
        self.state=request_json["state"]
        self.city=request_json["city"]
        self.cp=request_json["cp"]
        self.phone=request_json["phone"]
        self.webpage=request_json["webpage"]
        self.opening_time=request_json["opening_time"]
        self.closing_time=request_json["closing_time"]
        self.capacity=request_json["capacity"]

    # save data in the database
    def save(self):
        db.session.add(self)
        return db.session.commit()
    
    # delete data in the database
    def delete(self):
        db.session.delete(self)
        return db.session.commit()
    
    @classmethod
    def items_by_city(cls, city):
        return cls.query.filter_by(city=city).all()


class SportCenterId():
    @classmethod
    def items_by_sportcenter(cls, sportcenter_id):
        return cls.query.filter_by(sportcenter_id=sportcenter_id).all()

    @classmethod
    def item_by_sportcenter(cls, sportcenter_id):
        return cls.query.filter_by(sportcenter_id=sportcenter_id).one_or_none()




#COURTS
# For Many to One (Many Courts to one SportCenter)
class Court(db.Model,BaseModel,SportCenterId):
    __tablename__ = 'court'
    id=db.Column(db.Integer, primary_key=True)
    court_name=db.Column(db.String(120), unique=False, nullable=False)
    light=db.Column(db.Boolean, unique=False, nullable=True)
    image=db.Column(db.String(120),unique=False,nullable=True)
    players=db.Column(db.Integer, unique=False, nullable=False)

    # relacion one to many con tabla SportCenter (un sportCenter puede tener muchas pistas)
    sportcenter_id=db.Column(db.Integer,db.ForeignKey('sportcenter.id'))
    sportcenter=db.relationship("SportCenter",back_populates="courts")

    #relacion many to one con tabla booking (muchas reservas para una pista)
    bookings=db.relationship("Booking",back_populates="court")
    
        #metodo de instancia %r lo sustituty por %self.id
    def __repr__(self):
        return '<Court %r>' % self.id

    #metodo de instancia que obliga a que haya datos siempre que se llama       
    def __init__(self,court_name,light,players,sportcenter_id):
        self.court_name=court_name
        self.light=light
        self.players=players
        self.sportcenter_id=sportcenter_id
                
    #metodo de instancia serializa el diccionario
    def serialize(self):
        return {
            "id": self.id,
            "court_name": self.court_name,
            "light":self.light,
            "players":self.players,
            "sportcenter_id": self.sportcenter_id
        }       

    
     #create register
    @classmethod
    def add_register(cls, request_json):
        
        register=cls(request_json["court_name"],request_json["light"],request_json["players"],request_json["sportcenter_id"])
        register.body(request_json)
        return register
    
    #get body
    def body(self, request_json):
        self.court_name=request_json["court_name"]
        self.light=request_json["light"]
        self.players=request_json["players"]
        self.sportcenter_id=request_json["sportcenter_id"]

    # save data in the database
    def save(self):
        db.session.add(self)
        return db.session.commit()
    
    # delete data in the database
    def delete(self):
        db.session.delete(self)
        return db.session.commit()


    
# For Many to One (Many Images to one SportCenter)
class Image(db.Model,BaseModel,SportCenterId):
    __tablename__ = 'images'
    id=db.Column(db.Integer, primary_key=True)
    url_image=db.Column(db.String(120), unique=False, nullable=False)


    sportcenter_id=db.Column(db.Integer,db.ForeignKey('sportcenter.id'))
    sportcenter=db.relationship("SportCenter",back_populates="images")
    

        #metodo de instancia %r lo sustituty por %self.id
    def __repr__(self):
        return '<Image %r>' % self.id

    #metodo de instancia que obliga a que haya datos siempre que se llama       
    def __init__(self,url_image,sportcenter_id):
        self.url_image=url_image
        self.sportcenter_id=sportcenter_id

 
    #metodo de instancia serializa el diccionario
    def serialize(self):
        return {
            "url_image": self.url_image,
        }       

    # save data in the database
    def save(self):
        db.session.add(self)
        return db.session.commit()
        
    

#COURT
#COURT PREBOOKING
class PreBooking(db.Model,BaseModel,SportCenterId,UserId):
        __tablename__ = 'prebooking'
        id=db.Column(db.Integer, primary_key=True)
        datetime=db.Column(db.DateTime,unique=False,nullable=False)
        date=db.Column(db.Date, unique=False, nullable=False)
        time_start=db.Column(db.Time, unique=False, nullable=False)
        time_end=db.Column(db.Time, unique=False, nullable=False)
        players=db.Column(db.Integer, unique=False, nullable=False)
 
        # relacion one to many con tabla SportCenter (un sportCenter puede tener muchas pistas)
        sportcenter_id=db.Column(db.Integer,db.ForeignKey('sportcenter.id'))
        sportcenter=db.relationship("SportCenter",back_populates="prebookings")
        
            #metodo de instancia %r lo sustituty por %self.id
        def __repr__(self):
            return '<PreBooking %r>' % self.id

        #metodo de instancia que obliga a que haya datos siempre que se llama       
        def __init__(self,datetime,date,time_start,time_end,players,sportcenter_id):
            self.datetime=datetime
            self.date=date
            self.time_start=time_start
            self.time_end=time_end
            self.players=players
            self.sportcenter_id=sportcenter_id
            
                    
        #metodo de instancia serializa el diccionario
        def serialize(self):
            return {
                "id": self.id,
                "datetime":str(self.datetime),
                "date": str(self.date),
                "time_start": str(self.time_start),
                "time_end": str(self.time_end),
                "players": self.players,
                "sportcenter_id": self.sportcenter_id,
                
            }       

        
        #create register
        @classmethod
        def add_register(cls, request_json):
            
            register=cls(request_json["datetime"],request_json["date"],request_json["time_start"],request_json["time_end"],request_json["players"],request_json["sportcenter_id"])
            register.body(request_json)
            return register
        
        #get body
        def body(self, request_json):
            self.datetime=request_json["datetime"]
            self.date=request_json["date"]
            self.time_start=request_json["time_start"]
            self.time_end=request_json["time_end"]
            self.players=request_json["players"]
            self.sportcenter_id=request_json["sportcenter_id"]    
            

        # save data in the database
        def save(self):
            db.session.add(self)
            return db.session.commit()
        
        # delete data in the database
        def delete(self):
            db.session.delete(self)
            return db.session.commit()



#COURT
#COURT PREBOOKING
class Booking(db.Model,BaseModel,SportCenterId):
        __tablename__ = 'booking'
        id=db.Column(db.Integer, primary_key=True)
        datetime=db.Column(db.DateTime,unique=False,nullable=False)
        date=db.Column(db.Date, unique=False, nullable=False)
        time_start=db.Column(db.Time, unique=False, nullable=False)
        time_end=db.Column(db.Time, unique=False, nullable=False)
        players=db.Column(db.Integer, unique=False, nullable=False)
 
        # relacion one to many con tabla SportCenter (un sportCenter puede tener muchas pistas)
        court_id=db.Column(db.Integer,db.ForeignKey('court.id'))
        court=db.relationship("Court",back_populates="bookings")