let facePlusPlus=require('./module/facePlusPlus');
var express = require('express');
const { response } = require('express');
var app = express();

app.use('/', express.static('static'))

app.post('/api/face-plus-plus-emotion-detect', function (req, res) {
   // TODO
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Express listening at http://%s:%s", host, port)
})