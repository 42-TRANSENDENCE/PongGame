FROM node:bullseye
EXPOSE 22
EXPOSE 4242

# ==== apt서버 한국 미러서버로 교체
RUN     sed -i 's/archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list && \
        sed -i 's/security.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list

RUN     apt-get update && apt-get upgrade -y && apt-get install ssh vim nginx -y
RUN     npm install -g npm

# ==== SSH
# COPY    ./conf/sshd_config /etc/ssh/sshd_config
# RUN     passwd -d root && service ssh start

# ==== Node
RUN     mkdir -p /pong
COPY    ./tools/entrypoint.sh /entrypoint.sh
RUN     chmod +x /entrypoint.sh
WORKDIR /pong

# ==== NGINX
COPY    ./conf/default /etc/nginx/sites-enabled/
RUN     mkdir -p /var/www/html 

ENTRYPOINT ["sh", "/entrypoint.sh"]

