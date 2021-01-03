const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

if (process.env.NODE_ENV !== "prod") require("dotenv").config();
const config = require("config");

const logger = require("./middleware/logger");

require("./startup/db")();
require("./startup/routes")(app);
require("./startup/validation")();
require("./startup/prod")(app)
require("./startup/socket")(io)
require("./startup/config")();

let port
switch(process.env.NODE_ENV){
    case "prod":
        port = process.env.PORT
    break;
    case "dev":
        port = process.env.PORT || 3001;
    break;
    case "test":
        port = process.env.PORT || 3002;
    break;
    case "test_local":
        port = 3002;
    break;
}

server.listen(port, () => logger.log("info", "server listening on port " + port));

module.exports = server;
