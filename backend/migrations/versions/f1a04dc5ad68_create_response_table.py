"""create response table

Revision ID: f1a04dc5ad68
Revises: c9b26033c2c6
Create Date: 2024-07-21 15:40:50.747680

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f1a04dc5ad68'
down_revision = 'c9b26033c2c6'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'responses',
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("stimulus_id", sa.Integer(), nullable=False),
        sa.Column("user_input", sa.Text(), nullable=False),
        sa.Column("interpretation", sa.Text(), nullable=False),
        sa.Column("interpretation_image_path", sa.String(255), nullable=False),
        sa.Column("familiarity_rating", sa.Integer(), nullable=False),
        sa.Column("created_sentence", sa.Text(),  nullable=False),
        sa.Column("created_at", sa.DateTime(),
                  nullable=False, default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), nullable=False,
                  default=sa.func.now(), onupdate=sa.func.now()),
    )


def downgrade():
    pass
