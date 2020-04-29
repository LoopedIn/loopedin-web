FROM node:10

WORKDIR /project/app

COPY /client/ /project/
WORKDIR /project/client/
RUN npm install && npm run build

WORKDIR /project/app
COPY /server/package.json /project/app/
RUN npm install
COPY /server/ /project/app/

ENV MONGODB_HOST 'mongo'
ENV MONGODB_PORT '27017'

CMD ["npm","start"]