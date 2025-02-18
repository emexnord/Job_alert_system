from flask import Flask
from config import Config
from db.database import db
# from api.controllers.company_controller import company_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)  # Load configuration

    db.init_app(app)  # Initialize database

    # Register Blueprints (API routes)
    # app.register_blueprint(company_bp, url_prefix="/api/companies")

    return app

if __name__ == "__app__":
    app = create_app()
    app.run(debug=True)

