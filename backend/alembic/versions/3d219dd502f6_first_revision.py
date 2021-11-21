"""first revision

Revision ID: 3d219dd502f6
Revises: 
Create Date: 2021-11-20 08:22:12.560266

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3d219dd502f6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'content',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('passage', sa.String()),
        sa.Column('question', sa.String()),
        sa.Column('answerA', sa.String()),
        sa.Column('answerB', sa.String()),
        sa.Column('answerC', sa.String()),
        sa.Column('answerD', sa.String()),
        sa.PrimaryKeyConstraint('id'),
    )

    op.create_table(
        'history',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.String(), nullable=False),
        sa.Column('content_id', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_history_user_id'), 'history', ['user_id'])


def downgrade():
    op.drop_index(op.f('ix_history_user_id'), 'history')
    op.drop_table('history')
    op.drop_table('content')
