
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const MongoStore = require("connect-mongo");
const ejsMate = require('ejs-mate');

const dbUrl = 'mongodb://localhost:27017/CampSite';

mongoose.connect(dbUrl, {

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/campgrounds',(req,res)=>{
    res.render('campgrounds')
})

app.get('/campgrounds/login',(req,res)=>{
    res.render('user/login')
});
app.get('/campgrounds/register',(req,res)=>{
    res.render('user/register')
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})