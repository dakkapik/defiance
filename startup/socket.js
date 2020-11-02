const logger = require('../middleware/logger')

module.exports = function(io){
    
    const rooms = {}
    const users = []

    io.on('connection', socket =>{
        logger.log('info', 'new connection')
        
        socket.emit('new-user')
        
        socket.on('user-id', message => {
            if(message.name == 'mission control'){
                socket.id = 'Mission Control'
                users.push({rank: 'admin', name: socket.id})
            }else{
                socket.id = message.name
                users.push({rank: 'driver', name: socket.id})
            }
            console.log(users)
            socket.emit('users', users)
        })

        socket.on('mouse-position', coords=>{

            io.emit('mouse-coords', coords)
        })

        socket.on('driver-position', coords=>{
            console.log(coords)
            io.emit('driver-coords', coords)
        })
    })
}