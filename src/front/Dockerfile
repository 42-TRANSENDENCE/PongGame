FROM node:bullseye-slim
EXPOSE 22
EXPOSE 8080
EXPOSE 5173

# ==== apt서버 한국 미러서버로 교체
RUN     sed -i 's/archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list && \
        sed -i 's/security.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list

RUN	apt-get update && apt-get upgrade -y && apt-get install curl ssh git tree nginx -y

# ==== SSH
COPY	./conf/sshd_config /etc/ssh/sshd_config
RUN	passwd -d root && service ssh start

WORKDIR /source

RUN npm install yarn && yarn install

# ==== NGINX
# RUN npm run build
COPY ./conf/default /etc/nginx/sites_enabled/

CMD ["/usr/sbin/sshd", "-D"]

#CMD ["yarn", "start"]
# CMD ["nginx", "-g", "daemon off;"]
