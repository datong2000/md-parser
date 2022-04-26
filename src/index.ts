
interface codeFn {
    [key: string]: Function
}

let md: string = '>> >   > 1 >>>>>dddd';
let html: string[] = []

let lock: boolean = true

let codeFn: codeFn = {
    '>': (v: string, idx: number) => {
        if (lock) {
            let str = '';
            for (let j = 0; j < idx; j++) {
                if (md[j] === ' ' || md[j] === '>') str += md[j];
                else lock = false;
                if (!lock) return str;
            }
        }
    },
    '#': (v: string) => {
        // md.trim().startsWith(v) ? titleCount + 1 : console.log(v);
        // return titleCount == 0 ? :
        return v
    },
    '-': (v: string) => {
        // console.log(v);
    },
    '+': (v: string) => {
        // console.log(v);
    },
    '*': (v: string) => {
        // console.log(v);
    },
    '`': (v: string) => {
        // console.log(v);
    }
}

function getToken(v: string, index: number) {
    console.log(codeFn[v]?.(v, index));
    return codeFn[v]?.(v, index) ?? v;
}

for (let i = 0; i < md.length; i++) {
    html.push(getToken(md.charAt(i), i))
}

console.log(html);