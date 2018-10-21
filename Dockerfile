FROM node:8

WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY . .
RUN npm install --production
CMD [ "npm", "start" ]