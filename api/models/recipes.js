const mongoose = require('mongoose');
const recipeSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  name:{type: String,required:true},
  ingredients:{type: String,required:true}
});

module.exports = mongoose.model('Recipe',recipeSchema);
