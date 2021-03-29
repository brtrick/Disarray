const lineByLine = require("n-readlines");

const createWordlist = (filename) => {
    const fileLine = new lineByLine(filename);
    
    let word;
    const wordlist = {};

    while (word = fileLine.next()) {
        let score;
        switch (word.length) {
            case 3:
            case 4:
                score = 1;
                break;
            case 5:
                score = 2;
                break;
            case 6:
                score = 3;
                break;
            case 7:
                score = 5;
                break;
            default:
                score = 11;
        }
        wordlist[word.toString('ascii')] = score;
    }
    return wordlist;
}


module.exports = createWordlist;
