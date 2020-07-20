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

// Set up express-handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set up port
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Listening on PORT: " + port);
});
