FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "start"]