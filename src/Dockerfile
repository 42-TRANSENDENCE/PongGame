FROM ubuntu:22.04

EXPOSE 22

# apt서버 한국 미러서버로 교체
RUN	sed -i 's/archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list && \
	sed -i 's/security.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list

RUN	apt-get update && \
    apt-get install -y ssh vim tree git curl && \
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get update && apt-get install -y nodejs && \
    npm install -g yarn
# code-server및 extension설치
#RUN	curl -fsSL https://code-server.dev/install.sh | sh && \
#    code-server --install-extension dsznajder.es7-react-js-snippets
RUN mkdir -p /run/sshd

COPY /conf/sshd_config /etc/ssh/sshd_config
