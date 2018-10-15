import {parser} from 'js/functions';

function getDataUrl(url, callback) {
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

chrome.runtime.onMessage.addListener(({type, data}) => {
    if (type === 'BACKGROUND:image_parse_begin') {
        getDataUrl(data, dataUrl => {
            chrome.runtime.sendMessage({
                type: 'CONTENT:image_parsed',
                data: {
                    dataUrl,
                    name: parser('$CSS(figcaption > div > div > h1)')
                },

            });
        });
    }
});
