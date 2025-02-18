import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DB_URL", "postgresql://user:password@localhost/job_alerts")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
