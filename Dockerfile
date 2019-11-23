FROM nginx:alpine
COPY /build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]

# To run docker locally:
# docker run -p 3000:8000 futurice/futuprojects:tag

# To remove everything from docker locally:
# docker rmi $(docker images -q) --force