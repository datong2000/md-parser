
// interface codeFn {
//     [key: string]: Function
// }

// let md: string = '>>> ####  >   > 1 >>>>>dddd'.replace(/\s*/g, "");
// let html: string = '';

// let state = {
//     lock: true,
//     titleLock: true
// }

// let identifier = ['#', '>', '-', '+']

// let codeFn: codeFn = {
//     '>': (idx: number) => {
//         if (state.lock) {
//             let exportHtml = () => {
//                 state.lock = false;
//                 html = '';
//                 return `<code class="c-${str.length}"></code> `;
//             }
//             let str = '';
//             for (let j = 0; j < idx; j++) {
//                 if (md[j] === '>') {
//                     str += md[j];
//                     if (md[j + 1] !== '>') return exportHtml()
//                 } else return exportHtml()
//             }
//         }
//     },
//     '#': (idx: number) => {
//         if (state.titleLock) {
//             let exportHtml = () => {
//                 state.titleLock = false;
//                 return titleCount > 6 ? undefined : `<pre class="d-${titleCount}"></pre>`
//             }
//             let titleCount = 0
//             for (let j = 0; j < idx; j++) {
//                 if (identifier.includes(md[j])) {
//                     if (md[j] === '#') ++titleCount;
//                     if (titleCount !== 0 && md[j + 1] !== '#') return exportHtml()
//                 } else return exportHtml()
//             }
//         }
//     },
//     '-': () => {
//         // console.log(v);
//     },
//     '+': () => {
//         // console.log(v);
//     },
//     '*': () => {
//         // console.log(v);
//     },
//     '`': () => {
//         // console.log(v);
//     }
// }

// function getToken(v: string, idx: number) {
//     let code = codeFn[v]?.(idx)
//     if (code) html += code;
//     else html += v;
// }

// function init(md: string) {
//     for (let i = 0; i < md.length; i++) {
//         getToken(md.charAt(i), i + 1)
//     }
// }

// init(md)

// console.log(html);

/**
 * e = expression
 * 
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
 * 代表程序构造的大写字母 E(表达式) T(项) F(因子)
 * 
 * */

type MD = string[]

function getDeep(target: object) {
    let o = {};
    for (let item in target) {
        o[item] = target[item]
    }
    return o
}

let Content, keyWords, Tag, Start;
let lineKeys = ['*', '~', '^', '`', '#'];
let startKeys = ['>', '-', '+', '*'];
let continuityKeys = ['---', '===', '***', '```'];
let codeCount = {
    italicsAndStrong: 0,
    subAndDelete: 0,
    sup: 0,
    code: 0,
    title: 0
}
let html = '';

Content = {
    content: ""
}

keyWords = {
    content: "",
    Content: getDeep(Content),
    keys: [],
    index: 0,
    check(v, index) {
        this.keys.push(v);
        this.Content = getDeep(Content);
        let flag = index - this.index == 1 ? true : false;
        this.index = index;
        switch (v) {
            case '*': (() => {
                if (flag) ++codeCount.italicsAndStrong;
                else codeCount.italicsAndStrong <= 0 ? codeCount.italicsAndStrong = 0 : --codeCount.italicsAndStrong;
            })(); break;
        }
        console.log(this.index, flag, codeCount.italicsAndStrong);
        // html += this.Content 
    }
}

Tag = {
    content: "",
    A: getDeep(keyWords)
};

Start = {
    content: "",
    Tags: [getDeep(Tag)]
};


let toHtml = (md: MD) => {
    md.forEach((line, currentLineCount) => {
        let lineTrim = line.trim();
        let firstKeyCount = 0;
        let firstFlag = false;
        let firstKey = null;
        if (startKeys.includes(lineTrim[0])) firstKey = lineTrim[0]

        let lineCount = 0;
        let lineFlag = false;
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
            if (lineKeys.includes(line[i])) keyWords.check(line[i], i);
            else Content.content += line[i];
        }
        // console.log(line);
        // console.log(firstKeyCount, '个初始关键字');
        // if (lineCount > 3) console.log('是行元素');
    })
    // console.log(Start, '151');
    // console.log(Tag);
    console.log(keyWords);
    console.log(Content);
}






const fs = require('fs');
const readline = require('readline');

function readFileToArr(fsReadName: string, callback: (arr: string[]) => void) {
    let md: MD = [];
    let readObj = readline.createInterface({
        input: fs.createReadStream(fsReadName),
        // output: fs.createWriteStream('./.json')
    });
    readObj.on('line', (line: string) => {
        md.push(line);
    });
    readObj.on('close', () => {
        callback(md);
    });
}

readFileToArr('README.md', (md) => {
    toHtml(md)
})