const getDB=require('../../config/utils/database').getDB;
const { Int32 } = require('mongodb');
const mongoose=require('mongoose');


const Schema=mongoose.Schema;
const noticeSchema=new Schema({
    department:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    dateofnotice:{
        type:String,
        required:true
    }
    // attachments part of schema will contain any picture of any document which was uploaded along with the notice 
});

module.exports=mongoose.model('notice',noticeSchema);