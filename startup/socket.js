const logger = require('../middleware/logger')

module.exports = async function(io){

    const users = {}
    const rooms = {}

    io.on('connection', (socket)=> {

        socket.on('new-user', user => {
            
            console.log(`user: ${user.id} joined room ${user.room}`)
            users[socket.id] = user.id

            socket.join(user.room)
            
            
            if(user.ms){
                rooms[user.room] = {users:{}}
                socket.emit('current-users', rooms[user.room])
            }else{
                rooms[user.room].users[socket.id] = user.id
                socket.to(user.room).emit('new-user', rooms[user.room])
            }
        })

        socket.on('message', (store)=>{
            console.log(rooms)
        })

        socket.on('position', (position, id, store)=>{
            socket.to(store).emit('d-position', position, id)
        })

        socket.on('disconnect', reason =>{
            console.log(`user: ${socket.id} disconnected, ${reason}`)
            delete users[socket.id]
            // console.log(users)
        })
    })
}