#Before building the docker image remember to run `yarn build`

FROM nginx:alpine
COPY /build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]

# docker build . -t futurice/futuprojects:tag
# docker run -p 3000:8000 futurice/futuprojects:tag

# remove everything from docker locally: docker rmi $(docker images -q) --force