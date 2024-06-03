#!/bin/sh

#root
cp .env.dist .env
npm i

#api
cd api
cp .env.dist .env
npm i

# client
cd ../client
cp .env.dist .env
npm i

# back to root
cd ..
docker-compose up --build -d
