const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require('jsonwebtoken');

const auth = asyncHandler(async(req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1]

    if(token){
        try {
            const decodeToken = await jwt.verify(token, process.env.TOKEN_SECRET)
            // console.log(decodeToken, "decodeToken");
            const user = await User.findById(decodeToken?._id).select("_id name email isBlocked")
            if(!user){
                throw new ApiError(401, "Invalid Token")
            }
            if(user.isBlocked !== 'init'){
                throw new ApiError(401, "You are blocked by admin")
            }

            req.user = user;
            next()
        } catch (error) {
            throw new ApiError(401, error.message || "Invalid Token")
        }
    }else{
        throw new ApiError(401, "Unauthorized request")
    }
})

const adminAuth = asyncHandler(async(req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1]

    if(token){
        try {
            const decodeToken = await jwt.verify(token, process.env.TOKEN_SECRET)
            // console.log(decodeToken, "decodeToken");
            const user = await Admin.findById(decodeToken?._id).select("_id email")
            if(!user){
                throw new ApiError(401, "Invalid Token")
            }
            req.user = user;
            next()
        } catch (error) {
            throw new ApiError(401, "Invalid Token")
        }
    }else{
        throw new ApiError(401, "Unauthorized request")
    }
})

module.exports = { auth, adminAuth }