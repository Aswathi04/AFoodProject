import React, { useState } from "react";
import MapComponent from "./MapComponent";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const FoodShortages = () => {
  const [shortageItem, setShortageItem] = useState("");
  const [quantityNeeded, setQuantityNeeded] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [locationInput, setLocationInput] = useState("");

  const handleLocationChange = (e) => {
    setLocationInput(e.target.value);
  };

  const handleLocationSelect = async () => {
    try {
      const results = await geocodeByAddress(locationInput);
      const latLng = await getLatLng(results[0]);
      setLocation(latLng);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shortageItem || !quantityNeeded || !location.lat) {
      alert("Please fill all fields and enter a valid location.");
      return;
    }
    console.log("Submitted:", { shortageItem, quantityNeeded, location });
  };

  return (
    <div>
      <h2>Report Food Shortage</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Shortage Item" value={shortageItem} onChange={(e) => setShortageItem(e.target.value)} />
        <input type="number" placeholder="Quantity Needed" value={quantityNeeded} onChange={(e) => setQuantityNeeded(e.target.value)} />

        <input type="text" placeholder="Enter location" value={locationInput} onChange={handleLocationChange} onBlur={handleLocationSelect} />

        <MapComponent userLocation={location} onLocationSelect={setLocation} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FoodShortages;