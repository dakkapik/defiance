const socket = io('http://localhost:3001')
const title = document.getElementById('drivers-container-title')
const driversContainer = document.getElementById('drivers-container')
const storeSelect = document.getElementById('store-select')
const storeButton = document.getElementById('store-button')

storeButton.addEventListener('click', ()=>socket.emit('store-login', storeSelect.value))

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
    console.log(activeDrivers)
    return activeDrivers
}

const getActiveOrders = async () => {
    const activeOrders = []
    const orders = await fetch('https://defiance.herokuapp.com/api/orders')
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

const getData = async () => {

    const drivers = await getActiveDrivers()

    const orders = await getActiveOrders()

    const orderArrayMock = [[orders[0],orders[1]], [orders[2]]]
    //this should be handled by server before getting here

    return {drivers, orders: orderArrayMock}

}

getData().then(res=>addDrivers(res.drivers, res.orders))



function addDrivers(drivers, orders){
    
    for(let i = 0; i < drivers.length; i++){

        const driverContainer = document.createElement('div')
        driverContainer.addEventListener('click', ()=>{console.log(drivers[i].firstName)})
        driverContainer.style.backgroundColor = 'rgb(248, 92, 92)'
        driverContainer.style.borderRadius = '10px'
        driverContainer.style.paddingLeft = '12px'
        driverContainer.style.paddingRight = '12px'
        driverContainer.style.marginLeft = '4px'
        driverContainer.style.marginRight = '4px'
        driverContainer.style.marginTop = '10px'
        driverContainer.style.marginBottom = '10px'

        const driverName = document.createElement('h2')
        driverName.innerHTML = `${drivers[i].firstName}: ${drivers[i].employeeId}`
        driverName.style.width = '50%'
        driverName.style.margin = '0'

        const driverCoords = document.createElement('div')
    
        const driverX = document.createElement('h3')
        driverX.style.width = '50%'
        driverX.style.margin = '0'
        driverX.innerHTML = 'coordsX'
        driverX.id = `x-${drivers[i].employeeId}`
        
        const driverY = document.createElement('h3')
        driverY.style.width = '50%'
        driverY.style.margin = '0'
        driverY.innerHTML = 'coordsY'
        driverY.id = `y-${drivers[i].employeeId}`
    
        const orderUl = document.createElement('ul')
        orderUl.style.float = 'right'
        orderUl.style.margin = '0'
        
        if(orders[i]){
            for(let o = 0; o < orders[i].length; o++){
                const order = document.createElement('li')
                order.innerText = orders[i][o].address
                orderUl.appendChild(order)
            }
        
            driverCoords.append(driverX, driverY)
            driverContainer.append(orderUl,driverName,  driverCoords)
            driversContainer.append(driverContainer)
        }else{
            driverCoords.append(driverX, driverY)
            driverContainer.append(driverName, driverCoords)
            driversContainer.append(driverContainer)
        }

    }

    // window.addEventListener('mousemove', e =>{
    //     for(i = 0; i<drivers.length; i++){
    //         let x = document.getElementById(`x-${drivers[i].employeeId}`)
    //         x.innerHTML = e.clientX
    //         let y = document.getElementById(`y-${drivers[i].employeeId}`)
    //         y.innerHTML = e.clientY
    //     }
    // })

    socket.on('user-connected', stores=>{
        console.log(stores)
    })

    socket.on('driver-coords', coords=>{
        console.log(coords)
        let x = document.getElementById(`x-${coords.id}`)
        let y = document.getElementById(`y-${coords.id}`)

        x.innerHTML = `latitude: ${coords.latitude}`
        y.innerHTML = `longitude: ${coords.longitude}`
    })

    socket.on('test-message',text=>console.log(text))
    
}
socket.on('store-online', (stores)=> {
    console.log(stores)
})


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




//need room to talk to each other?
//why do they reconnect?