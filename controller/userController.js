const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET);
};

//User Register Controller
exports.postRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }

    //check if user exist already
    const isExist = await User.findOne({ email });
    if (isExist) {
      res.status(409).json({ message: "user already exist" });
    }

    //hashing the password
    const hashPassword = await bcrypt.hash(password, 12);

    //create new user
    const user = new User({ name, email, password: hashPassword });
    const saveUser = await user.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//User Login Controller
exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.json({ message: "email and password is required" });
    }

    //check user exist for this email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    //user exist proceed further to match password now
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid user credentials" });
    }

    //generate jwt token
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    //store refresh token to db
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.postRefresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token is required" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken != refreshToken) {
      res.status(403).json({ message: "invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user._id);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "refresh token expired" });
  }
};

exports.getUserdata = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.postLogout = async (req, res) => {
  try {
    const userId = req.userId;

    await User.findByIdAndUpdate(userId, { refreshToken: null }, { new: true });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
