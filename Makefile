default: build

build:
	docker-compose build

run:
	docker-compose up -d

runbuild:
	docker-compose up -d --build

stop:
	docker-compose down