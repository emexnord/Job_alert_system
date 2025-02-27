from web_scraper.base_scraper import BaseScraper
from bs4 import BeautifulSoup


class GoogleScraper(BaseScraper):
    def parse_jobs(self, html):
        soup = BeautifulSoup(html, "html5lib")
        job_list = []

        for job_element in soup.find_all("div", class_="sMn82b"):
            title = job_element.find(
                "h3", class_="article__header__text__title"
            ).text.strip()
            location = job_element.find(
                "span", class_="list-item-location"
            ).text.strip()
            url = job_element.find("a")["href"]
            deadline = None

            job = {
                "title": title,
                "location": location,
                "url": url,
                "deadline": deadline,
            }

            job_list.append(job)

        return job_list
