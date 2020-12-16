const socket = io('https://defiance.herokuapp.com')
const title = document.getElementById('drivers-container-title')
const driversContainer = document.getElementById('drivers-container')
const storeSelect = document.getElementById('store-select')
const storeButton = document.getElementById('store-button')


// storeButton.addEventListener('click', ()=>socket.emit('new-user', {number: storeSelect.value}))
// REMEMBER THIS FOR LOG IN^^^^^

socket.emit('new-user', {number: "store", role: 'MS'})
const getStores = async () => {
    const stores = await fetch('http://defiance.herokuapp.com/api/stores')
    .then(response=>{
        if(!response.status == 200){
            return response.json()
            .catch(()=>{
                throw new Error(response.status)
            })
            .then(({message})=>{
                throw new Error(message || response.status)
            })
        }
        return respnsoe.json()
    })
    stores.forEach(stores=>console.log(stores))
}



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
    // console.log(activeDrivers)
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

    socket.on('driver-location', location=>{
        // console.log(location)
        let x = document.getElementById(`x-${location.id}`)
        let y = document.getElementById(`y-${location.id}`)

        x.innerHTML = `latitude: ${location.coords.latitude}`
        y.innerHTML = `longitude: ${location.coords.longitude}`
    })
    
}


//need room to talk to each other?
//why do they reconnect?