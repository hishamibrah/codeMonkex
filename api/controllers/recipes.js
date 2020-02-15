const mongoose = require('mongoose');
const Recipe = require('../models/recipes');

exports.recipes_get_all = (req,res,next) => {
  Recipe.find()
  .select("name ingredients _id")
  .exec()
  .then(docs => {
    console.log(docs);
    res.status(200).json(docs);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
}

exports.createRecipes = (req,res,next) => {
  const recipe = new Recipe({
      _id: new mongoose.Types.ObjectId(),
      name:req.body.name,
      ingredients: req.body.ingredients
  });
  recipe
  .save()
  .then(result=>{
    console.log(result);
    return res.status(201).json({
      message:'Handling POST request /recipes',
      createdRecipe: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
      error:err
    });
  });
}

exports.recipes_get_recipe = (req,res,next) => {
  const id = req.params.recipeId;
  Recipe.findById(id)
  .select("name ingredients _id")
  .exec()
  .then(doc => {
    console.log("From Database",doc);
    res.status(200).json(doc);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error:err});
  });
}

exports.recipes_updates_recipe = (req,res,next) => {
  const id=req.params.recipeId;
  const updateOps ={};
  for(const ops of req.body){
    updateOps[ops.propName]=ops.value
  }
  Recipe.update({_id:id},{$set:updateOps})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error:err
      })
    })
}

exports.recipes_delete_recipe = (req,res,next) => {
  const id=req.params.recipeId;
    Recipe.remove({ _id:id })
    .exec()
    .then(result => {
      res.status(200).json({
        message:"recipe deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error:err
      })
    })
}
