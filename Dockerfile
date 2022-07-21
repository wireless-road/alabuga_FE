FROM node:12-alpine as node

WORKDIR /app
COPY ./ /app
RUN yarn install
EXPOSE 3000
CMD yarn run start
