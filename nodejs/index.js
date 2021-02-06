//dependencias nodeJS
const http = require('http');
const requestHandler = require('./request-handler')

const server = http.createServer(requestHandler);

/* server.on('clientError', (err,socket) =>{
    socket.end('HTTP 400 bad Request')
}); */
server.listen(5000, ()=> console.log('el servidor esta on en http://localhost:5000/'));