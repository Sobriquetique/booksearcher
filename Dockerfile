FROM node:alpine as build-stage

# config values replacer
ENV JQ_VERSION=1.6

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/build/ .
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 10123
CMD ["nginx", "-g", "daemon off;"]