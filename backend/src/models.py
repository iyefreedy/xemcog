import bcrypt
from datetime import datetime
from src.extensions import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column("password_hash", db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now(), onupdate=db.func.now())

    experiments = db.relationship("Experiment", backref="user", lazy=True)
    stimulis = db.relationship("Stimuli", backref="user", lazy=True)

    def check_password(self, password: str):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

    def serialize(self):
        return {
            "id": self.id,
            "fullname": self.fullname,
            "email": self.email,
            "is_admin": self.is_admin,
            "stimulis": [stimuli.serialize() for stimuli in self.stimulis]
        }

    def __repr__(self):
        return '<User %r>' % self.id

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, raw_password: str):
        self._password_hash = bcrypt.hashpw(raw_password.encode(
            'utf-8'), bcrypt.gensalt()).decode('utf-8')


class Stimuli(db.Model):
    __tablename__ = 'stimulis'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey('users.id'))
    word = db.Column(db.String(50), nullable=False)
    grammatical = db.Column(db.String(59), nullable=False)
    round = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "word": self.word,
            "grammatical": self.grammatical,
            "round": self.round
        }


class Experiment(db.Model):
    __tablename__ = 'experiments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey('users.id'))
    start_time = db.Column(db.DateTime(), nullable=False,
                           server_default=db.func.now())
    end_time = db.Column(db.DateTime(), nullable=True)

    sessions = db.relationship("Session", backref="experiment", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "user": self.user.serialize(),
            "sessions": [session.serialize() for session in self.sessions]
        }

    def __repr__(self):
        return '<Experiment %r>' % self.id


class Session(db.Model):
    __tablename__ = 'sessions'

    id = db.Column(db.Integer, primary_key=True)
    experiment_id = db.Column(db.ForeignKey('experiments.id'))
    stimuli_id = db.Column(db.ForeignKey('stimulis.id'))
    start_time = db.Column(db.DateTime(), nullable=False,
                           default=datetime.now())
    end_time = db.Column(db.DateTime(), nullable=True)

    drawing = db.relationship(
        "Drawing", backref="session", lazy=True, uselist=False)
    rating = db.relationship(
        "Rating", backref="session", lazy=True, uselist=False)
    input = db.relationship("Input", backref="session", uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "experiment_id": self.experiment_id,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "drawing": self.drawing.serialize() if self.drawing else None,
            "rating": self.rating.serialize() if self.rating else None
        }

    def __repr__(self):
        return '<Session %r>' % self.id


class Input(db.Model):
    __tablename__ = 'inputs'

    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.ForeignKey('sessions.id'))
    inputted_word = db.Column(db.String(50), nullable=False)
    start_time = db.Column(db.DateTime(), nullable=False,
                           default=datetime.now())
    end_time = db.Column(db.DateTime(), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "session_id": self.session_id,
            "inputted_word": self.inputted_word,
            "start_time": self.start_time,
            "end_time": self.end_time
        }


class Drawing(db.Model):
    __tablename__ = 'drawings'

    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.ForeignKey('sessions.id'))
    image_path = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.DateTime(), nullable=False,
                           default=datetime.now())
    end_time = db.Column(db.DateTime(), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "session_id": self.session_id,
            "image_path": self.image_path,
            "start_time": self.start_time,
            "end_time": self.end_time
        }

    def __repr__(self):
        return '<Session %r>' % self.id


class Rating(db.Model):
    __tablename__ = 'ratings'

    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.ForeignKey('sessions.id'))
    rate = db.Column(db.Integer, nullable=False)
    start_time = db.Column(db.DateTime(), nullable=False,
                           default=datetime.now())
    end_time = db.Column(db.DateTime(), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "session_id": self.session_id,
            "rate": self.rate,
            "created_at": self.start_time
        }

    def __repr__(self):
        return '<Session %r>' % self.id


class Sentence(db.Model):
    __tablename__ = 'sentences'

    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.ForeignKey('sessions.id'))
    inputted_sentence = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.DateTime(), nullable=False,
                           default=datetime.now())
    end_time = db.Column(db.DateTime(), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "session_id": self.session_id,
            "inputted_sentence": self.inputted_sentence,
            "start_time": self.start_time,
            "end_time": self.end_time
        }
