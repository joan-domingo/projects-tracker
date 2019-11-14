FROM node:alpine as build
WORKDIR /usr/src/app
COPY package.json .
RUN yarn
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build . -t <name>
# docker run --p 3000:80 <name>