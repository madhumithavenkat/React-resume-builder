const express = require('express')
const router = express.Router();
const resumeController = require('../controller/resumeController')
//const authController = require('../controller/authController')


router
    .route('/')
    .post(resumeController.createResume)
    .get(resumeController.getResumes)
    


module.exports = router;