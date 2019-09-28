FROM node:alpine
WORKDIR /app
RUN pwd
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]