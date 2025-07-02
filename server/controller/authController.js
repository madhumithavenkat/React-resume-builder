const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const appError = require('../utils/appError')
const util = require('util')


getToken = function(id,expiresIn){
    const token = jwt.sign({user:id},process.env.SECRET,{
        expiresIn: expiresIn
        
    })
    
    return token
}

catchAsync = fn =>{
    return (req,res,next) =>{
        fn(req,res,next).catch(next)
    }
}


exports.signUp = catchAsync(async (req,res,next) =>{
    
        const { email, password } = req.body;
        console.log("signUp",req.body)
        console.log("email",email)
        console.log("password",password)
        if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
        // check for duplicate usernames in the db
        //const duplicate = await User.find(person => person.email === email);
        //if (duplicate) return res.sendStatus(409); //Conflict 
        const user = {
            email : email
        };
        const refreshToken = getToken(user,'1d')
        const newUser = await User.create({email,password,refreshToken})
        
        const hours = process.env.EXPIRESIN.split('')[0]
        const returnData = {
            email : newUser.email,
            _id : newUser._id,
            accessToken : getToken(newUser._id,process.env.EXPIRESIN),
            expiresIn : parseInt(hours*60*60/1000)
        };

        // res.header("Set-Cookie","jwt"+ refreshToken+"HttpOnly,Secure, SameSite=None,maxAge= 24 * 60 * 60 * 1000 ");
        res.cookie('jwt', refreshToken, { httpOnly: true, SameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({
            status: 'success',
            data: {
                rec: returnData
            }
        })
})

exports.login = catchAsync(async (req,res,next) => {
    const { email , password} = req.body
    
    const returnData = {}
        if(!email || !password){
           return next(new appError('No user name or password',400))
        }

        const user = await User.findOne({email}).select('password')
        console.log("user",user)

        if(!(await user.correctPassword(password, user.password)) || !user ){
            return next(new appError('Incorrect username or password',400))
        }else{
            const hours = process.env.EXPIRESIN.split('')[0]
           
            returnData.email = user.email;
            returnData._id = user._id
            returnData.accessToken = getToken(user._id,'1d')
            returnData.expiresIn = '1d'//new Date().getTime() + (parseInt(hours)*60*60*1000)

            const userT = {
                id:user._id,
            };
            const refreshToken = getToken(userT,'1d')

            const result = await User.findByIdAndUpdate(user._id,{refreshToken : refreshToken},{upsert:true} )

            res.cookie('jwt', refreshToken, { httpOnly: true, SameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.status(201).json({
                status: 'success',
                data: {
                    rec: returnData
                }
            })
        }
    
})

exports.protect = catchAsync(async (req,res,next) => {

    let token;
    console.log("Protect",req.headers)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
   
    if(!token){
        return new appError('You are not logged in! Please log in to get access',403);
    }
    
    const decoded =  await util.promisify(jwt.verify)(token , process.env.SECRET )
    // jwt.verify(
    //     token,
    //     process.env.SECRET,
    //     (err,decoded) => {
            
    //     })
    
    console.log("decoded user -----------", decoded)
    const currentUser = await User.findById(decoded.user)
    console.log("current user",currentUser)
    if(!currentUser){
        return next(new appError('The user belonging to the token does not exist',401))
    }

    req.user = currentUser;
    console.log("Protect",req.user)
    next()
})