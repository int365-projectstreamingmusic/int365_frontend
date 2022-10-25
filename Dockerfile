FROM node:16.14.2 as build-stage
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
COPY ./ .
RUN ["yarn --version"]
# RUN ["yarn", "build"]

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
