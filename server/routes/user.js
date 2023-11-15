const express = require('express')
const router = express.Router();
const authController = require('../controller/authController')


router.post('/signup',authController.signUp)
router.post('/login',authController.login)
// router
//     .route('/')
//     .get(recipeController.getRecipes)
//     .post(recipeController.createRecipe)
//     .put(recipeController.updateRecipe)
    




module.exports = router;