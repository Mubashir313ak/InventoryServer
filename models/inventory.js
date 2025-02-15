const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  productName: String,
  quantity: Number,
  reorderLevel: Number,
  orderQuantity: Number,
  leadTime: Number, // Days required to restock
  demandRate: Number, // Units per day
});

module.exports = mongoose.model("Inventory", InventorySchema);
