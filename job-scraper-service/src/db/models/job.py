import uuid
from db.database import db
from datetime import datetime


class JobPosting(db.Model):
    __tablename__ = "job_postings"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    company_id = db.Column(db.String(36), db.ForeignKey("companies.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255))
    url = db.Column(db.String(), unique=True, nullable=False)
    posted_at = db.Column(db.DateTime, default=datetime.now())
    deadline = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.now())

    company = db.relationship("Company", backref=db.backref("job_postings", lazy=True))
