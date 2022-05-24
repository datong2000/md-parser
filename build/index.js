import { readFileToArr } from './readFile.js';
function getDeep(target) {
    let o = {};
    for (let item in target) {
        o[item] = target[item];
    }
    return target ? o : undefined;
}
function initProperties(target) {
    return {
        nodeName: "",
        content: "",
        children: [getDeep(target)]
    };
}
let Content, keyWord, Tag, Start;
Content = initProperties();
keyWord = initProperties(Content);
Tag = initProperties(keyWord);
Start = initProperties(Tag);
let lineKeys = ['*', '~', '^'];
let aa = ['`', '#'];
let startKeys = ['>', '-', '+', '*'];
let continuityKeys = ['---', '===', '***', '```'];
let codeCount = {
    italicsAndStrong: 0,
    subAndDelete: 0,
    sup: 0,
    code: 0,
    title: 0
};
function lineRules(v) {
    Content = getDeep(Content);
}
let firstKeyCount, lineTrim, firstFlag, firstKey;
let lineCount, lineFlag;
let toHtml = (md) => {
    md.forEach((line) => {
        lineTrim = line.trim();
        firstKeyCount = 0;
        firstFlag = false;
        firstKey = null;
        if (startKeys.includes(lineTrim[0]))
            firstKey = lineTrim[0];
        lineCount = 0;
        lineFlag = false;
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
                lineRules(line[i]);
            else
                Content.content += line[i];
        }
    });
};
readFileToArr('record.md', (md) => {
    toHtml(md);
});
