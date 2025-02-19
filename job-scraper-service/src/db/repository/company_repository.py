from db.models.company import Company
from db.database import db

class CompanyRepository:
    def __init__(self):
        self.db_session = db.session()

    def get_company_by_id(self, company_id: str) -> Company:
        return self.db_session.query(Company).filter(Company.id == company_id).first()

    def get_all_companies(self) -> list[Company]:
        return self.db_session.query(Company).all()

    def add_company(self, company: Company) -> Company:
        try:
            self.db_session.add(company)
            self.db_session.commit()
            self.db_session.refresh(company)
            return company
        except Exception as e:
            self.db_session.rollback()
            raise RuntimeError(f"Error adding company: {e}")

    def update_company(self, company: Company) -> Company:
        try:
            self.db_session.merge(company)
            self.db_session.commit()
            return company
        except Exception as e:
            self.db_session.rollback()
            raise RuntimeError(f"Error updating company: {e}")

    def delete_company(self, company_id: str) -> bool:
        company = self.get_company_by_id(company_id)
        if company:
            self.db_session.delete(company)
            self.db_session.commit()
            return True
        return False