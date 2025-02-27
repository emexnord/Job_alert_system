from db.database import db
from db.models.job import JobPosting

class JobRepository:
    def __init__(self):
        self.db_session = db.session()

    @staticmethod
    def get_all_jobs(self):
        return self.db_session.query(JobPosting).all()

    def get_job_by_id(self, job_id: int):
        return self.db_session.get(JobPosting, job_id)

    def create_job(self, job: JobPosting):
        self.db_session.add(job)
        self.db_session.commit()
        self.db_session.refresh(job)
        return job

    def update_job(self, job_id: int, updated_job: JobPosting):
        job = self.db_session.get(JobPosting, job_id)
        if job:
            self.db_session.merge(updated_job)
            self.db_session.commit()
            self.db_session.refresh(job)
        return job

    def delete_job(self, job_id: int):
        job = self.db_session.get(JobPosting, job_id)
        if job:
            self.db_session.delete(job)
            self.db_session.commit()
        return job
