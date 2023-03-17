const Menu=require('../Models/menuModel');

exports.getMenu=(req,res)=>{
    console.log(Menu[1]);
    Menu.find({restaurantName:req.params.rName})
    .then((result)=>{
        res.send({
            message:"Menu got",
            data:result
        })
        console.log(result);
    })
    .catch(e=>{
        res.send({
            Error:e
        })
    })
}
