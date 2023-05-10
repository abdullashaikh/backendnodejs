const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const routes=require('./routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const cors=require('cors');
app.use(cors());

const start=async()=>{
    try{
        app.listen(3300,()=>{
            console.log('server started at port 3300');
        })
    }catch(err){
        console.log(err);
    }
}
routes(app);


start();
