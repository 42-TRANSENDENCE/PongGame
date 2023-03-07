FROM node:bullseye-slim
EXPOSE 22
EXPOSE 8181

# ==== apt서버 한국 미러서버로 교체
RUN     sed -i 's/archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list && \
        sed -i 's/security.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list

RUN	apt-get update && apt-get upgrade -y && apt-get install curl ssh git tree -y
RUN	git clone -b feat/pong --single-branch https://github.com/42-TRANSENDENCE/backend.git /pong_back

# ==== SSH
COPY	./conf/sshd_config /etc/ssh/sshd_config
RUN	passwd -d root && service ssh start

WORKDIR /pong_back

RUN git pull
RUN npm install yarn && yarn install

CMD ["/usr/sbin/sshd", "-D"]
#CMD ["npm", "run", "start:dev"]
