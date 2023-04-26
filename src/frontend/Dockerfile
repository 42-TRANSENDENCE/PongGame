FROM node:bullseye
EXPOSE 22
EXPOSE 4242

# ==== apt서버 한국 미러서버로 교체
RUN     sed -i 's/archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list && \
        sed -i 's/security.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list

RUN     apt-get update && apt-get upgrade -y && apt-get install ssh vim nginx -y

# ==== SSH
COPY    ./conf/sshd_config /etc/ssh/sshd_config
RUN     passwd -d root && service ssh start

RUN     mkdir -p /pong
COPY    ./conf/.frontenv /pong/.env
WORKDIR /pong

# ==== NGINX
COPY    ./conf/default /etc/nginx/sites_enabled/
RUN     mkdir -p /var/www/html 
RUN     echo "#!/bin/bash; echo "FE entrypoint"; npm i && npm run build && mv dist /var/www/html/pong ; nginx -g 'daemon off;'" > /entrypoint.sh && chmod +x /entrypoint.sh

# CMD ["/usr/sbin/sshd", "-D"]
# CMD ["nginx", "-g", "daemon -off"]
ENTRYPOINT [ "/entrypoint.sh"]
# CMD ["nginx", "-g", "daemon -off;"]

