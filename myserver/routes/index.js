var express = require('express');
var router = express.Router();

var mysql = require("mysql");
var sql = require("../bin/mysql");
var $sql = mysql.createConnection(sql.mysql);
$sql.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.query);
    var select = "select * from user";
    $sql.query(select,(err,success)=>{
        if(err){
            console.error("Error：",err);
        }else{
          res.send(JSON.stringify(success));
        }
    });
});

module.exports = router;
