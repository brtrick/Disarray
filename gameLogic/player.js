// import User from ""

// export default class Player extends User {
class Player {
    constructor(username, socket) {
        this.playerName = username;
        this.socket = socket;
    }

}

module.exports = Player;