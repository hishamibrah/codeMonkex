const mongoose = require('mongoose');
const Recipe = require('../models/recipes');

exports.user_signup = (req,res,next) => {
  User.find({phone:req.body.phone})
  .exec()
  .then(user => {
    if(user.length>=1){
      return res.status(409).json({
        message:'Phone Number exists'
      });
    }else{
      bcrypt.hash(req.body.password,10,(err,hash) => {
        if(err){
          return res.status(500).json({
            error: err
          });
        }else{
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            phone: req.body.phone,
            password: hash
        });
        user.save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message:'User Created'
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
            });
          });
        }
      });
    }
  });
}

exports.user_login = (req,res,next) => {
  User.find({ phone:req.body.phone})
  .exec()
  .then(user => {
    if(user.length<1){
      return res.status(401).json({
        message:'Auth failed'
      });
    }
    bcrypt.compare(req.body.password, user[0].password,(err, result) =>{
      if(err){
        return res.status(401).json({
          message:'Auth failed'
        });
      }
      if(result){
        const token = jwt.sign({
          phone: user[0].phone,
          userId:user[0]._id
        },
        process.env.JWT_KEY,{
          expiresIn:"1h"
        }
      );
      return res.status(200).json({
        message:"Auth successfull",
        token:token
      });
    }
      res.status(401).json({
        message:'auth failed'
      });
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
    error:err
    });
  });
}
