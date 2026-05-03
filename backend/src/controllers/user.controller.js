const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
// Register Controller
const jwt = require("jsonwebtoken");

// / Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};
 
// Register Controller
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
 
    // 1. Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
 
    // Trim and lowercase inputs
    const trimmedUsername = username.trim();
    const trimmedEmail = email.toLowerCase().trim();
 
    // 2. Check existing user
    const userAlreadyExists = await userModel.findOne({
      $or: [{ username: trimmedUsername }, { email: trimmedEmail }],
    });
 
    if (userAlreadyExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
 
    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
 
    // 4. Create user
    const user = await userModel.create({
      username: trimmedUsername,
      email: trimmedEmail,
      password: hashedPassword,
    });
 
    console.log("User registered:", user.username);
 
    // 5. Response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
 
// Login Controller
const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
 
    // 1. Validation
    if ((!username && !email) || !password) {
      return res.status(400).json({
        message: "Username/Email and password are required",
      });
    }
 
    // 2. Check if user exists (username OR email)
    const user = await userModel.findOne({
      $or: [{ username: username?.trim() }, { email: email?.toLowerCase().trim() }]
    }).select("+password");
 
    if (!user) {
      return res.status(401).json({
        message: 'Invalid username/email or password'
      });
    }
 
    // 3. Check password (compare with hashed password in DB)
    const isMatch = await bcrypt.compare(password, user.password);
 
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid username/email or password'
      });
    }
 
    // 4. Generate token
    const token = generateToken(user._id);
 
    console.log("User logged in:", user.username);
 
    // 5. Response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: error.message
    });
  }
};
 
module.exports = { register, login };
