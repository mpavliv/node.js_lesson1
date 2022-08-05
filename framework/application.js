const http = require('http');
const EventEmmiter = require('events');

module.exports = class Application{
    constructor(){
        this.emitter = new EventEmmiter();
        this.server = this._createServer(); 
    }

    addRouter(router){
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach(method => {
                const handler = endpoint[method]; 
            })
        })
    }

    _createServer(){
        return http.createServer((req, res) => {
            const emitted = this.emitter.emit(this._getRoutMask(req.url, req.method), req, res);
            if (!emitted){
                res.end();
            }
        });
    }

    _getRoutMask(path, nethod){
        return `[${url}]:[${method}]`
    }

}