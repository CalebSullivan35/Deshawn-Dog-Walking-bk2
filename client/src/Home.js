import { DogList } from "./Components/DogList/DogList";
import { getDogs } from "./apiManager";
import { useEffect, useState } from "react";

export default function Home() {
 return (
  <div>
   <DogList />
  </div>
 );
}
