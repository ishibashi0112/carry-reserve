import { Marker } from "@react-google-maps/api";
import React, { useEffect } from "react";
import { eventsState, mapState } from "src/stores/valtioState";

import { useSnapshot } from "valtio";

const geocodePromiseResult = (address) => {
  return new Promise((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(address, (results, status) => {
      if (status === "OK") {
        const latLng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        resolve(latLng);
      } else {
        reject(status);
      }
    });
  });
};

const Geocoder = () => {
  const eventsSnap = useSnapshot(eventsState);
  const mapSnap = useSnapshot(mapState);

  const addressArray = eventsSnap.dateEvents?.map((event) => {
    const address1 = event.address1;
    const address2 = event.address2 ? event.address2 : "";
    return {
      address: `${address1}${address2}`,
    };
  });
  console.log(addressArray);

  const geocodeing = async () => {
    const promiseResultArray = addressArray?.map(async (address) => {
      const latLng = await geocodePromiseResult(address);
      return latLng;
    });
    const latLngData = await Promise.all(promiseResultArray);
    mapState.latLng = latLngData;
  };

  console.log(mapState.latLng);

  useEffect(() => {
    geocodeing();
  }, [addressArray]);

  return (
    <>
      {mapSnap.latLng?.map((latLng) => {
        return <Marker key={latLng.lat} position={latLng} />;
      })}
    </>
  );
};

export default Geocoder;
