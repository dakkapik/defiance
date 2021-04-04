const sinon = require("sinon")
const socket = require("../../../socket/router");
const expect = require("chai").expect;
const Http = require("http");

describe("Websocket server tests", function(){

    let server = undefined;
    let wsClient = undefined;
    const rooms = {
        store1: { users: {}, manager: false },
        store2: { users: {}, manager: false },
    };
    

    before(function(done){
        console.log = function () {}
        server = Http.createServer(()=>{console.log(" -/- ")});
        
        socket.socketIO(server, rooms);

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

    describe("Manager Login",function () {
        it("should return the new room with only the manager on it", function(done){
        
                wsClient.on("connect", ()=> {
                    wsClient.emit("new-user", {role: "manager", id:1111, store: "store1"});
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
                    wsClient.emit("new-user", {role: "manager", id:1112, store: "not_a_store"});
                });
        
                wsClient.on("current-users", (users)=>{
                    currentUsers = users
                });
        
                wsClient.on("error", (error)=>{
                    try{
                        expect(currentUsers).to.be.undefined;
                        expect(error).to.exist;
                        expect(error).to.be.eql("this store does not exist")
                        done();
                    }catch(err){
                        done(err);
                    }
                })
        });
        
        it("should return manager already active error", function(done){
                
                const wsClient2 = require("socket.io-client")("http://localhost:7575");

                let currentUsers = undefined;

                wsClient.on("connect", ()=> {
                    wsClient.emit("new-user", {role: "manager", id:1113, store: "store1"});
                });

                wsClient2.on("connect", ()=> {
                    wsClient2.emit("new-user", {role: "manager", id:1114, store: "store1"});
                });

                wsClient2.on("current-users", (users)=>{
                    currentUsers = users
                });
        
                wsClient2.on("error", (error)=>{
                    try{
                        expect(currentUsers).to.be.undefined;
                        expect(error).to.exist;
                        expect(error).to.be.eql("manager is already in this store");
                        wsClient2.close();
                        done();
                    }catch(err){
                        wsClient2.close();
                        done(err);
                    }
                })
        });
        
    })

    describe("Driver login", function () {
        it("should update the current users object on driver connection", function (done) {

            wsClient.on("connect", ()=> {
                wsClient.emit("new-user", {role: "manager", id:1115, store: "store1"});

                const wsClient2 = require("socket.io-client")("http://localhost:7575");

                wsClient2.on("connect", ()=>{
                    
                    wsClient2.emit("new-user", {role: "driver", id:1116, store: "store1"});

                    wsClient.on("current-users", (currentUsers)=> {
                        try{
                            expect(Object.keys(currentUsers.users).length).eql(2);
                            expect(currentUsers.manager).to.be.true;
                            expect(currentUsers.users[1115]).eql("manager");
                            expect(currentUsers.users[1116]).eql("driver");
                            wsClient2.close();
                            delete wsClient2
                            done();
                        }catch(err){
                            done(err);
                        }
                    });
                    
                });

            });
            
        });

        it("should return the undefined store", function(done){

            const wsClient2 = require("socket.io-client")("http://localhost:7575");
            
            wsClient2.on("connect", ()=> {
                wsClient2.emit("new-user", {role: "driver", id: 1117, store: "not_a_store"})
            });

            wsClient2.on("error", (error)=>{
                try{
                    expect(error).to.exist;
                    expect(error).to.be.eql("this store does not exist");
                    wsClient2.close();
                    done();
                }catch(err){
                    wsClient2.close();
                    done(err);
                }
            });
        })

        it("should return no manager on store message", function(done){

            const wsClient2 = require("socket.io-client")("http://localhost:7575");
            
            wsClient2.on("connect", ()=> {
                wsClient2.emit("new-user", {role: "driver", id: 1118, store: "store1"})
            });

            wsClient2.on("error", (error)=>{
                try{
                    expect(error).to.exist;
                    expect(error).to.be.eql("there is no manager in this store");
                    wsClient2.close();
                    done();
                }catch(err){
                    wsClient2.close();
                    done(err);
                }
            });
        })
    })

    describe("Spectator login", function () {
        it("shouldn't do anything, until spectator view is added", function (done) {
            const wsClient2 = require("socket.io-client")("http://localhost:7575")

            wsClient2.on("connect", ()=>{
                wsClient2.emit("new-user", {role: "spectator", id: 1119, store: "store1"})
                done();
                wsClient2.close();
            })

        })
    })

    describe("Driver position emitter", function () {
        it("should emit driver position", function (done) {

            let wsClient2 = undefined;

            wsClient.on("connect", ()=> {
                
                wsClient.emit("new-user", {role: "manager", id:1121, store: "store2"});

                
                wsClient2 = require("socket.io-client")("http://localhost:7575")
                
                wsClient2.on("connect", ()=>{   
                    wsClient2.emit("new-user", {role: "driver", id:1122, store: "store2"});
                })

                wsClient.on("current-users", (currentUsers)=> {
                    if(Object.keys(currentUsers.users).length === 2){
                        console.log("driver position emitted")
                        wsClient2.emit("position", {position: {lat: 1, lng: 1}, userId: 1122,  storeId: "store2"})
                    }
                });
                
            });
            
            wsClient.on("d-position", (positionObj) => {
                const {position, userId, storeId} = positionObj;
                wsClient2.close();
                try{
                    expect(positionObj).to.exist
                    expect(position).to.be.a("object");
                    expect(position.lat).eql(1);
                    expect(position.lng).eql(1);
                    expect(userId).to.be.a("number");
                    expect(userId).eql(1122);
                    expect(storeId).to.be.a("string");
                    expect(storeId).eql("store2")
                    done();
                }catch(err){
                    done(err);
                };
            });
        });
    });
});