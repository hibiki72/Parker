DOCKER_CMD := docker-compose
SERVER_CMD := ${DOCKER_CMD} exec trpc

#------------
# Main cmd
#------------

build:
	${DOCKER_CMD} build 

down:
	${DOCKER_CMD} down

stop:
	${DOCKER_CMD} stop

start:
	${DOCKER_CMD} start

up:
	${DOCKER_CMD} up -d --build

rm:
	${DOCKER_CMD} down --rmi all --volumes --remove-orphans

into_server:
	${SERVER_CMD} sh

migrate:
	${SERVER_CMD} npx prisma migrate dev --name init
