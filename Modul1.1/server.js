
// obtinem modulul http al NodeJs
// const http = require('http');

// const server = http.createServer();
      
// // metoda .on() functioneaza similar cu .addEventListener()
// server.on('request',(request,response)=>{
//    response.writeHead(200,{'Content-Type':'text/plain'});
//    response.write('Hello world \n');
//    response.write('Gura PSD!');
//    response.end();
// });

// server.listen(3000,()=>{
//   console.log('Node server created at port 3000');
// });


const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
    fs.readFile('mywebpage.html', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
});
server.listen(3000);
fs.readFile()