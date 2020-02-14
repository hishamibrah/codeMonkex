const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  name:{type: String,required:true},
  phone:{type: Number,required:true},
  password:{type:String,required:true,unique:true}
});

module.exports = mongoose.model('User',userSchema);
