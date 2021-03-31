const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const BoardsSchema = new Schema({
    boardConfig: {
        type: String
    },
    highScore: {
        type: Number,
        default: 0
    },
    highScorer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = Board = mongoose.model("boards", BoardsSchema);