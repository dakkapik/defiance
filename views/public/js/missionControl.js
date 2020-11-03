// const socket = io('http://localhost:3001')

const driversContainer = document.getElementById('drivers-container')

const getActiveDrivers = async () => {
    const activeDrivers = []
    const drivers = await fetch('https://defiance.herokuapp.com/api/users')
    .then(response=>{
        if (!response.status == 200){
            return response.json()
            .catch(()=>{
                throw new Error(response.status)
            })
            .then(({message})=>{
                throw new Error(message || response.status)
            })
        }
        return response.json()
    })
    drivers.forEach(driver => {
        if(driver.isActive === true){
            activeDrivers.push(driver)
        }
    });
    return activeDrivers
}

const getActiveOrders = async () => {
    const activeOrders = []
    const orders = await fetch('http://defiance.heroku.com/api/orders')
    .then(response=>{
        if (!response.status == 200){
            return response.json()  
            .catch(()=>{
                throw new Error(response.status)
            })
            .then(({message})=>{
                throw new Error(message || response.status)
            })
        }
        return response.json()
    })
    orders.forEach(order=>{
        if(order.status != 'delivered'){
            activeOrders.push(order)
        }
    });
    return activeOrders
}

getActiveDrivers().then(res=>{console.log(res)})
getActiveOrders().then(res=>{console.log(res)})


function addDriver({driver, ordersList}){

    const driverContainer = document.createElement('div')
    driverContainer.style.backgroundColor = 'blue'

    const driverName = document.createElement('h1')
    driverName.innerHTML = driver
    const driverCoords = document.createElement('div')

    const driverX = document.createElement('h2')
    driverX.innerHTML = 'coordsX'
    const driverY = document.createElement('h2')
    driverY.innerHTML = 'coordsY'

    const orderUl = document.createElement('ul')
    orderUl.style.float = 'right'

    if(ordersList){
        for(let i = 0; i < ordersList.length; i++){
            const order = document.createElement('li')
            order.innerText = ordersList[i]
            orderUl.appendChild(order)
        }
    
        driverCoords.append(driverX, driverY)
        driverContainer.append(driverName, driverCoords, orderUl)
        driversContainer.append(driverContainer)
    }else{
        driverCoords.append(driverX, driverY)
        driverContainer.append(driverName, driverCoords)
        driversContainer.append(driverContainer)
    }
        

}

// socket.on('new-user', () => {
//     console.log('new user acknoledged')
//     socket.emit('user-id', {name: 'mission control'})
// })

// socket.on('users', users=>{
//     //make users dinamically appear with a loop
//     // user1.innerHTML = `${users[1].rank}: ${users[1].name}`
// })


// socket.on('mouse-coords', coords=>{
//     console.log(coords)
//     driver1X.innerHTML = coords.x
//     driver1Y.innerHTML = coords.y
// })

// socket.on('driver-coords', coords=>{
//     console.log(coords)
//     driver1X.innerHTML = coords.x
//     driver1Y.innerHTML = coords.y
// })


//need room to talk to each other?
//why do they reconnect?