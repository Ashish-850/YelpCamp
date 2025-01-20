const express = require("express"); // Import Express
const app = express(); // Create an Express app
const path = require("path"); // Import path module
const Campgroud = require("./models/campground"); // Import Campground model
const mongoose = require("mongoose"); // Import Mongoose

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error")); // Log connection errors
db.once("open", () => {
    console.log("Database connected");
});

// Set up EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); // Set views directory

// Root route
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// Route to create a new campground
app.get("/make-campground", async (req, res) => {
    const camp = new Campgroud({ title: "My backyard" });
    await camp.save();
    res.send(camp);
});

// Start the server
app.listen(3000, () => {
    console.log("Serving on port 3000");
});