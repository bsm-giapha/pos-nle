FROM node:lts-alpine AS develop
WORKDIR /app
COPY package*.json ./
COPY vite.config.js ./
RUN npm install
COPY . .
EXPOSE 3000

FROM develop AS build
RUN npm run build

FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]