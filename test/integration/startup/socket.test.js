const socket = require("../../../startup/socket");
const expect = require("chai").expect;
const Http = require("http");

describe("Websocket server tests", function(){

    let server = undefined;
    let io = undefined;

    before(function(done){
        server = Http.createServer(()=>{console.log(" -/- ")});
        io = require("socket.io")(server,{
            cors: {
                origin: "http://localhost:7575",
                methods: ["GET","POST"]
            }
        });
        socket(io);
        server.listen( 7575 ,()=>{
            console.log("BEFORE");
            done();
        });
    });

    after(function(done) {
        if(server){
            io.close(()=>{
                console.log('CLOSING');
            });
            server.on('close', () => {
                console.log('AFTER');
                done();
            });
        }
    });

    it("new-user connect", function(done){

        const wsClient = require("socket.io-client")("http://localhost:7575");
        wsClient.on("connect", ()=> {
            wsClient.emit("new-user", {ms: true, room: "Royal Palm", id: "mission-control"});
        });
        wsClient.on("current-users",(users)=>{
            expect(users).to.be(null)
            done();
        });
        done();
    });
});