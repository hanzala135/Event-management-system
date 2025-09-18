const User = require("../Module/User");

//FUNCTION TO REGISTER USER
const registerUser = async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = registerUser;
