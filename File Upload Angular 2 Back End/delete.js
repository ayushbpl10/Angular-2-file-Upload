// var express = require("express");
// var bodyParser = require("body-parser");
// var app = express();


// // Add headers
// app.use(function(req, res, next) {



//     // Pass to next layer of middleware
//     next();
// });

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.use(bodyParser.json());
// var http = require('http'),




// const FilesFolder = './uploads/';



// const testFolder = './uploads/';

// var server = http.createServer(function(req, res) {

//     console.log(req.body.filename);


//     // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // res.writeHead(200, { "Content-Type": "application/json" });

//     // var array = [];
//     // var filename;
//     // var data;
//     // var object = {};

//     // var json;


//     // filename = `./uploads/${files[i]}`;
//     // var filePath = 'c:/book/discovery.docx';
//     // fs.unlinkSync(filePath);
//     // console.log(filename);

//     // object = {
//     //     filename: filename
//     // };
//     // array.push(object);


//     // console.log('Server running at http://localhost:4500/');

//     // console.log(array.length);
//     // json = JSON.stringify(array);
//     // 
//     // res.end(json);
//     // 



// })



// server.on('listening', function() {
//     console.log('ok, server is running at 4500');
// });

// server.listen(4500);

var http = require('http');
fs = require('fs');

http.createServer(function(request, response) {
    var headers = request.headers;
    var method = request.method;
    var url = request.url;
    var body = [];
    request.on('error', function(err) {
        console.error(err);
    }).on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();
        console.log(body);
        filename = body;
        fs.unlinkSync(filename);
        // Website you wish to allow to connect
        response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

        // Request methods you wish to allow
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        //res.writeHead(200,);
        response.writeHead(200, { "Content-Type": "application/json" });
        //res.write('<html><body><div id="new">');
        json = JSON.stringify({ value: true });
        response.end(json);
        // At this point, we have the headers, method, url and body, and can now
        // do whatever we need to in order to respond to this request.
    });

}).listen(4500); // Activates this server, listening on port 8080.