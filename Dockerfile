FROM node:12-bullseye
RUN mkdir -p /var/www/app
WORKDIR /var/www/app
RUN npm install -g nodemon@2.0.12
COPY . .
RUN npm install
RUN npm audit fix
EXPOSE 3000
CMD ["npm", "start"]