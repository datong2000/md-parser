"use strict";
function getDeep(target) {
    let o = {};
    for (let item in target) {
        o[item] = target[item];
    }
    return o;
}
let Content, keyWords, Tag, Start;
let lineKeys = ['*', '~', '^', '`', '#'];
let startKeys = ['>', '-', '+', '*'];
Content = {
    content: ""
};
keyWords = {
    content: "",
    Content: getDeep(Content),
    keys: [],
    check(v) {
        this.keys.push(v);
        this.Content = getDeep(Content);
    }
};
Tag = {
    content: "",
    keyWords: getDeep(keyWords)
};
Start = {
    content: "",
    Tags: [getDeep(Tag)]
};
let toHtml = (md) => {
    md.forEach((line, currentLineCount) => {
        let lineTrim = line.trim();
        let firstKeyCount = 0;
        let firstFlag = false;
        let firstKey = null;
        if (startKeys.includes(lineTrim[0]))
            firstKey = lineTrim[0];
        let lineCount = 0;
        let lineFlag = false;
        for (let i = 0; i < line.length; i++) {
            if (firstKey && !firstFlag && (firstKey === line[i] || firstKey === ' '))
                ++firstKeyCount;
            else
                firstFlag = true;
            if (['*', '-'].includes(firstKey) && [' ', '*', '-'].includes(line[i]) && !lineFlag)
                lineCount > 3 ? 'line' : ++lineCount;
            else
                lineFlag = true;
            if (lineCount > 3)
                firstKeyCount = 0;
            if (lineKeys.includes(line[i]))
                keyWords.check(line[i], i);
            else
                Content.content += line[i];
        }
    });
};
const fs = require('fs');
const readline = require('readline');
function readFileToArr(fsReadName, callback) {
    let md = [];
    let readObj = readline.createInterface({
        input: fs.createReadStream(fsReadName),
    });
    readObj.on('line', (line) => {
        md.push(line);
    });
    readObj.on('close', () => {
        callback(md);
    });
}
readFileToArr('README.md', (md) => {
    toHtml(md);
});
