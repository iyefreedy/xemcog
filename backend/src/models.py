import bcrypt
from src.extensions import db


class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column("password_hash", db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)
    stimuli_word = db.Column(db.String(30), nullable=True)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now(), onupdate=db.func.now())

    experiments = db.relationship("Experiment", backref="user", lazy=True)

    def check_password(self, password: str):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

    def serialize(self):
        return {
            "user_id": self.user_id,
            "fullname": self.fullname,
            "email": self.email,
            "is_admin": self.is_admin,
            "stimuli_word": self.stimuli_word
        }

    def __repr__(self):
        return '<User %r>' % self.user_id

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, raw_password: str):
        self._password_hash = bcrypt.hashpw(raw_password.encode(
            'utf-8'), bcrypt.gensalt()).decode('utf-8')


class Experiment(db.Model):
    __tablename__ = 'experiments'

    experiment_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey('users.user_id'))
    start_time = db.Column(db.DateTime(), nullable=False,
                           server_default=db.func.now())
    end_time = db.Column(db.DateTime(), nullable=True)

    sessions = db.relationship("Session", backref="experiment", lazy=True)

    def serialize(self):
        return {
            "experiment_id": self.experiment_id,
            "user_id": self.user_id,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "user": self.user.serialize(),
            "sessions": [session.serialize() for session in self.sessions]
        }

    def __repr__(self):
        return '<Experiment %r>' % self.experiment_id


class Session(db.Model):
    __tablename__ = 'sessions'

    session_id = db.Column(db.Integer, primary_key=True)
    experiment_id = db.Column(db.ForeignKey('experiments.experiment_id'))
    word = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.DateTime(), nullable=False,
                           server_default=db.func.now())
    end_time = db.Column(db.DateTime(), nullable=True)

    drawing = db.relationship(
        "Drawing", backref="session", lazy=True, uselist=False)
    rating = db.relationship(
        "Rating", backref="session", lazy=True, uselist=False)

    def serialize(self):
        return {
            "session_id": self.session_id,
            "experiment_id": self.experiment_id,
            "word": self.word,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "drawing": self.drawing.serialize() if self.drawing else None,
            "rating": self.rating.serialize() if self.rating else None
        }

    def __repr__(self):
        return '<Session %r>' % self.session_id


class Drawing(db.Model):
    __tablename__ = 'drawings'

    drawing_id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.ForeignKey('sessions.session_id'))
    image_path = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=db.func.now())

    def serialize(self):
        return {
            "drawing_id": self.drawing_id,
            "session_id": self.session_id,
            "image_path": self.image_path,
            "created_at": self.created_at,
        }

    def __repr__(self):
        return '<Session %r>' % self.drawing_id


class Rating(db.Model):
    __tablename__ = 'ratings'

    rating_id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.ForeignKey('sessions.session_id'))
    rate = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=db.func.now())

    def serialize(self):
        return {
            "rating_id": self.rating_id,
            "session_id": self.session_id,
            "rate": self.rate,
            "created_at": self.created_at
        }

    def __repr__(self):
        return '<Session %r>' % self.rating_id
