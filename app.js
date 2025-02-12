const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRouter=require('./routes/ownersRouter')
const productsRouter=require('./routes/productsRouter')
const usersRouter=require('./routes/usersRouter')

// Ensure the path is correct
const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use('/owner',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
