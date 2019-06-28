import _ from 'lodash';
import {match, parse} from 'matchit';
import 'assets/image/logo16.png';
import 'assets/image/logo48.png';
import 'assets/image/logo128.png';
import event from 'js/event';
import storage from 'js/storage';

const cm = window.chrome;

let currentTab = {
    id: null,
    srcUrl: ''
};
let currentPanel = null;
let currentExpressions = [];
let currentTargets = [];

storage.init();

cm.browserAction.onClicked.addListener(() => {
    const rt = storage.get('ROOT_FOLDER');

    chrome.tabs.create({
        url: rt && rt.id ? `https://drive.google.com/drive/folders/${rt.id}` : 'https://drive.google.com'
    });
});

cm.windows.onRemoved.addListener (id => {
    if (currentPanel && currentPanel.id === id) currentPanel = null;
});

cm.contextMenus.create({
    title: '添加到Google drive',
    contexts: ['image'],
    onclick(event, tab) {
        const {srcUrl, pageUrl} = event;
        const pages = storage.get('PAGES');
        let expressions = [];
        let es = [];

        pages.forEach(page => {
            const relation = match(pageUrl, [parse(page.url)]).length;

           if (relation) {
               es.push({
                   relation,
                   target: page.target,
                   expressions: [page.default, ...page.expressions]
               });
           }
        });
        es = es.sort((cur, next) => next.relation - cur.relation);
        es.forEach(page => {
            expressions = [...expressions, ...page.expressions];
            if (!currentTargets.includes(page.target)) currentTargets.push(page.target);
        });
        currentExpressions = _.uniq(expressions);

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
            height: 145,
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
        data: {
            imgUrl: currentTab.srcUrl,
            expressions: currentExpressions,
            targets: currentTargets,
        }
    });
    currentTab = {
        id: null,
        srcUrl: ''
    };
    currentExpressions = [];
    currentTargets = [];
});
