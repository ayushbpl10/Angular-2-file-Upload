var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var x = 0;
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + x + '-' + file.originalname);
        x++;
    }


})

app.post("/upload", multer({ storage: storage }).array("uploads[]", 12), function(req, res) {
    res.send(req.files);
    x++;
});





var server = app.listen(4200, function() {
    console.log("Listening on port %s...", server.address().port);
});