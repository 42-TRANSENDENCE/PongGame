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

# ==== Node
RUN     mkdir -p /pong
COPY    ./conf/.frontenv /.env
WORKDIR /pong

# ==== NGINX
COPY    ./conf/default /etc/nginx/sites_enabled/
RUN     mkdir -p /var/www/html 
RUN     echo "#!/bin/bash \
mv /.env /pong/ \
npm i --legacy-peer-deps && npm run build && mv dist /var/www/html/pong \
exec \$@" > /entrypoint.sh && chmod +x /entrypoint.sh

CMD ["/usr/sbin/sshd", "-D"]
# ENTRYPOINT ["sh", "/entrypoint.sh"]
# CMD ["nginx", "-g", "daemon -off"]

