const express = require("express"); // Import Express
const app = express(); // Create an Express app
const path = require("path"); // Import path module
const ejsMate = require('ejs-mate')
const Campgroud = require("./models/campground"); // Import Campground model
const mongoose = require("mongoose"); // Import Mongoose
const campground = require("./models/campground");
const methodOverride = require("method-override");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error")); // Log connection errors
db.once("open", () => {
    console.log("Database connected");
});



app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Set up EJS view engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); // Set views directory

app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campgroud.find();
    res.render("campgrounds/index.ejs", { campgrounds });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new.ejs");
});

app.post("/campgrounds/new", async (req, res) => {
    console.log(req.body);
    const addCampground = new Campgroud(req.body.campground);
    await addCampground.save();
    res.redirect("/campgrounds");
});

app.get("/campgrounds/:id", async (req, res) => {
    const { id } = req.params;
    const foundCampground = await Campgroud.findById(id);
    res.render("campgrounds/show.ejs", { foundCampground });
});

app.get("/campgrounds/:id/edit", async (req, res) => {
    const { id } = req.params;
    const foundCampground = await Campgroud.findById(id);
    res.render("campgrounds/edit.ejs", { foundCampground });
});

app.put("/campgrounds/:id", async (req, res) => {
    const { id } = req.params;
    const updated = await Campgroud.findByIdAndUpdate(id, req.body.campground, { new: true });
    res.redirect(`/campgrounds/${id}`);
});

app.delete("/campgrounds/:id", async (req, res) => {
    const { id } = req.params;
    const deleted = await Campgroud.findByIdAndDelete(id);
    res.redirect("/campgrounds");

});


// Start the server
app.listen(3000, () => {
    console.log("Serving on port 3000");
});