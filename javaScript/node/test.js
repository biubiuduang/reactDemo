var mysql  = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '980457',
    port: '3306',
    database: 'db_whb'
});

connection.connect();

var  addSql = 'INSERT INTO user(Id,name,age) VALUES(0,?,?)';
var  addSqlParams = ['runoob', '5'];
//增
connection.query(addSql,addSqlParams,function (err, result) {
    if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
    }

    console.log('--------------------------INSERT----------------------------');
    //console.log('INSERT ID:',result.insertId);
    console.log('INSERT ID:',result);
    console.log('-----------------------------------------------------------------\n\n');
});

connection.end();