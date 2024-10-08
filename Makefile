lock:
	pip-compile --generate-hashes --no-emit-index-url --allow-unsafe
	pip-compile --generate-hashes --no-emit-index-url --allow-unsafe requirements_dev.in

install-dev:
	pip-sync requirements.txt requirements_dev.txt --pip-args '--no-deps'

migrate:
	alembic --config ./alembic/alembic.ini upgrade head

makemigrations:
	alembic --config ./alembic/alembic.ini revision --autogenerate
