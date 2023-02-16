FROM node_base:v1
EXPOSE 22
EXPOSE 3001

RUN	mkdir -p /root/back
WORKDIR	/root/back
RUN	yarn install

RUN	echo "root:0000" | chpasswd && \
	service ssh start

CMD	["/usr/shin/sshd", "-D"]
