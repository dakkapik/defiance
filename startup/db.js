const mongoose = require("mongoose");
const logger = require("../middleware/logger");

module.exports = function () {
  const db = `mongodb+srv://${process.env.db_user}:${process.env.db_pswrd}@${process.env.db_cluster}.dab6a.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`;
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => logger.log("info", `connected to ${process.env.db_name}`));
};
