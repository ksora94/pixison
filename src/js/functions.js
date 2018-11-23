export const functions = {
    'Title': {
        name: '网页标题',
        parser() {
            return document.title;
        },
        previewer() {
            return 'PageTitle'
        }
    },
    'Host': {
        name: '网站',
        parser() {
            return location.host;
        },
        previewer() {
            return 'https://*'
        }
    },
    'Date': {
        name: '日期',
        parser() {
            const now = new Date();

            return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
        },
        previewer() {
            return 'YYYY-MM-DD'
        }
    },
    'Time': {
        name: '时间',
        parser() {
            const now = new Date();

            return `${now.getHours()}-${now.getMinutes() + 1}-${now.getSeconds()}`
        },
        previewer() {
            return 'HH-mm-ss'
        }
    },
    'CSS': {
        name: 'CSS选择器',
        parser(selector) {
            const node = document.querySelector(selector);

            return node ? node.innerText.replace(/[\n$()]/g, '') : '';
        },
        previewer(selector) {
            return `CSS {${selector.length > 8 ? selector.slice(0, 8) + '...' : selector}`
        }
    },
    'Slice': {
        name: '切割',
        parser(str, begin, end) {
            return str.slice(+begin, +end);
        },
        previewer(str, begin, end) {
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

export const compiler = function (expression, handler, errorHandler) {
    let result = expression;
    const func = Object.keys(functions).map(f => '\\$' + f);
    const regExp = new RegExp(`(${func.join('|')})\\{[^\{\}]*\\}`, 'g');
    const error = errorHandler ||
        (funcName => console.error(`Error in func: ${funcName}`));

    if (!regExp.test(expression)) return result;
    result = expression.replace(regExp, str => {
        const argsBeginAt = str.indexOf('{');
        const funcName = str.slice(1, argsBeginAt);
        const args = str.slice(argsBeginAt + 1, -1).split(',').map(a => a.trim());

        try {
            return handler(functions[funcName], args);
        } catch (e) {
            error(funcName, args);
            console.error(e);
            return '';
        }
    });

    return compiler(result, handler);
};

export const parser = function (expression, errorHandler) {
    return compiler(expression, (func, args) => func.parser(...args), errorHandler);
};

export const previewer = function (expression, errorHandler) {
    return compiler(expression, (func, args) => func.previewer(...args), errorHandler);
};
