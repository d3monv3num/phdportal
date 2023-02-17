const express=require('express')
const path=require('path')
const routing=require('./controllers/routes/routing')
const app=express();
const port=3000
app.use(express.static(path.join(__dirname,"public")))
app.use(routing)
app.use('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','404dummy.html'))
})
app.listen(port,()=>{console.log(`this app is listening to port:${port}`)})