var express = require('express');
var app = express();

app.get('/',function(req, res){
    console.log(req.baseUrl);
    res.status(200);
    res.send("Hello World!!!!!");
});

var server = app.listen(8888,function(){
   var host = server.address().address;
   var port = server.address().port;
   console.log("应用实力，访问地址为 http://%s:%s",host,port)
});