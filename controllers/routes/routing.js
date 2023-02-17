const express=require('express')
const path=require('path')
const router=express.Router()

router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,"..","..","views","index.html"))
})
router.get('/index.html',(req,res,next)=>{
    res.sendFile(path.join(__dirname,"..","..","views","index.html"))
})
router.get('/registration.html',(req,res,next)=>{
    res.sendFile(path.join(__dirname,"..","..","views","registration.html"))
})
module.exports=router