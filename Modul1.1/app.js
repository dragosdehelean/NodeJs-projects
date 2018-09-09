// console.log("Hello World");
// console.error("Uups! There was a problem");

var myLogModule = require('./Log.js');

const http = require('http');

const server = http.createServer();



myLogModule.error('mesaj aleatoriu de eroare');

console.log(myLogModule.nume);


