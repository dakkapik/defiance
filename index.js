const express = require("express");
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const logger = require("./middleware/logger");

// require("./startup/db")();
require("./startup/routes")(app);
require("./startup/validation")();
require("./startup/prod")(app)
require("./startup/socket")(io)
// require("./startup/config")()


const port = process.env.PORT || 3001;

server.listen(port, () => logger.log("info", "server listening on port " + port));

