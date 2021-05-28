let facePlusPlus=require('./module/facePlusPlus');
var express = require('express');

var app = express();
app.use(express.urlencoded({extended: true, limit: '50mb'})); //TODO
app.use(express.json({limit: '50mb'}))

app.use('/', express.static('static'))

app.post('/api/face-plus-plus-emotion-detect', function (req, res) {
   let imgBase64Data = req.body.base64Data;
   facePlusPlus.facePlusPlusEmotionDetect(imgBase64Data).then(response=>{res.send(response)});
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Express listening at http://%s:%s", host, port)
})