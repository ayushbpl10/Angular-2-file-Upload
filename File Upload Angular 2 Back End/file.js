var express = require("express");
var bodyParser = require("body-parser");
var app = express();


// Add headers
app.use(function(req, res, next) {



    // Pass to next layer of middleware
    next();
});

var http = require('http'),
    fs = require('fs');

const FilesFolder = './uploads/';

//var array = [];
// calendars.forEach(function(item) {
//     array.push(item.id);
// });


// fs.readdirSync(FilesFolder, (err, files) => {
//     if (err) throw err;
//     files.forEach(file => {
//         console.log(file);

const testFolder = './uploads/';

var server = http.createServer(function(req, res) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);


    //res.writeHead(200,);
    res.writeHead(200, { "Content-Type": "application/json" });
    //res.write('<html><body><div id="new">');

    var files = fs.readdirSync('./uploads/');
    var array = [];
    var filename;
    var data;
    var object = {};

    var filetosend;
    var json;

    for (var i in files) {

        filename = `./uploads/${files[i]}`;
        console.log(filename);

        data = fs.readFileSync(filename);
        //if (err) throw err; // Fail if the file can't be read.
        //
        // calendars.forEach(function(item) {
        filetosend = new Buffer(data).toString('base64');
        // array.push(filetosend);
        object = {
            file: filetosend,
            filename: filename
        };
        array.push(object);

        // });
        //res.write('<img width="200px" height="200px" name="' + filename + '" src="data:image/jpeg;base64,');

        //res.write('"/>');

        console.log('Server running at http://localhost:4300/');
    }
    console.log(array.length);
    json = JSON.stringify(array);
    //res.write(array);
    res.end(json);
    //res.end('</div></body></html>');



})



server.on('listening', function() {
    console.log('ok, server is running');
});

server.listen(4300);
// var express = require("express");
// var bodyParser = require("body-parser");
// var app = express();


// // Add headers
// app.use(function(req, res, next) {



//     // Pass to next layer of middleware
//     next();
// });

// var http = require('http'),
//     fs = require('fs');

// const FilesFolder = './uploads/';

// //var array = [];
// // calendars.forEach(function(item) {
// //     array.push(item.id);
// // });





// // fs.readdirSync(FilesFolder, (err, files) => {
// //     if (err) throw err;
// //     files.forEach(file => {
// //         console.log(file);

// fs.readFile('./uploads/img-submit-your-story.png', function(err, data) {
//     if (err) throw err; // Fail if the file can't be read.

//     http.createServer(function(req, res) {
//         // Website you wish to allow to connect
//         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//         // Request methods you wish to allow
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//         // Request headers you wish to allow
//         //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//         // Set to true if you need the website to include cookies in the requests sent
//         // to the API (e.g. in case you use sessions)
//         //res.setHeader('Access-Control-Allow-Credentials', true);


//         res.writeHead(200, { 'Content-Type': 'text/html' });

//         res.write('<html><body><img width="200px" height="200px" src="data:image/jpeg;base64,');
//         res.write(new Buffer(data).toString('base64'));
//         res.end('"/></body></html>');

//     }).listen(4300);
//     console.log('Server running at http://localhost:4300/');
// });

//single object code
// for (var i in files) {

//         filename = `./uploads/${files[i]}`;
//         console.log(filename);

//         data = fs.readFileSync(filename);
//         //if (err) throw err; // Fail if the file can't be read.
//         //
//         // calendars.forEach(function(item) {
//         filetosend = new Buffer(data).toString('base64');
//         // array.push(filetosend);
//         object[[filename]] = filetosend;


//         // });
//         //res.write('<img width="200px" height="200px" name="' + filename + '" src="data:image/jpeg;base64,');

//         //res.write('"/>');

//         console.log('Server running at http://localhost:4300/');
//     }
//     array.push(JSON.stringify(object));
//     json = JSON.stringify(array);
//     //res.write(array);
//     res.end(json);
//     //res.end('</div></body></html>');