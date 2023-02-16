FROM node_base:v1
EXPOSE 22
EXPOSE 3001

# code-server및 extension설치
RUN	curl -fsSL https://code-server.dev/install.sh | sh && \
    code-server --install-extension dsznajder.es7-react-js-snippets

RUN	mkdir -p /root/back && \
    echo 'set -e; yarn install; exec "$@"' > /yarn.sh && \
	chmod +x /yarn.sh

WORKDIR	/root/back

RUN     echo "root:0000" | chpasswd
RUN	service ssh start

ENTRYPOINT ["bash", "/yarn.sh"]
CMD	["/usr/sbin/sshd", "-D"]
