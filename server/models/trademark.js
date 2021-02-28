const mongoose = require("mongoose");

var TrademarkModel = new mongoose.Schema(
  {
    trademark: { type: String, required: true },
    owner: { type: String, required: true },
    email: { type: String, required: true },
    registrationDate: { type: Date, required: true },
    expirationDate: { type: Date, required: true },
    category: { type: String, required: true },
  },
  { collection: "trademarks" }
);

TrademarkModel.index({ trademark: 1, category: 1 }, { unique: true });

module.exports = TrademarkModel;
