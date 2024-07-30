from src.extensions import db


class Response(db.Model):
    __tablename__ = 'responses'

    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.Integer, nullable=False)
    interpretation_image_path = db.Column(db.String(255), nullable=False)
    response_time = db.Column(db.Integer, nullable=False)
    word = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now(), onupdate=db.func.now())

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.session_id,
            "word": self.word,
            "response": self.response_time,
            "interpretation_image_path": self.interpretation_image_path,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def __repr__(self):
        return '<Response %r>' % self.id
