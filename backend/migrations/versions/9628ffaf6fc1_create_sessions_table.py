"""create sessions table

Revision ID: 9628ffaf6fc1
Revises: f1a04dc5ad68
Create Date: 2024-07-21 15:45:01.780717

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9628ffaf6fc1'
down_revision = 'f1a04dc5ad68'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'sessions',
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("session_number", sa.Integer()),
        sa.Column("start_time", sa.DateTime(), nullable=False),
        sa.Column("end_time", sa.DateTime(), nullable=False),
        sa.Column("created_at", sa.DateTime(),
                  nullable=False, default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), nullable=False,
                  default=sa.func.now(), onupdate=sa.func.now()),
    )


def downgrade():
    pass
