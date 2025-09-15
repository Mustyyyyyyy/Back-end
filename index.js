const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.redirect("/user/signin");
});

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/testdb")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
