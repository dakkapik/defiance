// const socket = io('http://localhost:3001')

const driversContainer = document.getElementById('drivers-container')

const drivers = ['felipe', 'george', 'jesus', 'jack', 'joon','allan']
const orders = [['115 fukc you', 'eat my ass ave', 'he he popo'], ['big ass bigg tits', 'death death death', 'good good']]

// drivers.forEach(addDriver(drivers))

for(let i = 0; i < drivers.length; i++){

    addDriver({driver: drivers[i], ordersList: orders[i]})
}

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
    console.log(driver)
    console.log(ordersList)
    
    const orderUl = document.createElement('ul')
    orderUl.style.float = 'right'

    for(let i = 0; i < ordersList.length; i++){
        const order = document.createElement('li')
        order.innerText = ordersList[i]
        orderUl.appendChild(order)
    }
    driverCoords.append(driverX, driverY)
    driverContainer.append(driverName, driverCoords)
    driverContainer.append(orderUl)
    driversContainer.append(driverContainer)

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