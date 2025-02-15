const fs = require("fs");

const products = [
  "Laptop",
  "Mouse",
  "Keyboard",
  "Monitor",
  "Phone",
  "Tablet",
  "Printer",
  "Headphones",
  "Webcam",
  "Smartwatch",
  "External Hard Drive",
  "USB Flash Drive",
  "Gaming Console",
  "Router",
  "Projector",
  "Speaker",
  "Microphone",
  "Drone",
  "Graphics Card",
  "Smart TV",
  "Fitness Tracker",
  "E-Reader",
  "VR Headset",
  "Smart Light",
  "Smart Thermostat",
  "Wireless Charger",
  "Gaming Chair",
  "Mechanical Keyboard",
  "Smart Doorbell",
  "Security Camera",
  "Power Bank",
  "Bluetooth Adapter",
  "Smart Glasses",
  "Desktop Computer",
  "Streaming Stick",
  "Electric Scooter",
  "3D Printer",
  "Server Rack",
  "Smart Refrigerator",
  "AI Assistant",
  "POS Terminal",
  "Barcode Scanner",
  "Cash Register",
  "CCTV System",
  "AirPods",
  "Car GPS",
  "Gaming Laptop",
  "Digital Watch",
  "Solar Power Bank",
  "Smart Lock",
];

const generateInventory = (count) => {
  let inventory = [];

  for (let i = 0; i < count; i++) {
    inventory.push({
      productName: products[Math.floor(Math.random() * products.length)],
      quantity: Math.floor(Math.random() * 100) + 1, // Random quantity between 1-100
      reorderLevel: Math.floor(Math.random() * 20) + 1, // Random reorder level 1-20
      orderQuantity: Math.floor(Math.random() * 50) + 5, // Random order quantity 5-50
      leadTime: Math.floor(Math.random() * 10) + 1, // Random lead time 1-10 days
      demandRate: Math.floor(Math.random() * 15) + 1, // Random demand rate 1-15
    });
  }

  return inventory;
};

const data = generateInventory(1000);

// Save to a JSON file
fs.writeFileSync("inventory.json", JSON.stringify(data, null, 2));

console.log("✅ 1000 inventory records generated and saved to inventory.json");
