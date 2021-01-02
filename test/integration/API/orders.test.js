process.env.NODE_ENV = "test";
process.env.PORT = 3002;

const { Order } = require("../../../models/order")

const chai = require("chai")

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const should = chai.should();

let server;

describe('orders', () => {
    
    before((done)=>{
        server = require("../../../server");
        done();
    });
    afterEach(async ()=>{
        await Order.deleteMany({},(err)=>{})
        server.close();
    })

    describe("/GET orders", ()=>{
        it("should GET all orders", (done)=>{
            chai.request(server)
                .get("/api/orders")
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eql(0);
                done();
                });
        });
    });
});