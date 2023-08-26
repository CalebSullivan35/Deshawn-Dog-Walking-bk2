import { useState } from "react";
import { postNewDog } from "../../apiManager";

export const AddDogForm = () => {
 let [dogToAdd, setDogToAdd] = useState({
  name: "",
  breed: "",
 });

 //handle submit button
 const handleSubmit = () => {
  postNewDog(dogToAdd);
 };

 return (
  <div className="DogFormRoot">
   <h1>Dog Form</h1>
   <div className="FormContainer">
    <div className="input-container">
     <p>Dog Name: </p>
     <input
      type="text"
      placeholder="Dog Name"
      value={dogToAdd.name}
      onChange={(e) => {
       setDogToAdd({ ...dogToAdd, name: e.target.value });
      }}
     ></input>
    </div>
    <div className="input-container">
     <p>Dog Breed: </p>
     <input
      type="text"
      placeholder="Dog Breed"
      value={dogToAdd.breed}
      onChange={(e) => {
       setDogToAdd({ ...dogToAdd, breed: e.target.value });
      }}
     ></input>
    </div>
    <button
     onClick={() => {
      handleSubmit();
     }}
    >
     Submit
    </button>
   </div>
  </div>
 );
};
