const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const indexRouter = require('./routes/index');
const expressSession = require('express-session');
const flash = require("connect-flash");

// Load environment variables
require("dotenv").config();

// Verify environment variables
console.log("JWT_KEY:", process.env.JWT_KEY);
console.log("EXPRESS_SESSION_SECRET:", process.env.EXPRESS_SESSION_SECRET);

// Ensure the path is correct
const db = require("./config/mongoose-connection");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure express-session
app.use(
    expressSession({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(flash());

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
app.use('/', indexRouter);
app.use('/owner', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// Start the server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});