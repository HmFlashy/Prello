require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require('body-parser');
const swaggerJSDoc = require('./api/swagger.js')
const swaggerUi = require('swagger-ui-express');
require("./config/db");
const logger = require("./logger")

app.use(cors())
// API calls
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/oauth', require('./oauth/routes')(app))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));

app.use('/api', require("./api"));

const server = app.listen(port, () => logger.info(`Listening on port ${port}`));
require('./socket').listen(server);
module.exports = app;