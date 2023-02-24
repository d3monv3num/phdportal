const express=require('express');
const path=require('path');
const routing=require('./controllers/routes/routing');
const mongoConnect=require('./utils/database');

const app=express();
const port=3000


// hosting the static files, CSS, js, images
app.use(express.static(path.join(__dirname,"public")))

// routers
app.use(routing)

// incase if pagenotfound is reached
app.use('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','404dummy.html'))
})

// listening port
mongoConnect(client=>{
    console.log(client);
    app.listen(port,()=>{console.log(`this app is listening to port:${port}`)})
});