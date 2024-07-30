FROM --platform=linux/amd64 python:3.12-slim

WORKDIR /app

COPY ./src /app/src
COPY ./app.py /app/
COPY ./requirements.txt /app/

RUN pip install -r requirements.txt

EXPOSE 8080

CMD [ "gunicorn", "-b", "0.0.0.0:5000", "app:app" ]