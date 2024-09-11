FROM ubuntu:22.04


ENV DEBIAN_FRONTEND=noninteractive


RUN apt-get update && \
    apt-get install -y python3 python3-pip

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt


RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt


COPY . /app

# RUN alembic upgrade head

CMD ["fastapi", "run", "/app/main.py", "--port", "80"]
