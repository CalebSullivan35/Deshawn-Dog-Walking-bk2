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
