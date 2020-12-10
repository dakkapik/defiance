const { eventNames } = require('../middleware/logger')
const logger = require('../middleware/logger')

module.exports = async function(io){

    const users = {}
    const rooms = {}

    io.on('connection', (socket)=> {

        socket.on('new-user', user => {
            
            //this part need to be refactored

            console.log(`user: ${user.id} joined room ${user.room}`)
            users[socket.id] = user.id

            socket.join(user.room)
            
            if(user.ms){
                // room needs to be iniciated somewhere else, on store disconnect everyone has to disconnect and reconnect
                rooms[user.room] = {users:{}}
                socket.emit('current-users', rooms[user.room])
            }else{

                if(rooms[user.room]){
                    rooms[user.room].users[socket.id] = user.id
                    socket.to(user.room).emit('current-users', rooms[user.room])
                }else{
                    //room not avalible 
                }
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

            // delete user room if MS

            getUserRooms(socket).forEach(room=>{
                delete rooms[room].users[socket.id]
                socket.broadcast.emit('current-users', rooms[room])
            })
            
        })
    })

    function getUserRooms (socket) {
        return Object.entries(rooms).reduce((ids, [id, room])=>{
            if(room.users[socket.id] != null) ids.push(id)
            return ids
        }, [])
    }
}