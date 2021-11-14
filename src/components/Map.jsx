import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const Map = () => {
  const center = {
    lat: 36.0492726,
    lng: 139.8128241,
  };

  return (
    <div className="">
      <LoadScript googleMapsApiKey="AIzaSyAwujWmsRf6I3YArAfkIkpVJpD2NFqdGJo">
        <GoogleMap
          mapContainerStyle={{ width: "400px", height: "400px" }}
          center={center}
          zoom={10}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
