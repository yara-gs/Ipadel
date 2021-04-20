"""empty message

Revision ID: 39b6a0522701
Revises: aadc222754f2
Create Date: 2021-04-08 19:20:58.295017

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '39b6a0522701'
down_revision = 'aadc222754f2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('new_center_address_key', 'new_center', type_='unique')
    op.drop_constraint('new_center_admin_user_key', 'new_center', type_='unique')
    op.drop_constraint('new_center_center_name_key', 'new_center', type_='unique')
    op.drop_constraint('new_center_email_key', 'new_center', type_='unique')
    op.drop_constraint('new_center_phone_key', 'new_center', type_='unique')
    op.drop_constraint('new_center_webpage_key', 'new_center', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('new_center_webpage_key', 'new_center', ['webpage'])
    op.create_unique_constraint('new_center_phone_key', 'new_center', ['phone'])
    op.create_unique_constraint('new_center_email_key', 'new_center', ['email'])
    op.create_unique_constraint('new_center_center_name_key', 'new_center', ['center_name'])
    op.create_unique_constraint('new_center_admin_user_key', 'new_center', ['admin_user'])
    op.create_unique_constraint('new_center_address_key', 'new_center', ['address'])
    # ### end Alembic commands ###
