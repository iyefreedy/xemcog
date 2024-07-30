"""empty message

Revision ID: be1ec7d51aa4
Revises: 
Create Date: 2024-07-30 14:46:49.425965

"""
from alembic import op
from sqlalchemy.sql import table, column
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'be1ec7d51aa4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('responses',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('session_id', sa.Integer(), nullable=False),
                    sa.Column('word', sa.String(50), nullable=False),
                    sa.Column('interpretation_image_path',
                              sa.String(100), nullable=False),
                    sa.Column('response_time',
                              sa.Integer(), nullable=False),
                    sa.Column('created_at', sa.DateTime(),
                              nullable=False, default=sa.func.now(), server_default=sa.func.now()),
                    sa.Column('updated_at', sa.DateTime(), nullable=True,
                              onupdate=sa.func.now(), server_onupdate=sa.func.now()),
                    sa.PrimaryKeyConstraint('id')
                    )

    op.create_table('sessions',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('session_number', sa.Integer(), nullable=True),
                    sa.Column('created_at', sa.DateTime(),
                              nullable=False, default=sa.func.now(), server_default=sa.func.now()),
                    sa.Column('updated_at', sa.DateTime(), nullable=True,
                              onupdate=sa.func.now(), server_onupdate=sa.func.now()),
                    sa.PrimaryKeyConstraint('id')
                    )

    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('fullname', sa.String(
                        length=80), nullable=False),
                    sa.Column('email', sa.String(length=120), nullable=False),
                    sa.Column('password_hash', sa.String(
                        length=255), nullable=False),
                    sa.Column('is_admin', sa.Boolean(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('updated_at', sa.DateTime(), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email')
                    )

    users_table = table('users', column('fullname', sa.String(length=80)), column('email', sa.String(length=120)), column('password_hash', sa.String(
        length=255)), column('is_admin', sa.Boolean()), column('created_at', sa.DateTime()), column('updated_at', sa.DateTime()))
    op.bulk_insert(users_table, [
        {"fullname": "Muhammad Quraisy", "email": "quraisy@uai.ac.id", "password_hash": "$2y$10$Fzlsc83JFj0qHYJv5FsiZ.qZbDMrNcho4a6OH4TZ24FrMzrcwKkWy",
            "is_admin": 1, "created_at": "2024-07-30 14:46:49.425965", "updated_at": "2024-07-30 14:46:49.425965"},
    ])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    op.drop_table('sessions')
    op.drop_table('responses')
    # ### end Alembic commands ###
