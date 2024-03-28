FROM node:21-alpine AS build
WORKDIR /app
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn install --frozen-lockfile
COPY ./docs ./docs
RUN yarn docs:build

FROM nginx:stable-alpine
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/docs/.vuepress/dist /app