const express = require("express");
const app = express();
const logger = require("./middleware/logger");

require("./startup/db")();
require("./startup/routes")(app);
require("./startup/validation")();

const port = process.env.PORT || 3000;
console.log(port);

app.listen(port, () => logger.log("info", "listening on port " + port));
