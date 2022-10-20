FROM node:16.15.1-alpine3.16

COPY . /usr/src/app
WORKDIR /usr/src/app
COPY src src
COPY prisma prisma
COPY package*.json ./
COPY .env.deployment .env

RUN npm ci --only=production

CMD [ "npm", "start" ]
