  
import os
from flask_admin import Admin
from .models import db, User,Friend,SportCenter,Court,Image,Profile,Post,Comment,Like,PreBooking,Booking
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
  
    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User,db.session))
    admin.add_view(ModelView(Friend,db.session))

    admin.add_view(ModelView(Profile,db.session))
    admin.add_view(ModelView(Post,db.session))
    admin.add_view(ModelView(Comment,db.session))
    admin.add_view(ModelView(Like,db.session))

    admin.add_view(ModelView(SportCenter,db.session))
    admin.add_view(ModelView(Court,db.session))
    admin.add_view(ModelView(Image,db.session))
    admin.add_view(ModelView(Booking,db.session))
  
    admin.add_view(ModelView(PreBooking,db.session))
    

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))