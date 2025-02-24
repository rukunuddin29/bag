const jwt = require("jsonwebtoken");
const userModel = require("../models/user-models");

module.exports = async function (req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            req.flash("error", "You need to log in first");
            return res.redirect("/");
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            req.flash("error", "Invalid session. Please log in again.");
            return res.redirect("/");
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        req.flash("error", "Something went wrong. Please log in again.");
        res.redirect("/");
    }
};
