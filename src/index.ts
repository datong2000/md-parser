import { readFileToArr, type MD } from './readFile.js'

/**
 * 字母表中后面的小写字母表示终结符号串(包括空串)
 * 
 * 字母表中后面的大写字母表示文法符号(非终结符/终结符)
 * 
 * */

/**
 * 下述符号是终结符
 * 
 * 字母表中排在前面的小写字母
 * 
 * 运算符 + * -...
 * 
 * 标点符号 , 。...
 * 
 * 数字 1 2 3...
 * 
 * 指定字符串: id...
 * 
 * */

/**
 * 下述符号是非终结符
 * 
 * 字母表中排在前面的大写字母
 * 
 * 字母 S ,通常表示开始
 * 
 * 小写的名字 expr stmt...
 * 
 * 代表程序构造的大写字母 E T F
 * 
 * */

interface Node {
    nodeName?: string
    children?: Node[]
    content?: string
}

function getDeep(target: object) {
    let o = {};
    for (let item in target) {
        o[item] = target[item]
    }
    return target ? o : undefined
}

function initProperties(target?: Node) {
    return {
        nodeName: "",
        content: "",
        children: [getDeep(target)]
    }
}

let Content: Node, keyWord: Node, Tag: Node, Start: Node;
Content = initProperties()
keyWord = initProperties(Content)
Tag = initProperties(keyWord)
Start = initProperties(Tag)

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
}

function lineRules(v: any) {
    Content = getDeep(Content);
}

let firstKeyCount: number, lineTrim: string, firstFlag: boolean, firstKey: string;
let lineCount: number, lineFlag: boolean;

let toHtml = (md: MD) => {
    md.forEach((line) => {
        lineTrim = line.trim();
        firstKeyCount = 0;
        firstFlag = false;
        firstKey = null;
        if (startKeys.includes(lineTrim[0])) firstKey = lineTrim[0];
        lineCount = 0;
        lineFlag = false;
        for (let i = 0; i < line.length; i++) {
            // 首元素
            if (firstKey && !firstFlag && (firstKey === line[i] || firstKey === ' ')) ++firstKeyCount;
            else firstFlag = true;
            // 行元素
            if (['*', '-'].includes(firstKey) && [' ', '*', '-'].includes(line[i]) && !lineFlag) lineCount > 3 ? 'line' : ++lineCount;
            else lineFlag = true;
            // 是行元素就去掉首元素
            if (lineCount > 3) firstKeyCount = 0;
            // 行内元素
            if (lineKeys.includes(line[i])) lineRules(line[i]);
            else Content.content += line[i];
        }
    })
}

// console.log(line);
// console.log(firstKeyCount, '个初始关键字');
// if (lineCount > 3) console.log('是行元素');
// console.log(Start, '151');
// console.log(Tag);
// console.log(keyWord);
// console.log(Content);

readFileToArr('record.md', (md) => {
    toHtml(md)
})