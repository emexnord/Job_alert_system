from web_scraper.google import GoogleScraper
from web_scraper.bloomberg import BloombergScraper


def get_scraper(scraper_class, company_id, url):
    if scraper_class == "bloomberg":
        return BloombergScraper(company_id, url)
    if scraper_class == "googl":
        return GoogleScraper(company_id, url)

    # if scraper_class == "other":
    #     return OtherScraper(company_id, url)
    raise ValueError(f"Unknown scraper type: s{scraper_class}")
