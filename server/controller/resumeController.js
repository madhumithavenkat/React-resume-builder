const Resume = require('../models/resumeModel')
const appError = require('../utils/apperror')
var {nanoid} = require('nanoid')

catchAsync = fn =>{
    return (req,res,next) =>{
        fn(req,res,next).catch(next)
    }
}

exports.createResume = catchAsync(async (req,res,next) =>{
        let newEntry = req.body.resume
        delete newEntry.step
        newEntry['resumeID'] = nanoid()
        
        console.log(newEntry)
        const newResume = await Resume.create(req.body.resume)
        console.log(newResume)

        res.json({
            status: 'success',
            data: {
                rec: newResume
            }
        })
   
    
})

exports.getResumes = catchAsync(async (req,res,next) => {

    const allResumes = await Resume.find()
    console.log(allResumes)

    res.json({
        status : 'success',
        data : {
            rec : allResumes
        }
    })
})