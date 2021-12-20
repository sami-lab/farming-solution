const mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A Category must have name'],
  },
  title: {
    type: String,
    required: [true, 'A Category must have title'],
  },
  heading: {
    type: String,
    required: [true, 'A Category must have Heading'],
  },
  details: {
    type: String,
    require: [true, 'Please provide category details!'],
  },
  image: {
    type: String,
    require: [true, 'Please provide category image!'],
  },
});

var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
