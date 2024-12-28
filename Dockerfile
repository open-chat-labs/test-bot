# build stage
FROM node:20-alpine as build

WORKDIR /spotify_bot

COPY package*.json .

RUN npm install

COPY . . 

EXPOSE 5060

CMD [ "node", "server.js" ]