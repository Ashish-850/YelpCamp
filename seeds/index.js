const Campgroud = require("../models/campground"); // Import Campground model
const mongoose = require("mongoose"); // Import Mongoose
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error")); // Log connection errors
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campgroud.deleteMany();
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 20;
        const camp = new Campgroud({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil minima beatae deleniti delectus, fugit molestiae iusto magnam vitae est, amet impedit autem facilis accusamus voluptate ex quaerat dolores quia itaque?",
            price: price
        });
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})