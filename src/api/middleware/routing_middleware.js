const express=require('express')
const path=require('path');
const routing=require('../routes/routing');
const loginroute=require('../routes/loginroute');
const dashboardroute=require('../routes/dashboardroute');
const personal_details=require('../routes/personaldetailsroute');
const doc_upload=require('../routes/docuploadroute');
const syllabus=require('../routes/syllabusroute');
const createnotice=require('../routes/createnoticeroute');

const app=express();

app.set('views', path.join(__dirname,'..', 'views'));
app.set('view engine','ejs');

app.use(routing);
app.use(loginroute);
app.use(personal_details);
app.use(dashboardroute);
app.use(doc_upload);
app.use(syllabus);
app.use(createnotice);


module.exports=app;