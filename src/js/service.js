function service (name, token, body) {
    const {
        path,
        method,
        contentType = 'application/json',
        options,
        ...data
    } = typeof(s[name]) === 'function' ? s[name](body, token) : s[name];

    return new Promise((resolve, reject) => {
        gapi.load('client', () => gapi.client.request({
            path,
            method,
            headers: {
                'Content-Type': contentType,
                Authorization: 'Bearer ' + token,
            },
            body: {
                ...data,
                ...body
            },
            ...options
        }).execute(res => {
            if (res.error) {
                console.error(res.error.message);
                reject(res)
            } else {
                resolve(res);
            }
        }));
    })
}

const s = {
    createFolder: {
        path: '/drive/v2/files/',
        method: 'POST',
        mimeType: 'application/vnd.google-apps.folder'
    },
    getFileDetail: ({id}) => ({
        path: `/drive/v3/files/${id}`,
        method: 'GET'
    }),
    getFolderContent: ({id}) => ({
        path: `/drive/v3/files?q='${id}'+in+parents`,
        method: 'GET'
    }),
    getFileDetailByName: ({folderId, name}) => ({
        path: `/drive/v3/files?q=name+=+'${name}'${folderId && `+and+'${folderId}'+in+parents`}`,
        method: 'GET'
    }),
    uploadImage: ({name, description, parent, dataUrl}, token) => {
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delimiter = "\r\n--" + boundary + "--";
        const metadata = {
            mimeType: 'image/jpeg',
            // parents: [parent],
            name, description
        };

        return {
            path: '/upload/drive/v3/files',
            method: 'POST',
            options: {
                params: {
                    'uploadType': 'multipart'
                },
                headers: {
                    'Content-Type': 'multipart/mixed; boundary="' + boundary + '"',
                    'Authorization': 'Bearer ' + token,
                },
                body: delimiter +  'Content-Type: application/json\r\n\r\n' +
                    JSON.stringify(metadata) +
                    delimiter +
                    'Content-Type: image/jpeg\r\n' +
                    'Content-Transfer-Encoding: base64\r\n' + '\r\n' + dataUrl.replace(/^data:.*;base64,/, "") +
                    close_delimiter
            }
        }
    }
};


export function getToken() {
    return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({
            interactive: true
        }, (token) => {
            if (token) {
                resolve(token)
            } else {
                reject();
            }
        })
    });
}

export function f() {

}

export default service;



