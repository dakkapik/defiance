const { createLogger, transports, format } = require("winston");
require("winston-mongodb");

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: format.simple(),
    }),
    new transports.Console({
      filename: "errors",
      level: "error",
      format: format.combine(format.timestamp(), format.simple()),
    }),
    //   new transports.MongoDB({
    //     level: "error",
    //     db: "mongodb://localhost/Vidly",
    //     options: { useUnifiedTopology: true },
    //     collection: "error",
    //     format: format.combine(format.timestamp(), format.json()),
    //   }),
  ],
});

module.exports = logger;
