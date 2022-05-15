const express=require('express')
const path=require('path')
const fs=require('fs')
const time=require('./node_time_set1')
const login_router=require('./node_login1')
const register_router=require('./node_register1')
const profile_router=require('./node_profile1')
const app=express()


app.use(express.static('./material/'))
app.use(express.urlencoded({extended:false}))
app.use(login_router)
app.use(register_router)
app.use(profile_router)
app.listen(5500,function(){
    console.log("server running at http://127.0.0.1:5500/login/ when "+time.get_time_now())
})