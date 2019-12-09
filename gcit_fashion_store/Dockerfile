FROM node:9-slim
WORKDIR /gcitFashionStore
COPY package.json ./gcit_fashion_store

ENV process.env.DB_HOST=$DB_HOST
ENV process.env.DB_USER=$DB_USER
ENV process.env.DB_PASSWORD=$DB_PASSWORD
ENV process.env.STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY

RUN npm install
COPY . /gcitFashionStore
CMD ["npm","start"]