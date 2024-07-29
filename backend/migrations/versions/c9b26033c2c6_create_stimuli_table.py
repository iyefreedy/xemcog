"""create stimuli table

Revision ID: c9b26033c2c6
Revises: 7c8df0d4268f
Create Date: 2024-07-21 15:38:12.317193

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c9b26033c2c6'
down_revision = '7c8df0d4268f'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'stimuli',
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("word", sa.String(80),  nullable=False),
        sa.Column("affixed_word", sa.String(80),  nullable=False),
        sa.Column("created_at", sa.DateTime(),
                  nullable=False, default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), nullable=False,
                  default=sa.func.now(), onupdate=sa.func.now()),
    )


def downgrade():
    op.drop_table(
        'stimuli'
    )
