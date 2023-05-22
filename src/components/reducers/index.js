import { combineReducers } from "@reduxjs/toolkit";
import { dataReducer } from "./dataRedcuer";
import { cartReducer } from "./cartReducer";

export const rootReducer = combineReducers({
    data: dataReducer,
    cart: cartReducer
});