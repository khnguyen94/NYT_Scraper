// This is our mongoose connection that gets our comments connected to mongoDB

// Import all dependencies
const mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the noteSchema with the Schema object
var commentSchema = new Schema({
  // _headlineId: is the article associate with the note
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  // date: a string
  date: {
    type: Date,
    default: Date.now,
  },
  // commentText: a string
  commentText: String,
});

// Create the Comment model using the commentSchema
var Comment = mongoose.model("Comment", commentSchema);

// Export the Comment model
module.exports = Comment;
