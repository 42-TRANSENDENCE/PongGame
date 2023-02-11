FROM ubuntu:22.04

EXPOSE 22

RUN	sed -i 's/archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list && \
	sed -i 's/security.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list

RUN     apt-get update && \
	apt-get install -y ssh vim tree git curl && \
	curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
        apt-get update && apt-get install -y nodejs && \
	npm install -g yarn

COPY	./conf/sshd_config /etc/ssh/sshd_config
