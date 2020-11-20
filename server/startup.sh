#!/bin/sh

//gunicorn --workers=2 --threads=4 --worker-class=gthread --worker-tmp-dir /dev/shm --log-file=- --bind 0.0.0.0:5000 wsgi:app --timeout 600
python app.py
