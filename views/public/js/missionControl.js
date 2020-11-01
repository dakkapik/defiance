const socket = io('http://localhost:3001')

const driver1X = document.getElementById('driver1X')
const driver1Y = document.getElementById('driver1Y')
const driver2X = document.getElementById('driver2X')
const driver2Y = document.getElementById('driver2Y')

const user1 = document.getElementById('user-1')
const user2 = document.getElementById('user-2')
const user3 = document.getElementById('user-3')

driver2X.innerHTML = 'position X'
driver2Y.innerHTML = 'position Y'


socket.on('new-user', () => {
    console.log('new user acknoledged')
    socket.emit('user-id', {name: 'mission control'})
})

socket.on('users', users=>{
    //make users dinamically appear with a loop
    // user1.innerHTML = `${users[1].rank}: ${users[1].name}`
})

socket.on('fuck', fuck=>{
    console.log(fuck)
})

socket.on('something', coords=>{
    console.log(coords)
    driver1X.innerHTML = coords.clientX
    driver1Y.innerHTML = coords.clientY
})

//need room to talk to each other?
//why do they reconnect?