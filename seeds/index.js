const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
 console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()* array.length)];
  
const seedDB = async () =>{
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author:'62bd069e2fde2a8509697ba7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque aperiam ratione, velit saepe vitae obcaecati atque quia minima nihil nemo doloremque officia fuga odit placeat in exercitationem quibusdam eos. Porro?',
            price,
            geometry: { 
                type : "Point", 
                coordinates : [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude,
             ]
             },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvct2bwkc/image/upload/v1657148096/YelpCamp/rhurywyk7ggoggzxsrsk.jpg',
                    filename: 'YelpCamp/rhurywyk7ggoggzxsrsk'
                },
                {
                    url: 'https://res.cloudinary.com/dvct2bwkc/image/upload/v1657135152/YelpCamp/l9wox5yttysrwofz1eg8.jpg',
                    filename: 'YelpCamp/l9wox5yttysrwofz1eg8'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

//https://images.unsplash.com/photo-1481777198967-38af7434dd5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHw0ODQzNTF8fHx8fHx8MTY1NDkxMDg5NA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080