FROM node:9-slim
WORKDIR /gcitFashionStore
COPY package.json ./

RUN npm install
COPY . ./
CMD ["npm","start"]