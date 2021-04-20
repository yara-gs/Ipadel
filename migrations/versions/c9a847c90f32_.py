"""empty message

Revision ID: c9a847c90f32
Revises: 3d5a350ae814
Create Date: 2021-04-11 11:35:13.380130

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c9a847c90f32'
down_revision = '3d5a350ae814'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('court', 'court_name',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
    op.alter_column('court', 'light',
               existing_type=sa.BOOLEAN(),
               nullable=True)
    op.drop_constraint('court_court_name_key', 'court', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('court_court_name_key', 'court', ['court_name'])
    op.alter_column('court', 'light',
               existing_type=sa.BOOLEAN(),
               nullable=False)
    op.alter_column('court', 'court_name',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
    # ### end Alembic commands ###
