NAME = socket_webgame
R = \033[0;31m
G = \033[0;32m
B = \033[0;34m
E = \033[0m

COMPOSE = ./src/docker-compose.yml

.PHONY: up down restart clean re

up :
	@ echo -n "" > ${HOME}/.ssh/known_hosts
	@ docker compose -f $(COMPOSE) -p $(NAME) build
	@ echo "=> $(G) build done $(E)";
	@ docker image ls
	@ docker compose -f $(COMPOSE) -p $(NAME) up -d
	@ echo "=> $(G) services ready$(E)"
	@ docker compose -f $(COMPOSE) -p $(NAME) ps
down:
	@ docker compose -f $(COMPOSE) -p $(NAME) down --remove-orphans --rmi local
restart: down up

clean: down
	@ echo -n "$(R)"
	@ docker system prune -af > /dev/null
	@ echo "  all service contents deleted"
	@ echo -n "$(E)"

re: clean up

