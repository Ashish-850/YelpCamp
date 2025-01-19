const express = require("express"); // imporitng express module
const app = express(); // express instance
const path = require("path")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});



app.listen(3000, () => {
    console.log("Serving on port 3000");
})