import storage from './storage';
import service from './service';
import cst from './constant';


export function syncToDrive() {
    const st = {
        rootFolder: storage.get('ROOT_FOLDER'),
        pages: storage.get('PAGES'),
        setting: storage.get ('SETTING')
    };

    return service('getFileDetailByName', {
        folderId: st.rootFolder.id,
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
        parentId: st.rootFolder.id,
        obj: st
    }))
}

export function syncFromDrive() {

}

