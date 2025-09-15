const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs"); 
const nodemailer = require("nodemailer");

exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.postRegister = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new userModel({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: "Welcome 🎉",
        text: "Your signup was successful!",
      };

      await transporter.sendMail(mailOptions);
    } catch (mailErr) {
      console.warn("⚠️ Email not sent:", mailErr.message);
    }

    res.redirect("/user/signin");
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).send("Error registering user");
  }
};

exports.getSignIn = (req, res) => {
  res.render("signin");
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.status(400).send("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid email or password");

    res.redirect("/user/dashboard");
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).send("Error logging in");
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.render("index", { allUsers });
  } catch (err) {
    console.error("❌ Fetch Users Error:", err);
    res.status(500).send("Error fetching users");
  }
};
