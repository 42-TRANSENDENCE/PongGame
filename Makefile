NAME = transcendence

R = \033[0;31m
G = \033[0;32m
B = \033[0;34m
E = \033[0m

DOCKER       = docker
COMPOSE      = docker-compose
COMPOSE_FILE = ./src/docker-compose.yml

.PHONY: up down restart clean re ps

up :
	@ echo -e "${G} =>  reset ssh host info${E}"
	@ echo -e "" > ${HOME}/.ssh/known_hosts
	@ ${COMPOSE} -f $(COMPOSE_FILE) -p $(NAME) build
	@ echo -e "$(G) =>  build done $(E)";
	@ ${DOCKER} image ls
	@ ${COMPOSE} -f $(COMPOSE_FILE) -p $(NAME) up -d
	@ echo -e "$(G) =>  services ready$(E)"
	@ ${COMPOSE} -f $(COMPOSE_FILE) -p $(NAME) ps
down:
	@ ${COMPOSE} -f $(COMPOSE_FILE) -p $(NAME) down --remove-orphans --rmi local

restart: down up

clean: down
	@ ${DOCKER} system prune -af > /dev/null
	@ echo -e "  ${R}=> all service contents deleted${E}"

re: clean up

ps:
	@ ${COMPOSE} -f $(COMPOSE_FILE) -p $(NAME) ps
