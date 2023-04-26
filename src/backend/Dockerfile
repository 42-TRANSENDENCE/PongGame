FROM node:bullseye
EXPOSE 22
EXPOSE 3000

# ==== apt서버 한국 미러서버로 교체
RUN     sed -i 's/archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list && \
        sed -i 's/security.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list

RUN	apt-get update && apt-get upgrade -y && apt-get install ssh vim tree -y

# ==== SSH
COPY    ./conf/sshd_config /etc/ssh/sshd_config
RUN     passwd -d root && service ssh start

# ==== Node
RUN     mkdir -p /pong
COPY    ./conf/.backendenv /.env
WORKDIR /pong
RUN     echo "#!/bin/sh \
mv /.env /pong/ \
npm i \
npm start" > /entrypoint.sh && chmod +x /entrypoint.sh



CMD ["/usr/sbin/sshd", "-D"]
# ENTRYPOINT [ "sh", "/entrypoint.sh" ];
# CMD ["npm", "start"]