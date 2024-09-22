const mongoose=require('mongoose');


const Schema=new mongoose.Schema({
    title:String,
    image:String,
    price:Number,
    description:String,
    location:String
});
const Mymodel=mongoose.model('MyMod', Schema);
module.exports=Mymodel