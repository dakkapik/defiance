const socket = io('http://localhost:3001')
const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')

const mousePosition = document.getElementById('mouse-position')

socket.on('new-user', () => {
    socket.emit('user-id', {name: 'driver 1'})
})

startButton.addEventListener('click', ()=>{
    console.log('add event')
    document.addEventListener('mousemove', handleMouseMove)
})


stopButton.addEventListener('click', ()=>{
    console.log('remove event')
    document.removeEventListener('mousemove', handleMouseMove)
})

function handleMouseMove(e){
    mousePosition.innerHTML=`X: ${e.clientX} Y: ${e.clientY}`
    socket.emit('mouse-position', {x: e.clientX, y: e.clientY})
}