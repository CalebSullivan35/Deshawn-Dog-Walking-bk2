import { useEffect, useState } from "react";
import { getDogs } from "../../apiManager";
export const DogList = () => {
 const [dogs, setDogs] = useState([]);

 useEffect(() => {
  // Fetch data inside the useEffect
  getDogs()
   .then((dogs) => {
    // Update the state when the data is fetched successfully
    setDogs(dogs);
    console.log(dogs);
   })
   .catch((error) => {
    console.error("Error fetching data:", error);
   });
 }, []);

 return (
  <div className="DogListContainer">
   {dogs.map((dog) => {
    return (
     <div className={`Dog--${dog.id}`} key={dog.id}>
      <p>
       Name: {dog.name} Breed: {dog.breed}
      </p>
     </div>
    );
   })}
  </div>
 );
};
