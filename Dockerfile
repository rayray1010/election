FROM node:lts-alpine3.16
WORKDIR /vote
COPY package*.json .
RUN npm install
COPY . .
ENV  NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "server_docker"]
