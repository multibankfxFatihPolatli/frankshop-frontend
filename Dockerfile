
FROM node:14.15.4-slim as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
FROM nginx:1.17.1-alpine
ENV API_URL $API_URL
ENV JWT_TOKEN $JWT_TOKEN
COPY --from=build-step /app/dist/frankshop-frontend /usr/share/nginx/html
