"""empty message

Revision ID: 4ffed999e1f9
Revises: 2fe4e7a0a272
Create Date: 2021-05-22 19:49:37.677825

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4ffed999e1f9'
down_revision = '2fe4e7a0a272'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('post', sa.Column('username', sa.String(length=120), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('post', 'username')
    # ### end Alembic commands ###