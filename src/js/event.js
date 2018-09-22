const EVENTS = {};

chrome.runtime.onMessage.addListener(({type, data}) => {
    if (EVENTS[type]) {
        EVENTS[type].forEach(cb => cb(data))
    }
});

function addEvent(eventName, cb) {
    if (!EVENTS[eventName]) EVENTS[eventName] = [];
    EVENTS[eventName].push(cb);
}

function removeEvent(eventName, cb) {
    const eventQueue = EVENTS[eventName];

    if (!eventQueue) return;
    if (eventQueue.length === 1) {
        delete EVENTS[eventName];
        return;
    }
    eventQueue.some((c, index) => {
        if (c === cb) {
            eventQueue.splice(index, 1);
            return true;
        }
        return false;
    })
}

export default {
    add: addEvent,
    remove: removeEvent
}



