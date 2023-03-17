const express=require('express')
const path=require('path')
const bodyparse=require('body-parser')
const student=require('../models/studentmodel');
const hashfunction=require('../models/hashfunctionmodel').hashfunction;
const router=express.Router()

// bodyparser to take input from forms
router.use(bodyparse.urlencoded({extended:true}));


// taking details from login and password and using them to find user 
router.post('/index.html',(req,res,next)=>{
    const userid=req.body.userID;
    const password=hashfunction(req.body.password);
    req.session.userid=userid;
    req.session.key=password;
            const validatestudent=student.find({id:userid,loginpassword:password}).cursor()
            .next()
            .then(studentrecord=>{
                if(studentrecord==null){
                    res.sendFile(path.join(__dirname,'..','views','index.html'));
                }else if(studentrecord.enttype=='student'){
                    console.log(`loginroute is now working`);
                    res.render('dashboard',{
                        st_fname:studentrecord.fname,
                        st_name:studentrecord.fname+' '+studentrecord.lname,
                        st_id:studentrecord.id,
                        st_dept:studentrecord.department,
                        st_contact:studentrecord.mobile,
                        st_mail:studentrecord.email
                    });//user found and is student
                }else{
                    res.render('admin_dashboard.ejs',{
                        st_fname:studentrecord.fname,
                        st_name:studentrecord.fname+' '+studentrecord.lname,
                        st_id:studentrecord.id,
                        st_dept:studentrecord.department,
                        st_contact:studentrecord.mobile,
                        st_mail:studentrecord.email
                    });
                }
            })
            .catch(err=>{
                console.log(err);
                res.sendFile(path.join(__dirname,'..','views','index.html'));
            })
});

module.exports=router