"""empty message

Revision ID: 76bccfa112d6
Revises: 39b6a0522701
Create Date: 2021-04-09 16:38:09.375690

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '76bccfa112d6'
down_revision = '39b6a0522701'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('new_center', sa.Column('nif', sa.String(length=120), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('new_center', 'nif')
    # ### end Alembic commands ###