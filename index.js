// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const userRoutes = require("./routes/user.routes");

// dotenv.config();

// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/testdb")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ DB Connection Error:", err));

// app.use("/user", userRoutes);

// app.get("/", (req, res) => {
//   res.send("🚀 Backend is running! Go to /user/signup or /user/signin");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1); 
  });

app.get("/", (req, res) => {
  res.send("🚀 Server is running! Go to /user/signup or /user/signin");
});

app.use((err, req, res, next) => {
  console.error("🔥 Internal Error:", err.stack);
  res.status(500).send("Something broke on the server!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
