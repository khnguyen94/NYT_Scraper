// This is our mongoose connection that gets our articles connected to mongoDB

// Require all depencies
const mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the articleSchema with our schema class
var articleSchema = new Schema({
  // headline: a string, must be entered
  headline: {
    type: String,
    required: true,
    unique: {
      index: { unique: true },
    },
  },
  // summary: a string, must be entered
  summary: {
    type: String,
    required: true,
  },
  // url: a string, must be entered
  url: {
    type: String,
    required: true,
  },
  // date: a string
  date: {
    type: Date,
    default: Date.now,
  },
  // saved: a boolean condition
  saved: {
    type: Boolean,
    default: false,
  },
});

// Create the Article model using the articleSchema
var Article = mongoose.model("Article", articleSchema);

// Export the Headline model
module.exports = Article;
