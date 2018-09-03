import './assets/image/logo16.png'
import './assets/image/logo48.png'
import './assets/image/logo128.png'


chrome.contextMenus.create({
    title: 'Add with pixison',
    contexts: ['image'],
    onclick() {
        chrome.windows.create({
            url: './panel.html',
            type: 'popup',
            top: 140,
            left: 40,
            height: 120,
            width: 300
        })
    }
});