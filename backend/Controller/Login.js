const bcrypt = require("bcrypt");
const User = require("../Module/User");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: 0, message: "Invalid data" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: 0, message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: 0, message: "Invalid Email or Password" });
    }

    const token = jwt.sign(
      { id: user._id }, // ✅ include "id"
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: 1,
      message: "Login successful",
      token, // 👈 send token back
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: 0, message: "Something went wrong" });
  }
};

module.exports = Login;
