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
