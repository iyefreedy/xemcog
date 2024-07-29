import bcrypt
from src.extensions import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column("password_hash", db.String(255), nullable=False)
    is_admin = db.Column("is_admin", db.Boolean(),
                         nullable=False, default=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now(), onupdate=db.func.now())

    def check_password(self, password: str):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

    def serialize(self):
        return {
            "id": self.id,
            "fullname": self.fullname,
            "email": self.email,
            "is_admin": self.is_admin
        }

    def __repr__(self):
        return '<User %r>' % self.fullname

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, raw_password: str):
        self._password_hash = bcrypt.hashpw(raw_password.encode(
            'utf-8'), bcrypt.gensalt()).decode('utf-8')
