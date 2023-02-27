// implementing a hashfunction here to store passwords

function hashfunction(loginpassword){
    var hash=0;
    if(loginpassword.length==0)return hash;
    for(let i=0;i<loginpassword.length;i++){
    ch=loginpassword.charCodeAt(i);
    hash=((hash<<4)-hash)+ch;
    hash&=hash;
    }return hash;
}
// exporting the hash function
exports.hashfunction=hashfunction;