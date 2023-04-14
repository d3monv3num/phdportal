const express=require('express');
const path=require('path');
const bodyparse=require('body-parser');
const student=require('../models/studentmodel');
const { hashfunction } = require('../models/hashfunctionmodel');
const app=express.Router();


//body parser 
app.use(bodyparse.urlencoded({extended:true}));


// getting data from addform
app.post('/addform.html',(req,res,next)=>{
    const fname=req.body.fname;
    const lname=req.body.lname;
    const gender=req.body.gender;
    const department=req.body.department;
    const doj=req.body.doj;
    const dob=req.body.dob;
    const fathername=req.body.fathername;
    const mothername=req.body.mothername;
    const id=req.body.id;
    const aadhar=req.body.aadhar;
    const mobile=req.body.mobile;
    const email=req.body.email;
    const paddress1=req.body.paddress1;
    const laddress1=req.body.laddress1;
    const state=req.body.state;
    const loginpassword=req.body.loginpassword;
    const type='student';

    // filling out our schema with details of a new student

    const new_student=new student({ 
        fname:fname,
        lname:lname,
        gender:gender,
        department:department,
        doj:doj,
        dob:dob,
        fathername:fathername,
        mothername:mothername,
        id:id,
        aadhar:aadhar,
        mobile:mobile,
        email:email,
        paddress1:paddress1,
        laddress1:laddress1,
        state:state,
        loginpassword:hashfunction(loginpassword),
        enttype:type
    });
    new_student
    .save()
    .then(existinstudent=>{
        if(existinstudent!=null){
            console.log(`student exists as the following ${existinstudent}`);
            res.sendFile(path.join(__dirname,"..","views","index.html"));
        }else{
            res.sendFile(path.join(__dirname,"..","views","index.html"));
            new_student.save()
            .then(result=>{
                console.log('student added in DB');
            }).catch(err=>{
                console.log(`student not added due to error ${err}`);
            });
        }return existinstudent;
    }).catch(err=>{
        console.log(err);
        res.sendFile(path.join(__dirname,"..","views","addform.html"));
    });
})

module.exports=app;
