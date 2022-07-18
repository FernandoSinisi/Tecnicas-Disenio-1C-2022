FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --save

COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
