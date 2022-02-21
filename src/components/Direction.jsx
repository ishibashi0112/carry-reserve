import React, { useEffect, useRef, useState } from "react";
import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { useSnapshot } from "valtio";
import { latLngState } from "src/stores/valtioState";

const Direction = () => {
  const latLngSnap = useSnapshot(latLngState);
  const [currentDirection, setCurrentDirection] = useState(null);
  const [optimize, setOptimize] = useState(false);

  const center = {
    lat: 36.0492726,
    lng: 139.8128241,
  };

  const wayPoints = latLngSnap.latLng?.map((LatLng) => ({
    location: { lat: LatLng.lat, lng: LatLng.lng },
  }));

  const options = {
    origin: center,
    destination: center,
    waypoints: wayPoints,
    travelMode: "DRIVING",
    optimizeWaypoints: optimize,
  };

  let count = useRef(0);
  const directionsCallback = (res) => {
    console.log(res, count);

    if (res !== null && count.current < 2) {
      if (res.status === "OK") {
        count.current += 1;
        setCurrentDirection(res);
      } else {
        console.log("response: ", res);
        alert("directionエラー");
      }
    }
  };

  useEffect(() => {
    count.current = 0;
  }, [latLngSnap.latLng]);

  return (
    <div>
      {latLngSnap.latLng ? (
        <div>
          <DirectionsService
            options={options}
            callback={(e) => directionsCallback(e)}
          />

          <DirectionsRenderer
            options={{
              directions: currentDirection,
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Direction;
