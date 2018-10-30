require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const helmet = require("helmet");
const cors = require("cors");
const swaggerJSDoc = require('./api/swagger.js')
const swaggerUi = require('swagger-ui-express');
require("./config/db");

app.use(cors())
// API calls
app.use(helmet());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));
app.use('/api', require("./api"));

const server = app.listen(port, () => console.log(`Listening on port ${port}`));
require('./socket').listen(server);
module.exports = app;