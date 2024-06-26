import React from "react";
import {Box, Stack} from "@mui/material";
import TabPanel from"@mui/lab/TabPanel";
import { createSelector } from "reselect";
import {  retrieveFinishedOrders} from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";


  // REDUX SLICE & SELECTOR 
  const finishedOrdersRetriever = createSelector(
    retrieveFinishedOrders,
    (finishedOrders) => ({finishedOrders})
  );


export default function FinishedOrders () {
    const {finishedOrders} = useSelector(finishedOrdersRetriever); 
 return(
    <TabPanel value={"3"}>
    <Stack>
        {finishedOrders.map((order: Order) => {
            return(
                <Box key={order._id}
                className={"order-main-box"}
                >
                    <Box className={"order-box-scroll"}>
                    {order?.orderItems?.map((item: OrderItem) => {
                            const product: Product = order.productData.filter((ele: Product) => item.productId === ele._id)[0];
                            const imagePath = `${serverApi}/${product.productImages}`;
                            return (
                       <Box key={order._id} className={"orders-name-price"}>
                          <img src={imagePath} className={"order-dish-img"} />
                            <p className="title-dish">{product.productName}</p>
                            <Box className={"price-box"}>
                                <p>${item.itemPrice}</p>
                                <img src="/icons/close.svg" alt="" />
                                <p>{item.itemQuantity}</p>
                                <img src="/icons/pause.svg" alt="" />

                                <p style={{marginLeft: "15px"}}>${item.itemQuantity * item.itemPrice}</p>
                        </Box>
                       </Box>
                        );
                    })}
                    </Box>
                    {/*  */}
                    <Box className={"total-price-box"}>
                        <Box className={"box-total"}>
                            <p>Product price</p>
                            <p>${order.orderTotal - order.orderDelivery}</p>
                            <img src={"/icons/plus.svg"} style={{marginLeft: "20px"}}
                                />
                            <p>delivery cost</p>
                            <p>${order.orderDelivery}</p>
                            <img src={"/icons/pause.svg"} 
                            style={{marginLeft: "20px"}} />
                            <p>Total</p>
                            <p>${order.orderTotal}</p>
                        </Box>
                    </Box>
                    </Box>
            );
        })}
        {!finishedOrders || (finishedOrders.length === 0 && (
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                <img src={"/icons/noimage-list.svg"}
                style={{width: 300, height: 300}} />
            </Box>
        ))}
    </Stack>
</TabPanel>
 );
}