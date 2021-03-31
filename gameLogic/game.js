// import Board from "./board";
// import Die from "./die";
// import Wordlist from "./wordlist";
// import Filename from "WHATEVER THE PATH IS FOR THE WORDLIST FILE"
// // import Player from "./player";
// // import Timer from "./timer";

const Board = require("./board.js");
const Die = require("./die.js");
const Wordlist = require("./wordlist.js");
// const Filename = require("WHATEVER THE PATH IS FOR THE WORDLIST FILE)"
// import Player from "./player";
// import Timer from "./timer";

// export default class Game {
class Game {
    constructor(...players) {
        this.board = new Board;
        this.wordList = new Wordlist('./enable1.txt');
        this.players = players;
        this.playersFoundWords = {};
        players.forEach( playerName => this.playersFoundWords[playerName] = {});
        this.playersUniqueWords = {};
        players.forEach( playerName => this.playersUniqueWords[playerName] = {});
        this.playersGameScore = [];
        players.forEach(() => this.playersGameScore.push(0));
        // this.timer = new Timer;
    }

    shuffleBoard() {
        this.board = new Board;
    }

    // startGameTimer() {
    //     // start the timer
    // }

    playWord(word, playerName) {
        if (typeof(this.playersFoundWords[playerName][word]) === "undefined") {
            this.playersFoundWords[playerName][word] = true;
        }
    }

    findDuplicateWords() {
        const wordCounts = {};
        const duplicates = {};

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

        // create object of UniqueWords for each player
        Object.keys(this.playersFoundWords).forEach( playerName => {
            const foundWords = this.playersFoundWords[playerName];
            Object.keys(foundWords).forEach( word => {
                if (!Object.keys(duplicates).includes(word)) {
                    this.playersUniqueWords[playerName][word] = true;
                }
            })
        })
    }

    calculateScores() {
        // update the player wordlists
        this.findDuplicateWords();
        // get players scores
        return Object.values(this.playersUniqueWords).map( foundWords => this.wordList.checkAnswers(foundWords));
    }

    roundWinner() {
        // confirm multiple players
        if (this.players.length === 1) {
            return;
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
        const winner = [];
        winnerIndex.forEach( i => winner.push(this.players[i]));

        // increment winning player/players rounds Won
        playerScores.forEach( (score, i) => {this.playersGameScore[i] += score});

        // return winner/winners
        return winner;
    }
}