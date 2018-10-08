import 'assets/image/logo16.png'
import 'assets/image/logo48.png'
import 'assets/image/logo128.png'
import event from 'js/event';
import storage from 'js/storage';

const cm = window.chrome;

let currentTab = {
    id: null,
    srcUrl: ''
};
let currentPanel = null;

storage.init();

cm.windows.onRemoved.addListener (id => {
    if (currentPanel && currentPanel.id === id) currentPanel = null;
});

cm.contextMenus.create({
    title: '添加到Google drive',
    contexts: ['image'],
    onclick(event, tab) {
        const {srcUrl} = event;

        if (currentPanel) {
            cm.windows.update(currentPanel.id, {
                focused: true
            });
            return;
        }
        cm.windows.create({
            url: './panel.html',
            type: 'popup',
            top: 140,
            left: 40,
            height: 120,
            width: 300,
            tabId: tab.id,
            focused: true
        }, panel => currentPanel = panel);
        currentTab = {
            id: tab.id,
            srcUrl
        };
    }
});

event.add('PANEL:authorized',  () => {
    if (!currentTab.srcUrl) return;
    cm.tabs.sendMessage(currentTab.id, {
        type: 'BACKGROUND:image_parse_begin',
        data: currentTab.srcUrl
    });
    currentTab = {
        id: null,
        srcUrl: ''
    };
});