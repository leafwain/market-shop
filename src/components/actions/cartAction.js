export function deleteItemCart(id) {
    return {
        type: "DELETE_ITEM_CART",
        payload: id
    }
}

export function setCart(item) {
    return {
        type: "SET_CART",
        payload: item
    }
}

export function clearCart() {
    return {
        type: "CLEAR_CART"
    }
}

export function deleteItemAll(itemId) {
    return {
        type: "DELETE_ITEM_ALL",
        payload: itemId
    }
}