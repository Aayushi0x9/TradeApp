const mongoose = require('mongoose');
  
  const WalletTransaction = mongoose.Schema({

      type: { type: String, enum: ["credit", "debit"] },
      instrument_id:{
          type: Number,
        //   require: true,
      },
      tradingsymbol:{
        type: String,
        // require: true,
        },
      exchange:{
        type: String,
        // require: true,
      },
      name:{
        type: String,
        // require: true,
      },
      amount:{
          type: Number,
          require: true,
      },
      description:{
          type: String,
          require: true,
      },
      user: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User", 
          required: true 
      },
      admin: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "admin", 
      },
      trade_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "trade", 
    },
  },
  {
      timestamps: true
  })
  
  WalletTransaction.index({ user: 1 });

  module.exports = mongoose.model("wallet", WalletTransaction);
  

