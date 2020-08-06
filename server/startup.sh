#!/bin/sh

exec gunicorn --bind 0.0.0.0:5000 wsgi:app --timeout 600