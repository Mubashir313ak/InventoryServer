const express = require("express");
const Inventory = require("../models/inventory");
const router = express.Router();

// EOQ Calculation Function
function calculateEOQ(demandRate, orderCost, holdingCost) {
  return Math.sqrt((2 * demandRate * orderCost) / holdingCost);
}

// Reorder Point Function
function calculateReorderPoint(demandRate, leadTime) {
  return demandRate * leadTime;
}

// Get Inventory Items
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page=1, limit=10
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const items = await Inventory.find()
      .skip((pageNumber - 1) * limitNumber) // Skip previous pages
      .limit(limitNumber);

    const totalItems = await Inventory.countDocuments(); // Total count of items

    res.json({
      items,
      totalItems,
      totalPages: Math.ceil(totalItems / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add New Item
router.post("/add", async (req, res) => {
  const newItem = new Inventory(req.body);
  await newItem.save();

  res.json({ message: "Item added", item: newItem });
});

// Update Stock
router.put("/update/:id", async (req, res) => {
  const updatedItem = await Inventory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ message: "Item updated", item: updatedItem });
});

// Check & Auto-Reorder if Needed
router.post("/check-reorder/:id", async (req, res) => {
  const item = await Inventory.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });

  const reorderPoint = calculateReorderPoint(item.demandRate, item.leadTime);

  if (item.quantity <= reorderPoint) {
    item.quantity += item.orderQuantity;
    await item.save();
    return res.json({ message: "Reorder triggered", item });
  }

  res.json({ message: "Stock is sufficient", item });
});
// Delete Inventory Item
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully", item: deletedItem });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export router
module.exports = router;
