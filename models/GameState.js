const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const GameStatesSchema = new Schema({
    currentPlayers: [{
      type: Schema.Types.ObjectId,
      ref: "User"  
    }],
    
})

module.exports = Game = mongoose.model("gamestates", GameStatesSchema);