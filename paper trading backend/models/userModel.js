const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    email:{
        type: String,
        trim: true,
        require: true,
        lowercase: true
    },
    name:{
        type: String,
        trim: true,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    token:{
        type: String,
    },
    role: {
        type: String,
    },
    isBlocked: {
        type: String,
        enum: ["pass", "fail", "init"],  // 0 for pass, 1 for fail, 2 for initial
        default: "init"
    },
    walletBalance: { type: Number, default: 0 },
    trade_limit: { type: Number, default: 3 },
},
{
    timestamps: true
})

// userSchema.pre("save", async function(next){
//     if(!this.isModified("password"))return next();
//     this.password = await bcrypt.hash(this.password, 10)
//     next();
// })

// userSchema.methods.isPasswordCorrect = async function(password){
//     return await bcrypt.compare(password, this.password);
// }

userSchema.methods.generateToken = async function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            role:this.role,
        },
        process.env.TOKEN_SECRET

    )
}

userSchema.methods.toJSON1 = function ()  {
    const user = this;
    const userObject = user.toObject();
    return {
        _id: userObject._id,
        email: userObject.email,
        name: userObject.name,
        token: userObject.token,
    };
};

const user = mongoose.model('user', userSchema);
module.exports = user;



