export function getToken() {
    return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({
            interactive: true
        }, (token) => {
            if (token) {
                resolve(token)
            } else {
                reject(token, 'getToken');
            }
        })
    });
}

function service (name, data) {
    return new Promise((resolve, reject) => {
        getToken().then(token => {
            const {
                path,
                method,
                contentType = 'application/json',
                options,
                body
            } = typeof(s[name]) === 'function' ? s[name](data, token) : s[name];

            gapi.load('client', () => gapi.client.request({
                path,
                method,
                headers: {
                    'Content-Type': contentType,
                    Authorization: 'Bearer ' + token,
                },
                body,
                ...options
            }).execute(res => {
                if (res.error) {
                    console.error(res.error.message);
                    reject({...res, name, path})
                } else {
                    resolve(res);
                }
            }));
        }, reject);
    })
}

const s = {
    createFolder: ({title, parentId}) => ({
        path: '/drive/v2/files/',
        method: 'POST',
        body: {
            mimeType: 'application/vnd.google-apps.folder',
            parents: parentId ? [{id: parentId}] : undefined,
            title
        }
    }),
    getFile: ({id}) => ({
        path: `/drive/v3/files/${id}`,
        method: 'GET'
    }),
    getFolderContent: ({id}) => ({
        path: `/drive/v3/files?q='${id}'+in+parents`,
        method: 'GET'
    }),
    getFileDetailByName: ({folderId, name}) => ({
        path: `/drive/v3/files?q=name+=+'${name}'${folderId ? `+and+'${folderId}'+in+parents` : ''}`,
        method: 'GET'
    }),
    uploadImage: ({name, description, parentId, dataUrl}, token) => {
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delimiter = "\r\n--" + boundary + "--";
        const metadata = {
            mimeType: 'image/jpeg',
            parents: parentId ? [parentId] : undefined,
            name, description
        };

        return {
            path: '/upload/drive/v3/files',
            method: 'POST',
            body: delimiter +  'Content-Type: application/json\r\n\r\n' +
                JSON.stringify(metadata) +
                delimiter +
                'Content-Type: image/jpeg\r\n' +
                'Content-Transfer-Encoding: base64\r\n' + '\r\n' + dataUrl.replace(/^data:.*;base64,/, "") +
                close_delimiter,
            options: {
                params: {
                    'uploadType': 'multipart'
                },
                headers: {
                    'Content-Type': 'multipart/mixed; boundary="' + boundary + '"',
                    'Authorization': 'Bearer ' + token,
                }
            }
        }
    }
};

export default service;



