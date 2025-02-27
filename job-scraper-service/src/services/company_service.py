from db.repository.company_repository import CompanyRepository
from sqlalchemy.exc import SQLAlchemyError
from db.models.company import Company

def get_all_companies():
    repo = CompanyRepository()
    companies = repo.get_all_companies()
    return [company.json() for company in companies]

def get_company_by_id(company_id: str):
    repo = CompanyRepository()
    company = repo.get_company_by_id(company_id)
    if company:
        return company.json()
    return None

def create_company(name: str, scraping_url: str, scraping_class_name: str):
    repo = CompanyRepository()
    company = Company(name=name, scraping_url=scraping_url, scraping_class_name=scraping_class_name)
    try:
        new_company = repo.add_company(company)
        return new_company.json()
    except SQLAlchemyError as e:
        return {'message': str(e)}

def update_company(company_id: str, company_data):
    repo = CompanyRepository()
    company = repo.get_company_by_id(company_id)
    if not company:
        return {'message': 'Company not found'}
    
    for key, value in company_data.items():
        setattr(company, key, value)
    
    try:
        updated_company = repo.update_company(company)
        return updated_company.json()
    except SQLAlchemyError as e:
        return {'message': str(e)}

def delete_company(company_id):
    repo = CompanyRepository()
    company = repo.delete_company(company_id)
    if company:
        return {'message': 'Company deleted'}
    return {'message': 'Company not found'}
