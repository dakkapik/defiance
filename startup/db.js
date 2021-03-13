const mongoose = require("mongoose");
const logger = require("../middleware/logger");
const config = require("config")

module.exports = function () {
  return new Promise((resolve, reject)=>{
    try{
      mongoose
        .connect(dbConstructor(), {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true})
        .then(() => {
          logger.log("info", `database: ${config.get("db.name") || config.get("db.host")}`)
          resolve()
        });

    }catch(err){
      logger.log("error", err)
      reject(err)
    }
  })
};

function dbConstructor (){
  const { prefix, host, port, user, cluster, name, suffix, pswrd} = config.get("db");
  const connectionString = [];
  if(prefix){
    connectionString.push(prefix + "://");
  };
  if(host){
    connectionString.push(host + ":");
  };
  if(port){
    connectionString.push(port + "/")
  };
  if(user){
    connectionString.push(user + ":")
  };
  if(process.env.db_pswrd){
    connectionString.push(process.env.db_pswrd + "@")
  };
  if(pswrd){
    connectionString.push(pswrd + "@")
  }
  if(cluster){  
    connectionString.push(cluster + "/")
  };
  if(name){
    connectionString.push(name)
  };
  if(suffix){
    connectionString.push(suffix)
  };
  return connectionString.join("");
}
