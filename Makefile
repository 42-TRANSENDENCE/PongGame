NAME = pong
R = \033[0;31m
G = \033[0;32m
B = \033[0;34m
E = \033[0m

UNAME_S = ${shell uname -s}

DOCKER = docker
DOCKER_COMP = docker-compose
COMPOSE = ./src/docker-compose.yml

.PHONY: up down restart clean re

up :
	@ echo -e "${G} =>  reset ssh host info${E}"
	@ echo -e "" > ${HOME}/.ssh/known_hosts
	@ echo -e "${G} =>  building base image ${E}"
	@ ${DOCKER} build -t node_base:v1 ./src
	@ ${DOCKER_COMP} -f $(COMPOSE) -p $(NAME) build
	@ echo -e "$(G) =>  build done $(E)";
	@ ${DOCKER} image ls
	@ ${DOCKER_COMP} -f $(COMPOSE) -p $(NAME) up -d
	@ echo -e "$(G) =>  services ready$(E)"
	@ ${DOCKER_COMP} -f $(COMPOSE) -p $(NAME) ps
down:
	@ ${DOCKER_COMP} -f $(COMPOSE) -p $(NAME) down --remove-orphans --rmi local

restart: down up

clean: down
	@ ${DOCKER} system prune -af > /dev/null
	@ echo -e "  ${R}=> all service contents deleted${E}"
re: clean up

