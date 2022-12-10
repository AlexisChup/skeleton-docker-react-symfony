default: init

init:
	docker-compose build

run:
	docker-compose up -d

stop:
	docker-compose down