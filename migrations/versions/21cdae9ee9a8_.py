"""empty message

Revision ID: 21cdae9ee9a8
Revises: feee90c7670f
Create Date: 2021-04-09 18:19:25.925884

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '21cdae9ee9a8'
down_revision = 'feee90c7670f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('new_center', 'cp',
               existing_type=sa.INTEGER(),
               nullable=-1)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('new_center', 'cp',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###