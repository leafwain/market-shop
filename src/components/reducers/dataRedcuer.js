const initialState = {
    data: []
};

export function dataReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_DATA":
            return { ...state, data: action.payload };
        case "SET_STATUS":
            return {
                ...state,
                data: state.data.map(
                  data => state.data.indexOf(data) === action.payload
                    ? {
                      ...data,
                      status: !data.status
                    }
                    : data
                ),
              }
        case "GET_STATUS":
            return state.data[action.payload].status;
        default:
            return state;
    }
}