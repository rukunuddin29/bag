const userModel = require('../models/user-models');
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
    try {
        const { email, password, fullname } = req.body;

        // Validate input
        if (!email || !password || !fullname) {
            return res.status(400).send("All fields (email, password, fullname) are required");
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send("User already exists. Please login.");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = await userModel.create({
            email,
            password: hashedPassword,
            fullname,
        });

        // Generate JWT token
        const token = generateToken(user);

        // Set token in cookie
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        // Send success response
        res.status(201).send("User created successfully");
    } catch (err) {
        console.error("Error in registerUser:", err);
        res.status(500).send("Internal server error");
    }
};

module.exports.loginUser = async function (req, res) {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            req.flash("error", "Email or password is incorrect");
            return res.redirect("/");
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            req.flash("error", "Email or password is incorrect");
            return res.redirect("/");
        }

        // Generate JWT token
        const token = generateToken(user);

        // Set token in cookie
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        // Redirect to the shop page
        res.redirect("/shop");
    } catch (err) {
        console.error("Error in loginUser:", err);
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
};