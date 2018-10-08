export const functions = {
    'Title': {
        name: '网页标题',
        parser() {
            return document.title;
        }
    },
    'Host': {
        name: '网站',
        parser() {
            return location.host;
        }
    },
    'Date': {
        name: '日期',
        parser() {
            const now = new Date();

            return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
        }
    },
    'Time': {
        name: '时间',
        parser() {
            const now = new Date();

            return `${now.getHours()}-${now.getMinutes() + 1}-${now.getSeconds()}`
        }
    },
    'CSS': {
        name: 'CSS选择器',
        parser(selector) {
            const node = document.querySelector(selector);

            return node ? node.innerText.replace(/\n/g, '') : '';
        }
    },
    'SLICE': {
        name: '切割',
        parser(str, begin, end) {
            return str.slice(+begin, +end);
        }
    }
};

export const functionsArray = [];
for (let key in functions) {
    if (functions.hasOwnProperty(key)) {
        functionsArray.push(Object.assign(functions[key], {key}));
    }
}

export const parser = function (expression, errorHandler) {
    let result = expression;
    const func = Object.keys(functions).map(f => '\\$' + f);
    const regExp = new RegExp(`(${func.join('|')})\\([^\(\)]*\\)`, 'g');
    const error = errorHandler ||
        (funcName => console.error(`Error in func: ${funcName}`));

    if (!regExp.test(expression)) return result;
    result = expression.replace(regExp, str => {
        let argsBeginAt = str.indexOf('(');
        let funcName = str.slice(1, argsBeginAt);
        let args = str.slice(argsBeginAt + 1, -1).split(',').map(a => a.trim());

        try {
            return functions[funcName].parser(...args);
        } catch (e) {
            error(funcName, args);
            console.error(e);
        }
    });

    return parser(result);
};