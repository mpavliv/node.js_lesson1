const http = require('http');
const EventEmmiter = require('events');
const PORT = 5000

const emitter = new EventEmmiter();


class Router{
    constructor(){
        this.endpoints = {}
    }

    request(method = 'GET', path, handler){
        if (!this.endpoints[path]){
            this.endpoints[path] = {}
        }
        const endpoint = this.endpoints[path];
        if (endpoint[method]){
            throw new Error(`[${method}] on address ${path} already exist`)
        }
        endpoint[method] = handler
        emitter.on(`[${path}]:[${method}]`, (req, res) => {
            handler(req, res);
        })
    }

    get(path, handler){
        this.request('GET', path, handler);
    }

    post(path, handler){
        this.request('POST', path, handler);
    }

    put(path, handler){
        this.request('PUT', path, handler);
    }

    delete(path, handler){
        this.request('DELETE', path, handler);
    }
}


const router = new Router();

router.get('/users', (req, res) => {
    res.end('you send request to /USERS')
})

router.get('/ttf', (req, res) => {
    res.end('you send request to /TTF')
})


const server = http.createServer((req, res) => {
    const emitted = emitter.emit(`[${req.url}]:[${req.method}]`, req, res);
    if (!emitted){
        res.end();
    }
})

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))