const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const Board = require("../../models/Board");


router.get("/", (req, res) => {
    Board.find().sort({date: -1})
    .then(boards => res.json(boards))
    .catch(err => res.status(400).json(err))
});

router.post("/", (req, res) => {
    const newBoard = new Board({
        boardConfig: req.body.boardConfig,
        highScore: req.body.highScore,
        highScorer: req.body.highScorer
    })

    newBoard.save().then(board => res.json(board));
})

module.exports = router;