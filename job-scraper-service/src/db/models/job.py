from db.database import db
from datetime import datetime


class JobPosting(db.Model):
    __tablename__ = "job_postings"

    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey("companies.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255))
    url = db.Column(db.String(), unique=True, nullable=False)
    posted_at = db.Column(db.DateTime, default=datetime.utcnow)
    deadline = db.Column(db.DateTime)

    company = db.relationship("Company", backref=db.backref("job_postings", lazy=True))
