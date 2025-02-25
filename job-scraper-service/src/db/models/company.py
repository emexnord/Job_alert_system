from db.database import db
from datetime import datetime
import uuid

class Company(db.Model):
    __tablename__ = "companies"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(120), unique=True, nullable=False)
    scraping_url = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())


    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "scraping_url": self.scraping_url,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }