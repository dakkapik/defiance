process.env.NODE_ENV = "test_local";
process.env.PORT = 3002;

// const { Order } = require("../../../models/order");

const chai = require("chai")

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const should = chai.should();

let server = require("../../../server");

describe('orders', () => {
    
    // beforeEach((done)=>{
    //     server = require("../../../server");
    //     done();
    // });

    // afterEach(()=>{
    //     server.close();
    // });

    describe("/GET orders", ()=>{
        it("should GET all orders", (done)=>{
            chai.request(server)
                .get("/api/orders")
                .end((err, res)=>{
                    console.log("data", res.body)
                })
                done();
        });
    });
});