FROM python:3.11-slim-buster

WORKDIR /app

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

EXPOSE 4000

# CMD [ "flask", "run", "--host=0.0.0.0", "--port=4000"]
# CMD ["python3", "scheduler/job_scheduler.py"]
CMD ["python3", "src/app.py"]
