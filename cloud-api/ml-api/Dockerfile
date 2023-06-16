# Pull base image
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install dependencies
COPY ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

# Copy project
COPY . /app/

ENV PYTHONUNBUFFERED=1

ENV HOST 0.0.0.0

EXPOSE 8000

CMD ["python", "main.py"]