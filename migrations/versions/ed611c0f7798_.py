"""empty message

Revision ID: ed611c0f7798
Revises: 72df9def3d8d
Create Date: 2021-06-02 12:50:01.099649

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ed611c0f7798'
down_revision = '72df9def3d8d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comment', sa.Column('user_url_image', sa.String(length=120), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('comment', 'user_url_image')
    # ### end Alembic commands ###
