const express=require('express');
const path=require('path');
const bodyparse=require('body-parser');
const notice=require('../models/noticemodel');
const getDB=require('../../config/utils/database').getDB;
const student=require('../models/studentmodel');
const app=express.Router();


//body parser 
app.use(bodyparse.urlencoded({extended:true}));
const date=new Date();
app.post('/newnotice',(req,res,next)=>{
    const department=req.body.department;
    const title=req.body.notice_head;
    const content=req.body.notice_text;

    const notice_object=new notice({
        department:department,
        title:title,
        content:content,
        dateofnotice:`${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
    })
    notice_object
    .save()
    .then(result=>{
        const db=getDB();
        const userid=req.session.userid;
        const password=req.session.key;
        const validatesession=db.collection('sessions').find({_id:req.sessionID}).next()
        .then(result=>{
            if(result!=null){
                const validatestudent=student.find({id:userid,loginpassword:password}).cursor()
                .next()
                .then(studentrecord=>{
                    if(studentrecord==null){
                        res.sendFile(path.join(__dirname,'..','views','index.html'));
                    }else{
                        const student_details=studentrecord;
                        console.log(`notice route is now in progress`);
                        res.render('new_notice',{
                            st_fname:student_details.fname,
                            st_name:student_details.fname+' '+student_details.lname,
                            st_id:student_details.id,
                            st_dept:student_details.department,
                            st_contact:student_details.mobile,
                            st_mail:student_details.email
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
            console.log(`error on notice ${err}`);
            res.sendFile(path.join(__dirname,'..','views','index.html'));
        })
    })
    .catch(err=>{
        console.log(`error occured while saving the data: \n ${err}`)
    })
})

module.exports=app;