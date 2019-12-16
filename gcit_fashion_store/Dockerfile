FROM node:9-slim
WORKDIR /gcitFashionStore
COPY package.json ./

RUN npm install
RUN npm install bcrypt@latest --save
COPY . ./
CMD ["npm","start"]