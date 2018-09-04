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

chrome.runtime.onMessage.addListener((event) => {
    const {type, srcUrl} = event;

    if (type === 'IMAGE_LOAD_BEGIN') {
        getDataUrl(srcUrl, dataUrl => {
            chrome.runtime.sendMessage({
                type: 'IMAGE_PARSED_END',
                dataUrl
            });
        });
    }
});
