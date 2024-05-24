# base image
FROM node:18.19.0-alpine

# set working directory
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy project files
COPY . .

# build the project
RUN npm run build

# install serve to serve the build
RUN npm install -g serve

# expose port and serve the application
EXPOSE 3000
CMD ["serve", "-s", "build"]
