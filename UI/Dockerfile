FROM node:18.0.0 AS build
WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build --configuration=production

FROM nginx:alpine AS final
COPY "./nginx/default.conf" "/etc/nginx/conf.d/default.conf"
COPY --from=build /app/dist/ui /usr/share/nginx/html
