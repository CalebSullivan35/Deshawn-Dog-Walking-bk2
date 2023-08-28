import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import { AddDogForm } from "./Components/AddDogForm/AddDogForm";
import { ViewWalkers } from "./Components/ViewWalkers/ViewWalkers";
import { AssignDog } from "./Components/ViewWalkers/AssignDog.js/AssignDog";
import { Cities } from "./Components/Cities/Cities";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <BrowserRouter>
  <Routes>
   <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/add-dog" element={<AddDogForm />} />
    <Route path="/Walkers" element={<ViewWalkers />} />
    <Route path="/Walkers/AssignDog/:walkerId" element={<AssignDog />} />
    <Route path="/Cities" element={<Cities />} />
   </Route>
  </Routes>
 </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
