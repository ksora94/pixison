const cst = {
    DEFAULT_PAGES: [{
        name: '全部',
        url: '*',
        target: 'default',
        system: true,
        default: '$Title{}',
        expressions: ['$Title{}', '$Title{}-$Date{} $Time{}']
    }]
};

export default cst;
