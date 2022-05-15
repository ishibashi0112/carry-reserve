import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocoder from "src/components/Geocoder";
import Direction from "src/components/Direction";
import { useSnapshot } from "valtio";
import { mapState } from "src/stores/valtioState";

const Map = () => {
  const mapSnap = useSnapshot(mapState);
  console.log("maunnto");

  const center = {
    lat: 36.0492726,
    lng: 139.8128241,
  };

  return (
    <div className={`${mapSnap.show ? "p-2 xs:p-0 block" : "hidden"} w-full`}>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "350px" }}
          center={center}
          zoom={10}
        >
          <Marker position={center} />

          <div>
            <Geocoder />

            <Direction />
          </div>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
