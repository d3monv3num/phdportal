const path=require('path');
const express=require('express');
const mongoose=require('mongoose');
const session=require('express-session');
const mongoConnect=require('./config/utils/database').mongoConnect;
const mongodbstore=require('connect-mongodb-session')(session);
const addstudent=require('./api/controllers/addstudent');
const routing_middleware=require('./api/middleware/routing_middleware');
const addnotice=require('./api/controllers/addnotice');

const anhour=1*60*60*1000;
const app=express();
const port=3000
const store=new mongodbstore({
    uri:'mongodb+srv://Chulbul:uiet123@cluster0.o92arat.mongodb.net/studentrecord?w=majority',
    collection:'sessions'
})

// session configurations
app.use(session({
    secret:'workingdreams',
    cookie:{maxAge:anhour},
    resave:false,
    saveUninitialized:false,
    store:store
}))

// viewing engine
app.set('views', path.join(__dirname,'api', 'views'));
app.set('view engine','ejs');

// hosting the static files, CSS, js, images
app.use(express.static(path.join(__dirname,'api',"public")))

// routing middleware
app.use(routing_middleware);

// addstudentusingform
app.use(addstudent);

// addnotice
app.use(addnotice);

// incase if pagenotfound is reached
app.use('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','404dummy.html'))
})

mongoConnect(()=>{console.log(`connection for sessions check is made`)});
// listening port
mongoose.connect('mongodb+srv://Chulbul:uiet123@cluster0.o92arat.mongodb.net/studentrecord?w=majority')
.then(result=>{
    app.listen(port,()=>{console.log(`this app is listening to port:${port}`)});
})
.catch(err=>{
    console.log(`error in connection to database on app.js page:\n ${err}`);
})