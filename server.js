if (!process.env.NODE_ENV) require("dotenv").config();
const config = require("config");
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const logger = require("./middleware/logger");

require("./startup/db")();
require("./startup/routes")(app);
require("./startup/validation")();
require("./startup/prod")(app)
require("./startup/socket")(io)
require("./startup/config")();

const port = process.env.PORT || config.get("app.port")

server.listen(port, () =>{
  logger.log("info", "server mode: " + process.env.NODE_ENV)
  logger.log("info", "listening on port: " + port)
}
);

module.exports = server;
