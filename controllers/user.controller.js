const userModel = require('../models/user.model');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt'); 

exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.postRegister = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let newUser = new userModel({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mustyadebayo2@gmail.com',
        pass: 'yqnvlgndgnyhvfsf',
      },
    });

    let mailOptions = {
      from: 'mustyadebayo2@gmail.com',
      to: [req.body.email, "davidexcel2304@gmail.com", "alagbemustapha02@gmail.com"],
      subject: 'Welcome to Our Application',
      text: 'Congratulations, Your Sign-up was succesful! Thanks for registering!',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333333;">Welcome to Our Application, ${req.body.fullName}!</h2>
            <p style="color: #555555;">Congratulations, your sign-up was successful! We're thrilled to have you on board.</p>
            <ul style="color: #555555;">
              <li><a href="http://localhost:3000/user/signin" style="color: #1a73e8; text-decoration: none;">Sign In</a></li>
              <li><a href="http://localhost:3000/user/dashboard" style="color: #1a73e8; text-decoration: none;">Dashboard</a></li>
            </ul>
            <p style="color: #555555;">Best regards,<br>The Team</p>
          </div>
        </div>`,
    };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });

    res.redirect("/user/dashboard");
  } catch (err) {
    console.error("Error registering user:", err);
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
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    res.redirect("/user/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Error logging in");
  }
};

exports.getDashboard = (req, res) => {
  userModel.find()
    .then((allUsers) => {
      res.render("index", { allUsers });
    })
    .catch((err) => {
      console.error("Error fetching users", err);
      res.status(500).send("Error fetching users");
    });
};
