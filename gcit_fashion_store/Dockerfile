FROM node:9-slim
WORKDIR /gcitFashionStore
COPY package.json ./gcit_fashion_store

RUN npm install
COPY . /gcitFashionStore
CMD ["npm","start"]