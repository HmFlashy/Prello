
const swaggerJSDoc = require('swagger-jsdoc')

let swaggerDefinition = {
  info: {
    "title": "Khal-Prello API",
    "description": "Restful API for the prello web application",
    "version": "1.0.0"
  },
  openapi: "3.0.9",
  produces: ['application/json'],
  consumes: ['application/json'],
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [
    { JWT: [] }
  ],
  servers: [{
    url: '/api'
  }]
}

let options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./api/routes/**/*.js', './api/models/**/*.js']
}
console.log(swaggerJSDoc(options))
module.exports = swaggerJSDoc(options)