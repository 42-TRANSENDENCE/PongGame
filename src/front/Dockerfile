FROM node:bullseye-slim
EXPOSE 22
EXPOSE 8080

# ==== apt서버 한국 미러서버로 교체
RUN     sed -i 's/archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list && \
        sed -i 's/security.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list

RUN	apt-get update && apt-get upgrade -y && apt-get install curl ssh git tree nginx -y
# RUN	git clone -b dkim2_pong  git@github.com:42-TRANSENDENCE/frontend.git /source

# ==== SSH
COPY	./conf/sshd_config /etc/ssh/sshd_config
RUN	passwd -d root && service ssh start

WORKDIR /source

#RUN git pull
RUN npm install yarn && yarn install

CMD ["/usr/sbin/sshd", "-D"]
#CMD ["yarn", "start"]

# ==== NGINX
# RUN npm run build
# COPY ./conf/default /etc/nginx/sites_enabled/
# CMD ["nginx", "-g", "daemon off;"]
