const getDB=require('../../config/utils/database').getDB;
const hashfunction=require('../models/hashfunctionmodel').hashfunction;

async function auth_function(currsession,st_id,st_pass){
    const db=getDB();
    const validity=db.collection('sessions').find({_id:currsession._id}).next().
    then(result=>{
        if(result!=null){
            const validity_student=db.collection('studentrecord').find({id:st_id,pass:st_pass}).next()
            .then(studentrecord=>{
                if(studentrecord!=null){
                    return studentrecord;
                }else return null;
            }).catch(err=>{
                return null;
            })
        }else return null;
    }).catch(err=>{
        console.log(`some error:\n ${err}`);
        return null;
    })
}

exports.auth_function=auth_function;