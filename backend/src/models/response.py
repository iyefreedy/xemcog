from src.extensions import db


class Response(db.Model):
    __tablename__ = 'responses'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    stimulus_id = db.Column(db.Integer, nullable=False)
    response = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now(), onupdate=db.func.now())

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "stimulus_id": self.stimulus_id,
            "response": self.response,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def __repr__(self):
        return '<Response %r>' % self.id
