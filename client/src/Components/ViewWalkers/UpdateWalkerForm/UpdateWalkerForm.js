import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
 deleteOldWalkerCityRelationships,
 getCities,
 getWalkerCityRelationships,
 getWalkers,
 postNewListWalkerCityRelationships,
 putNewWalkerCities,
} from "../../../apiManager";

export const UpdateWalkerForm = () => {
 const [currentWalker, setCurrentWalker] = useState({});
 const [allCities, setAllCities] = useState([]);
 const [currentRelationships, setCurrentRelationships] = useState([]);
 const [selectedCityIds, setSelectedCityIds] = useState([]);
 const [finalSelectedCities, setFinalSelectedCities] = useState([]);
 const navigate = useNavigate();
 //use params is a string.
 const { walkerId } = useParams();
 console.log(walkerId);
 //fetch all the current cities.
 useEffect(() => {
  async function getData() {
   //get current walker from walkerId
   const currentWalkerData = await getWalkers();
   setCurrentWalker(currentWalkerData.find((w) => w.id === parseInt(walkerId)));
   //get all cities and store in state.
   const allCitiesData = await getCities();
   setAllCities(allCitiesData);
   //get the current walkers relationship.
   const rawRelationshipData = await getWalkerCityRelationships();
   const myRelationshipData = rawRelationshipData.filter(
    (r) => r.walkerId === parseInt(walkerId)
   );
   setCurrentRelationships(myRelationshipData);
   // Initialize selectedCityIds with the initially checked cities
   setSelectedCityIds(myRelationshipData.map((r) => r.cityId));
  }
  getData();
 }, []);

 //use effect that updates the final cities to send everytime something chanes in selectedCities.
 useEffect(() => {
  const citiesToSend = allCities.filter((city) =>
   selectedCityIds.includes(city.id)
  );
  setFinalSelectedCities(citiesToSend);
 }, [selectedCityIds]);

 // Handle checkbox change
 const handleCheckboxChange = (cityId) => {
  setSelectedCityIds((prevSelectedCityIds) => {
   if (prevSelectedCityIds.includes(cityId)) {
    // If the cityId is already in the selectedCityIds, remove it
    return prevSelectedCityIds.filter((id) => id !== cityId);
   } else {
    // Otherwise, add it
    return [...prevSelectedCityIds, cityId];
   }
  });

  // first were gonna get our final selected cities.
 };

 const handleSubmitButton = async () => {
  //now we need to delete all previous relationships.
  await deleteOldWalkerCityRelationships(currentWalker.id);
  //next we need to post a list of new relationships.
  const relationshipsToSend = finalSelectedCities.map((f) => {
   console.log(f);
   return {
    WalkerId: currentWalker.id,
    Walker: currentWalker,
    CityId: f.id,
    City: f,
   };
  });
  console.log(relationshipsToSend);
  await postNewListWalkerCityRelationships(relationshipsToSend);
  //last we will need to do the put request in order to change the current list of cities on our walker. We can use the selected cities.
  await putNewWalkerCities(currentWalker.id, {
   id: currentWalker.id,
   name: currentWalker.name,
   cities: finalSelectedCities,
  });

  setTimeout(() => {
   navigate("/walkers");
  }, 2000);
 };

 return (
  <div>
   <h1>Selected Walker: {currentWalker.name}</h1>

   {allCities.map((city) => (
    <div key={city.id}>
     <input
      type="checkbox"
      id={`city-${city.id}`}
      name={`city-${city.id}`}
      value={city.id}
      checked={selectedCityIds.includes(city.id)}
      onChange={() => handleCheckboxChange(city.id)}
     />
     <label htmlFor={`city-${city.id}`}>{city.name}</label>
    </div>
   ))}
   <button
    onClick={() => {
     handleSubmitButton();
    }}
   >
    Submit Changes
   </button>
  </div>
 );
};
