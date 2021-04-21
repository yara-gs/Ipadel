"""empty message

Revision ID: 1fb65649930c
Revises: e84fa54804f7
Create Date: 2021-04-21 14:21:03.134857

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1fb65649930c'
down_revision = 'e84fa54804f7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sportcenter_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['sportcenter_id'], ['sportcenter.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('images')
    # ### end Alembic commands ###
