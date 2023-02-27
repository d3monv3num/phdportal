const express=require('express');
const path=require('path');
const routing=require('./controllers/routes/routing');
const addstudent=require('./controllers/addstudent');
const mongoConnect=require('./utils/database').mongoConnect;

const app=express();
const port=3000

// viewing engine
app.set('view engine','ejs');

// hosting the static files, CSS, js, images
app.use(express.static(path.join(__dirname,"public")))

// routers