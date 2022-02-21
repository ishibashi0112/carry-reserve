import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocoder from "src/components/Geocoder";
import Direction from "src/components/Direction";
import { useSnapshot } from "valtio";
import { eventsState } from "src/stores/valtioState";

const Map = () => {
  const eventsSnap = useSnapshot(eventsState);
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

          {eventsSnap.dateEvents.length ? (
            <div>
              <Geocoder />

              <Direction />
            </div>
          ) : null}
        </GoogleMap>
      </LoadScript>

      <div>
        <p>ルート情報</p>
        <div>
          {eventsSnap.dateEvents?.map((event) => (
            <p key={event.id}>{event.extendedProps.destination}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
