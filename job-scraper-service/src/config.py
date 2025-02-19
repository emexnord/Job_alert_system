import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DB_URL", "postgresql://postgres:postgres@flask_db:5432/jobs_db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
