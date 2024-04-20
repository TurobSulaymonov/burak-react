import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./AcitveUsers";
import Events from "./Events";
import "../../../css/home.css"

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {createSelector} from "reselect";
import {setPopularDishes} from "./slice";
import { retrievePopularDishes} from "./selector";
import { Product } from "../../../lib/types/product";

/* REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});
const popularDisheRetriver = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({popularDishes})
);

export default function HomePage() {
  const {setPopularDishes} = actionDispatch(useDispatch());
  const {popularDishes} = useSelector(popularDisheRetriver);
 // Selector: Store => Data

 useEffect(() => {
  return() => {
    // Backend server date request  => Date
   /*   const result = [
      {
          "_id": "6623ee2b3801c011e4c11d2e",
          "productStatus": "PROCESS",
          "productCollection": "DISH",
          "productName": "Cutlet",
          "productPrice": "9",
          "productLeftCount": "60",
          "productSize": "NORMAL",
          "productVolume": 1,
          "productDesc": "Cutlet",
          "productImages": [
              "uploads/products/47d4a797-2ed5-4e72-80d9-8a7f32d18230.jpg"
          ],
          "productViews": 0,
          "createdAt": "2024-04-20T16:32:43.931Z",
          "updatedAt": "2024-04-20T16:38:09.733Z",
          "__v": 0
      },
      {
          "_id": "6623edb33801c011e4c11d27",
          "productStatus": "PROCESS",
          "productCollection": "DISH",
          "productName": "FR Kebab",
          "productPrice": "10",
          "productLeftCount": "100",
          "productSize": "NORMAL",
          "productVolume": 1,
          "productDesc": "Fr Kebab",
          "productImages": [
              "uploads/products/29abdd78-13c5-4b0c-a1a0-322880b021cd.jpg"
          ],
          "productViews": 0,
          "createdAt": "2024-04-20T16:30:43.835Z",
          "updatedAt": "2024-04-20T16:38:15.231Z",
          "__v": 0
      },
  ] */
    // slice Date = Store
    //@ts-ignore 
    setPopularDishes();
  };
 }, []);

 // console.log("popularDishes:", popularDishes)

    return <div className={"homepage"}>
      <Statistics/>
      <PopularDishes />
      <NewDishes/>
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>;
  }