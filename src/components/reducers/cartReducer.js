const initialState = {
    cartData: []
}

export function cartReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_CART":
            return { ...state, cartData: [...state.cartData, action.payload] };
        case "DELETE_ITEM_CART":
            return { ...state, cartData: [...state.cartData.slice(0, action.payload), ...state.cartData.slice(action.payload + 1)] };
        case "CLEAR_CART":
            return { cartData: [] };
        case "DELETE_ITEM_ALL":
            return { ...state, cartData: [...state.cartData].filter(x => x.id !== action.payload) }
        default:
            return state;
    }
}