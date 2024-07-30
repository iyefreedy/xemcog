from src.extensions import db


class Session(db.Model):
    __tablename__ = 'sessions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    session_number = db.Column(db.Integer())
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now(), onupdate=db.func.now())

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "session_number": self.session_number,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def __repr__(self):
        return '<Session %r>' % self.session_number
