FROM node:10
WORKDIR /app
RUN cd ../client/ && npm run build && cp -r build/ ../server/build/
COPY package.json /app
RUN npm install
COPY . /app

ENV MONGODB_HOST 'mongo'
ENV MONGODB_PORT '27017'

CMD ["npm","start"]