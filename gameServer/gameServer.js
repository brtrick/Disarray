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
            socket.join("site");
            socket.broadcast.emit(`User ${socket.id} now connected`);
            
            socket.on('disconnect', () => {
                console.log(`disconnect: ${socket.id}`);
                socket.broadcast.emit(`Socket ${socket.id} disconnected.`);
            });

            socket.on("join", ({username}) => {
                console.log(`${username} Joining!`);
                const player = new Player(username, socket);
                this.waitingRoom.push(player);
                // socket.leave("site");
                socket.join("waiting");
                if (this.waitingRoom.length === 3) {
                    console.log("Time to start a game!");
                    this.createGame();
                }
                else {
                    this.io.to("waiting").emit("systemMessage", {msg: `${username} has joined the game.`}); 
                    this.io.to("waiting").emit("systemMessage", {msg: `${this.waitingRoom.length} player${this.waitingRoom.length === 1 ? '' : 's'} now waiting to start.`});
                } 
            });

            socket.on("start-practice", ({username}) => {
                const game = new Game(new Player(username, socket));
                this.games[game.id] = game;
                this.io.to(game.id).emit("startGame", game.renderJSON());
            });

            socket.on("chat", ({gameId, username, msg}) => {
                if (gameId)
                    socket.to(gameId).emit('chat', {username: username, msg: msg});
                else
                    socket.to("site").emit('chat', {username: username, msg: msg});
            });

            socket.on("finish-round", ({id, username, foundWords}) => {
                this.games[id].receiveWords({[username]: foundWords});
                if (this.games[id].listsReceived === this.games[id].players.length) {
                    console.log(this.games[id].roundResults)
                    if (this.games[id].roundsPlayed === 3) {
                        this.io.to(id).emit("endGame", this.games[id].roundResults);
                    } else {
                        this.io.to(id).emit("roundResults", this.games[id].roundResults[this.games[id].roundsPlayed-1]);
                        this.games[id].resetRoundVars();
                    }
                }                
            });
        });

        

        this.server.listen(port);

        this.waitingRoom = [];
        this.games = {};
    }

    createGame () {
            const game = new Game(this.waitingRoom.pop(),this.waitingRoom.pop(),this.waitingRoom.pop());
            game.players.forEach(({socket}) => {
                socket.leave("site");
                socket.leave("waiting");
                socket.join(game.id); 
            });
            this.games[game.id] = game;
            this.io.to(game.id).emit("startGame", game.renderJSON());
    }
}

module.exports = GameServer;

