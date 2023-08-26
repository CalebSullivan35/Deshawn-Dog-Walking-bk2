import { useEffect, useState } from "react";
import { getWalkerDogRelationships } from "../../../apiManager";

export const DogDetailsPopUp = ({ selectedDog, onClose }) => {
 const [matchingRelationship, setMatchingRelationShip] = useState({});
 //fetch the walkers and pair them to the current dog.
 useEffect(() => {
  async function fetchRelationships() {
   try {
    const response = await getWalkerDogRelationships();
    console.log(response);
    const relationship = response.find((r) => r.dogId === selectedDog.id);
    console.log("matching Relationship:" + relationship);
    setMatchingRelationShip(relationship);
   } catch (error) {
    console.error("Error fetching Relationships: ", error);
   }
  }
  fetchRelationships();
 }, [selectedDog]);

 useEffect(() => {
  console.log(matchingRelationship);
 }, [matchingRelationship]);

 return (
  <div className="popup">
   <div className="popup-content">
    <h2>Dog Details</h2>
    <p>Dog Name: {selectedDog.name}</p>
    <p>Dog Breed: {selectedDog.breed}</p>
    <p>Assigned Walker: {matchingRelationship?.walker?.name}</p>
    <button onClick={onClose}>Close</button>
   </div>
  </div>
 );
};
