from src.extensions import db


class Session(db.Model):
    __tablename__ = 'sessions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    session_number = db.Column(db.Integer())
    start_time = db.Column(db.DateTime(), nullable=False)
    end_time = db.Column(db.DateTime(), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now(), onupdate=db.func.now())

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "session_number": self.session_number,
            "start_time": self.start_time,
            "end_time": self.end_time
        }

    def __repr__(self):
        return '<Session %r>' % self.session_number
