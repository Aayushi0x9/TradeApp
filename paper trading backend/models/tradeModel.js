const mongoose = require('mongoose');
  
  const tradeSchema = mongoose.Schema({

      type: { type: String, enum: ["open", "close", "reject", "cancel", "sell" ] },
      instrument_id:{
          type: Number,
          require: true,
      },
      tradingsymbol:{
        type: String,
        // require: true,
        },
        name:{
            type: String,
          },
      exchange:{
        type: String,
        // require: true,
      },
      price:{
          type: Number,
          require: true,
      },
      quantity:{
          type: Number,
          require: true,
      },
      sell_quantity:{
        type: Number,
      },
      user: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User", 
          required: true 
      },
      buy_type: { type: String, enum: ["buy", "sell"], required : true }, 
      marginBlocked: { type: Number },
      expiry: { type: Date },
      lot_size: { type: Number },
      instrument_type: { type: String, enum: ["CE", "PE", "EQ"], required : true }, 
      order_type: { type: String, enum: ["limit", "stopLoss"]}, 
      show_type: { 
        type: String,
        // enum: ["limit", "stopLoss", "market"], 
      }, 

  },
  {
      timestamps: true
  })
  

  module.exports = mongoose.model("trade", tradeSchema);
  

