
FROM node:13.12.0-alpine
WORKDIR /red/frontend

COPY package.json package-lock.json ./
RUN npm install 
RUN npm install react-scripts@3.4.1 -g 
RUN npm install axios --save
RUN npm install --save react-router-dom
COPY . ./
EXPOSE 3000
