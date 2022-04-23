FROM node:14.16-alpine3.10  as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install -g yarn && yarn install
COPY ./ .
RUN yarn build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080