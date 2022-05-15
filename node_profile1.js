const express = require('express')
const path = require('path')
const fs = require('fs')
const mysql = require('mysql')
const time = require('./node_time_set1')
const profile_router = express.Router()

const connect_data = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'gx628572',
    database: 'my_database1'
}

profile_router.get('/profile', function (request, response) {
    fs.readFile(path.join(__dirname, './material/personal_profile1.html'), 'utf-8', function (err, dataHtml) {
        if (err) {
            console.log(err.message)
            throw err
        }
        else {
            var query_db = mysql.createConnection(connect_data)
            var query_sql = "select * from users where username=?"
            var user_account = request.query.account
            query_db.connect()
            query_db.query(query_sql, [user_account], function (err, data) {
                if (err) {
                    console.log(err.message)
                    throw err
                }
                else {
                    var replace_account = data[0].username
                    var replace_password = data[0].password
                    var replace_status = data[0].status
                    dataHtml = dataHtml.replace('@account', replace_account)
                    dataHtml = dataHtml.replace('@password', replace_password)
                    if (replace_status == 0) {
                        dataHtml = dataHtml.replace('<option value="0">0</option>', '<option value="@0">@0</option>')
                        dataHtml = dataHtml.replace('<option value="1">1</option>', '<option value="0">0</option>')
                        dataHtml = dataHtml.replace('<option value="@0">@0</option>', '<option value="1">1</option>')
                    }
                    request.header("Access-Control-Allow-Origin", "*");
                    response.send(dataHtml)
                }
            })
            query_db.end()

        }
    })
})

profile_router.post('/update', function (request, response) {
    var origin_account = request.query.origin_account
    var new_account = request.query.new_account
    var password = request.query.password
    var status = Number(request.query.status)
    var update_db = mysql.createConnection(connect_data)
    var update_sql = 'update users set username=?,password=?,status=? where username=?'
    update_db.connect()
    update_db.query(update_sql, [new_account, password, status, origin_account], function (err, result) {
        if (err) {
            console.log(err)
            response.send('false')
            throw err
        }
        else {
            response.send('true')
            console.log('update ' + new_account + "," + password + "," + status + ":" + time.get_time_now())
        }
    })
    update_db.end()
})

profile_router.post('/delete', function (request, response) {
    var account = request.query.account;
    var delete_db = mysql.createConnection(connect_data)
    var delete_sql = 'delete from users where username=?'
    delete_db.connect()
    delete_db.query(delete_sql, [account], function (err) {
        if (err) {
            console.log(err.message)
            response.send("false")
            throw err
        }
        else {
            response.send('true')
            console.log('delete ' + account + ':' + time.get_time_now())
        }
    })
    delete_db.end()
})

module.exports = profile_router