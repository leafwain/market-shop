export function setData(data) {
    return {
        type: "SET_DATA",
        payload: data
    }
}

export function getStatus(id) {
    return {
        type: "GET_STATUS",
        payload: id
    }
}

export function setStatus(id) {
    return {
        type: "SET_STATUS",
        payload: id
    }
}