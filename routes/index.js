const express=require('express')
const isLoggedin = require('../middleware/isLoggedin')
const router=express.Router()

router.get("/", (req, res) => {
    // Pass flash messages to the template
    res.render("index", { messages: req.flash() });
});

router.get("/shop", isLoggedin, function (req, res) {
    // Pass the user object to the template
    res.render("shop", { user: req.user });
});

router.get("/logout", isLoggedin, (req, res) => {
    res.clearCookie("token"); // Logout by removing token
    req.flash("success", "Logged out successfully");
    res.redirect("/");
});

module.exports=router;