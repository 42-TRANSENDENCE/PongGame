FROM node_base:v1
EXPOSE 22
EXPOSE 3000

RUN	mkdir -p /root/front
WORKDIR	/root/front
RUN yarn install 

RUN	echo "root:0000" | chpasswd && \
	service ssh start

ENTRYPOINT ["/usr/sbin/sshd -D"]
