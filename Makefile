.PHONY: test server

test:
	python manage.py test

server:
	python manage.py runserver

migrate:
	python manage.py migrate