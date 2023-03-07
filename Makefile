NAME = transcendence

R = \033[0;31m
G = \033[0;32m
B = \033[0;34m
E = \033[0m

ECHO		 = echo
#ECHO		 = echo -e
DOCKER       = docker
COMPOSE      = docker compose
#COMPOSE      = docker-compose
COMPOSE_FILE = ./src/docker-compose.yml
PUB_IP := ${shell curl ipecho.net/plain}

.PHONY: up down restart clean re ps

up :
	@ ${ECHO} "${G} =>  reset ssh host info...${E}"
	@ ${ECHO} "" > ${HOME}/.ssh/known_hosts
	@ ${ECHO} "${B} public IP is [${PUB_IP}]${E}"
#	@ ${ECHO} "PUBLIC_IP=${PUB_IP}" >> src/.env
	@ ${COMPOSE} -f $(COMPOSE_FILE) -p $(NAME) build
	@ ${ECHO} "$(G) =>  build done $(E)";
	@ ${DOCKER} image ls
	@ ${COMPOSE} -f $(COMPOSE_FILE) -p $(NAME) up -d
	@ ${ECHO} "$(G) =>  services ready$(E)"
	@ ${COMPOSE} -f $(COMPOSE_FILE) -p $(NAME) ps
down:
	@ ${COMPOSE} -f $(COMPOSE_FILE) -p $(NAME) down --remove-orphans --rmi local

restart: down up

clean: down
	@ ${DOCKER} system prune -af > /dev/null
	@ ${ECHO} -e "  ${R}=> all service contents deleted${E}"

re: clean up

ps:
	@ ${COMPOSE} -f $(COMPOSE_FILE) -p $(NAME) ps
