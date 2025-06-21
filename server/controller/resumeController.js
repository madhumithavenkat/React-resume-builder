const Resume = require('../models/resumeModel')

var {nanoid} = require('nanoid')

catchAsync = fn =>{
    return (req,res,next) =>{
        fn(req,res,next).catch(next)
    }
}

exports.createResume = catchAsync(async (req,res,next) =>{
        console.log(req.body)
        let newEntry = req.body.resume
        delete newEntry.step
        newEntry['resumeID'] = nanoid()
        newEntry['userID'] = req.body.id
        
        console.log(newEntry)
        const newResume = await Resume.create(newEntry)
       console.log(newResume)
        res.json({
            status: 'success',
            data: {
                rec: newResume
            }
        })
   
    
})

exports.getResumes = catchAsync(async (req,res,next) => {

    let id = req.query.id
    
    const allResumes = await Resume.find({'userID' : id})
    

    res.json({
        status : 'success',
        data : {
            rec : allResumes
        }
    })
})

exports.deleteResume = catchAsync(async(req,res,next) => {

    console.log("deleteResume")
    
    const deleteResume= await Resume.deleteOne({'resumeID' : req.body.id})

    res.json({
        status : 'success',
        data : {
            rec:deleteResume
        }
    })
})