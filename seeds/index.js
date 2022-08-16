const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL||'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl,{
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
            author:'62bceeeefd10f33fa1e9b067',
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
                    url: 'https://res.cloudinary.com/dvct2bwkc/image/upload/v1660675018/YelpCamp/m6hazwrl8yyskvesugsd.jpg',
                    filename: 'YelpCamp/m6hazwrl8yyskvesugsd'
                },
                {
                    url: 'https://res.cloudinary.com/dvct2bwkc/image/upload/v1660674900/YelpCamp/aeeqaywm79j3qummdaxc.jpg',
                    filename: 'YelpCamp/aeeqaywm79j3qummdaxc'
                }
            ]
        });
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})
