const Razorpay=require('razorpay');

var instance = new Razorpay({
    key_id: "rzp_test_RB0WElnRLezVJ5" ,
    key_secret:"VLMCIrqKxRMNR9EcRcbL2UG8"
  });

module.exports.orderId=(req,res)=>{

    let {amount}=req.body;
    console.log(amount);
    var options = {
        amount: amount*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      instance.orders.create(options, function(err, order) {
       
        if(order){
            res.status(200).send({
                status:true,
                order
            });
        }else{
            res.status(500).send({
                status:false,
                error: err
            });
        }
        console.log(order);
      });
}