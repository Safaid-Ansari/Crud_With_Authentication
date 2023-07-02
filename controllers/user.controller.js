const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
module.exports.register = asyncHandler(async (req, res) => {
  try {
    // Get user input
    const { firstName, lastName, email, password, confirm_password } = req.body;
    // Validate user input
    if (!(firstName && lastName && email && password, confirm_password)) {
      return res
        .status(400)
        .json({ massage: "all fields are required", success: false });
    }

    if (password !== confirm_password) {
      return res.status(403).json({
        message: "password and confirm password does not match ",
        success: false,
      });
    }

    // check if user already exist
    // Validate if user exist in our database
    const isUser = await User.findOne({ email: email });

    if (isUser) {
      return res
        .status(400)
        .json(" User already exist on this email number . Please Login ");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });
    await user.save();
    // return new user
    return res.status(201).json({ user, success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports.login = asyncHandler(async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("all fields is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email: email });
    console.log(user);
    const comparedPassword = await bcrypt.compare(password, user.password);

    console.log(comparedPassword);
    if (user && comparedPassword) {
      // Create token
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        user,
        token,
        success: true,
      });
    }
    return res.status(400).json("email or password are incorrect");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports.welcomeUser = asyncHandler((req, res) => {
  res.status(200).send("...........Welcome Dear User............... ");
});

module.exports.getUser = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  const users = await User.find()
    .limit(pageSize)
    .skip(pageSize * page)
    .sort({ firstName: 1 });

  if (!users) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(users);
});

module.exports.getUserById = asyncHandler(async (req, res) => {
  try {
    const user_id = req.params.id;
    const user = await User.find({ _id: user_id });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports.updateUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateUser) {
      return res.status(404).json({ message: "No Changes till now " });
    }
    return res.status(200).json(updateUser);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports.deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.status(404).json({ Message: "User not found" });
  }

  return res.status(200).json(deletedUser);
});
