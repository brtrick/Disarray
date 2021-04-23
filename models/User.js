const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Game = require("./GameState");

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
    currentGames: [{
      type: Schema.Types.ObjectId,
      ref: "Game"  
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

UsersSchema.set("toJSON", {virtuals: true});

module.exports = User = mongoose.model("users", UsersSchema);