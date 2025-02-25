import sys
import os

sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src'))

from app import create_app
import pytest
from db.database import db
from db.models.company import Company  # Ensure this points to your SQLAlchemy database instance


@pytest.fixture
def app():
    """Create and configure a new app instance for each test."""
    app = create_app()
    app.config.update(
        TESTING=True,
        SQLALCHEMY_DATABASE_URI="sqlite:///:memory:",  # Use in-memory DB for tests
        SQLALCHEMY_TRACK_MODIFICATIONS=False
    )

    with app.app_context():
        db.create_all()  # Create tables before each test
        yield app  # This is where the test runs
        db.session.remove()
        db.drop_all()  # Teardown: Clean up database after test
    


@pytest.fixture
def client(app):
    """A test client for the app."""
    with app.test_client() as client:
        yield client

def test_get_companies(client):
    # Arrange: Create a company
    company = Company(name='Google', scraping_url='https://www.google.com')
    db.session.add(company)
    db.session.commit()

    # Act: Fetch companies
    response = client.get('/company')

    # Assert
    assert response.status_code == 200
    assert len(response.json) == 1
    assert response.json[0]['name'] == 'Google'
    assert response.json[0]['scraping_url'] == 'https://www.google.com'


def test_create_company(client):
    # Act: Create a company
    response = client.post('/company', json={'name': 'Google', 'scraping_url': 'https://www.google.com'})

    # Assert
    assert response.status_code == 201
    assert response.json['name'] == 'Google'
    assert response.json['scraping_url'] == 'https://www.google.com'


def test_get_company(client):
    # Arrange: Create a company
    company = Company(name='Google', scraping_url='https://www.google.com')
    db.session.add(company)
    db.session.commit()

    # Act: Fetch the created company
    response = client.get(f'/company/{company.id}')

    # Assert
    assert response.status_code == 200
    assert response.json['name'] == 'Google'
    assert response.json['scraping_url'] == 'https://www.google.com'


def test_update_company(client):
    # Arrange: Create a company
    company = Company(name='Google', scraping_url='https://www.google.com')
    db.session.add(company)
    db.session.commit()

    # Act: Update the company
    response = client.put(f'/company/{company.id}', json={'name': 'Google Updated', 'scraping_url': 'https://www.google.com'})

    # Assert
    assert response.status_code == 200
    assert response.json['name'] == 'Google Updated'


def test_delete_company(client):
    # Arrange: Create a company
    company = Company(name='Google', scraping_url='https://www.google.com')
    db.session.add(company)
    db.session.commit()
    company_id = company.id

    # Act: Delete the company
    response = client.delete(f'/company/{company_id}')

    # Assert
    assert response.status_code == 200
    assert response.json['message'] == 'Company deleted'

    # Verify that the company is indeed deleted
    deleted_company = db.session.get(Company, company_id)
    assert deleted_company is None
