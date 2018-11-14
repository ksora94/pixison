export function selectTemplate(data) {
    return {
        type: 'SELECT_TEMPLATE',
        data
    }
}

export function addTemplate(data) {
    return {
        type: 'ADD_TEMPLATE',
        data
    }
}

export function delTemplate(data) {
    return {
        type: 'DELETE_TEMPLATE',
        data
    }
}