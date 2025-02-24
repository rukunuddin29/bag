const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model"); // Ensure this path is correct

// Ensure NODE_ENV is set to "development" before adding the POST route
if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        try {
            console.log("Received request body:", req.body); // Debugging log

            let owners = await ownerModel.find();
            if (owners.length > 0) {
                return res.status(503).send("You don't have permission to create a new owner");
            }

            let { fullname, email, password } = req.body;

            let createOwner = await ownerModel.create({
                fullname,
                email,
                password,
            });

            console.log("Owner created:", createOwner);
            res.status(201).send(createOwner);
        } catch (error) {
            console.error("Error in /create:", error);
            res.status(500).send("Internal Server Error");
        }
    });
}

router.get("/admin", (req, res) => {
    res.render("createproducts")
});

module.exports = router;
