const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const User = require("../../models/User");



router.get("/", (req, res) => {
    User.find().sort({gamesWon: 'desc'}).limit(10).select("username gamesWon").then(users => res.json(users)).catch(err => res.json(err));
})

module.exports = router;