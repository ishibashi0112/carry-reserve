import React, { useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useSharedState } from "src/hooks/useSharedState";
import Geocoder from "src/components/Geocoder";

const Map = () => {
  const [selectDateEvents] = useSharedState("dateEvents");
  const [selectDateLatLng] = useSharedState("latLng");
  const center = {
    lat: 36.0492726,
    lng: 139.8128241,
  };

  return (
    <div className="w-full">
      <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={center}
          zoom={10}
        >
          <Marker position={center} />
          {selectDateLatLng?.map((latLng) => {
            return <Marker key={latLng.lat} position={latLng} />;
          })}
          <Geocoder />
        </GoogleMap>
      </LoadScript>
      <div>
        <p>ルート情報</p>
        <div>
          {selectDateEvents?.map((event) => (
            <p key={event.id}>{event.extendedProps.destination}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
