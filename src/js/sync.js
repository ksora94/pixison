import _ from 'lodash';
import storage from './storage';
import service from './service';
import cst from './constant';


export function syncToDrive() {
    const st = {
        ROOT_FOLDER: storage.get('ROOT_FOLDER'),
        PAGES: storage.get('PAGES'),
        SETTING: storage.get ('SETTING')
    };

    return service('getFileDetailByName', {
        folderId: st.ROOT_FOLDER.id,
        name: cst.SYNC_CONFIG_FILE_NAME + '.json'
    }).then(res => {
        if (res.files.length) {
            return service('deleteFile', {
                id: res.files[0].id
            })
        } else {
            return res
        }
    }).then(() => service('uploadJson', {
        name: cst.SYNC_CONFIG_FILE_NAME,
        description: 'Pixison config file',
        parentId: st.ROOT_FOLDER.id,
        obj: st
    }))
}

export function syncFromDrive() {
    return service('getFileDetailByName', {
        folderId: storage.get('ROOT_FOLDER').id,
        name: cst.SYNC_CONFIG_FILE_NAME + '.json'
    }).then(res => {
        if (res.files.length) {
            return service('getFileContent', {
                id: res.files[0].id
            })
        } else {
            throw new Error('配置文件缺失')
        }
    }).then(res => {
        if (_.isObject(res)) {
            _.forIn(res, (value, key) => {
                if (storage.get(key)) {
                    storage.set(key, value)
                }
            })
        }

        return res;
    })
}
