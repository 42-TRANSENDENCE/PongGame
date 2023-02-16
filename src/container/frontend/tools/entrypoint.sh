#!/bin/bash

echo "Frontend Entrypoint!!";
service ssh start;
sshd -D
sleep 3;

exec "$@"
