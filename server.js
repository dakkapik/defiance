const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const env = require("dotenv")

if (process.env.NODE_ENV !== "prod") env.config();

const logger = require("./middleware/logger");

require("./startup/db")();
require("./startup/routes")(app);
require("./startup/validation")();
require("./startup/prod")(app)
require("./startup/socket")(io)
require("./startup/config")();

let port

if(process.env.NODE_ENV !== "test_local"){
    port = process.env.PORT || 3001;
}else{
    port = 3002
}



server.listen(port, () =>
  logger.log("info", "server listening on port " + port)
);

module.exports = server;
