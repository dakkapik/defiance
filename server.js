if (!process.env.NODE_ENV) require("dotenv").config();
const config = require("config");
const express = require("express");
const app = express();
const server = require('http').createServer(app);

const logger = require("./middleware/logger");

global.GLOBAL_TIMEZONE = "en-US" 

require("./startup/db")().then(()=>{
  socketSetUp(server);
});
// require("./startup/orderBundles");
require("./startup/routes")(app);
require("./startup/validation")();
require("./startup/prod")(app);
require("./startup/config")();

const port = process.env.PORT || config.get("app.port")

server.listen(port, () =>{
  logger.log("info", "server mode: " + process.env.NODE_ENV);
  logger.log("info", "listening on port: " + port);
});

module.exports = server;

async function socketSetUp (server){
  const stores = await getStores()
  require("./socket/router").socketIO(server, stores);
}

const getStores = () => {
  return new Promise((resolve, rejecet)=>{
      let storesObj = {}
      require("./models/store").Store.find()
      .then(stores=>{
        stores.forEach(store=>{
          storesObj[store.storeId] = {users: {}, manager: false}
        });
        resolve(storesObj)
      });
  })
};