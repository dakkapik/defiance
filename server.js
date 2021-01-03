const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const config = require("config");

const logger = require("./middleware/logger");

app.get("/api/test", (req, res) => {
  console.log(process.env.g_drive_credentials);
  res.send(config.get("g_drive_credentials"));
});

require("./startup/db")();
require("./startup/routes")(app);
require("./startup/validation")();
require("./startup/prod")(app);
require("./startup/socket")(io);
require("./startup/config")();

const port = process.env.PORT || 3001;

server.listen(port, () =>
  logger.log("info", "server listening on port " + port)
);

// module.exports = server
