from src.extensions import db


class Stimuli(db.Model):
    __tablename__ = 'stimuli'

    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(80), nullable=False)
    affixed_word = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now())
    updated_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.now(), onupdate=db.func.now())

    def serialize(self):
        return {
            "id": self.id,
            "name": self.word
        }

    def __repr__(self):
        return '<Stimuli %r>' % self.word
