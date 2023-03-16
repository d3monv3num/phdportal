const getDB=require('../utils/database').getDB;
// class template for student doc uploads


class student_uploads{
    // parameters are input from the form filled by student in the docuploads page
    constructor(fname,profile_img,id){
        this.fname=fname;
        this.id=id;
        this.profile_img=profile_img;
    }
    save(){
        const db=getDB();
        return db.collection('uploads').insertOne(this)
        .then(result=>{
            console.log(result);
        }).catch(err=>{
            console.log(`student upload wasn't added due to:${err}`);
        });
    }
    // function to delete a student
    static remove_studentrecord(curr_id){
        const db=getDB();
        db.collection('uploads').deleteOne({id:curr_id})
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

exports.student_uploads=student_uploads;