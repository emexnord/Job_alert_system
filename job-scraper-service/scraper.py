import csv
import requests
from bs4 import BeautifulSoup


def scrape_news():
    headers = {'User-Agent': "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1"}
    URL = 'https://www.passiton.com/inspirational-quotes'
    # Here the user agent is for Edge browser on windows 10. You can find your browser user agent from the above given link.
    r = requests.get(url=URL, headers=headers)

    soup = BeautifulSoup(r.content, 'html5lib')
    quotes=[]  # a list to store quotes
 
    table = soup.find('div', attrs = {'id':'all_quotes'}) 

    for row in table.findAll('div',
                         attrs = {'class':'col-6 col-lg-3 text-center margin-30px-bottom sm-margin-30px-top'}):
        quote = {}
        quote['theme'] = row.h5.text
        quote['url'] = row.a['href']
        quote['img'] = row.img['src']
        quote['lines'] = row.img['alt'].split('#')[0]
        quote['author'] = row.img['alt'].split('#')[1]
        quotes.append(quote)


    filename = 'inspirational_quotes.csv'
    with open(filename, 'w', newline='') as f:
        w = csv.DictWriter(f,['theme','url','img','lines','author'])
        w.writeheader()
        for quote in quotes:
            w.writerow(quote)