import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../lib/types/screen";

const initialState: OrdersPageState  = {
    pausedOrders: [],
    processOrders: [],
    finishedOrders: [],

};

const orderPageSlice = createSlice ({
    name: "OrdersPage",
    initialState,
    reducers:{
    setPauseOrders: (state, action) => {
        state.pausedOrders = action.payload;
    },
    setProcessOrders: (state, action) => {
        state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
        state.finishedOrders = action.payload;
    },
    },
});

export const { setPauseOrders, setProcessOrders, setFinishedOrders} = 
orderPageSlice.actions;

const OrderPageReducer =  orderPageSlice.reducer;
export default  OrderPageReducer;