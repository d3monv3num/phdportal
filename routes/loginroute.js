const express=require('express')
const path=require('path')
const bodyparse=require('body-parser')
const getDB=require('../utils/database').getDB;
const hashfunction=require('../models/hashfunctionmodel').hashfunction;
const router=express.Router()
let student_details;

// bodyparser to take input from forms
router.use(bodyparse.urlencoded({extended:true}));


// taking details from login and password and using them to find user 
router.post('/index.html',(req,res,next)=>{
    const db=getDB();
    const userid=req.body.userID;
    const password=hashfunction(req.body.password);
    req.session.userid=userid;
    req.session.key=password;
    const validatesession=db.collection('sessions').find({_id:req.sessionID}).next()
    .then(result=>{
        if(result!=null){
            const validatestudent=db.collection('studentrecord').find({id:userid,loginpassword:password})
            .next()
            .then(studentrecord=>{
                if(studentrecord==null){
                    res.sendFile(path.join(__dirname,'..','views','index.html'));
                }else if(studentrecord.type=='student'){
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
        }else{
            console.log(`no active session with sessionID ${req.sessionID}`);
            res.sendFile(path.join(__dirname,'..','views','index.html'));
        }
    })
    .catch(err=>{
        console.log(`error on loginroute ${err}`);
        res.sendFile(path.join(__dirname,'..','views','index.html'));
    })
});

module.exports=router