export const getGreeting = async () => {
 const res = await fetch("/api/hello");
 return res.json();
};

export const getDogs = async () => {
 const res = await fetch("/api/dogs");
 return res.json();
};

export const getWalkers = async () => {
 const res = await fetch("/api/walkers");
 return res.json();
};

export const getWalkerDogRelationships = async () => {
 const res = await fetch("/api/walkerDogRelationships");
 return res.json();
};

export const getWalkerCityRelationships = async () => {
 const res = await fetch("/api/WalkerCityRelationships");
 return res.json();
};

export const getCities = async () => {
 const res = await fetch("/api/cities");
 return res.json();
};

export const postNewDog = async (newDogData) => {
 const response = await fetch("/api/dogs", {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify(newDogData),
 });
 if (!response.ok) {
  console.error("Failed to Add New Dog");
  return null;
 }
 console.log("New Dog Added!");
 return response.json();
};

export const postNewCity = async (newCityData) => {
 const response = await fetch("/api/cities", {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify(newCityData),
 });
 if (!response.ok) {
  console.error("Failed to Add New City");
  return null;
 }
 console.log("New City Added!");
 return response.json();
};

export const postNewWalkerDogRelationship = async (newRelationshipData) => {
 const response = await fetch("/api/walkerDogRelationships", {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify(newRelationshipData),
 });
 if (!response.ok) {
  console.error("Failed to Add New Relationship");
  return null;
 }
 console.log("New Relationship Added!");
 return response.json();
};

//use a put requests.
export const putNewWalkerCities = async (walkerId, walker) => {
 const response = await fetch(`/api/walkers/${walkerId}`, {
  method: "PUT",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify(walker),
 });
 if (!response.ok) {
  console.error("Failed to change new Walker");
  return null;
 }
 console.log("New Relationship Added!");
 return response.json();
};

//delete the request.
export const deleteOldWalkerCityRelationships = async (id) => {
 const response = await fetch(`/api/WalkerCityRelationship/${id}`, {
  method: "DELETE",
 });
};
//post a list of new walkerCityRelationships.
export const postNewListWalkerCityRelationships = async (relatioships) => {
 const response = await fetch("/api/WalkerCityRelationship", {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify(relatioships),
 });
 if (!response.ok) {
  console.error("Failed to Add New Relationships");
  return null;
 }
 console.log("New Relationships Added!");
 return response.json();
};

//delete a dog

export const deleteDog = async (id) => {
 const response = await fetch(`/api/dogs/${id}`, {
  method: "DELETE",
 });
};

export const deleteWalker = async (id) => {
 const respone = await fetch(`/api/walkers/${id}`, {
  method: "DELETE",
 });
};
