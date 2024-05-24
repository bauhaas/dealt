# base image
FROM node:18.19.0-alpine

# set working directory
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy project files
COPY . .

# expose port and start application
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
