const logger = require('../middleware/logger')

module.exports = function(io){
    
    const stores = {}

    io.on('connection', socket =>{
        //new user takes 2 args, user.number  and user.role
        console.log('new user: ' + socket.id)
        socket.emit('message','message')

        // socket.on('new-user', (user)=>{
        //     socket.id = user.number
        //     logger.log('info', `new connection: ${socket.id}`)
        //     if(user.role === 'driver'){
        //         io.emit('new-driver', user.number)
        //     }else if(user.role === 'store'){
        //         io.emit('new-store', user.number)
        //     }
        // })

        socket.on('message', (message)=>{
            console.log(`${socket.id}: ${message}`)
        })

        socket.on('user-location', (coords)=>{
            io.emit('driver-location', {id: socket.id, coords})
        })

        socket.on('disconnect', (reason)=>{
            logger.log('info',`${socket.id} disconnected: ${reason}`)
            
            io.emit('driver-disconnected', socket.id)
            
        })





        // console.log(Object.keys(io.sockets.sockets))

        // socket.on('store-login', store=>{
        //     stores[store] = {users:{}}
        //     stores[store].users[socket.id] = (store + ' MS')
        //     socket.join(store)
        //     console.log(`${store} is now online`)
        //     io.to(store).emit('store-online', stores)
        //     console.log(stores)
        //     console.log(Object.keys(io.sockets.sockets))
        //     // if store doesn't recieve this back, not online on store
        // })
        
        // //CREATE COMPREHENSIVE CONNECT DISCONNECT FOR MOBILE USER

        // socket.on('user-online', user => {
            
        //     if(Object.keys(stores).includes(user.store)){
        //         // console.log('store online')
        //         console.log(user.id)
        //         socket.join(stores[user.store])
        //         stores[user.store].users[socket.id] = user.id

        //         socket.to(user.store).emit('test-message','this is test message')
        //         console.log(stores)
        //         console.log(socket.rooms)
        //     }else{
        //         socket.emit('store-offline')
        //         console.log('store offline')
        //         return
        //     }

        //     // console.log(Object.keys(stores))
        //     // console.log(user)
            
        //     // stores[store] = {users:{}}
        //     // stores[user.store].users[socket.id] = user.id

        //     // socket.to(user.store).broadcast.emit('user-connected', stores)
        //     // console.log(stores)
        //     // console.log(io)

        //     // socket.on('driver-position', coords=>{
        //     //     console.log(coords)
        //     //     io.to(user.store).broadcast.emit('driver-coords', coords)
        //     // })
        // })

        // socket.on('user-offline', user => {
        //     console.log(`user: ${user.id} has gonne offline`)
        // })

        // socket.on('user-id', message => {
        //     if(message.name == 'mission control'){
        //         socket.id = 'Mission Control'
        //         users.push({rank: 'admin', name: socket.id})
        //     }else{
        //         socket.id = message.name
        //         users.push({rank: 'driver', name: socket.id})
        //     }
        //     console.log(users)
        //     socket.emit('users', users)
        // })
    })

}