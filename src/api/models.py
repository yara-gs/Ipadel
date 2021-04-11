from flask_sqlalchemy import SQLAlchemy



db = SQLAlchemy()


class BaseModel():
    #get all data of a table
    @classmethod
    def getAll(cls):
        return cls.query.all()
    
    #get data by id
    @classmethod
    def getId(cls,id):
        return cls.query.get(id)
    

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    @classmethod
    def create_user(cls, username, email, password):
        user= cls()
        user.username= username
        user.email= email
        user.password= password
        user.is_active= True
        
        db.session.add(user)
        db.session.commit()

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
    admin_user=db.Column(db.String(120), unique=True, nullable=False)
    password=db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone=db.Column(db.Integer, unique=True, nullable=False)
    webpage=db.Column(db.String(120), unique=False, nullable=False)
    address=db.Column(db.String(120),unique=False, nullable=False)
    state=db.Column(db.String(120),unique=False, nullable=True)
    city=db.Column(db.String(120),unique=False, nullable=True)
    cp=db.Column(db.String(120), unique=False, nullable=True)
    image=db.Column(db.String(120),unique=False,nullable=True)

    courts=db.relationship("Court",back_populates="sportcenter")

     #metodo de instancia %r lo sustituty por %self.id
    def __repr__(self):
        return '<SportCenter %r>' % self.id

    #metodo de instancia serializa el diccionario
    def serialize(self,with_courts=False):
        sportcenter_serialized ={
            "id": self.id,
            "center_name": self.center_name,
            "nif": self.nif,
            "admin_user": self.admin_user,
            "address": self.address,
            "state": self.state,
            "city": self.city,
            "cp": self.cp,
            "email": self.email,
            "phone": self.phone,
            "webpage": self.webpage
        }

        if with_courts:
            courts_dict = []
            courts=self.courts
            for court in courts:
                courts_dict .append(court.serialize())
            sportcenter_serialized["courts"] =courts_dict

        return sportcenter_serialized

    #metodo de instancia que obliga a que haya datos siempre que se llama       
    def __init__(self,center_name,nif,admin_user,address,state,city,cp):
        self.center_name=center_name
        self.nif=nif
        self.admin_user=admin_user
        self.address=address
        self.state=state
        self.city=city
        self.cp=cp

    #create register
    @classmethod
    def createRegister(cls, request_json):
        
        register=cls(request_json["center_name"],request_json["nif"],request_json["admin_user"],request_json["state"],request_json["address"],request_json["city"],request_json["cp"])
        register.body(request_json)
        return register
    
    #get body
    def body(self, request_json):
        self.center_name=request_json["center_name"]
        self.nif=request_json["nif"]
        self.admin_user=request_json["admin_user"]
        self.password=request_json["password"]
        self.address=request_json["address"]
        self.state=request_json["state"]
        self.city=request_json["city"]
        self.cp=request_json["cp"]
        self.email=request_json["email"]
        self.phone=request_json["phone"]
        self.webpage=request_json["webpage"]
        self.image=request_json["image"]

    # save data in the database
    def save(self):
        db.session.add(self)
        return db.session.commit()
    
    # delete data in the database
    def delete(self):
        db.session.delete(self)
        return db.session.commit()


     # For Many to One (Many Courts to one SportCenter)
class Court(db.Model,BaseModel):
    __tablename__ = 'court'
    id=db.Column(db.Integer, primary_key=True)
    court_name=db.Column(db.String(120), unique=False, nullable=True)
    light=db.Column(db.Boolean, unique=False, nullable=True)
    image=db.Column(db.String(120),unique=False,nullable=True)

    sportcenter_id=db.Column(db.Integer,db.ForeignKey('sportcenter.id'))
    sportcenter=db.relationship("SportCenter",back_populates="courts")
    
        #metodo de instancia %r lo sustituty por %self.id
    def __repr__(self):
        return '<Court %r>' % self.id

    #metodo de instancia que obliga a que haya datos siempre que se llama       
    def __init__(self,court_name):
        self.court_name=court_name
                
    #metodo de instancia serializa el diccionario
    def serialize(self):
        return {
            "id": self.id,
            "court_name": self.court_name,
            "light":self.light
        }       
    