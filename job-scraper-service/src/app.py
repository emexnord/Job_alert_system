from os import environ
from flask import Flask, request, jsonify, make_response
from db.database import db
from services import company_service
from scheduler import cronjob


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = environ.get(
        "DB_URL", "postgresql://postgres:postgres@localhost:5432/jobs_db"
    )

    db.init_app(app)  # Initialize database
    with app.app_context():
        # db.drop_all()
        db.create_all()

    @app.route("/company", methods=["GET"])
    def get_companies():
        try:
            companies = company_service.get_all_companies()
            cronjob.scrape_all()
            return make_response(jsonify(companies), 200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}), 500)

    @app.route("/company/<id>", methods=["GET"])
    def get_compay(id: str):
        try:
            company = company_service.get_company_by_id(id)
            return make_response(jsonify(company), 200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}), 500)

    @app.route("/company", methods=["POST"])
    def create_company():
        try:
            data = request.get_json()
            company = company_service.create_company(
                data["name"], data["scraping_url"], data["scraping_class_name"]
            )
            return make_response(jsonify(company), 201)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}), 500)

    @app.route("/company/<id>", methods=["PUT"])
    def update_company(id: str):
        try:
            data = request.get_json()
            company = company_service.update_company(id, data)
            return make_response(jsonify(company), 200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}), 500)

    @app.route("/company/<id>", methods=["DELETE"])
    def delete_company(id: str):
        try:
            company = company_service.delete_company(id)
            return make_response(jsonify(company), 200)
        except Exception as e:
            return make_response(jsonify({"message": str(e)}), 500)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
