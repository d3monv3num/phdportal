const getDB=require('../../config/utils/database').getDB;
const { Int32 } = require('mongodb');
const mongoose=require('mongoose');
const hashfunction=require('./hashfunctionmodel').hashfunction;


const Schema=mongoose.Schema;
const studentSchema=new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    doj:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    fathername:{
        type:String,
        required:true
    },
    mothername:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    aadhar:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    paddress1:{
        type:String,
        required:true
    },
    laddress1:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    loginpassword:{
        type:String,
        required:true
    },
    enttype:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('student',studentSchema);



// class template for student

// class student{
//     // parameters are input from the form filled by student during registration
//     constructor(fname,lname,gender,department,doj,dob,fathername,mothername,id,aadhar,mobile,email,paddress1,laddress1,state,loginpassword,type){
//         this.fname=fname;
//         this.lname=lname;
//         this.gender=gender;
//         this.department=department;
//         this.doj=doj;
//         this.dob=dob;
//         this.fathername=fathername;
//         this.mothername=mothername;
//         this.id=id;
//         this.aadhar=aadhar;
//         this.mobile=mobile;
//         this.email=email;
//         this.paddress1=paddress1;
//         this.laddress1=laddress1;
//         this.state=state;
//         this.loginpassword=hashfunction(loginpassword);
//         this.type=type;
//     }
//     save(){
//         const db=getDB();
//         return db.collection('studentrecord').insertOne(this)
//         .then(result=>{
//             console.log(result);
//         }).catch(err=>{
//             console.log(`student wasn't added due to:${err}`);
//         });
//     }
//     // function to delete a student
//     static remove_studentrecord(curr_id){
//         const db=getDB();
//         db.collection('studentrecord').deleteOne({id:curr_id})
//         .then(result=>{
//             console.log(`student with ID ${curr_id} is removed`);
//         })
//         .catch(err=>{
//             console.log(`error occured:\n ${err}`);
//         })
//     }
//     // function to update the record of one student or more
//     static update_studentrecord(){

//     }
// }

// exports.student=student;