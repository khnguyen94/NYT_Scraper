// This is our mongoose connection that gets our comments connected to mongoDB

// Import all dependencies
const mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the noteSchema with the Schema object
var noteSchema = new Schema({
  // _headlineId: is the article associate with the note
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Headline",
  },
  // date: a string
  date: {
    type: Date,
    default: Date.now,
  },
  // noteText: a string
  noteText: String,
});

// Create the Note model using the noteSchema
var Note = mongoose.model("Note", noteSchema);

// Export the Note model
module.exports = Note;
