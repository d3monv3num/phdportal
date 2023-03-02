const getDB=require('../utils/database').getDB;
const hashfunction=require('../models/hashfunctionmodel').hashfunction;

function auth_function(currsession){
    const db=getDB();
    const validity=db.collection('sessions').find({_id:currsession._id}).next().
    then(result=>{
        console.log(`in progress session record is found ${result}`);
        return result;
    }).catch(err=>{
        console.log(`some error:\n ${err}`);
    })
}

exports.auth_function=auth_function;