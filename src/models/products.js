var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
});


mongoose.model('Products', ProductSchema);
