// Import all depencies
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const express = require("express");
const exphbs = require("express-handlebars");

// Create a new instance of the express server
const app = express();

// Set up logger for development area
app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Set up app to use public assets folder
app.use(express.static(process.cwd() + "/public"));

// Set up express-handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Have every request go through our route middleware
// app.use(routes);

// Set up mongoDB connection
// If deployed, use the deployed database. Otherwise use the local nytScraper database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytScraper";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

// Create a variable to hold mongoose connection
const db = mongoose.connection;

// Create error messaging to log any errors that happens during connection
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to Mongoose database!");
});

// Set up port
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Connected to server. Listening on PORT: " + port);
});
