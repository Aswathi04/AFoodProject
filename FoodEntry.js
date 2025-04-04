import React, { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import MapComponent from "./MapComponent";

const FoodEntry = () => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setLocation(latLng);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleMapSelect = (latLng) => {
    setLocation(latLng);
    setAddress(`${latLng.lat}, ${latLng.lng}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!foodName || !quantity || !location) {
      alert("Please fill all fields and select a location.");
      return;
    }
    console.log("Submitted:", { foodName, quantity, location });
  };

  return (
    <div>
      <h2>Enter Food Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Enter location",
                })}
              />
              <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => (
                  <div
                    {...getSuggestionItemProps(suggestion)}
                    key={suggestion.placeId}
                  >
                    {suggestion.description}
                  </div>
                ))}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <MapComponent userLocation={location} onLocationSelect={handleMapSelect} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FoodEntry;
