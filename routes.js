module.exports = (app) =>{
    const order = require('./model/order.model');    
    app.post('/order/create',(req,res)=>{
        const orderTemp = new order(req.body);
        orderTemp.save().then(data=>{
            res.send({statuscode:200,response:data});
        }).catch(err=>{
            res.send({statuscode:400,response:err});
        }
        );
    });
    app.post('/order/update',(req,res)=>{
        order.updateOne({"order_id":req.body.order_id},req.body).then(data=>{
            res.send({statuscode:200,response:data});
        }).catch(err=>{
            res.send({statuscode:400,response:err});
        }
        );
    });
    app.get('/order/delete/:id?',(req,res)=>{
        order.deleteOne({"order_id":parseInt(req.params.id)}).then(data=>{
            res.send({statuscode:200,response:data});
        }).catch(err=>{
            res.send({statuscode:400,response:err});
        }
        );
    });
  
    app.get('/order/list',(req,res)=>{
         order.aggregate([{
                "$project":{
                    orderId:"$order_id",
                    itemName:"$item_name",
                    cost:"$cost",
                    orderDate: { $dateToString: { format: "%Y-%m-%d", date: "$order_date" } },
                    deliveryDate: { $dateToString: { format: "%Y-%m-%d", date: "$delivery_date" } },
                    }
            }]).then(data=>{
                res.send({statuscode:200,response:data});
            }).catch(err=>{
                res.send({statuscode:400,response:err});
            }
            );
    });
    app.get('/order/search/:id?',(req,res)=>{
        console.log(req.params);
        order.aggregate([
            {"$match": { "order_id":parseInt(req.params.id) } },
            {    
               "$project":{
                   orderId:"$order_id",
                   itemName:"$item_name",
                   cost:"$cost",
                   orderDate: { $dateToString: { format: "%Y-%m-%d", date: "$order_date" } },
                   deliveryDate: { $dateToString: { format: "%Y-%m-%d", date: "$delivery_date" } },
                   }
           }]).then(data=>{
               res.send({statuscode:200,response:data});
           }).catch(err=>{
               res.send({statuscode:400,response:err});
           }
           );
   });
      
}