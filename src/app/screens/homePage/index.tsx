import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./AcitveUsers";
import Events from "./Events";
import "../../../css/home.css"


export default function HomePage() {
 // Selector: Store => Data
 useEffect(() => {
  return() => {
    // Backend server date request  => Date
    
    // slice Date = Store 
  };
 }, []);

    return <div className={"homepage"}>
      <Statistics/>
      <PopularDishes />
      <NewDishes/>
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>;
  }