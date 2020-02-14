const express = require('express');
const router = express.Router()
const Recipe = require('../models/recipes');
const checkAuth = require('../middleware/check-auth');
const RecipeController = require('../controllers/recipes');

router.get('/',RecipeController.recipes_get_all);


router.post('/',checkAuth,RecipeController.createRecipes);
router.get('/:recipeId',RecipeController.recipes_get_recipe);
router.patch('/:recipeId',checkAuth,RecipeController.recipes_updates_recipe);
router.delete('/:recipeId',checkAuth,RecipeController.recipes_delete_recipe);

module.exports = router;
