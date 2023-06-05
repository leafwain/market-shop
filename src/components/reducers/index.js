import { combineReducers } from "@reduxjs/toolkit";
import { dataReducer } from "./dataRedcuer";
import { cartReducer } from "./cartReducer";
import { sortReducer } from "./sortReducer";

export const rootReducer = combineReducers({
    data: dataReducer,
    cart: cartReducer,
    sortData: sortReducer
});