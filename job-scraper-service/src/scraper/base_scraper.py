import requests
from bs4 import BeautifulSoup
from db.models import JobPosting, Company
from datetime import datetime

class BaseScraper:
    def __init__(self, company_id, url):
        self.company_id = company_id
        self.url = url
    
    def fetch_page(self):
        headers = {'User-Agent': "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1"}
        response = requests.get(self.url, headers=headers)
        if response.status_code == 200:
            return response.text
        return None

    def parse_job(self, html):
        """Override this method in child classes to extract job data"""
        raise NotImplementedError

    def save_jobs(self, job_data):
        for job in job_data:
            new_job = JobPosting(
                company_id=self.company_id,
                title=job["title"],
                location=job["url"],
                posted_at=datetime.utcnow(),
                deadline=job["deadline"]
            )
            db.session.add(new_job)
        db.session.commit()
