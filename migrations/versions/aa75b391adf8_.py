"""empty message

Revision ID: aa75b391adf8
Revises: 948aa233c50f
Create Date: 2021-04-29 19:40:40.902094

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aa75b391adf8'
down_revision = '948aa233c50f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('like', sa.Column('user_like', sa.String(length=120), nullable=False))
    op.drop_column('like', 'like')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('like', sa.Column('like', sa.BOOLEAN(), autoincrement=False, nullable=False))
    op.drop_column('like', 'user_like')
    # ### end Alembic commands ###