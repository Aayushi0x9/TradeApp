const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = mongoose.Schema({
    email:{
        type: String,
        trim: true,
        require: true,
        lowercase: true
    },
    password:{
        type: String,
        require: true
    },
    name:{
        type: String,
        trim: true,
        required: true
    },
    token:{
        type: String,
    },
},
{
    timestamps: true
})

adminSchema.pre("save", async function(next){
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

adminSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

adminSchema.methods.generateToken = async function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
        },
        process.env.TOKEN_SECRET
    )
}

adminSchema.methods.toJSON1 = function ()  {
    const user = this;
    const userObject = user.toObject();
    return {
        _id: userObject._id,
        email: userObject.email,
        name: userObject.name,
        token: userObject.token
    };
};

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;



