const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;


// making the connection
const mongoConnect=(callback=>{
    MongoClient.connect('mongodb+srv://Chulbul:uiet123@cluster0.o92arat.mongodb.net/?w=majority')
    .then(result=>{
        console.log("Connected to database");
        callback(result);
    }).
    catch(err=>{
        console.log(`error:${err}`);
    });
})
// exporting the function for connection
module.exports=mongoConnect;


