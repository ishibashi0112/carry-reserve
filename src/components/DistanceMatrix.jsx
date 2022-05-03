// import React, { useEffect, useState } from "react";
// import { DistanceMatrixService } from "@react-google-maps/api";
// import { useSnapshot } from "valtio";
// import { mapState } from "src/stores/valtioState";

// const DistanceMatrix = () => {
//   const mapSnap = useSnapshot(mapState);
//   const center = { lat: 36.0492726, lng: 139.8128241 };
//   const destination = [...mapSnap.latLng, center];
//   const [distance, setDistance] = useState({});

//   const updateDistance = () => {
//     const routeOptions = destination.reduce((prev, current, index) => {
//       console.log(prev, current);
//       if (index === 0) {
//         return { origins: [center], destinations: [current] };
//       }
//       const origin = prev.destinations.slice(-1)[0];
//       const currentOrigins = [...prev.origins, origin];
//       const currentDestinations = [...prev.destinations, current];

//       return { origins: currentOrigins, destinations: currentDestinations };
//     }, {});
//     console.log(routeOptions);
//     setDistance(routeOptions);
//   };

//   const options = {
//     origins: distance.origins,
//     destinations: distance.destinations,
//     travelMode: "DRIVING",
//   };
//   console.log(options);

//   const DistanceMatrixCallBack = (res, status) => {
//     if (status === "OK") {
//       console.log(res);
//     }
//   };
//   useEffect(() => {
//     updateDistance();
//   }, []);

//   return (
//     <DistanceMatrixService
//       options={options}
//       callback={DistanceMatrixCallBack}
//     />
//   );
// };

// export default DistanceMatrix;
