const http = require('http');
const EventEmmiter = require('events');
const PORT = 5000
const Router = require('./framework/router')
const emitter = new EventEmmiter();




const router = new Router();

router.get('/users', (req, res) => {
    res.end('you send request to /USERS')
})

router.get('/ttf', (req, res) => {
    res.end('you send request to /TTF')
})


const server = http.createServer()

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))