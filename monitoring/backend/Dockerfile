FROM python:3.11-slim

WORKDIR /app

COPY req.txt req.txt

RUN pip install -r req.txt

COPY main.py .

EXPOSE 7070

CMD ["python", "main.py"]