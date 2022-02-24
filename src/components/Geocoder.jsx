import { Marker } from "@react-google-maps/api";
import React, { useEffect } from "react";
import { eventsState, mapState } from "src/stores/valtioState";

import { useSnapshot } from "valtio";

const Geocoder = () => {
  const eventsSnap = useSnapshot(eventsState);
  const mapSnap = useSnapshot(mapState);

  const addressArray = eventsSnap.dateEvents?.map((event) => {
    const address1 = event.address1;
    const address2 = event.address2;
    return {
      address: `${address1}${address2}`,
    };
  });

  const geocodeing = () => {
    const geocoder = new window.google.maps.Geocoder();
    let latLngData = [];
    addressArray?.map((address) => {
      geocoder.geocode(address, (results, status) => {
        if (status === "OK") {
          const latLng = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          const prevLatLngData = [...latLngData];
          latLngData = [...prevLatLngData, latLng];
          if (addressArray.length === latLngData.length) {
            mapState.latLng = latLngData;
          }
        }
      });
    });
  };

  useEffect(() => {
    geocodeing();
  }, [eventsSnap.dateEvents]);

  return (
    <>
      {mapSnap.latLng?.map((latLng) => {
        return <Marker key={latLng.lat} position={latLng} />;
      })}
    </>
  );
};

export default Geocoder;
