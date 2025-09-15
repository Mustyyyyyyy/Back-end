const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.routes");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/testdb")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend is running! Go to /user/signup or /user/signin");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
