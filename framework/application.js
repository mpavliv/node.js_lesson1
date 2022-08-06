const http = require('http');
const EventEmmiter = require('events');

module.exports = class Application{
    constructor(){
        this.emitter = new EventEmmiter();
        this.server = this._createServer(); 
        this.middlewares = [];
    }

    listen(port, callback){
        this.server.listen(port, callback);
    }

    addRouter(router){
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach(method => {
                this.emitter.on(this._getRoutMask(path, method), (req, res) => {
                    const handler = endpoint[method];     
                    this.middlewares.forEach(middleware => middleware(req, res));
                    handler(req, res);
                })    
            })
        })
    }

    use(middleware){
        this.middlewares.push(middleware);
    }

    _createServer(){
        return http.createServer((req, res) => {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            })
            req.on('end', () => {
                if (body) {
                    req.body = JSON.parse(body);
                }
                const emitted = this.emitter.emit(this._getRoutMask(req.url, req.method), req, res);
                if (!emitted){
                    res.end();
                }
            })
        });
    }

    _getRoutMask(path, method){
        return `[${path}]:[${method}]`
    }

}