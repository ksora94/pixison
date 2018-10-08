const cst = {
    DEFAULT_PAGES: [{
        name: '全部',
        url: '*',
        target: 'default',
        system: true,
        expressions: ['$Title()', '$Title()-$Time()']
    }],
    DEFAULT_TEMPLATES: [{
        name: '网页标题',
        system: true,
        expression: '$Title()'
    }, {
        name: '网页标题-时间',
        system: true,
        expression: '$Title()-$Time()'
    }]
};

export default cst;