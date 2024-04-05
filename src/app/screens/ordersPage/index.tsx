import {useState, SyntheticEvent} from "react";
import {Container, Stack, Box, Input} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext"
import LocatioOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";

import "../../../css/order.css";

export default function OrderPage (){
  const [value, setValue] =useState("1");
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
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
      <PausedOrders />
      <ProcessOrders />
      <FinishedOrders />

     </Stack>
      </TabContext>
    </Stack>
    <Stack className={"order-right"}>
      <Box className={"order-info-box"}>
        <Box className={"member-box"}>
          <div className="order-user-img">
         <img src="/img/justin.webp"
         className={"order-user-avatar"} />
           <div className="order-user-icon-box">
         <img src="/icons/default-user.svg"
         className={"order-user-prof-img"} />
          </div>
          </div>
          <span className={"order-user-name"}>Martin</span>
          <span className={"order-user-prof"}>User</span>
        </Box>
        <Box className={"liner"}></Box>
        <Box className={"order-user-adress"}>
          <div style={{display: "flex"}}>
            <LocatioOnIcon />
            <span className={"spec-adress-txt"}>South Korea, Daegu</span>
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

