FROM node:10
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

ENV BACKEND_HOST 'app'

CMD npm start
EXPOSE 8080