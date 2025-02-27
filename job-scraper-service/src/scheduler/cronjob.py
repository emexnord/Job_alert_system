import schedule
import time
from web_scraper import scraper_factory
from services import company_service


def scrape_all():
    companies = company_service.get_all_companies()
    successful_scrapes = []
    failed_scrapes = []

    for company in companies:
        try:
            scraper = scraper_factory.get_scraper(
                company["scraping_class_name"], company["id"], company["scraping_url"]
            )
            html = scraper.fetch_page()

            if html:
                jobs = scraper.parse_jobs(html)
                created_count = scraper.save_jobs(jobs)
                scraper.stream_jobs_data(jobs)
                successful_scrapes.append(company["name"])
                print(f"Scraped {created_count} jobs from {company['name']}")
            else:
                failed_scrapes.append(company["name"])
        except Exception as e:
            failed_scrapes.append(company["name"])
            print(f"Error scraping {company['name']}: {e}")

    print("Successful scrapes:", successful_scrapes)
    print("Failed scrapes:", failed_scrapes)


# Run scraper every 6 hours
schedule.every(6).hours.do(scrape_all)

if __name__ == "__main__":
    while True:
        schedule.run_pending()
        time.sleep(1)
