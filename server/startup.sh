#!/bin/sh

gunicorn --workers=1 --threads=1 --worker-class=gthread --worker-tmp-dir /dev/shm --log-file=- --bind 0.0.0.0:5000 wsgi:app --timeout 600
