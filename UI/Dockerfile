### Frontend ###
FROM node:17-alpine AS build
WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.6-alpine AS final
# COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/ui /usr/share/nginx/html
