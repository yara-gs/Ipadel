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
    





class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    # relacion one to many con tabla User (un usuario puede tener muchos centros)
    sportcenters=db.relationship("SportCenter",back_populates="user")
  


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




# REGISTER NEW SPORTS CENTER
class SportCenter(db.Model,BaseModel):
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

    # relacion one to many con tabla User (un usuario puede tener muchos centros)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'))
    user=db.relationship("User",back_populates="sportcenters")

    #relacion many to one ( muchas pistas/imagenes para un solo centro)
    courts=db.relationship("Court",back_populates="sportcenter")
    images=db.relationship("Image",back_populates="sportcenter")

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
        }

        if with_courts:
            courts_dict = []
            courts=self.courts
            for court in courts:
                courts_dict .append(court.serialize())
            sportcenter_serialized["courts"] =courts_dict

        return sportcenter_serialized

    #metodo de instancia que obliga a que haya datos siempre que se llama       
    def __init__(self,center_name,nif,address,state,city,cp):
        self.center_name=center_name
        self.nif=nif
        self.address=address
        self.state=state
        self.city=city
        self.cp=cp

    #create register
    @classmethod
    def add_register(cls, request_json):
        
        register=cls(request_json["center_name"],request_json["nif"],request_json["state"],request_json["address"],request_json["city"],request_json["cp"])
        register.body(request_json)
        return register
    
    #get body
    def body(self, request_json):
        self.center_name=request_json["center_name"]
        self.nif=request_json["nif"]
        self.address=request_json["address"]
        self.state=request_json["state"]
        self.city=request_json["city"]
        self.cp=request_json["cp"]
        self.phone=request_json["phone"]
        self.webpage=request_json["webpage"]

    # save data in the database
    def save(self):
        db.session.add(self)
        return db.session.commit()
    
    # delete data in the database
    def delete(self):
        db.session.delete(self)
        return db.session.commit()


class SportCenterId():
    @classmethod
    def items_by_sportcenter(cls, sportcenter_id):
        return cls.query.filter_by(sportcenter_id=sportcenter_id).all()

    @classmethod
    def item_by_sportcenter(cls, sportcenter_id):
        return cls.query.filter_by(sportcenter_id=sportcenter_id).one_or_none()





# For Many to One (Many Courts to one SportCenter)
class Court(db.Model,BaseModel,SportCenterId):
    __tablename__ = 'court'
    id=db.Column(db.Integer, primary_key=True)
    court_name=db.Column(db.String(120), unique=False, nullable=False)
    light=db.Column(db.Boolean, unique=False, nullable=True)
    image=db.Column(db.String(120),unique=False,nullable=True)
    players=db.Column(db.Integer, unique=False, nullable=False)

    sportcenter_id=db.Column(db.Integer,db.ForeignKey('sportcenter.id'))
    sportcenter=db.relationship("SportCenter",back_populates="courts")
    
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
            "id": self.id,
            "url_image": self.url_image,
            "sportcenter_id": self.sportcenter_id
        }       

    # save data in the database
    def save(self):
        db.session.add(self)
        return db.session.commit()
        