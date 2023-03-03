const express=require('express')
const path=require('path')
const bodyparse=require('body-parser');
const getDB=require('../utils/database').getDB;
const router=express.Router()

// bodyparser to take input from forms
router.use(bodyparse.urlencoded({extended:true}));


router.get('/get_dash',(req,res,next)=>{
    const db=getDB();
    const userid=req.session.userid;
    const password=req.session.key;
    const validatesession=db.collection('sessions').find({_id:req.sessionID}).next()
    .then(result=>{
        if(result!=null){
            const validatestudent=db.collection('studentrecord').find({id:userid,loginpassword:password})
            .next()
            .then(studentrecord=>{
                if(studentrecord==null){
                    res.sendFile(path.join(__dirname,'..','views','index.html'));
                }else{
                    const student_details=studentrecord;
                    console.log(`dash_board route is now in progress`);
                    res.render('dashboard',{
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
        console.log(`error on dashboard ${err}`);
        res.sendFile(path.join(__dirname,'..','views','index.html'));
    })
});

module.exports=router