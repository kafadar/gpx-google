var express = require('express');
var multer = require('multer');
var fs = require('fs');
var xml = require('xml2js');

var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views');
app.use(express.static(__dirname + '/app'));

app.use(multer({
    dest: './uploads/'
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();
});

require('./routes/routes')(app, xml, fs);

app.listen(port, function () {
    console.log("GpxVIEWER http://localhost:" + port);
});
