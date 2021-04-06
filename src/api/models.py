from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

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



#Register New Sport Center
class NewCenter(db.model):
    id=db.Colum(db.Integer, primary_key=True)
    id_paymethod=db.Column(db.Integer,unique=False,nullable=False)
    id_hours=db.Colum(db.Integer,unique=False, nullable=False))
    id_courts=db.Column(db.Integer,unique=False, nullable=False))
    
    admin_user=db.Column(db.String(120), unique=True, nullable=False)
    password=db.Column(db.String(80), unique=False, nullable=False)
    center_name=db.Column(db.String(120), unique=True, nullable=False)
    address=db.Colum(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone=db.Colum(db.Integer, unique=True, nullable=False)
    webpage=db.Column(db.String(120), unique=True, nullable=False))
    image=db.Column(db.String(120),unique=False,nullable=False))

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

