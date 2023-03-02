const express=require('express')
const path=require('path')
const auth_function=require('../controllers/sessionauthenticator').auth_function;
const bodyparse=require('body-parser')
const getDB=require('../utils/database').getDB;
const hashfunction=require('../models/hashfunctionmodel').hashfunction;
const router=express.Router()
let student_details;

// bodyparser to take input from forms
router.use(bodyparse.urlencoded({extended:true}));


router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,"..","views","index.html"))
})
router.get('/index.html',(req,res,next)=>{
    res.sendFile(path.join(__dirname,"..","views","index.html"))
})
router.get('/registration.html',(req,res,next)=>{
    res.sendFile(path.join(__dirname,"..","views","registration.html"))
})
// router.get('/personal_details',(req,res,next)=>{
//     res.render('personal_details',{
//             st_fname:student_details.fname,
//             st_name:student_details.fname+' '+student_details.lname,
//             st_id:student_details.id,
//             st_dept:student_details.department,
//             st_contact:student_details.mobile,
//             st_mail:student_details.email,
//             st_doj:student_details.doj,
//             st_gender:student_details.gender,
//             st_dob:student_details.dob,
//             st_aadhar:student_details.aadhar,
//             st_paddress:student_details.paddress1,
//             st_fathername:student_details.fathername,
//             st_mothername:student_details.mothername,
//             st_state:student_details.state
//     })
// })
router.get('/addform',(req,res,next)=>{
    res.sendFile(path.join(__dirname,"..","views","addform.html"));
})

// taking details from registration and redirecting to fill details
router.post('/registration.html',(req,res,next)=>{
    const enrollmentno=req.body.enrollment_no;
    const mailid=req.body.emailid;
    console.log(`enrollmentnumber: ${enrollmentno}`);
    res.sendFile(path.join(__dirname,"..","views","addform.html"));
})

module.exports=router