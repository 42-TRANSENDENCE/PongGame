#!/bin/bash

mv /.env /pong/
npm i --legacy-peer-deps
npm run build
mv dist /var/www/html/pong
nginx -g "daemon off;"

