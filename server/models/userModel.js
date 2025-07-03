const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique:true
    },
    password:{
        type: String,
        required: [true ,"Please enter a password"],
        minlength :9,
        select: false
    },
    refreshToken:{
        type: String,
       
    }
})

userSchema.pre('save',async function (next) {
    console.log("userSchema pre save",this)
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password,12)

    next();
})

userSchema.methods.correctPassword = async function(candidatePassword,userPassword){

     return await bcrypt.compare(candidatePassword,userPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User;