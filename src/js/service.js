function service (name, token, body) {
    const {
        path,
        method,
        contentType = 'application/json',
        ...data
    } = typeof(s[name]) === 'function' ? s[name](body) : s[name];

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
            }
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
    })
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



