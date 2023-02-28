NAME = pong
R = \033[0;31m
G = \033[0;32m
B = \033[0;34m
E = \033[0m

UNAME_S = ${shell uname -s}

ifeq (${UNAME_S},Linux)
	DOCKER = sudo docker
else
	DOCKER = docker
endif

COMPOSE = ./src/docker-compose.yml

.PHONY: up down restart clean re

up :
	@ echo "${G} =>  reset ssh host info${E}"
	@ echo  "" > ${HOME}/.ssh/known_hosts
	@ echo "${G} =>  building base image ${E}"
	@ ${DOCKER} build -t node_base:v1 ./src
	@ ${DOCKER} compose -f $(COMPOSE) -p $(NAME) build
	@ echo "$(G) =>  build done $(E)";
	@ ${DOCKER} image ls
	@ ${DOCKER} compose -f $(COMPOSE) -p $(NAME) up -d
	@ echo "$(G) =>  services ready$(E)"
	@ ${DOCKER} compose -f $(COMPOSE) -p $(NAME) ps
down:
	@ ${DOCKER} compose -f $(COMPOSE) -p $(NAME) down --remove-orphans --rmi local

restart: down up

clean: down
	@ ${DOCKER} system prune -af > /dev/null
	@ echo "  ${R}=> all service contents deleted${E}"
re: clean up

