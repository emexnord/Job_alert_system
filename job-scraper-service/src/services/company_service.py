from db.repository.company_repository import CompanyRepository
from sqlalchemy.exc import SQLAlchemyError

class CompanyService:
    @staticmethod
    def get_all_companies():
        companies = CompanyRepository.get_all()
        return [company.as_dict() for company in companies]

    @staticmethod
    def get_company_by_id(company_id):
        company = CompanyRepository.get_by_id(company_id)
        if company:
            return company.as_dict()
        return None

    @staticmethod
    def create_company(company_data):
        try:
            new_company = CompanyRepository.create(company_data)
            return new_company.as_dict()
        except SQLAlchemyError as e:
            return {'message': str(e)}

    @staticmethod
    def update_company(company_id, company_data):
        company = CompanyRepository.update_company(company_id, company_data)
        if company:
            return company.as_dict()
        return None

    @staticmethod
    def delete_company(company_id):
        company = CompanyRepository.delete_company(company_id)
        if company:
            return {'message': 'Company deleted'}
        return {'message': 'Company not found'}
