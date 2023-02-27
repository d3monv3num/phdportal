const getDB=require('../utils/database').getDB;
const hashfunction=require('./hashfunctionmodel').hashfunction;
// class template for student


class student{
    // parameters are input from the form filled by student during registration
    constructor(fname,lname,gender,department,doj,dob,fathername,mothername,id,aadhar,mobile,email,paddress1,laddress1,state,loginpassword){
        this.fname=fname;
        this.lname=lname;
        this.gender=gender;
        this.department=department;
        this.doj=doj;
        this.dob=dob;
        this.fathername=fathername;
        this.mothername=mothername;
        this.id=id;
        this.aadhar=aadhar;
        this.mobile=mobile;
        this.email=email;
        this.paddress1=paddress1;
        this.laddress1=laddress1;
        this.state=state;
        this.loginpassword=hashfunction(loginpassword);
    }
    save(){
        const db=getDB();
        return db.collection('studentrecord').insertOne(this)
        .then(result=>{
            console.log(result);
        }).catch(err=>{
            console.log(`student wasn't added due to:${err}`);
        });
    }
    // function to delete a student
    static remove_studentrecord(curr_id){
        const db=getDB();
        db.collection('studentrecord').deleteOne({id:curr_id})
        .then(result=>{
            console.log(`student with ID ${curr_id} is removed`);
        })
        .catch(err=>{
            console.log(`error occured:\n ${err}`);
        })
    }
    // function to update the record of one student or more
    static update_studentrecord(){

    }
}

exports.student=student;