const sinon = require("sinon")
const socket = require("../../../startup/socket");
const expect = require("chai").expect;
const Http = require("http");

describe("Websocket server tests", function(){

    let server = undefined;
    let wsClient = undefined;

    before(function(done){

        server = Http.createServer(()=>{console.log(" -/- ")});
        
        socket.socketIO(server)
        const stub = sinon.stub(socket, "getStores");
        stub.returns(
            {
                psq1: { users: {}, manager: false },
                psq2: { users: {}, manager: false },
                psq3: { users: {}, manager: false },
                psq4: { users: {}, manager: false }
            })

        server.listen( 7575 ,()=>{
            done();
        });
    });

    after(function(done) {
        if(server){
            server.on("close",()=>{
                done();
            });
            
            server.close(()=>{
                server.unref();
            });
        };
    });

    beforeEach(function () {
        wsClient = require("socket.io-client")("http://localhost:7575");
    })

    afterEach(function () {
        wsClient.close();
        wsClient = undefined;
    })

    it("should return the new room with only the manager on it", function(done){

        wsClient.on("connect", ()=> {
            wsClient.emit("new-user", {role: "manager", id:1111, store: "psq1"});
        });

        wsClient.on("current-users", (users)=>{
            try{
                expect(users).to.be.a("object");
                expect(users.users).to.be.a("object");
                expect(Object.keys(users.users).length).to.be.eql(1);
                expect(users.users[1111]).to.be.a("string");
                expect(users.users[1111]).to.be.eql("manager");
                expect(users.manager).to.be.true
                done();
            }catch (err){
                done(err);
            }
        });
    });

    it("should return the undefined room error", function(done){

        let currentUsers = undefined;

        wsClient.on("connect", ()=> {
            wsClient.emit("new-user", {role: "manager", id:1111, store: "not_a_store"});
        });

        wsClient.on("current-users", (users)=>{
            currentUsers = users
        });

        wsClient.on("error", (error)=>{
            try{
                expect(currentUsers).to.be.undefined;
                expect(error).to.exist;
                console.log(error)
                done();
            }catch(err){
                done(err);
            }
        })
    })
});