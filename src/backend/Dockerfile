FROM ubuntu:node_base
EXPOSE 22
EXPOSE 3001

RUN	mkdir -p /root/back
WORKDIR	/root/back
RUN     echo "root:0000" | chpasswd
RUN	service ssh start
CMD	["/usr/sbin/sshd", "-D"]
