import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
 getDogs,
 getWalkerDogRelationships,
 getWalkers,
 postNewWalkerDogRelationship,
} from "../../../apiManager";

export const AssignDog = () => {
 const [dogsWithoutWalkers, setDogsWithoutWalkers] = useState([]);
 const [walker, setWalker] = useState({});
 const { walkerId } = useParams();
 //get a list of all the current unassigned dogs.
 //first fetch dogs then filter.
 useEffect(() => {
  async function fetchInfoAndSetDogs() {
   const allDogData = await getDogs();
   console.log(allDogData);
   const allRelationships = await getWalkerDogRelationships();
   console.log(allRelationships);
   //crazy filter that gets rid of all dogs with preexisting relationships.
   const dogsNoWalkerData = allDogData.filter(
    (d) => !allRelationships.some((relationship) => relationship.dogId === d.id)
   );
   setDogsWithoutWalkers(dogsNoWalkerData);
   //get the walker based off id.
   const walkersData = await getWalkers();
   console.log("walker data" + walkersData);
   //  console.log(walkerId);
   //  const myWalker = walkersData.find((w) => w.id === walkerId);
   //  setWalker(myWalker);
   //  console.log(myWalker);
  }
  fetchInfoAndSetDogs();
 }, []);

 //when we assign we need to post.
 const handleAddRelationship = (dog) => {
  postNewWalkerDogRelationship();
 };

 return (
  <div className="AssignDogRoot">
   {dogsWithoutWalkers.map((d) => {
    return (
     <div className="individualDogAvailableForWalker">
      <div className="individualDogAvailableForWalkerCombo">
       <h4>Breed: {d.breed}</h4>
       <h4>Name: {d.name}</h4>
      </div>
      <button>Assign</button>
     </div>
    );
   })}
  </div>
 );
};

//we need to list the dogs that dont currently have a relationship.
//we also need to pass in the current walker.
