
const mongoose=require('mongoose');
 const mongoos= mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true}).then(()=>{
     console.log('connected to mongodb');
 }).catch(err=>{
     console.log(err);
 });  

 module.exports=mongoose;