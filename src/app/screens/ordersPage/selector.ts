import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";
import OrderPage from ".";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;
export const retrievePausedOrders = createSelector(
    selectOrdersPage, 
    (OrderPage) => OrderPage.pausedOrders
); 
export const retrieveProcessOrders = createSelector(
    selectOrdersPage, 
    (OrderPage) => OrderPage.processOrders
); 
export const retrieveFinishedOrders = createSelector(
    selectOrdersPage, 
    (OrderPage) => OrderPage.finishedOrders
); 