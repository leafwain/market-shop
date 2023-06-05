const initialState = {
    value: "popular"
}

export function sortReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_SORT_VALUE":
            return { ...state, value: action.payload };
        default:
            return state;
    }
}