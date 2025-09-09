const userModel = require('../models/user.model');

exports.getSignup = (req, res) => {
  res.render("signup");
}

exports.postRegister = (req, res) => {
  console.log(req.body);
  let newUsers = new userModel(req.body)
  newUsers.save()
  .then(() => {
    res.redirect("/user/dashboard");
  })
  .catch((err) => {
    console.error("Error registering user:", err);
  });
}

exports.getSignIn = (req, res) => {
  res.render("signin");
}

exports.postLogin = (req, res) => {
    res.send("Login route");
}


exports.getDashboard = (req, res) => {
  userModel.find()
  .then((allUsers)=> {
    console.log(allUsers);
    res.render('index', {allUsers});
  })
  .catch((err) => {
    console.error("Error fetching users", err);
    res.status('index', {allUsers})
  })
}