const checkAnswers = (foundWords, wordlist) => {
    const words = Object.keys(foundWords);
    let score = 0;

    words.forEach((word) => {
        if (wordlist[word]) {
            foundWords[word] = true;
            score += wordlist[word];
        }
        else foundWords[word] = false;
    })
    return score
}