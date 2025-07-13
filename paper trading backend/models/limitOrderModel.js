const mongoose = require('mongoose');
  
  const limitOrderSchema = mongoose.Schema({

      status: { type: String, enum: ["pending", "cancel", "reject", "executed"],  default: "pending" },
      instrument_id:{
        type: Number,
        require: true,
      },
      tradingsymbol:{
        type: String,
      },
      name:{
        type: String,
      },
      exchange:{
        type: String,
      },
      price:{
        type: Number,
        require: true,
      },
      quantity:{
          type: Number,
          require: true,
      },
      lot_size: { type: Number },
      expiry: { type: Date },
      marginBlocked: { type: Number },
      instrument_type: { type: String, enum: ["CE", "PE", "EQ"], required : true }, 
      order_type: { type: String, enum: ["limit", "stopLoss"], required : true }, 
      buy_type: { type: String, enum: ["buy", "sell"], required : true }, 
      show_type: { 
        type: String,
        // enum: ["limit", "stopLoss", "market"], 
      }, 
      user: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User", 
          required: true 
      },
      buy_price:{
        type: Number,
      },
  },
  {
      timestamps: true
  })
  

  module.exports = mongoose.model("limit_order", limitOrderSchema);


  
  

