FROM node:16.12.0

COPY . /usr/src/app
WORKDIR /usr/src/app


RUN npm install

COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]
