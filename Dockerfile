FROM node:stretch as buildphase 
WORKDIR /app
ADD package.json /app/package.json
ADD tsconfig.json /app/tsconfig.json
RUN npm install
ADD src /app/src
ADD public /app/public
RUN npm run build


FROM nginx:stable-alpine
COPY --from=buildphase /app/build /usr/share/nginx/html
ADD certs /etc/ssl/certs
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]

