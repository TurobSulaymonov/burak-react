import {useState, SyntheticEvent, useEffect} from "react";
import {Container, Stack, Box, Input} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext"
import LocatioOnIcon from "@mui/icons-material/LocationOn";
import { Order, OrderInquiry } from "../../../lib/types/order";
import PausedOrders from "./PausedOrders";
import FinishedOrders from "./FinishedOrders";
import ProcessOrders from "./ProcessOrders";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders,  setFinishedOrders } from "./slice";

import "../../../css/order.css";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderServise";
import ProceedOrders from "./ProcessOrders";
import { useGlobals } from "../../hooks/useGlobal";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

/* REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrderPage (){
  const {setPausedOrders, setProcessOrders, setFinishedOrders} = actionDispatch(useDispatch());
  const {orderBuilder, authMember} = useGlobals();
  const history = useHistory();
  const [value, setValue] =useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page:1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE
  })
  useEffect(() => {
  const order = new OrderService();
  order
  .getMyOrders({...orderInquiry, orderStatus:OrderStatus.PAUSE})
  .then(data => setPausedOrders(data))
  .catch((err) => console.log("Error", err))

  order
  .getMyOrders({...orderInquiry, orderStatus:OrderStatus.PROCESS})
  .then(data => setProcessOrders(data))
  .catch((err) => console.log("Error", err))

  order
  .getMyOrders({...orderInquiry, orderStatus:OrderStatus.FINISH})
  .then(data => setFinishedOrders(data))
  .catch((err) => console.log("Error", err))
  }, [orderInquiry, orderBuilder])
  
 
  /** HANDLER **/
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if(!authMember) history.push("/")
    
 return(
  <div className="order-page">
   <Container className={"order-container"}>
    <Stack className={"order-left"}>
      <TabContext value={value}>
     <Box className={"order-naw-frame"}>
      <Box sx={{borderBottom: 1, borderColor: "divider"}}>
        <Tabs 
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        className={"table-list"}>
          <Tab label="PAUSED ORDERS" value={"1"} />
          <Tab label="PROCESS ORDERS" value={"2"} />
          <Tab label="FINISHED ORDERS" value={"3"} />

        </Tabs>
      </Box>
     </Box>
     <Stack className={"order-main-content"}>
      <PausedOrders setValue={setValue}/>
      <ProcessOrders setValue={setValue} />
      <FinishedOrders />

     </Stack>
      </TabContext>
    </Stack>
    <Stack className={"order-right"}>
      <Box className={"order-info-box"}>
        <Box className={"member-box"}>
          <div className="order-user-img">
         <img src={authMember?.memberImage
          ? `${serverApi}/${authMember.memberImage}`
          : "/icons/default-user.svg"
         }
         className={"order-user-avatar"} />
           <div className="order-user-icon-box">
         <img src={
          authMember?.memberType === MemberType.RESTAURANT
          ? "/icons/restaurant.svg"
          : "/icons/default-user.svg"
         }
         className={"order-user-prof-img"} />
          </div>
          </div>
          <span className={"order-user-name"}>{authMember?.memberNick}</span>
          <span className={"order-user-prof"}>{authMember?.memberType}</span>
        </Box>
        <Box className={"liner"}></Box>
        <Box className={"order-user-adress"}>
          <div style={{display: "flex"}}>
            <LocatioOnIcon />
            <span className={"spec-adress-txt"}>{authMember?.memberAddress 
              ? authMember.memberAddress
              : "no address"}</span>
            </div>
        </Box>
      </Box>
      <Stack className={"card-input"}>
       <Box className={"card-input-box"}>
      <input type="number" placeholder="Card Number:1234567"/>
      <div className="middle-input"> 
      <input type="number" placeholder="07/24" className="middle-input-left" />
      <input type="number" placeholder="CVV:010" className="middle-input-right"/>
      </div>
     
      <input type="text" placeholder="John Robertson"/>

   
       <div className={"cards-img"}>
        <img src="/icons/paypal-card.svg" alt="" />

        <img src="/icons/master-card.svg" alt=""  />
        <img src="/icons/visa-card.svg" alt="" />
        <img src="/icons/western-card.svg" alt="" />

       </div>
       </Box>
    
      </Stack>
    </Stack>

   </Container>
  </div>
 )

}

