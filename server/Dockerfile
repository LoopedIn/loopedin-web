FROM node:10
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

ENV MONGODB_HOST 'mongo'
ENV MONGODB_PORT '27017'

CMD ["npm","start"]