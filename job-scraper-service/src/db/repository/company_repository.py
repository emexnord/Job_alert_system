from sqlalchemy.orm import Session
from src.db.models.company import Company

class CompanyRepository:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    def get_company_by_id(self, company_id: int) -> Company:
        return self.db_session.query(Company).filter(Company.id == company_id).first()

    def get_all_companies(self) -> list[Company]:
        return self.db_session.query(Company).all()

    def add_company(self, company: Company) -> Company:
        self.db_session.add(company)
        self.db_session.commit()
        self.db_session.refresh(company)
        return company

    def update_company(self, company: Company) -> Company:
        self.db_session.merge(company)
        self.db_session.commit()
        return company

    def delete_company(self, company_id: int) -> None:
        company = self.get_company_by_id(company_id)
        if company:
            self.db_session.delete(company)
            self.db_session.commit()