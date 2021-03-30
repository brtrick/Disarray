const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {unique: true},
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gamesPlayed: {
        type: Number,
        default: 0
    },
    gamesWon: {
        type: Number,
        default: 0
    },
    gamesLost: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("users", UsersSchema);