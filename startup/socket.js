const logger = require('../middleware/logger')

module.exports = function(io){
    
    let users = []

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

        socket.emit('fuck', 'fuck')

        socket.on('mouse-position', coords=>{
            console.log(coords)
            socket.emit('mouse-coords', {coords})
        })
    })
}