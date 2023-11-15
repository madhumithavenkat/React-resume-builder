const express = require('express')
const router = express.Router();
const resumeController = require('../controller/resumeController')
const authController = require('../controller/authController')


router
    .route('/')
    .post(authController.protect,resumeController.createResume)
    .get(authController.protect,resumeController.getResumes)
    .delete(authController.protect,resumeController.deleteResume)
    


module.exports = router;