const express=require('express')
const path=require('path')
const bodyparse=require('body-parser')
const getDB=require('../../config/utils/database').getDB;
const router=express.Router()

// bodyparser to take input from forms
router.use(bodyparse.urlencoded({extended:true}));

router.get('/personal_details',(req,res,next)=>{
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
                    res.render('personal_details',{
                        st_fname:student_details.fname,
                        st_name:student_details.fname+' '+student_details.lname,
                        st_id:student_details.id,
                        st_dept:student_details.department,
                        st_contact:student_details.mobile,
                        st_mail:student_details.email,
                        st_doj:student_details.doj,
                        st_gender:student_details.gender,
                        st_dob:student_details.dob,
                        st_aadhar:student_details.aadhar,
                        st_paddress:student_details.paddress1,
                        st_fathername:student_details.fathername,
                        st_mothername:student_details.mothername,
                        st_state:student_details.state
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
        console.log(`error on personaldetails ${err}`);
        res.sendFile(path.join(__dirname,'..','views','index.html'));
    })
});

module.exports=router