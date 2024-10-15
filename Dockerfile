# Step 1: Build the application
FROM node:20-alpine

WORKDIR /app

# Copy package.json and yarn.lock first to leverage Docker cache
COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

CMD yarn dev
