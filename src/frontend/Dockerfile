FROM node_base:v1
EXPOSE 22
EXPOSE 3000

# code-server및 extension설치
RUN	curl -fsSL https://code-server.dev/install.sh | sh && \
    code-server --install-extension dsznajder.es7-react-js-snippets && \
	apt-get install nginx -y

COPY ./conf/default /etc/nginx/sites_enabled/
RUN	mkdir -p /root/front &&\
    echo 'set -e; yarn install; exec "$@"' > /yarn.sh && \
	chmod +x /yarn.sh

WORKDIR	/root/front
RUN	echo "root:0000" | chpasswd

ENTRYPOINT ["bash", "/yarn.sh"]
RUN service ssh start
CMD ["/usr/sbin/sshd", "-D"]
