FROM --platform=linux/amd64 node:20-alpine3.16

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build