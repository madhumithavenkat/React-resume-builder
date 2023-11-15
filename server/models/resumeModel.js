const mongoose = require('mongoose')



const resumeSchema = new mongoose.Schema({
    userID :{
        type: String,
        required : [true]
    },
    personalDetails : [{
        firstName:{
            type: String,
            required : [true]
        },
        lastName:{
            type:String,
            required: [true]
        },
        email: {
            type : String,
            required : [true]
        },
        phoneNo : {
            type : Number,
            required : [true]
        },
        linkedIn : {
            type : String,
        },
        professionalSummary : {
            type : String,
            required : [true]
        }
    }],
    resumeName : {
        type:String,
        required : [true]
    },
    resumeID :{
        type: String,
        required : [true]
    },
    
    skills :[{
        type : String,
    }],
    occupationalDetails: [{
        id : {
            type : String,
            required : true,
            unique :true
        },
        organisation : {
            type : String,
            required : true
        },
        position : {
            type:String,
            required : true,
        },
        duration : {
            type:String,
            required : true,
        },
        description : {
            type:String,
            required : true,
        }
    }],
    educationDetails: [{
        id : {
            type : String,
            required : true,
            unique :true
        },
        organisation : {
            type : String,
            required : true
        },
        year : {
            type:String,
            required : true,
        },
        description : {
            type:String,
            required : true,
        }
    }],
    certificationDetails: [{
        id : {
            type : String,
            required : true,
            unique :true
        },
        certificate : {
            type : String,
            required : true
        },
        provider : {
            type:String,
            required : true,
        }
    }]
})


const Resume = mongoose.model('resume', resumeSchema)

module.exports = Resume;