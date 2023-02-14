FROM node_base:v1
EXPOSE 22
EXPOSE 3000

RUN	mkdir -p /root/front
WORKDIR	/root/front
RUN	echo "root:0000" | chpasswd
RUN	service ssh start
CMD	["/usr/sbin/sshd", "-D"]
