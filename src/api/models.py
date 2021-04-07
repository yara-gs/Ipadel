from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

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
    def log_user(cls, username, password):
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