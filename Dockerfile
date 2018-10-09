FROM node:8

WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY package*.json ./

RUN npm install --only=production
COPY . .
RUN cd client && npm install --only=production && npm run build
EXPOSE 5000
CMD [ "npm", "start" ]