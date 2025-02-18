from sqlalchemy.orm import Session
from db.database import db
from db.models.job import JobPosting

class JobRepository:
    @staticmethod
    def get_all_jobs():
        with Session(db) as session:
            return session.query(JobPosting).all()

    @staticmethod
    def get_job_by_id(job_id: int):
        with Session(db) as session:
            return session.query(JobPosting).filter(JobPosting.id == job_id).first()

    @staticmethod
    def create_job(job: JobPosting):
        with Session(db) as session:
            session.add(job)
            session.commit()
            session.refresh(job)
            return job

    @staticmethod
    def update_job(job_id: int, updated_job: JobPosting):
        with Session(db) as session:
            job = session.query(JobPosting).filter(JobPosting.id == job_id).first()
            if job:
                job.title = updated_job.title
                job.description = updated_job.description
                job.company = updated_job.company
                job.location = updated_job.location
                session.commit()
                session.refresh(job)
            return job

    @staticmethod
    def delete_job(job_id: int):
        with Session(db) as session:
            job = session.query(JobPosting).filter(JobPosting.id == job_id).first()
            if job:
                session.delete(job)
                session.commit()
            return job