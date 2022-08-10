const express = require("express");
const path = require("path");
// const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
// mongoose.connect('mongodb://localhost/contactLat', {useNewURLParser:true});
const port = 8000;

// Define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String
  });

const Contact = mongoose.model('contact', contactSchema);

app.use(express.static('static'));

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // for serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') //Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory

//ENDPOINTS
app.get('/', (req,res)=>{
    // const con = "This is the best website to learn the Dancing"
    // const params = {'title': 'world class dancing school'};
    res.status(200).render('home.pug');
})

app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
})
})

//START THE SERVER 
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
})