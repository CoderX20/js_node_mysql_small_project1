const mysql=require('mysql')
const fs=require('fs')
const path=require('path')
const express=require('express')
const time=require('./node_time_set1')
const login_router=express.Router()
login_router.get('/login',(request,response)=>{
    fs.readFile(path.join(__dirname,'./material/login1.html'),'utf-8',(err,dataHtml)=>{
        if(err){
            throw err
        }
        else{
            response.send(dataHtml)
        }
    })
})

login_router.post('/loginCheck',(request,response)=>{
    const db=mysql.createConnection({
        host:'127.0.0.1',
        port:'3306',
        user:'root',
        password:'gx628572',
        database:'my_database1'
    })
    var sql_quey_str="select * from users where username=? and password=?"
    var url_quey=request.query;
    console.log(request.method+request.url+":"+time.get_time_now())
    request.header("Access-Control-Allow-Origin", "*");
    request.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    request.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    request.header("cache-control", "no-cache");
    request.header("content-type", "application/json; charset=utf-8");
    request.header('Access-Control-Allow-Origin','2')
    db.connect((err)=>{
        if(err){
            console.log(err.message)
            throw err
        }
    })
    db.query(sql_quey_str,[url_quey.account,url_quey.password],(err,data)=>{
        if(err){
            console.log(err.message)
            throw err
        }
        else{
            // console.log(data)
            if(data.length==0){
                response.send('false')
            }
            else{
                response.send('true')
            }
        }
    })
    db.end()
})

module.exports=login_router