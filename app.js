const express=require('express');
const mongoConnect=require('./utils/database').mongoConnect;
const session=require('express-session');
const mongodbstore=require('connect-mongodb-session')(session);
const path=require('path');
const routing=require('./routes/routing');
const addstudent=require('./controllers/addstudent');
const loginroute=require('./routes/loginroute');
const dashboardroute=require('./routes/dashboardroute');
const personal_details=require('./routes/personaldetailsroute');
const doc_upload=require('./routes/docuploadroute');
const syllabus=require('./routes/syllabusroute');

const anhour=60*60*1000;
const app=express();
const store_session= new mongodbstore({
    uri:'mongodb+srv://Chulbul:uiet123@cluster0.o92arat.mongodb.net/studentrecord?w=majority',
    Collection:'sessions'
})
const port=3000
const store=new mongodbstore({
    uri:'mongodb+srv://Chulbul:uiet123@cluster0.o92arat.mongodb.net/studentrecord?w=majority',
    collection:'sessions'
})

// session configurations
app.use(session({
    secret:'workingdreams',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:anhour},
    store:store
}))

// viewing engine
app.set('view engine','ejs');


// hosting the static files, CSS, js, images
app.use(express.static(path.join(__dirname,"public")))

// session configuration
app.use(session({
    secret:'anotherdream',
    resave:false,
    saveUninitialized:false,
    store:store_session,
}));

// routers
app.use(routing);
app.use(loginroute);
app.use(personal_details);
app.use(dashboardroute);
app.use(doc_upload);
app.use(syllabus);


// addstudentusingform
app.use(addstudent);

// incase if pagenotfound is reached
app.use('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','404dummy.html'))
})

// listening port
mongoConnect(()=>{
    console.log("database server connected (from app.js)");
    app.listen(port,()=>{console.log(`this app is listening to port:${port}`)})
});