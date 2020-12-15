#!/bin/sh

gunicorn --workers=2 --worker-class=sync --worker-tmp-dir /dev/shm --log-file=- --bind 0.0.0.0:5000 wsgi:app --timeout 600
