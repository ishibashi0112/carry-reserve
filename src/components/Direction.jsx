import React, { useEffect, useRef, useState } from "react";
import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { useSnapshot } from "valtio";
import { mapState } from "src/stores/valtioState";

const Direction = () => {
  const mapSnap = useSnapshot(mapState);
  const [currentDirection, setCurrentDirection] = useState(null);

  const center = {
    lat: 36.0492726,
    lng: 139.8128241,
  };
  const wayPoints = mapSnap.latLng;

  const options = {
    origin: center,
    destination: center,
    waypoints: wayPoints,
    travelMode: "DRIVING",
    // optimizeWaypoints: mapSnap.optimize,
  };

  let count = useRef(0);
  const directionsCallback = (res) => {
    console.log(res, count);

    if (res !== null && count.current < 1) {
      if (res.status === "OK") {
        count.current += 1;
        const distanceAndTimes = res.routes[0].legs.map((leg) => {
          return { distance: leg.distance, duration: leg.duration };
        });
        mapState.distanceAndTimes = distanceAndTimes;
        setCurrentDirection(res);
      } else {
        console.log("response: ", res);
        alert("directionエラー");
      }
    }
  };

  useEffect(() => {
    count.current = 0;
  }, [mapSnap.latLng]);

  return (
    <div>
      {mapSnap.latLng ? (
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
