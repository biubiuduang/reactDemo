var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var sql = require("../bin/mysql");
var $sql = mysql.createConnection(sql.mysql);
$sql.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.query);
    var del = "delete from user where id=5";
    $sql.query(del,(err,success)=>{
        if(err){
            console.error("Error：",err);
        }else{
            res.send('success');
        }
    });
});

module.exports = router;
