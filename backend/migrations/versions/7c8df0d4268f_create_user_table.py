"""create user table

Revision ID: 7c8df0d4268f
Revises: 
Create Date: 2024-07-21 13:38:58.917656

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7c8df0d4268f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'users',
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("fullname", sa.String(80),  nullable=False),
        sa.Column("email", sa.String(120), unique=True, nullable=False),
        sa.Column("password_hash", sa.String(255), nullable=False),
        sa.Column("is_admin", sa.Boolean(), nullable=False, default=False),
        sa.Column("created_at", sa.DateTime(),
                  nullable=False, default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), nullable=False,
                  default=sa.func.now(), onupdate=sa.func.now()),
    )


def downgrade():
    op.drop_table('users')
