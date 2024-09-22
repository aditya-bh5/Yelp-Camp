const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const moad=require('./models/campgrounds');
const Mymodel = require('./models/campgrounds');

const ejsMate=require('ejs-mate');

const meto=require('method-override');

app.use((meto)('_method'));
mongoose.connect('mongodb://127.0.0.1:27017/Yelp-camp');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.get('/home', (req,res)=>{
    res.render('home')

})
app.listen(3000, ()=>{
    console.log("listening on port")
})
app.use(express.urlencoded({ extended: true }));


// app.get('/makenew', async (req, res)=>{
//     const camp=new Mymodel({
//         title:"this is my",
//         price:500
//     });
//     await camp.save();
//     res.send(camp)
// })
app.get('/makecg', async(req,res)=>{
    const cg=await Mymodel.find({});
    res.render('campgroud/index', {cg})
})

app.get('/makecg/new', async (req,res)=>{
    res.render('campgroud/new')
})

app.post('/makecg', async (req,res)=>{
    const camppa=new Mymodel(req.body.campground);
    await camppa.save();
    
    res.redirect(`/makecg/${camppa._id}`)
})
app.get('/makecg/:id/edit', async(req,res)=>{
    const cam=await Mymodel.findById(req.params.id);
    res.render('campgroud/edit', {cam});
})
app.get('/makecg/:id', async(req,res)=>{
    const cam=await Mymodel.findById(req.params.id);
    res.render('campgroud/show', {cam});
})
app.put('/makecg/:id', async(req,res)=>{
    const {id}= req.params;
    const cam=await Mymodel.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/makecg/${cam._id}`)
})
app.delete('/makecg/:id', async(req,res)=>{
    const {id}=req.params;
    const cam=await Mymodel.findByIdAndDelete(id);
    res.redirect('/makecg');
})
