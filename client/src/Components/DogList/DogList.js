import { useEffect, useState } from "react";
import { getDogs } from "../../apiManager";
import { DogDetailsPopUp } from "./DogDetails/DogDetailsPopup";
import { useNavigate } from "react-router-dom";
export const DogList = () => {
 const [dogs, setDogs] = useState([]);
 const [selectedDog, setSelectedDog] = useState(null);
 const navigate = useNavigate();
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
 //function that opens the popup with the specific dog.
 const openPopup = (dog) => {
  setSelectedDog(dog);
 };
 // function that closes the popup.
 const closePopup = () => {
  setSelectedDog(null);
 };
 return (
  <div>
   <div className="DogListContainer">
    {dogs.map((dog) => {
     return (
      <div className={`Dog--${dog.id}`} key={dog.id}>
       <p>Dog Name: {dog.name}</p>
       <button onClick={() => openPopup(dog)}>Details</button>
      </div>
     );
    })}
    {/* Conditional rendering of the popup */}
    {selectedDog && (
     <DogDetailsPopUp selectedDog={selectedDog} onClose={closePopup} />
    )}
   </div>
   <button
    className="AddDogButton"
    onClick={() => {
     navigate("/add-dog");
    }}
   >
    Add Dog
   </button>
  </div>
 );
};
