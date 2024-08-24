import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }

    // password hash
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const boyImage = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlImage = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyImage : girlImage,
    });

    if (newUser) {
      // Generate JWT token
      generateTokenSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser.id,
        username: newUser.username,
      });
    } else {
      res.status(500).json({ error: "Invalid user details" });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Something went wrong during signup." });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    // Check if the user exists and the password is correct
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate and set the JWT token as a cookie
    generateTokenSetCookie(user._id, res);

    // Return user data in the response
    res.status(200).json({
      _id: user._id,
      username: user.username,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);

    // Return a server error response
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "loged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);

    // Return a server error response
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
