#!/bin/bash

set -e

echo "Backend Entrypoint!!";
service ssh start;
sshd -D
sleep 3;

exec "$@"
