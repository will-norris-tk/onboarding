.PHONY: test server

test:
	python manage.py test

server: migrate
	python manage.py runserver 0.0.0.0:8000

migrate:
	python manage.py migrate
