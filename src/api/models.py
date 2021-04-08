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

class NewCenter(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    # id_paymethod=db.Column(db.Integer,unique=False,nullable=False)
    # id_hours=db.Column(db.Integer,unique=False, nullable=False)
    # id_courts=db.Column(db.Integer,unique=False, nullable=False)
    
    admin_user=db.Column(db.String(120), unique=False, nullable=False)
    password=db.Column(db.String(80), unique=False, nullable=False)
    center_name=db.Column(db.String(120), unique=False, nullable=False)
    address=db.Column(db.String(120),unique=False, nullable=False)
    email = db.Column(db.String(120), unique=False, nullable=False)
    phone=db.Column(db.Integer, unique=False, nullable=False)
    webpage=db.Column(db.String(120), unique=False, nullable=False)
    image=db.Column(db.String(120),unique=False,nullable=False)

   
     #metodo de instancia %r lo sustituty por %self.id
    def __repr__(self):
        return '<NewCenter %r>' % self.id

    #metodo de instancia serializa el diccionario
    def serialize(self):
        return {
            "id": self.id,
            "admin_user": self.admin_user,
            "center_name": self.center_name,
            "address": self.address,
            "email": self.email,
            "phone": self.phone,
            "webpage": self.webpage
        }

    #metodo de instancia que obliga a que haya datos siempre que se llama       
    def __init__(self,admin_user,center_name,address):
        self.admin_user=admin_user
        self.center_name=center_name
        self.address=address

    #create register
    @classmethod
    def createRegister(cls, request_json):
        
        register=cls(request_json["admin_user"],request_json["center_name"],request_json["address"])
        register.body(request_json)
        return register
    
    #get body
    def body(self, request_json):
        self.admin_user=request_json["admin_user"]
        self.center_name=request_json["center_name"]
        self.address=request_json["address"]
        self.password=request_json["password"]
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