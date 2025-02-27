import requests
from db.models.job import JobPosting
from db.database import db
from kafka_producer.producer import stream_jobs_data


class BaseScraper:
    def __init__(self, company_id, url):
        self.company_id = company_id
        self.url = url

    def fetch_page(self):
        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1"
        }
        response = requests.get(self.url, headers=headers)
        if response.status_code == 200:
            return response.text
        return None

    def parse_jobs(self, html):
        """Override this method in child classes to extract job data"""
        raise NotImplementedError

    def stream_jobs_data(self, jobs):
        stream_jobs_data(jobs)

    def save_jobs(self, job_data):
        created_count = 0
        for job in job_data:
            try:
                new_job = JobPosting(
                    company_id=self.company_id,
                    title=job["title"],
                    url=job["url"],
                    location=job["location"],
                    deadline=job["deadline"],
                )
                db.session.add(new_job)
                db.session.commit()
                created_count += 1
            except Exception as e:
                if "(psycopg2.errors.UniqueViolation)" in str(e):
                    print(f"Duplicate URL found: {job['url']}")
                else:
                    print(f"An error occurred: {e}")
                db.session.rollback()
        return created_count
