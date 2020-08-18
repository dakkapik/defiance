const mongoose = require("mongoose");
const config = require("config");
const logger = require("../middleware/logger");

module.exports = function () {
  const db = config.get("db");
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => logger.log("info", "connected to mongodb..."));
};
