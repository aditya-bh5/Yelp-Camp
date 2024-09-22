const mongoose=require('mongoose');
const cities=require('./cities');
const {descriptors, places}=require('./seedHelpers')

const Campground = require('../models/campgrounds');


mongoose.connect('mongodb://127.0.0.1:27017/Yelp-camp');


const sample=array=>array[Math.floor(Math.random() * array.length)];

 const Namer= async()=>{
    await Campground.deleteMany({});
    for (let i=0; i<=50;i++){
        randomGen=Math.floor(Math.random()*1000);
        price=Math.floor(Math.random()*1000);
        const camp=new Campground({
            location:`${cities[randomGen].city}, ${cities[randomGen].state}`,
            title:`${sample(descriptors)}, ${sample(places)}`,
            image:'https://picsum.photos/200/300',
            description:"lorem ipsum polinkas",
            price
        })
        await camp.save();
        
    }
 }
 Namer();