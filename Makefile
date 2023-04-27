NAME = transcendence

R = \033[0;31m
G = \033[0;32m
B = \033[0;34m
E = \033[0m

ECHO		 = echo
#DOCKER       = sudo docker
DOCKER       = docker
#COMPOSE      = sudo docker compose
COMPOSE      = docker compose
COMPOSE_FILE = ./docker-compose.yml

.PHONY: up down restart clean re ps

up :
	@ ${ECHO} "${G} =>  reset ssh host info...${E}"
	@ ${ECHO} "" > ${HOME}/.ssh/known_hosts
	@ ${COMPOSE} -f $(COMPOSE_FILE) -p $(NAME) build
	@ ${ECHO} "$(G) =>  build done $(E)";
	@ ${DOCKER} image ls
	@ ${COMPOSE} -f $(COMPOSE_FILE) -p $(NAME) up
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
