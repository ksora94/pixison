const cst = {
    STORAGE_KEYS: ['ROOT_FOLDER', 'PAGES', 'SETTING'],
    DEFAULT_PAGES: [{
        name: '全部',
        url: '*',
        target: 'default',
        system: true,
        default: '$Title{}',
        expressions: ['$Title{}', '$Title{}-$Date{} $Time{}', '$Random{6}-$Date{}']
    }],
    DEFAULT_SETTING: {
        autoClose: false,
        allowCustomTarget: false,
        autoSync: true
    },
    SYNC_CONFIG_FILE_NAME: '.pixison_config'
};

export default cst;
