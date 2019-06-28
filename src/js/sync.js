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
    return new Promise((resolve, reject) => {
        const rt = storage.get('ROOT_FOLDER');

        if (rt) {
            resolve(rt.id)
        } else {
            service('qFiles', {
                q: 'name+=+"Pixison"'
            }).then(res => {
                if (res.files.length) {
                    resolve(res.files[0].id);
                } else {
                     reject('Root Folder Not Exist');
                }
            })
        }
    }).then(id => service('getFileDetailByName', {
        folderId: id,
        name: cst.SYNC_CONFIG_FILE_NAME + '.json'
    })).then(res => {
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
                if (cst.STORAGE_KEYS.includes(key)) {
                    storage.set(key, value)
                }
            })
        }

        return res;
    })
}

