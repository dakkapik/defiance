const server = require('../../server')
const storesTest = require("./API/stores.test")(server)
const ordersTest = require("./API/orders.test")(server)

after((done)=>{
    server.close().then(done());
})