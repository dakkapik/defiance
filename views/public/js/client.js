const socket = io('http://localhost:3001')
const button = document.getElementById('start')
const mousePosition = document.getElementById('mouse-position')

socket.on('new-user', () => {
    socket.emit('user-id', {name: 'driver 1'})
})

button.addEventListener('click', ()=>{
    console.log('clicked')
    let mouse
    window.addEventListener('mousemove', (e)=>{
        
        socket.emit('mouse-position', {x: e.clientX, y: e.clientY})
    })
})