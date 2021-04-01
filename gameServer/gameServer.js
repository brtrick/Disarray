const Player = require("../gameLogic/player");
const Game = require("../gameLogic/game"); 

class GameServer {

    constructor(app, port) {
        this.server = require('http').createServer(app);
        this.io = require('socket.io')(this.server, {
            // cors: {
            //     origin: "https://localhost:3000"
            // }
        });

        this.io.on('connection', (socket)=> {
            console.log(`Socket ${socket.id} connection established.`);
            socket.broadcast.emit(`User ${socket.id} now connected`)
            
            socket.on('disconnect', () => {
                console.log(`disconnect: ${socket.id}`);
                socket.broadcast.emit(`Socket ${socket.id} disconnected.`);
            })

            socket.on("join", ({username}) => {
                console.log(`${username} Joining!`);
                const player = new Player(username, socket);
                this.waitingRoom.push(player);
                if (this.waitingRoom.length === 3) {
                    console.log("Time to start a game!");
                    this.createGame();
                }
                else socket.emit("wait", {msg: "WAITING"}); 
            });
        });

        

        this.io.listen(port);

        this.waitingRoom = [];
        this.games = {};
    }

    createGame () {
            const game = new Game(this.waitingRoom.pop(),this.waitingRoom.pop(),this.waitingRoom.pop());
            this.io.to(game.id).emit("startGame", game.renderJSON());
    }
}

module.exports = GameServer;

