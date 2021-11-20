import React, { useEffect, useState } from "react";
import { useSharedState } from "src/hooks/useSharedState";

const Geocoder = () => {
  const [selectDateEvents] = useSharedState("dateEvents");
  const [latLngSaved, setLatLngSaved] = useState([]);
  const [selectDateLatLng, setSelectDateLatLng] = useSharedState("latLng", []);
  const addressArray = selectDateEvents?.map((event) => {
    const address1 = event.extendedProps.address1;
    const address2 = event.extendedProps.address2;
    return {
      address: `${address1}${address2}`,
    };
  });

  const geocodeing = () => {
    setLatLngSaved([]);
    setSelectDateLatLng([]);
    const geocoder = new window.google.maps.Geocoder();
    addressArray?.map((address) => {
      geocoder.geocode(address, (results, status) => {
        if (status === "OK") {
          const latLng = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          setLatLngSaved((prevSelectDateLatLng) => {
            const newLatLngArray = [...prevSelectDateLatLng, latLng];
            return newLatLngArray;
          });
        }
      });
    });
    setSelectDateLatLng(latLngSaved);
  };

  useEffect(() => {
    geocodeing();
    console.log(selectDateLatLng);
  }, [selectDateEvents]);

  return <></>;
};

export default Geocoder;
