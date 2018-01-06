
const mongoose = require('mongoose'),  
Schema = mongoose.Schema;

//================================
// Coin User Schema
//================================
const CoinsUserSchema = new Schema({  
    userId: {
      type: String,
      required: true
    },
    coins: [{
      name: { type: String, required: true },
      quantity: { type: Number, required: true},
      purchase_price: { type: Number },
      purchaseDate: { type: Date, default: Date.now },
      alerts: [{
        greater: { type: Boolean, required: true },
        lower: { type: Boolean, required: true },
        value: { type: Number, required: true },
        triggered: false
      }]
    }],
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('CoinsUser', CoinsUserSchema);
