FROM node:8

WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY . .
RUN npm run install:all:prod
RUN cd client && npm run build
EXPOSE 5000
CMD [ "npm", "start" ]