// import lineByLine from "n-readlines";
const lineByLine = require("n-readlines");

// export default class Wordlist {
class Wordlist {

    constructor (filename) {
        this.wordlist = {};
        this.prefixlist = {};
        this.initializeLists(filename);
    }

    initializeLists (filename) {
        const fileLine = new lineByLine(filename);
        // const fileLine = new lineByLine(__dirname + '/enable1.txt');

        let word;

        while (word = fileLine.next()) {
            const score = this.calculateWordValue (word.length);
            this.wordlist[word.toString('ascii')] = score;
            this.prefixlist[word.slice(0,3).toString('ascii')] = true;
        }
    }

    //checkAnswers modifies foundWords to indicate which words are valid
    //Returns the total score
    checkAnswers (foundWords) {
        const words = Object.keys(foundWords);
        let score = 0;

        words.forEach((word) => {
            if (this.wordlist[word]) {
                foundWords[word] = true;
                score += this.wordlist[word];
            }
            // If foundWords not initialized to false, need to set it here
            // else foundWords[word] = false;
        });
        return score;
    }

    calculateWordValue (wordLength) {
        switch (wordLength) {
            case 3:
            case 4:
                return 1;
            case 5:
                return 2;
            case 6:
                return 3;
            case 7:
                return 5;
            default:
                return 11;
        }
    }

    finalizeWords(foundWords, duplicates) {
        const words = Object.keys(foundWords);
        
        words.forEach((word) => {
            if (!this.wordlist[word]) {
                foundWords[word] = -1;
            } else if (duplicates.includes(word)) {
                foundWords[word] = 0;
            } else {
                foundWords[word] = this.calculateWordValue(word.length);
            }
        });

        return foundWords;
    }
}

module.exports = Wordlist;