process.env.NODE_ENV = "test_local";
process.env.PORT = 3002;

const mongoose = require("mongoose")
const { Order } = require("../../../models/order");

const chai = require("chai")
const chaiHttp = require("chai-http");
const server = require("../../../server");
const should = chai.should();

chai.use(chaiHttp);

describe('orders', () => {
    
    beforeEach((done)=>{
        Order.deleteMany({}, (err)=>{done()})
    });

    after((done)=>{
        Order.deleteMany({}, (err)=>{done()})
    });

    describe("/GET empty orders", ()=>{
        it("should GET empty order array", (done)=>{
            chai.request(server)
                .get("/api/orders")
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                })
                done();
        });
    });

    describe("/GET order by order number", ()=>{
        
        const order = new Order({
            orderNumber:273,
            date:"10/07",
            time:"05:44pm",
            firstName:"LUIS",
            lastName:"LUIS",
            phoneNumber:"(240) 813-5918",
            address:"4691 NW 66TH DRIVE",
            city:"CORAL SPRINGS",
            zip:"33073"
        })
        
        it("should get one order", (done)=>{

            order.save((err)=>{
                if(err){console.log(err)}
            })

            chai.request(server)
                .get(`/api/orders/${order.orderNumber}`)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.should.be.a("object");
                    res.body.status.should.be.a("string");
                    res.body._id.should.be.a("string");
                    res.body.orderNumber.should.be.a("number");
                    res.body.date.should.be.a("string");
                    res.body.time.should.be.a("string");
                    res.body.firstName.should.be.a("string");
                    res.body.lastName.should.be.a("string");
                    res.body.phoneNumber.should.be.a("string");
                    res.body.address.should.be.a("string");
                    res.body.city.should.be.a("string");
                    res.body.zip.should.be.a("string");
                    res.body.__v.should.be.a("number");
                    done();
                });
            });

    });

    describe("/POST order", ()=>{

        it("should post an order", (done)=>{
            const order = ({
                orderNumber:273,
                date:"10/07",
                time:"05:44pm",
                firstName:"LUIS",
                lastName:"LUIS",
                phoneNumber:"(240) 813-5918",
                address:"4691 NW 66TH DRIVE",
                city:"CORAL SPRINGS",
                zip:"33073"
            })

            chai.request(server)
                .post("/api/orders")
                .send(order)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.should.be.a("object");
                    res.body.status.should.be.a("string");
                    res.body._id.should.be.a("string");
                    res.body.orderNumber.should.be.a("number");
                    res.body.date.should.be.a("string");
                    res.body.time.should.be.a("string");
                    res.body.firstName.should.be.a("string");
                    res.body.lastName.should.be.a("string");
                    res.body.phoneNumber.should.be.a("string");
                    res.body.address.should.be.a("string");
                    res.body.city.should.be.a("string");
                    res.body.zip.should.be.a("string");
                    res.body.__v.should.be.a("number");
                });
            
            chai.request(server)
                .get(`/api/orders/${order.orderNumber}`)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.should.be.a("object");
                    res.body.status.should.be.a("string");
                    res.body._id.should.be.a("string");
                    res.body.orderNumber.should.be.a("number");
                    res.body.date.should.be.a("string");
                    res.body.time.should.be.a("string");
                    res.body.firstName.should.be.a("string");
                    res.body.lastName.should.be.a("string");
                    res.body.phoneNumber.should.be.a("string");
                    res.body.address.should.be.a("string");
                    res.body.city.should.be.a("string");
                    res.body.zip.should.be.a("string");
                    res.body.__v.should.be.a("number");
                    done();
                }); 
        })
    });

    describe("/PUT order by order number", ()=>{

        const order = new Order({
            orderNumber:273,
            date:"10/07",
            time:"05:44pm",
            firstName:"LUIS",
            lastName:"LUIS",
            phoneNumber:"(240) 813-5918",
            address:"4691 NW 66TH DRIVE",
            city:"CORAL SPRINGS",
            zip:"33073"
        })

        const order2 = {
            orderNumber:274,
            date:"10/08",
            time:"06:58pm",
            firstName:"Grant",
            lastName:"Mills",
            phoneNumber:"(222) 222-2222",
            address:"6153 NW 41ST DRIVE",
            city:"margate",
            zip:"33073"
        }

        it("should update an order", (done)=>{

            order.save((err)=>{
                if(err){console.log(err)}
            })

            chai.request(server)
                .put(`/api/orders/${order.orderNumber}`)
                .send(order2)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.should.be.a("object");
                    res.body.status.should.be.a("string");
                    res.body._id.should.be.a("string");
                    res.body.orderNumber.should.be.a("number");
                    res.body.date.should.be.a("string");
                    res.body.time.should.be.a("string");
                    res.body.firstName.should.be.a("string");
                    res.body.lastName.should.be.a("string");
                    res.body.phoneNumber.should.be.a("string");
                    res.body.address.should.be.a("string");
                    res.body.city.should.be.a("string");
                    res.body.zip.should.be.a("string");
                    res.body.__v.should.be.a("number");
                    done();
                })
        })
    })

    describe("/DELETE order by order number", ()=>{

        const order = new Order({
            orderNumber:273,
            date:"10/07",
            time:"05:44pm",
            firstName:"LUIS",
            lastName:"LUIS",
            phoneNumber:"(240) 813-5918",
            address:"4691 NW 66TH DRIVE",
            city:"CORAL SPRINGS",
            zip:"33073"
        })

        it("should delete an order", (done)=>{
            order.save((err)=>{

                if(err){console.log(err)}

            })

            chai.request(server)
                .delete(`/api/orders/${order.orderNumber}`)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.deleted.should.be.a("object");
                    res.body.deleted.status.should.be.a("string");
                    res.body.deleted._id.should.be.a("string");
                    res.body.deleted.orderNumber.should.be.a("number");
                    res.body.deleted.date.should.be.a("string");
                    res.body.deleted.time.should.be.a("string");
                    res.body.deleted.firstName.should.be.a("string");
                    res.body.deleted.lastName.should.be.a("string");
                    res.body.deleted.phoneNumber.should.be.a("string");
                    res.body.deleted.address.should.be.a("string");
                    res.body.deleted.city.should.be.a("string");
                    res.body.deleted.zip.should.be.a("string");
                    res.body.deleted.__v.should.be.a("number");

                    chai.request(server)
                        .get(`/api/orders/${order.orderNumber}`)
                        .end((err, res)=>{
                            res.should.have.status(404)
                            res.body.should.be.a("object")
                            res.body.message.should.equal('order not found')
                            done();
                    })
            })
            
        })
    })
});