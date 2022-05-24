
export type MD = string[]

import fs from 'fs';
import readline from 'readline';

export function readFileToArr(fsReadName: string, callback: (md: MD) => void) {
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