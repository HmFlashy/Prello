FROM node:8

WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY . .
EXPOSE 5000
RUN apt update && apt install -y libldap2-dev && npm install --production
CMD [ "npm", "start" ]
