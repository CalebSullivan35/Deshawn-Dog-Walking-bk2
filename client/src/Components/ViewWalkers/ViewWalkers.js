import { useEffect, useState } from "react";
import {
 deleteWalker,
 getCities,
 getWalkerCityRelationships,
 getWalkers,
} from "../../apiManager";
import { Link, useNavigate } from "react-router-dom";

export const ViewWalkers = () => {
 const [walkers, setWalkers] = useState([]);
 const [cities, setCities] = useState([]);
 const [WalkerCityRelationships, setWalkerCityRelationships] = useState([]);
 const [filteredWalkers, setFilteredWalkers] = useState([]);
 const [selectedCity, setSelectedCity] = useState(""); // Initialize as an empty string
 const navigate = useNavigate();
 // Fetch all needed data
 async function fetchData() {
  const walkerData = await getWalkers();
  setWalkers(walkerData);
  setFilteredWalkers(walkerData);
  const relationshipData = await getWalkerCityRelationships();
  setWalkerCityRelationships(relationshipData);
  const cityData = await getCities();
  setCities(cityData);
 }
 useEffect(() => {
  fetchData();
 }, []);

 //use effect that will filter based on the selected city.
 useEffect(() => {
  if (selectedCity == "") {
   //set default to all walkers
   setFilteredWalkers(walkers);
  } else {
   const matchingWalkersToCityRelationships = WalkerCityRelationships.filter(
    (r) => {
     return r.cityId === parseInt(selectedCity);
    }
   );
   const matchingWalkers = matchingWalkersToCityRelationships.map((r) => {
    return r.walker;
   });
   setFilteredWalkers(matchingWalkers);
  }
 }, [selectedCity]);

 // Handle city selection change
 const handleCityChange = (event) => {
  const selectedCityId = event.target.value;
  const city = cities.find((c) => c.id === selectedCityId);
  setSelectedCity(selectedCityId); // Set the selectedCity to the ID, not the city object
 };

 return (
  <div className="ViewWalkersContainer">
   <select
    className="CityDropdown"
    value={selectedCity}
    onChange={handleCityChange}
   >
    <option value="">No City Selected</option>
    {cities.map((c) => {
     return (
      <option key={c.id} value={c.id}>
       {c.name}
      </option>
     );
    })}
   </select>
   <div>
    {filteredWalkers.map((w) => {
     return (
      <div className="walkerContainer">
       <h1>
        Name: <Link to={`/updateWalker/${w.id}`}>{w.name}</Link>
       </h1>
       <button
        onClick={() => {
         navigate(`/Walkers/AssignDog/${w.id}`);
        }}
       >
        Add Dog
       </button>
       <button
        onClick={async () => {
         await deleteWalker(w.id);
         fetchData();
        }}
       >
        Remove Walker
       </button>
      </div>
     );
    })}
   </div>
  </div>
 );
};
