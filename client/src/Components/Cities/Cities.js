import { useEffect, useState } from "react";
import { getCities, postNewCity } from "../../apiManager";

export const Cities = () => {
 const [cities, setCities] = useState([]);
 const [cityToAdd, setCityToAdd] = useState("");

 async function fetchData() {
  const citiesData = await getCities();
  setCities(citiesData);
 }
 //lets get the  list of cities and store into state.
 useEffect(() => {
  fetchData();
 }, []);

 const handleCityInputChange = (event) => {
  setCityToAdd(event.target.value);
 };

 const handleAddCity = async () => {
  console.log(cityToAdd);
  await postNewCity({
   Name: cityToAdd,
  });
  setCityToAdd("");
  fetchData();
 };

 //  As a user, I want to add a city, so that I can expand service to new areas
 // GIVEN a user is viewing any page on the site
 // WHEN they click on the "Cities" link in the Nav bar
 // THEN they are presented with a list of the current cities
 // GIVEN a user is viewing the list of cities
 // WHEN they enter a City name in the "Add a city" input and click "Add"
 // THEN the city is added to the list of cities
 return (
  <div className="CityScreenRoot">
   <div className="cityList">
    {cities.map((city) => {
     return <h1 key={city.id}>City: {city.name}</h1>;
    })}
   </div>
   <div className="FormForAddCity">
    <h3>Add Form:</h3>
    <div>
     <input
      type="text"
      placeholder="City Name"
      value={cityToAdd}
      onChange={handleCityInputChange}
     />
     <button
      onClick={() => {
       handleAddCity();
      }}
     >
      Add
     </button>
    </div>
   </div>
  </div>
 );
};
