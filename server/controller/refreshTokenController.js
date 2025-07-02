const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


catchAsync = fn =>{
    return (req,res,next) =>{
        fn(req,res,next).catch(next)
    }
}

const handleRefreshToken = catchAsync(async(req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    

    const foundUser = await User.findOne({refreshToken}).select('password')
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    console.log("handle refresh token ------------",foundUser._id)
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.SECRET,
        (err, decoded) => {
            if (err || foundUser._id.toString() !== decoded.user.id) return res.sendStatus(403);
           
            const accessToken = jwt.sign(
                {
                    user:foundUser._id
                },
                process.env.SECRET,
                { expiresIn: '30s' }
            );

            res.json({
                
                     accessToken
                }
            )
           
        }
    );
})

module.exports = { handleRefreshToken }