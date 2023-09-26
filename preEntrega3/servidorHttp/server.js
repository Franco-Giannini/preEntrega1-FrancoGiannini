const http = require ('http');
// con http creo mi primer seervidor backend
const server = http.createServer((req, res) => {
    res.end('Primer hola mundo desde back-end');
}); 

server.listen(8080, () =>{
    console.log('listening on port 8080');
});
