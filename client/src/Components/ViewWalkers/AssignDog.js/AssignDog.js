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
 const [allWalkers, setAllWalkers] = useState([]);
 const { walkerId } = useParams();
 //get a list of all the current unassigned dogs.
 //first fetch dogs then filter.
 useEffect(() => {
  async function fetchInfoAndSetDogs() {
   const allDogData = await getDogs();
   const allRelationships = await getWalkerDogRelationships();
   //crazy filter that gets rid of all dogs with preexisting relationships.
   const dogsNoWalkerData = allDogData.filter(
    (d) => !allRelationships.some((relationship) => relationship.dogId === d.id)
   );
   setDogsWithoutWalkers(dogsNoWalkerData);
   //get all the walkers and store in state.
   const walkersData = await getWalkers();
   const myWalker = walkersData.find((w) => w.id === parseInt(walkerId));
   setWalker(myWalker);
  }
  fetchInfoAndSetDogs();
 }, []);

 //when we assign we need to post.
 const handleAddRelationship = (dogToPass) => {
  postNewWalkerDogRelationship({
   WalkerId: parseInt(walkerId),
   Walker: walker,
   DogId: dogToPass.id,
   Dog: dogToPass,
  }).then(() => {
   // Update the dogsWithoutWalkers state after the assignment
   setDogsWithoutWalkers((prevDogsWithoutWalkers) =>
    prevDogsWithoutWalkers.filter((d) => d.id !== dogToPass.id)
   );
  });
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
      <button
       onClick={() => {
        handleAddRelationship(d);
       }}
      >
       Assign
      </button>
     </div>
    );
   })}
  </div>
 );
};

//we need to list the dogs that dont currently have a relationship.
//we also need to pass in the current walker.
