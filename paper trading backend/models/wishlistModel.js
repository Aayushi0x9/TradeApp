const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    instrument_token:{
        type: Number,
        require: true,
    },
    tradingsymbol:{
        type: String,
        require: true,
    },
    exchange:{
        type: String,
        // require: true,
    },
    instrument_type:{
        type: String,
        // require: true,
    },
    name:{
        type: String,
        require: true,
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    wishlist_name: { 
        type: String,
        require: true,
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('wishlist', wishlistSchema);



