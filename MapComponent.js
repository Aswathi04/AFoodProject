import React, { useEffect, useRef, useState } from "react";

const MapComponent = ({ userLocation, onLocationSelect }) => {
  const mapRef = useRef(null);
  const [locationText, setLocationText] = useState("");

  useEffect(() => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API not loaded.");
      return;
    }

    const map = new window.google.maps.Map(mapRef.current, {
      center: userLocation || { lat: 37.7749, lng: -122.4194 }, // Default to SF
      zoom: 10,
    });

    const marker = new window.google.maps.Marker({
      position: userLocation || { lat: 37.7749, lng: -122.4194 },
      map,
      draggable: true,
    });

    marker.addListener("dragend", () => {
      const newPosition = marker.getPosition();
      const latLng = {
        lat: newPosition.lat(),
        lng: newPosition.lng(),
      };
      onLocationSelect(latLng);
      setLocationText(`${latLng.lat}, ${latLng.lng}`);
    });

    map.addListener("click", (event) => {
      const clickedLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      marker.setPosition(clickedLocation);
      onLocationSelect(clickedLocation);
      setLocationText(`${clickedLocation.lat}, ${clickedLocation.lng}`);
    });
  }, [userLocation, onLocationSelect]);

  return (
    <div>
      <input
        type="text"
        value={locationText}
        onChange={(e) => setLocationText(e.target.value)}
        placeholder="Enter location manually"
        className="border p-2 w-full mb-2"
      />
      <div ref={mapRef} style={{ width: "100%", height: "300px" }} />
    </div>
  );
};

export default MapComponent;
