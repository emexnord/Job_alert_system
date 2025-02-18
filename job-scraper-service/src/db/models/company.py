from db.database import db
from datetime import datetime

class Company(db.Model):
    __tablename__ = "companies"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    scraping_url = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "scraping_url": self.scraping_url,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
