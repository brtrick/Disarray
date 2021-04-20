// import Board from "./board";
// import Die from "./die";
// import Wordlist from "./wordlist";
// import Filename from "WHATEVER THE PATH IS FOR THE WORDLIST FILE"
// // import Player from "./player";
// // import Timer from "./timer";

const Board = require("./board.js");
const Player = require("./player");
const Die = require("./die.js");
const Wordlist = require("./wordlist.js");

// export default class Game {
class Game {
    constructor(...players) {
        //const d = new Date(); 
        // this.id = d.getUTCMilliseconds(); //Can change this to random string
        this.id = Math.floor(Math.random()*100000);
        this.board = new Board;
        this.wordList = new Wordlist(__dirname + '/enable1.txt');
        this.players = players;
        this.playersFoundWords = {};
        this.playersUniqueWords = {};
        this.initializeWordLists();
        this.playersGameScore = [];
        players.forEach(() => this.playersGameScore.push(0));
        this.isActive = false;
        this.listsReceived = 0;
        this.roundsPlayed = 0;
        this.roundResults = {};
        this.duplicates = [];
    }

    shuffleBoard() {
        this.board = new Board;
        return this.board.grid;
    }

    initializeWordLists() {
        this.players.forEach( ({playerName}) => this.playersFoundWords[playerName] = {});
        this.players.forEach( ({playerName}) => this.playersUniqueWords[playerName] = {});
    }

    renderJSON() {
        const playerNames = [];
        this.players.forEach (player => playerNames.push(player.playerName));
        return ({
            id: this.id,
            players: playerNames,
            board: this.board.grid
        });
    }

    receiveWords(foundWords) {
        this.playersFoundWords[Object.keys(foundWords)[0]] = Object.values(foundWords)[0];   
        this.listsReceived += 1; 
        if (this.listsReceived === this.players.length) {
            return this.sendResults();
        }
    }

    findDuplicateWords() {
        const wordCounts = {};
        const duplicates = {};
        console.log(this.players)
        // establish count of all foundWords
        Object.keys(this.playersFoundWords).forEach( playerName => {
            const foundWords = this.playersFoundWords[playerName];
            Object.keys(foundWords).forEach( word => {
                if (wordCounts[word] === undefined) {
                    wordCounts[word] = 1;
                } else {
                    duplicates[word] = true;
                }
            })
        })
    
        this.duplicates = Object.keys(duplicates);
    }
    
    findUniqueWords() {
        this.findDuplicateWords();
        // create object of UniqueWords for each player
        console.log(this.playersFoundWords)
        console.log(this.playersUniqueWords)
        Object.keys(this.playersFoundWords).forEach( playerName => {
            const foundWords = this.playersFoundWords[playerName];
            Object.keys(foundWords).forEach( word => {
                if (!this.duplicates.includes(word)) {
                    this.playersUniqueWords[playerName][word] = true;
                }
            })
        })
    }

    calculateScores() {
        // update the player wordlists
        this.findUniqueWords();
        // get players scores
        return Object.values(this.playersUniqueWords).map( foundWords => this.wordList.checkAnswers(foundWords));
    }

    roundWinner() {
        // confirm multiple players
        if (this.players.length === 1) {
            return Object.values(this.playersUniqueWords).map( foundWords => this.wordList.checkAnswers(foundWords));
        }
        // determine winning score
        const playerScores = this.calculateScores();
        const winningScore = Math.max(...playerScores);
        
        // find player/players with the winningScore
        const winnerIndex = [];
        for (let i = 0; i < this.players.length; i++) {
            if (playerScores[i] === winningScore) {
                winnerIndex.push(i);
            }
        }
        let winnerArr = [];
        winnerIndex.forEach( i => winnerArr.push(this.players[i]));
        let winner = winnerArr.map(p => {return p.playerName})
        // increment winning player/players rounds Won
        playerScores.forEach( (score, i) => {this.playersGameScore[i] += score});
        
        // return winner/winners
        return winner;
    }

    wordResults() {
        const finalWordlists = {};
        // this.findDuplicateWords(); // is likely redundant for multiplayer
        Object.keys(this.playersFoundWords).forEach( playerName => {
            const foundWords = this.playersFoundWords[playerName];
            finalWordlists[playerName] = this.wordList.finalizeWords(foundWords, this.duplicates);
        })

        this.finalWordlists = finalWordlists;
        return finalWordlists;
    }

    resetRoundVars() {
        this.initializeWordLists();
        this.listsReceived = 0;
    }

    sendResults() {
        const winners = this.roundWinner();
        const wordResults = this.wordResults();

        const currentScores = this.playersGameScore;

        this.roundResults[this.roundsPlayed] = {
            winners: winners,
            wordResults: wordResults,
            currentScores: currentScores,
            nextBoard: this.shuffleBoard()
        };
        this.roundsPlayed += 1;

    }
}

module.exports = Game;