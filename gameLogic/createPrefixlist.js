const lineByLine = require("n-readlines");

const createPrefixlist = (filename) => {
    const fileLine = new lineByLine(filename);
    
    let prefix;
    const prefixlist = {};
    
    while (prefix = fileLine.next()) {
        prefixlist[prefix.slice(0,3).toString('ascii')] = true;
    }
    return prefixlist;
}


module.exports = createPrefixlist;