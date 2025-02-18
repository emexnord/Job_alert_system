from scraper.base_scraper import BaseScraper
from bs4 import BeautifulSoup

class BloombergScraper(BaseScraper):
    def parse_job(self, html):
        soup = BeautifulSoup(html, 'html5lib')
        job_list = []

        for job_element in soup.find_all('div', class_='job-card'):
            job = {
                'title': job_element.find('h2').text.strip(),
                'location': job_element.find('span', class_='location').text.strip(),
                'url': job_element.find('a')['href'],
                'deadline': None
            }

            job_list.append(job)
        
        return job_list