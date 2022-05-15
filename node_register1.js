const express = require('express')
const fs = require('fs')
const path = require('path')
const mysql = require('mysql')
const time = require('./node_time_set1')
const register_router = express.Router()

var connect_data = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'gx628572',
    database: 'my_database1'
}


register_router.get('/register', function (request, response) {
    fs.readFile(path.join(__dirname, './material/register1.html'), 'utf-8', function (err, dataHtml) {
        if (err) {
            console.log(err.message)
            throw err
        }
        request.header("Access-Control-Allow-Origin", "*");
        request.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        request.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
        request.header("cache-control", "no-cache");
        request.header("content-type", "application/json; charset=utf-8");
        request.header('Access-Control-Allow-Origin', '2')
        response.send(dataHtml)
    })
})

register_router.post('/registerData', function (request, response) {
    var url_query = request.query
    request.header("Access-Control-Allow-Origin", "*");
    request.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    request.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    request.header("cache-control", "no-cache");
    request.header("content-type", "application/json; charset=utf-8");
    request.header('Access-Control-Allow-Origin', '2')
    const db = mysql.createConnection(connect_data)
    var query_sql = 'select * from users where username=?'
    var insert_sql = "insert into users (username,password,status) values(?,?,?)"
    db.connect()
    db.query(query_sql, [url_query.account], function (err, data) {
        if (err) {
            console.log(err)
            throw err
        }
        if (data.length != 0) {
            response.send('exit')
        }
        else {
            var insert_db = mysql.createConnection(connect_data)
            insert_db.connect()
            insert_db.query(insert_sql, [url_query.account, url_query.password, 1], function (err) {
                if (err) {
                    console.log(err.message)
                    response.send('false')
                    throw err
                }
                response.send("true")
                console.log('insert ' + url_query.account + "," + url_query.password + ":" + time.get_time_now())
            })
            insert_db.end()
        }
    })
    db.end()

})

module.exports = register_router