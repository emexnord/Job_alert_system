import schedule
import time
from scraper.bloomberg import BloombergScraper
from db.database import db, Company
from db.repository.company_repository import CompanyRepository

def scrape_all():
    companies = CompanyRepository.get_all_companies()
    for company in companies:
        scraper = BloombergScraper(company.id, company.scraping_url)
        html = scraper.fetch_page()
        if html:
            jobs = scraper.parse_jobs(html)
            scraper.save_jobs(jobs)
            print(f"Scraped {len(jobs)} jobs from {company.name}")

# Run scraper every 6 hours
schedule.every(6).hours.do(scrape_all)

if __name__ == "__main__":
    while True:
        schedule.run_pending()
        time.sleep(1)
