const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const inventoryRoutes = require("./routes/inventory");
const queueRoutes = require("./routes/queue");
require("dotenv").config();

const app = express();
const server = http.createServer(app); // Create the HTTP server after initializing Express
const io = socketIo(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Inventory Management API");
});
app.use("/api/inventory", inventoryRoutes);
app.use("/api/queue", queueRoutes);

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("New WebSocket connection");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
