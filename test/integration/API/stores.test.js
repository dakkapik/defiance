const mongoose = require("mongoose")
const { Store } = require("../../../models/store");

const chai = require("chai")
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

module.exports = (server)=> {
    describe("STORES API", ()=>{
    
        beforeEach((done)=>{
            Store.deleteMany({}, (err)=>{done()})
        });
    
        after((done)=>{
            Store.deleteMany({}, (err)=>{done();});
        });
    
        describe("/GET stores (empty)", ()=>{
            it("should get an empty array", (done)=>{
                chai.request(server)
                    .get("/api/stores")
                    .end((err, res)=>{
                        res.should.have.status(200);
                        res.body.should.be.a("array");
                        res.body.length.should.be.eql(0);
                        done();
                    })
            })
        });
    
        describe("/GET store by store number", ()=>{
    
            const store = new Store({
                number: 1,
                name: "Store",
                location: {lat:26.028871713486605,lng:-80.37106942245414}
            })
    
            it("should return one store", (done)=>{
    
                store.save((err)=>{
                    if(err){console.log(err)}
                })
    
                chai.request(server)
                    .get(`/api/stores/${store.number}`)
                    .end((err, res)=>{
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.users.should.be.a("array");
                        res.body.users.length.should.eql(0);
                        res.body._id.should.be.a("string");
                        res.body.number.should.be.a("number");
                        res.body.number.should.eql(1)
                        res.body.location.should.be.a("object");
                        res.body.location.lat.should.be.a("number");
                        res.body.location.lat.should.eql(store.location.lat)
                        res.body.location.lng.should.be.a("number");
                        res.body.location.lng.should.eql(store.location.lng)
                        res.body.name.should.be.a("string")
                        res.body.name.should.eql(store.name)
                        done();
                    });
            });
    
        });
    
    })
}