const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const WalletTransaction = require("../models/walletModel");
const { pagination } = require("../utils/helper");

module.exports = {

    register: asyncHandler(async(req, res)=>{
        const { name, email, password } = req.body
        // console.log(req.body, "req.body");

        const findUser = await Admin.findOne({email})
        if(findUser){
            throw new ApiError(400,"Email is already exists")
        }

        const user = await Admin.create({ name, email, password })

        user.token = await user.generateToken();

        await user.save({ validateBeforeSave: false })

        if(user){
            return res.status(201).json(
                new ApiResponse(
                    201, 
                    user.toJSON1(),
                    "Admin register successfully"
                )
            )
        }else{
            throw new ApiError(400,"Admin did not register")
        }
    }),

    login: asyncHandler(async(req, res)=>{
        const { email, password } = req.body
        // console.log(req.body, "req.body");

        if(!email || !password){
            throw new ApiError(400, "Email or password is required")
        }

        const user = await Admin.findOne({email})
        if(!user){
            throw new ApiError(404,"User does not exists")
        }

        const checkPassword = await user.isPasswordCorrect(password);

        if(!checkPassword){
            throw new ApiError(401,"Invalid credentials")
        }

        user.token = await user.generateToken();

        await user.save({ validateBeforeSave: false })

        return res.status(200).json(
            new ApiResponse(
                200, 
                user.toJSON1(),
                "Admin logged in successfully"
            )
        )
    }),

    logout: asyncHandler(async(req, res)=>{

        const user = await Admin.findByIdAndUpdate(req.user._id, { token: null })

        return res.status(200).json(
            new ApiResponse(
                200, 
                {},
                "Admin logged out successfully"
            )
        )
    }),

    editUser: asyncHandler(async(req, res)=>{
        const { id } = req.params

        const { isBlocked, trade_limit } = req.body

        const amount = Number(req.body.amount);

        if(amount && !(amount > 0)){
            throw new ApiError(400,"Please add valid amount")
        }

        if(trade_limit && !(trade_limit > 0)){
            throw new ApiError(400,"Please add valid trade limit")
        }

        const user = await User.findById(id);
        if(!user){
            throw new ApiError(400,"User Id is not valid")
        }

        if(amount){
            user.walletBalance += amount;
        }

        if(trade_limit){
            user.trade_limit = trade_limit;
        }

        if(isBlocked){
            user.isBlocked = isBlocked;
        }


        await user.save();

        if(amount){
            const transaction = new WalletTransaction({
                user: id,
                type: "credit",
                amount,
                description: "Credit amount by admin",
                admin: req.user._id
              });
            await transaction.save();
        }

            return res.status(200).json(
                new ApiResponse(
                    200, 
                    {},
                    "User profile is edited successfully"
                )
            )
    }),

    getUsers: asyncHandler(async(req, res)=>{
        const { perPage, page } = pagination(req.query);
        const { search } = req.query;

        const Query = {}

        if (search) {
            const searchData = new RegExp(search, "i");
            Query["$or"] = [{ name: searchData }, { email: searchData }]
        }

        let getAllUsers = await User.find(Query)
            .sort({ createdAt: -1 })
            .limit(perPage)
            .skip(perPage * (page - 1))
            .select('-token -fcmToken')
  
        let totalData = await User.countDocuments(Query);
  
        if (getAllUsers) {
            return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: getAllUsers,  
                    totalData: totalData,
                    perPage,
                    page,
                    totalPages: Math.ceil(totalData / perPage) || 1,
                },
                ""
            )
            );
        } else {
            throw new ApiError(400, "Users data is not fetched");
        }

    }),
}