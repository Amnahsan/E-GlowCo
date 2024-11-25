const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

// Register route
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log("Received registration data:", { name, email, role });

  if (!name || !email || !password || !role) {
    console.log("Missing fields in registration data.");
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User with this email already exists:", email);
      return res.status(400).json({ message: 'User already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    console.log("User registered successfully:", { name, email, role });
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login data:", { email });

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found:", email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Password does not match for:", email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '2h' } // Use environment variable for expiry if set
    );

    // Successful login
    console.log("User logged in successfully:", { email, role: user.role });
    res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // Catch unexpected errors
    console.error("Error logging in user:", error.message);
    res.status(500).json({ message: 'Error logging in user. Please try again later.' });
  }
};


module.exports = { register, login };
