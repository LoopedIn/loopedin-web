FROM node:10
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

ENV BASE_API_URL=<backend-app-service-ip>:<port>

CMD npm start
EXPOSE 8080