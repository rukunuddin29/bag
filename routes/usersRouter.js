const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// GET /users
router.get('/', function(req, res) {
    res.send('hey its working');
});

// POST /users/register
router.post('/register', registerUser);

// POST /users/login
router.post('/login', loginUser);

module.exports = router;